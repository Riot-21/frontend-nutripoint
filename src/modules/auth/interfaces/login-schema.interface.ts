import { z } from 'zod'

export const loginSchema = z.object({
    email: z.email('Correo inválido').nonempty('El correo es requerido'),
    password: z.string().nonempty('La contraseña es requerida').min(8, 'La contraseña debe tener al menos 8 caracteres')
})

export type LoginForm = z.infer<typeof loginSchema>   