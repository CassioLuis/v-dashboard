<!-- eslint-disable no-alert -->
<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { zodSchema } from '../schemas/zod.changePass'
import User from '../service/register.service'
import { useAppStore } from '../stores/application'

const router = useRouter()

const auth = useAppStore()
const { setForgotPassTokenInvalid } = auth
const { getForgotToken } = storeToRefs(auth)

interface UserValues {
  password: string
  passwordConfirm: string
}

interface Recover {
  email: string
  error: boolean
  mailSended: boolean
}

const validationSchema = toTypedSchema(zodSchema)
const { handleSubmit, isSubmitting, errors, meta } = useForm({ validationSchema })

const { value: password } = useField<string>('password')
const { value: passwordConfirm } = useField<string>('passwordConfirm')

const recover = handleSubmit(onValidePass)

async function onValidePass(values: UserValues, { resetForm }: any) {
  const response: any = await User.changePass(getForgotToken.value, values.password)
  if (response.status !== 200) {
    setForgotPassTokenInvalid(true)
    resetForm()
    router.push('/recuperacao')
  }
  if (response.status === 200)
    resetForm()
}

const recoverStatus = reactive<Recover>({
  email: '',
  error: false,
  mailSended: false,
})

function resetRecoverStatus() {
  recoverStatus.error = false
  recoverStatus.mailSended = false
}
</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36">
      </div>

      <div v-if="recoverStatus.error">
        <div class="mt-8 w-full solid-alert-danger">
          <span class="font-bold">Erro!</span> e-mail inválido!
        </div>
        <a class="mt-4 text-center link" href="#" @click.prevent="resetRecoverStatus">Voltar para recuperação</a>
      </div>

      <div v-else-if="!recoverStatus.error && recoverStatus.mailSended">
        <div class="solid-alert-success mt-4 w-full">
          <span class="font-bold">Sucesso!</span> e-mail enviado para sua caixa de entrada.
        </div>
        <a class="mt-4 text-center link" href="#" @click.prevent="router.push('/')">Acessar Conta</a>
      </div>

      <form v-else class="mt-4" @submit.prevent="recover">
        <div>
          <h1 class="text-xl mt-4 text-white font-semibold">
            Esquece a senha?
          </h1>
          <p class="text-zinc-100 mt-2 mb-4 text-sm">
            Não se preocupe! Basta digitar seu e-mail e enviaremos as instruções para redefinir sua senha!
          </p>
        </div>
        <label class="block mt-3">
          <span class="label">Nova Senha</span>
          <input v-model="password" type="password" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.password }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Confirmar Senha</span>
          <input v-model="passwordConfirm" type="password" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.passwordConfirm }}</span>
        </label>

        <div class="mt-6">
          <button
            type="submit" :disabled="isSubmitting || !meta.valid"
            :class="{ 'btn-disabled': isSubmitting || !meta.valid, 'btn': meta.valid && !isSubmitting }"
          >
            <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
            <span v-else>Enviar</span>
          </button>

          <div class="mt-2 flex items-center justify-center mx-2 label">
            Já tem uma conta?
            <a class="link ml-2" href="#" @click.prevent="router.push('/')">Acessar Conta</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
