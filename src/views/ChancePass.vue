<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Notify from '../components/Notify.vue'

const router = useRouter()

const email = ref('')

function recover () {
  console.log('Recover!')
}

</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="flex items-center justify-center">
        <span class="title">Recuperação</span>
      </div>

      <form class="mt-4" @submit.prevent="recover">
        <label class="block">
          <span class="label">Email</span>
          <input v-model="email" type="email"
            class="input">
        </label>

        <Notify emphasisMsg="email@email.com" msg="E-mail de recuperação enviado." status="Sucess"/>

        <div class="mt-6">
          <button type="submit"
            class="btn">
            Enviar
          </button>

          <div class="mt-2 flex items-center justify-center mx-2 label">
            Já tem uma conta?
            <a class="link ml-2" href="#"
              @click.prevent="router.push('/')">Acessar Conta</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
