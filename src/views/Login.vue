<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Auth from '../service/auth.service'
import type LoginContract from '../service/interfaces/auth'
import { useAppStore } from '../stores/application'

const router = useRouter()
const session = useAppStore()
const { setToken } = session

const data = reactive<LoginContract>({
  name: '',
  password: '',
})

const error = ref(false)
const loading = ref(false)

async function signin() {
  loading.value = true
  const response = await Auth.login(data)
  loading.value = false
  const { token } = response.data
  if (response.status === 200) {
    setToken(token)
    return router.push('/dashboard')
  }
  return error.value = true
}

watch(data, () => {
  error.value = false
})
</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36">
        <span class="text-xl mt-4 text-white font-semibold">Logar</span>
      </div>

      <form class="mt-4" @submit.prevent="signin">
        <label class="block">
          <span class="label">Login</span>
          <input v-model="data.name" type="text" class="input" :disabled="loading">
        </label>

        <label class="block mt-3">
          <span class="label">Senha</span>
          <input v-model="data.password" type="password" class="input" :disabled="loading">
        </label>

        <div v-if="error" class="solid-alert-danger bg-blend-soft-light mt-4">
          Usuário inválido!
        </div>

        <div class="flex items-center justify-between mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" class="input-check">
              <span class="mx-2 label">Lembrar senha</span>
            </label>
          </div>

          <div>
            <a class="link" href="#" @click.prevent="router.push('/recuperacao')">Esqueceu sua senha?</a>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" :class="{ 'btn': !loading, 'btn-disabled': loading }" :disabled="loading">
            <font-awesome-icon v-if="loading" icon="fa-solid fa-circle-notch" spin />
            <span v-else>Entrar</span>
          </button>
          <div class="mt-2">
            <a class="link text-center" href="#" @click.prevent="router.push('/register')">Cadastre-se</a>
            <a class="link text-center" href="#" @click.prevent="router.push('/alterar-senha')">alterar-senha</a>
          </div>
        </div>
        <div class="flex justify-center mt-10 gap-4 pt-10">
          <a href="https://discord.gg/YjrRxbAJ">
            <img type="image" src="/discord.png" alt="" class="h-12 cursor-pointer">
          </a>
          <a href="https://discord.gg/YjrRxbAJ">
            <img type="image" src="/instagram.png" alt="" class="h-12">
          </a>
          <a href="https://discord.gg/YjrRxbAJ">
            <img type="image" src="/facebook.png" alt="" class="h-12">
          </a>
        </div>
      </form>
    </div>
  </div>
</template>
