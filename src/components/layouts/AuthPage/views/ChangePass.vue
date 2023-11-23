<script setup lang="ts">
import { reactive } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import User from '../../../../service/register.service'
import { useAppStore } from '../../../../stores/application'
import { zodSchema } from '../../../../schemas/zod.changePass'

const router = useRouter()

const auth = useAppStore()
const { setForgotPassTokenInvalid } = auth
const { getForgotToken } = storeToRefs(auth)

interface UserValues {
  password: string
  passwordConfirm: string
}

interface Recover {
  recovered: boolean
}

const validationSchema = toTypedSchema(zodSchema)
const { handleSubmit, isSubmitting, errors, meta } = useForm({ validationSchema })

const { value: password } = useField<string>('password')
const { value: passwordConfirm } = useField<string>('passwordConfirm')

const recover = handleSubmit(onValidePass)

const recoverStatus = reactive<Recover>({
  recovered: false,
})

async function onValidePass(values: UserValues, { resetForm }: any) {
  const response: any = await User.changePass(getForgotToken.value, values.password)
  if (response.status !== 200) {
    setForgotPassTokenInvalid(true)
    resetForm()
    router.push('/recuperacao')
  }
  if (response.status === 200) {
    resetForm()
    recoverStatus.recovered = true
  }
}
</script>

<template>
  <div class="layout">
    <div class="form">
      <div class="mb-4 flex flex-col items-center justify-center">
        <img type="image" src="/logo-2.png" alt="" class="h-36">
      </div>

      <div v-if="recoverStatus.recovered" class="hs-removing:translate-x-5 hs-removing:opacity-0 transition duration-300 bg-teal-50 border border-teal-200 rounded-md p-4" role="alert">
        <div class="flex">
          <div class="flex-shrink-0">
            <svg class="h-4 w-4 text-teal-400 mt-0.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          </div>
          <div class="ml-3">
            <div class="text-sm text-teal-800 font-normal">
              Senha alterada com sucesso!
              <a class="block text-black font-semibold hover:underline" href="#" @click.prevent="router.push('/login')">Ir para o login.</a>
            </div>
          </div>
        </div>
      </div>

      <form v-else class="mt-4" @submit.prevent="recover">
        <div>
          <h1 class="text-xl mt-4 text-white font-semibold">
            Esquece a senha?
          </h1>
          <p class="text-zinc-100 mt-2 mb-4 text-sm">
            Configure sua nova senha!
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
            <a class="link ml-2" href="#" @click.prevent="router.push('/')">Voltar para o login</a>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
