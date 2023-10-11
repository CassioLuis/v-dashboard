<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../service/auth.service.js'

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
      recoverStatus.mailSended = false
      recoverStatus.error = true
    }
    else {
      recoverStatus.mailSended = true
      recoverStatus.error = false
    }
  }
  catch (error) {
    recoverStatus.error = true
    console.log(error)
  }
}

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
        <label class="block">
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
