import {z as zod} from 'zod';

export const loginSchema = zod.object({
    email: zod.string().email({ message: "Nieprawidłowy format email" }),
    password: zod.string().min(6, { message: "Hasło musi mieć co najmniej 6 znaków" })
});

export const registerSchema = zod.object({
    email: zod.string().email({ message: "Nieprawidłowy format email" }),
    password: zod.string().min(6, { message: "Hasło musi mieć co najmniej 6 znaków" }),
    confirmPassword: zod.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Hasła muszą być takie same",
    path: ["confirmPassword"],
});

export type LoginFormData = zod.infer<typeof loginSchema>;
export type RegisterFormData = zod.infer<typeof registerSchema>;
