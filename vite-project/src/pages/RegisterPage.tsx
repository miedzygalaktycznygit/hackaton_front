import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { useNavigate, Link } from 'react-router-dom';

import { registerSchema, type RegisterFormData } from '../lib/validation';
import { registerUser } from '../api/authApi';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button';
import styles from './Page.module.css'; 

export function RegisterPage() {
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const mutation = useMutation({
    mutationFn: registerUser, 
    onSuccess: (data) => {
      console.log('Rejestracja pomyślna:', data);
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Błąd rejestracji:', error);
    },
  });

  const onSubmit = (data: RegisterFormData) => {
    mutation.mutate(data);
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Stwórz konto</h1>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input
          label="Adres e-mail"
          type="email"
          props={register('email')}
          error={errors.email?.message}
        />
        <Input
          label="Hasło (min. 8 znaków)"
          type="password"
          props={register('password')}
          error={errors.password?.message}
        />
        <Input
          label="Potwierdź hasło"
          type="password"
          props={register('confirmPassword')}
          error={errors.confirmPassword?.message}
        />

        <Button type="submit" isTrue={mutation.isPending}>
          Zarejestruj się
        </Button>
      </form>

      <p className={styles.link}>
        Masz już konto? <Link to="/login">Zaloguj się</Link>
      </p>
    </div>
  );
}