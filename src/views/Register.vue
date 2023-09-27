<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import User from '../service/register.service.js'
import { zodSchema } from '../schemas/zod.registerform'

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

async function onValidForm (values: UserValues) {
  await User.add(values)
  alert('dados inseridos')
}
</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <img type="image" src="/logo.png" alt="" class="h-24">
        <!-- <span class="text-2xl font-semibold text-gray-700">--------</span> -->
      </div>

      <form class="mt-4" @submit="register">
        <label class="block">
          <span class="text-sm text-gray-700">Nome</span>
          <input name="trueName" v-model="trueName" type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          <span class="text-red-500 font-semibold text-xs">{{ errors.trueName }}</span>
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Login no jogo</span>
          <input name="name" v-model="name" type="text"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          <span class="text-red-500 font-semibold text-xs">{{ errors.name }}</span>
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Email</span>
          <input name="email" v-model="email" type="email"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          <span class="text-red-500 font-semibold text-xs">{{ errors.email }}</span>
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Senha</span>
          <input name="password" v-model="password" type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          <span class="text-red-500 font-semibold text-xs">{{ errors.password }}</span>
        </label>

        <label class="block mt-3">
          <span class="text-sm text-gray-700">Confirme a senha</span>
          <input name="passwordConfirm" v-model="passwordConfirm" type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
          <span class="text-red-500 font-semibold text-xs">{{ errors.passwordConfirm }}</span>
        </label>

        <div class="flex items-center justify-center mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox" name="terms" v-model="terms"
                class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <span class="mx-2 text-sm text-gray-600">Eu li e concordo com os Termos de Uso</span>
              <span class="text-red-500 font-semibold text-xs">{{ errors.terms }}</span>
            </label>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" :disabled="isSubmitting || !meta.valid"
            :class="{ 'bg-indigo-500': isSubmitting || !meta.valid, 'bg-indigo-600': meta.valid && !isSubmitting }"
            class="w-full px-4 py-2 text-sm text-center text-white rounded-md focus:outline-none hover:bg-indigo-500">
            <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
            <span v-else>Registrar</span>
          </button>
        </div>
        <div class="mt-2 center flex items-center justify-center">
          Já tem uma conta?
          <a class="block text-center ml-1 text-indigo-700 hover:underline" href="#"
            @click.prevent="router.push('/')">Acessar Conta</a>
        </div>
      </form>
    </div>
  </div>
</template>
../schemas/zod.registerform.js