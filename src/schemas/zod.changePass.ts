import * as zod from 'zod'

export const zodSchema = zod.object({
  password: zod.string().nonempty('Digite a senha.').min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }).default(''),
  passwordConfirm: zod.string().nonempty('Digite a confirmação da senha.').default(''),
})
  .refine(data => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser iguais.',
    path: ['passwordConfirm'],
  })
