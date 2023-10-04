import * as zod from 'zod'
import User from '../service/register.service.js'

interface ZodObject {
  name: string
  email: string
}

let login = {
  name: '',
  erro: false
}

let email = {
  name: '',
  erro: false
}

async function getByLogin (data: ZodObject) {
  if (login.name && login.name === data.name && !login.erro) return true
  if (login.name && login.name === data.name) return false // funciona sem essa linha, mas com ela evita uma execução desnecessaria
  login.name = data.name
  const response = await User.getByLogin(data.name)
  if (response) {
    login.erro = true
    return false
  }
  login.erro = false
  return true
}

const nameRefine = {
  message: 'Login em uso.',
  path: ['name']
}

async function getByEmail (data: ZodObject) {
  if (email.name && email.name === data.email && !email.erro) return true
  if (email.name && email.name === data.email) return false
  email.name = data.email
  const response = await User.getByEmail(data.email)
  if (response) {
    email.erro = true
    return false
  }
  email.erro = false
  return true
}

const emailRefine = {
  message: 'E-mail em uso.',
  path: ['email']
}

export const zodSchema = zod.object({
  trueName: zod.string().nonempty('Digite o nome.').min(6, { message: 'O nome deve ter no mínimo 6 caracteres.' }),
  name: zod.string().nonempty('Digite o login.').min(4, { message: 'O login deve ter no mínimo 4 caracteres.' }),
  email: zod.string().nonempty('Digite o email.').email({ message: 'Digite um email válido.' }),
  password: zod.string().nonempty('Digite a senha.').min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
  passwordConfirm: zod.string().nonempty('Digite a confirmação da senha.'),
  terms: zod.boolean(),
  isValid: zod.boolean().default(false)
})
  .refine(data => data.password === data.passwordConfirm, {
    message: 'As senhas devem ser iguais.',
    path: ['passwordConfirm']
  })
  .refine(data => data.terms === true, {
    message: 'Você deve concordar com os termos e condições.',
    path: ['terms']
  })
  .refine(getByLogin, nameRefine)
  .refine(getByEmail, emailRefine)