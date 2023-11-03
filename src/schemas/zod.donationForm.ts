import * as zod from 'zod'

interface ZodObject {
  paymentMethod: string
  firstName: string
  lastName: string
  email: string
  number: string
  transactionAmount: number
}

function validCpf(data: ZodObject): any {
  // Remove todos os caracteres não numéricos do CPF
  if (!data.number)
    return false

  const numerosCPF = data.number.replace(/[^\d]/g, '')

  // Verifica se o CPF tem 11 dígitos
  if (numerosCPF.length !== 11)
    return false

  // Verifica se todos os dígitos são iguais (caso contrário, o CPF é inválido)
  if (/^(\d)\1+$/.test(numerosCPF))
    return false

  // Calcula o primeiro dígito verificador
  let soma = 0
  for (let i = 0; i < 9; i++)
    soma += Number.parseInt(numerosCPF[i]) * (10 - i)

  const digito1 = (soma * 10) % 11

  // Calcula o segundo dígito verificador
  soma = 0
  for (let i = 0; i < 10; i++)
    soma += Number.parseInt(numerosCPF[i]) * (11 - i)

  const digito2 = (soma * 10) % 11

  // Verifica se os dígitos verificadores são iguais aos dígitos do CPF
  return digito1 === Number.parseInt(numerosCPF[9]) && digito2 === Number.parseInt(numerosCPF[10])
}

export const donationSchema = zod.object({
  paymentMethod: zod.string().nonempty('Escolha um método.').transform(value => value.toLowerCase()).default(''),
  firstName: zod.string().nonempty('Digite o nome.').default(''),
  lastName: zod.string().nonempty('Digite o sobrenome.').default(''),
  email: zod.string().nonempty('Digite o email.').email({ message: 'Digite um email válido.' }).toLowerCase().default(''),
  number: zod
    .string()
    .nonempty('Digite um CPF válido (1).')
    .transform(value => value.replace(/[^\d]/g, ''))
    .refine(value => value.length === 11, {
      message: 'Digite um CPF válido (2).',
    })
    .default(''),
  transactionAmount: zod
    .number({
      required_error: 'Digite o valor.',
      invalid_type_error: 'Digite o valor.',
    })
    .int()
    .min(10, { message: 'O Valor mínimo é de R$ 10,00' }),
})
  .refine(validCpf, {
    message: 'Digite um CPF Válido (3).',
    path: ['number'],
  })
