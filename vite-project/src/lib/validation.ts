import {z} from 'zod';

export const loginSchema = z.object({
    email: z.string().email({ message: "Nieprawidłowy format email" }),
    password: z.string().min(6, { message: "Hasło musi mieć co najmniej 6 znaków" })
});