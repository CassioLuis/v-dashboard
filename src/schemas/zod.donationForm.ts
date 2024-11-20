import * as zod from 'zod'
import { cpf } from 'cpf-cnpj-validator'

export const donationSchema = zod.object({
  paymentMethod: zod.string().nonempty('Escolha um método.').transform(value => value.toLowerCase()).default(''),
  firstName: zod.string().nonempty('Digite o nome.').default(''),
  lastName: zod.string().nonempty('Digite o sobrenome.').default(''),
  cpf: zod
    .string()
    .nonempty('Digite um CPF válido (1).')
    .transform(value => value.replace(/[^\d]/g, ''))
    .refine(cpf.isValid, {
      message: 'Digite um CPF Válido (2).',
      path: ['cpf'],
    })
    .default(''),
  email: zod.string().nonempty('Digite o email.').email({ message: 'Digite um email válido.' }).toLowerCase().default(''),
  transactionAmount: zod
    .number({
      required_error: 'Digite o valor.',
      invalid_type_error: 'Digite o valor.',
    })
    .int()
    .min(10, { message: 'O Valor mínimo é de R$ 10,00' }),
})
