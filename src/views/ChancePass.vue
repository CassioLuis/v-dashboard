<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Notify from '../components/Notify.vue'

const router = useRouter()

const email = ref('')
const status = ref<string>('')

function recover () {
  status.value = 'Success'
  console.log('Recover!')
  console.log(status)
}
</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36">
        <span class="text-xl mt-4 text-white font-semibold">Recuperação</span>
      </div>

      <div v-if="status === 'Success'" class="mt-4">
        <Notify emphasisMsg="email@email.com" msg=" E-mail de recuperação enviado." status="Success" />
        <a class="mt-4 block text-center ml-1 link" href="#" @click.prevent="router.push('/')">Acessar Conta</a>
      </div>

      <form v-else class="mt-4" @submit.prevent="recover">
        <label class="block">
          <span class="label">Email</span>
          <input v-model="email" type="email" class="input">
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
