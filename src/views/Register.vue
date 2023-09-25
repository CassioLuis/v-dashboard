<script setup lang="ts">
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import * as zod from 'zod'
import { useRouter } from 'vue-router'
import User from '../service/register.service.js'

const router = useRouter()


const validationSchema = toTypedSchema(
  zod.object({
    trueName:
      zod
        .string()
        .nonempty('Digite o nome.')
        .min(6, { message: 'O nome deve ter no mínimo 6 caracteres.' }),
    name: zod.string().nonempty('Digite o login.').min(4, { message: 'O login deve ter no mínimo 4 caracteres.' }),
    email: zod.string().nonempty('Digite o email.').email({ message: 'Digite um email válido.' }),
    password: zod.string().nonempty('Digite a senha.').min(6, { message: 'A senha deve ter no mínimo 6 caracteres.' }),
  })
)

const { handleSubmit, errors, isSubmitting, setFieldError, setErrors } = useForm({ validationSchema })

const { value: trueName } = useField('trueName')
const { value: name } = useField('name')
const { value: email } = useField('email')
const { value: password } = useField('password')

const register = handleSubmit(onValidForm, onInvalidForm)

async function onValidForm (values: object, { resetForm }: any) {
  const response = await User.add(values)
  const { error }: any = response
  Object.keys(error).forEach((item: string) => {
    setFieldError(item, error[item])
  })
}

function onInvalidForm ({ errors }: any) {
  const firstError = Object.keys(errors)[0];
  const el = document.querySelector(`[name="${firstError}"]`)
  el?.scrollIntoView({ behavior: 'smooth' })
  el.focus()
}

</script>

<template>
  <div class="flex items-center justify-center h-screen px-6 bg-gray-200">
    <div class="w-full max-w-sm p-6 bg-white rounded-md shadow-md">
      <div class="flex items-center justify-center">
        <!-- <svg
            class="w-10 h-10"
            viewBox="0 0 512 512"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M364.61 390.213C304.625 450.196 207.37 450.196 147.386 390.213C117.394 360.22 102.398 320.911 102.398 281.6C102.398 242.291 117.394 202.981 147.386 172.989C147.386 230.4 153.6 281.6 230.4 307.2C230.4 256 256 102.4 294.4 76.7999C320 128 334.618 142.997 364.608 172.989C394.601 202.981 409.597 242.291 409.597 281.6C409.597 320.911 394.601 360.22 364.61 390.213Z"
              fill="#4C51BF"
              stroke="#4C51BF"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
            <path
              d="M201.694 387.105C231.686 417.098 280.312 417.098 310.305 387.105C325.301 372.109 332.8 352.456 332.8 332.8C332.8 313.144 325.301 293.491 310.305 278.495C295.309 263.498 288 256 275.2 230.4C256 243.2 243.201 320 243.201 345.6C201.694 345.6 179.2 332.8 179.2 332.8C179.2 352.456 186.698 372.109 201.694 387.105Z"
              fill="white"
            />
          </svg> -->
        <img type="image" src="../../public/logo.png" alt="" style="width: 50px; height: 40px">
        <span class="text-2xl font-semibold text-gray-700">PW Blackstar</span>
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
          <input type="password"
            class="block w-full mt-1 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
        </label>

        <div class="flex items-center justify-center mt-4">
          <div>
            <label class="inline-flex items-center">
              <input type="checkbox"
                class="text-indigo-600 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500">
              <span class="mx-2 text-sm text-gray-600">Eu li e concordo com os Termos de Uso</span>
            </label>
          </div>
        </div>

        <div class="mt-6">
          <button type="submit" :disabled="isSubmitting" :class="{ 'bg-indigo-500': isSubmitting }"
            class="w-full px-4 py-2 text-sm text-center text-white bg-indigo-600 rounded-md focus:outline-none hover:bg-indigo-500">
            Registrar
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
