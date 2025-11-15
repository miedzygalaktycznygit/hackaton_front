import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'; 
import { useMutation } from '@tanstack/react-query'; 
import { useNavigate, Link } from 'react-router-dom'; 

import { loginSchema, type LoginFormData } from '../lib/validation';
import { loginUser } from '../api/authApi';
import { useAuth } from '../contexts/AuthContext';

import { Input } from '../components/ui/Input';
import { Button } from '../components/ui/Button'; 
import styles from './Page.module.css';

export function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth(); 


  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema), 
  });

 
  const mutation = useMutation({
    mutationFn: loginUser,
    onSuccess: (tokenData) => {
      console.log('Zalogowano!', tokenData);
      login(tokenData); 
      navigate('/dashboard');
    },
    onError: (error) => {
      console.error('Błąd logowania:', error);
    }
  });

  const onSubmit = (data: LoginFormData) => {
    mutation.mutate(data); 
  };

  return (
    <div className={styles.formWrapper}>
      <h1 className={styles.title}>Witaj ponownie!</h1>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <Input 
          label="Adres e-mail"
          type="email"
          props={register('email')} 
          error={errors.email?.message}
        />
        <Input 
          label="Hasło"
          type="password"
          props={register('password')}
          error={errors.password?.message}
        />

        <Button 
          type="submit" 
          isTrue={mutation.isPending}
        >
          Zaloguj się
        </Button>
      </form>

      <p className={styles.link}>
        Nie masz konta? <Link to="/register">Zarejestruj się</Link>
      </p>
    </div>
  );
}