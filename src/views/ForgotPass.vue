<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import Auth from '../service/auth.service.js'
import { useAppStore } from '../stores/application'

const auth = useAppStore()
const { setForgotPassTokenInvalid } = auth
const { getForgotPassTokenInvalid } = storeToRefs(auth)

const router = useRouter()

interface Recover {
  email: string
  error: boolean
  mailSended: boolean
}

const recoverStatus = reactive<Recover>({
  email: '',
  error: false,
  mailSended: false,
})

async function recover() {
  try {
    const response = await Auth.forgot(recoverStatus)
    if (!response.status || response.status !== 200) {
      setForgotPassTokenInvalid(false)
      recoverStatus.mailSended = false
      recoverStatus.error = true
    }
    else {
      setForgotPassTokenInvalid(false)
      recoverStatus.mailSended = true
      recoverStatus.error = false
    }
  }
  catch (error) {
    setForgotPassTokenInvalid(false)
    recoverStatus.error = true
    console.log(error)
  }
}

watch(recoverStatus, () => {
  setForgotPassTokenInvalid(false)
})

// function resetRecoverStatus() {
//   recoverStatus.error = false
//   recoverStatus.mailSended = false
// }
</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36">
      </div>

      <div v-if="!recoverStatus.error && recoverStatus.mailSended">
        <div class="solid-alert-success mt-4 w-full">
          <span class="font-bold">Sucesso!</span> foi enviado uma menssagem para seu endereço de e-mail!
        </div>
        <a class="mt-4 text-center link" href="#" @click.prevent="router.push('/')">Acessar Conta</a>
      </div>

      <form v-else class="mt-4" @submit.prevent="recover">
        <div>
          <h1 class="text-xl mt-4 text-white font-semibold">
            Esquece a senha?
          </h1>
          <p class="text-zinc-100 mt-2 text-sm">
            Não se preocupe! Basta digitar seu e-mail e enviaremos as instruções para redefinir sua senha!
          </p>
        </div>

        <div
          v-if="getForgotPassTokenInvalid" class="mt-2 bg-yellow-50 border border-yellow-200 rounded-md p-4"
          role="alert"
        >
          <div class="flex">
            <div class="flex-shrink-0">
              <svg
                class="h-4 w-4 text-yellow-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                fill="currentColor" viewBox="0 0 16 16"
              >
                <path
                  d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"
                />
              </svg>
            </div>
            <div class="ml-4">
              <h3 class="text-sm text-yellow-800 font-semibold">
                Atenção !
              </h3>
              <div class="mt-1 text-sm text-yellow-700">
                Token inválido ou expirado!
                Faça uma nova solicitação.
              </div>
            </div>
          </div>
        </div>

        <div v-if="recoverStatus.error">
          <div class="mt-8 w-full solid-alert-danger">
            <span class="font-bold">Erro!</span> e-mail inválido!
          </div>
        </div>

        <label class="block mt-4">
          <span class="label">Email</span>
          <input v-model="recoverStatus.email" type="email" class="input">
        </label>

        <div class="mt-6">
          <button type="submit" class="btn">
            Enviar
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
