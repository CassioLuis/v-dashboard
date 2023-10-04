<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const email = ref('johndoe@mail.com')
const password = ref('@#!@#asdf1231!_!@#')

function login () {
  // router.push('/dashboard')
}
</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36 absolute top-36">
        <!-- <span class="text-xl mt-4 text-white font-semibold">Logar</span> -->
      </div>

      <form class="mt-4" @submit.prevent="login">
        <label class="block">
          <span class="label">Email</span>
          <input v-model="email" type="email" class="input">
        </label>

        <label class="block mt-3">
          <span class="label">Senha</span>
          <input v-model="password" type="password" class="input">
        </label>

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
          <button type="submit" class="btn">
            Entrar
          </button>
          <div class="mt-2">
            <a class="link text-center" href="#"
              @click.prevent="router.push('/register')">Cadastre-se</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
