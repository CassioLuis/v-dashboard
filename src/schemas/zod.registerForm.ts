import * as zod from 'zod'
import User from '../service/register.service.js'

interface ZodObject {
  name: string
  email: string
}

async function getByLogin (data: ZodObject) {
  const response = await User.getByLogin(data.name)
  if (response.length) return false
  return true
}

async function getByEmail (data: ZodObject) {
  const response = await User.getByEmail(data.email)
  if (response.length) return false
  return true
}

export const zodSchema = zod.object({
  trueName: zod.string().nonempty('Digite o nome.').min(6, { message: 'O nome deve ter no mínimo 6 caracteres.' }),
  name: zod.string().nonempty('Digite o login.').min(4, { message: 'O login deve ter no mínimo 4 caracteres.' }),
  email: zod.string().nonempty('Digite o email.').email({ message: 'Digite um email válido.' }),
  password: zod.string().nonempty('Digite a senha.').min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
  passwordConfirm: zod.string().nonempty('Digite a confirmação da senha.'),
  terms: zod.boolean()
})
  .refine(data => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser iguais.',
    path: ['passwordConfirm']
  })
  .refine(data => data.terms === true, {
    message: 'Você deve concordar com os termos e condições.',
    path: ['terms']
  })
  .refine(getByLogin, {
    message: 'Login em uso.',
    path: ['name']
  })
  .refine(getByEmail, {
    message: 'E-mail em uso.',
    path: ['email']
  })