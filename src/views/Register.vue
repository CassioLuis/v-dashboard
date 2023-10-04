<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { ref } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import User from '../service/register.service.js'
import { zodSchema } from '../schemas/zod.registerform'
import Notify from '../components/Notify.vue'

const router = useRouter()

interface UserValues {
  name: string;
  email: string;
  password: string;
  passwordConfirm: string;
  terms: boolean;
}

const validationSchema = toTypedSchema(zodSchema)
const { handleSubmit, isSubmitting, errors, meta } = useForm({ validationSchema })

const { value: trueName } = useField('trueName')
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')
const { value: passwordConfirm } = useField('passwordConfirm')
const { value: terms } = useField('terms')

const register = handleSubmit(onValidForm)

const success = ref<Boolean>(false)

async function onValidForm (values: UserValues, { resetForm }: any) {
  const response: any = await User.add(values)
  if (response.status === 200) {
    success.value = true
    resetForm()
  }
  if (response.status === 400) console.log('usuario ja cadastrado')
}
</script>

<template>
  <div class="layout">
    <div class="flex items-center justify-center">
    </div>
    <div class="form">
      <div class="flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36">
        <!-- <span class="text-xl mt-4 text-white font-semibold">Registrar</span> -->
      </div>
      <!-- <Notify v-if="success" :emphasis-msg="email" status="Sucess" msg="Cadastro efetuado com sucesso!" class="mt-4" /> -->
      <form class="mt-4" @submit="register">
        <label class="block">
          <span class="label">Nome</span>
          <input name="trueName" v-model="trueName" type="text" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.trueName }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Login no jogo</span>
          <input name="name" v-model="name" type="text" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.name }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Email</span>
          <input name="email" v-model="email" type="email" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.email }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Senha</span>
          <input name="password" v-model="password" type="password" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.password }}</span>
        </label>

        <label class="block mt-3">
          <span class="label">Confirme a senha</span>
          <input name="passwordConfirm" v-model="passwordConfirm" type="password" class="input">
          <span class="text-red-500 font-semibold text-xs">{{ errors.passwordConfirm }}</span>
        </label>

        <div class="flex items-center justify-center mt-4">
          <div>
            <label class="inline-flex items-center ">
              <input type="checkbox" name="terms" v-model="terms" class="input-check">
              <span class="mx-2 label">Eu li e concordo com os Termos de Uso</span>
              <span class=" text-red-500 font-semibold text-xs">{{ errors.terms }}</span>
            </label>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" :disabled="isSubmitting || !meta.valid"
            :class="{ 'bg-orange-500': isSubmitting || !meta.valid, 'bg-orange-600': meta.valid && !isSubmitting }"
            class="w-full px-4 py-2 text-sm text-center text-white rounded-md focus:outline-none hover:bg-orange-500 font-semibold">
            <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
            <span v-else>Registrar</span>
          </button>
        </div>
        <div class="mt-2 center flex items-center justify-center text-white">
          Já tem uma conta?
          <a class="block text-center ml-1 link" href="#" @click.prevent="router.push('/')">Acessar Conta</a>
        </div>
      </form>
    </div>
  </div>
</template>
../schemas/zod.registerform.js