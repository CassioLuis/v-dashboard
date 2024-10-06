<script setup lang="ts">
import { reactive } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { Loader2 } from 'lucide-vue-next'
import User from '../../../../service/register.service'
import { useAppStore } from '../../../../stores/application'
import { zodSchema } from '../../../../schemas/zod.changePass'
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

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
const { handleSubmit, isSubmitting, meta } = useForm({ validationSchema })

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
  <div class="col-span-12 grid grid-cols-12 gap-y-4">
    <div class="col-span-12">
      <h1 class="col-span-12 self-end text-2xl font-semibold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
        Esquece a senha?
      </h1>
      <p class="col-span-12 text-zinc-100 mt-2 mb-2 text-sm">
        Configure sua nova senha!
      </p>
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

    <form v-else class="col-span-12 grid grid-cols-12 gap-y-9" @submit.prevent="recover">
      <FormField name="password">
        <FormItem class="col-span-12 relative">
          <FormControl>
            <Input v-model="password" type="password" placeholder="Nova Senha" class="placeholder:text-gray-200" />
          </FormControl>
          <FormMessage class="text-xs absolute -bottom-5" />
        </FormItem>
      </FormField>

      <FormField name="passwordConfirm">
        <FormItem class="col-span-12 relative">
          <FormControl>
            <Input v-model="passwordConfirm" type="password" placeholder="Confirme a Nova Senha" class="placeholder:text-gray-200" />
          </FormControl>
          <FormMessage class="text-xs absolute -bottom-5" />
        </FormItem>
      </FormField>

      <div class="col-span-12">
        <Button
          type="submit" :disabled="isSubmitting || !meta.valid"
          :class="{ 'btn-disabled': isSubmitting || !meta.valid, 'btn': meta.valid && !isSubmitting }"
        >
          <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Enviar</span>
        </Button>

        <Button variant="link" class="mt-2 w-full shadow-none" @click.prevent="router.push('/login')">
          Voltar para o login
        </Button>
      </div>
    </form>
  </div>
</template>
