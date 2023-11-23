<script setup lang="ts">
import { reactive } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import User from '@/service/register.service.js'
import { zodSchema } from '@/schemas/zod.registerform'

const router = useRouter()

interface UserValues {
  name: string
  email: string
  password: string
  passwordConfirm: string
  terms: boolean
}

interface Register {
  error: boolean
  success: boolean
}

const validationSchema = toTypedSchema(zodSchema)
const { handleSubmit, isSubmitting, errors, meta } = useForm({ validationSchema })

const { value: trueName } = useField('trueName')
const { value: name } = useField('name')
const { value: email } = useField<string>('email')
const { value: password } = useField('password')
const { value: passwordConfirm } = useField('passwordConfirm')
const { value: terms } = useField('terms')

const register = handleSubmit(onValidForm)

const registerStatus = reactive<Register>({
  error: false,
  success: false,
})

async function onValidForm(values: UserValues, { resetForm }: any) {
  const response: any = await User.add(values)
  if (response.status === 200) {
    registerStatus.success = true
    resetForm()
    return
  }
  registerStatus.error = true
}

function resetRegisterStatus() {
  registerStatus.error = false
  registerStatus.success = false
}
</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36">
        <span class="text-xl mt-4 text-white font-semibold">Registrar</span>
      </div>

      <div v-if="registerStatus.error">
        <div class="mt-4 w-full solid-alert-danger">
          <span class="font-bold">Erro!</span> Cadastro não efetuado.
        </div>
        <a class="mt-4 text-center link" href="#" @click.prevent="resetRegisterStatus">Voltar para registro</a>
      </div>

      <div v-else-if="!registerStatus.error && registerStatus.success">
        <div class="solid-alert-success mt-4 w-full">
          <span class="font-bold">Sucesso!</span> Cadastro efetuado.
        </div>
        <a class="mt-4 text-center link" href="#" @click.prevent="router.push('/')">Acessar Conta</a>
      </div>

      <form v-else class="mt-4" @submit="register">
        <label class="block">
          <span class="label">Nome</span>
          <input v-model="trueName" name="trueName" type="text" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.trueName }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Login no jogo</span>
          <input v-model="name" name="name" type="text" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.name }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Email</span>
          <input v-model="email" name="email" type="email" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.email }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Senha</span>
          <input v-model="password" name="password" type="password" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.password }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Confirme a senha</span>
          <input v-model="passwordConfirm" name="passwordConfirm" type="password" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.passwordConfirm }}</span>
        </label>

        <div class="flex items-center justify-center mt-4">
          <div>
            <label class="inline-flex items-center ">
              <input v-model="terms" type="checkbox" name="terms" class="input-check">
              <span class="mx-2 label">Eu li e concordo com os Termos de Uso</span>
              <span class=" text-red-500 font-semibold text-xs">{{ errors.terms }}</span>
            </label>
          </div>
        </div>

        <div class="mt-6">
          <button
            type="submit" :disabled="isSubmitting || !meta.valid"
            :class="{ 'btn-disabled': isSubmitting || !meta.valid, 'btn': meta.valid && !isSubmitting }"
          >
            <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
            <span v-else>Registrar</span>
          </button>
        </div>
        <div class="mt-2 center flex items-center justify-center text-white">
          Já possui uma conta?
          <a class="block text-center ml-1 link" href="#" @click.prevent="router.push('/login')">Acessar Conta</a>
        </div>
      </form>
    </div>
  </div>
</template>
