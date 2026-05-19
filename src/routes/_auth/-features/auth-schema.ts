import z from "zod";

export const formRegisterSchema = z.object({
   name: z
    .string()
    .min(3, 'Min. 3 caracter')
    .max(30, 'Max. 30 caracter')
    .trim()
    .transform((value) => value[0].toUpperCase() + value.substring(1)),
  email: z
    .string()
    .email('E-mail inválido')
    .nonempty('E-mail é obrigatório')
    .trim(),
  password: z
    .string()
    .min(8, 'Senha min. com 8 caracter')
    .max(20, 'Senha max. com 20 carater')
    .nonempty('Senha é obrigatória')
    .trim(),
})

export type FormRegisterData = z.infer<typeof formRegisterSchema>;

export const formLoginSchema = z.object({
  email: z
    .string()
    .email('E-mail inválido')
    .nonempty('E-mail é obrigatório')
    .trim(),
  password: z
    .string()
    .min(8, 'Senha min. com 8 caracter')
    .max(20, 'Senha max. com 20 carater')
    .nonempty('Senha é obrigatória')
    .trim(),
})

export type FormLoginData = z.infer<typeof formLoginSchema>;
