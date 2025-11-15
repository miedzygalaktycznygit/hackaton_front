const { registerUser, LoginUser } = require('../src/services/auth.service');
const pool = require('../src/database/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

jest.mock('../src/database/db'); // mock bazy danych
jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('Auth Service', () => {

    afterEach(() => {
        jest.clearAllMocks();
    });

    // ======== TESTY DLA registerUser ========
    test('registerUser powinien wywołać zapytanie do bazy i zwrócić użytkownika', async () => {
        bcrypt.hash.mockResolvedValue('hashedPassword');
        pool.query.mockResolvedValue({ rows: [{ id: 1, email: 'test@test.com' }] });

        const user = await registerUser('test@test.com', 'password123');

        expect(bcrypt.hash).toHaveBeenCalledWith('password123', expect.any(Number));
        expect(pool.query).toHaveBeenCalledWith(
            "INSERT INTO users (email, password) VALUES ($1, $2);",
            ['test@test.com', 'hashedPassword']
        );
        expect(user).toEqual({ id: 1, email: 'test@test.com' });
    });

    test('registerUser rzuca błąd gdy baza danych wyrzuca wyjątek', async () => {
        bcrypt.hash.mockResolvedValue('hashedPassword');
        pool.query.mockRejectedValue(new Error('DB error'));

        await expect(registerUser('test@test.com', 'password123')).rejects.toThrow('Internal server error');
    });

    // ======== TESTY DLA LoginUser ========
    test('LoginUser zwraca token dla poprawnych danych', async () => {
        const hashedPassword = 'hashedPassword';
        pool.query.mockResolvedValue({ rows: [{ id: 1, email: 'test@test.com', password: hashedPassword }] });
        bcrypt.compare.mockResolvedValue(true);
        jwt.sign.mockReturnValue('fake-jwt-token');

        const token = await LoginUser('test@test.com', 'password123');

        expect(pool.query).toHaveBeenCalledWith(
            "SELECT * FROM users WHERE email = $1;", ['test@test.com']
        );
        expect(bcrypt.compare).toHaveBeenCalledWith('password123', hashedPassword);
        expect(jwt.sign).toHaveBeenCalledWith({ id: 1, email: 'test@test.com' }, process.env.JWT_SECRET, { expiresIn: '1h' });
        expect(token).toBe('fake-jwt-token');
    });

    test('LoginUser zwraca null gdy użytkownik nie istnieje', async () => {
        pool.query.mockResolvedValue({ rows: [] });

        const token = await LoginUser('nonexistent@test.com', 'password123');
        expect(token).toBeNull();
    });

    test('LoginUser rzuca błąd przy niepoprawnym haśle', async () => {
        const hashedPassword = 'hashedPassword';
        pool.query.mockResolvedValue({ rows: [{ id: 1, email: 'test@test.com', password: hashedPassword }] });
        bcrypt.compare.mockResolvedValue(false);

        await expect(LoginUser('test@test.com', 'wrongpassword')).rejects.toThrow('Invalid password');
    });

    test('LoginUser rzuca błąd gdy baza danych wyrzuca wyjątek', async () => {
        pool.query.mockRejectedValue(new Error('DB error'));

        await expect(LoginUser('test@test.com', 'password123')).rejects.toThrow('Login failed');
    });
});