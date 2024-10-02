<script setup lang="ts">
import { reactive } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useForm } from 'vee-validate'
import { Loader2 } from 'lucide-vue-next'
import User from '@/service/register.service.js'
import { zodSchema } from '@/schemas/zod.registerform'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const router = useRouter()

interface UserValues {
  name: string
  email: string
  password: string
  passwordConfirm: string
  terms: boolean
}

interface Register {
  error: boolean
  success: boolean
}

const validationSchema = toTypedSchema(zodSchema)
const { handleSubmit, isSubmitting, meta } = useForm({ validationSchema })

const register = handleSubmit(onValidForm)

const registerStatus = reactive<Register>({
  error: false,
  success: false,
})

async function onValidForm(values: UserValues, { resetForm }: any) {
  const response: any = await User.add(values)
  if (response.status === 200) {
    registerStatus.success = true
    resetForm()
    return
  }
  registerStatus.error = true
}

function resetRegisterStatus() {
  registerStatus.error = false
  registerStatus.success = false
}
</script>

<template>
  <div
    class="grid grid-cols-12 gap-y-4 col-span-12"
    @submit.prevent="register"
  >
    <h1 class="col-span-12 text-center self-end text-2xl font-semibold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
      Registrar
    </h1>

    <div v-if="registerStatus.error" class="col-span-12">
      <Alert variant="destructive">
        <AlertTitle class="font-semibold">
          Erro!
        </AlertTitle>
        <AlertDescription>
          Cadastro não efetuado.
        </AlertDescription>
      </Alert>
      <a class="mt-4 text-center link" href="#" @click.prevent="resetRegisterStatus">Voltar para registro</a>
    </div>

    <div v-else-if="!registerStatus.error && registerStatus.success" class="col-span-12">
      <Alert variant="success">
        <AlertTitle class="font-semibold">
          Sucesso!
        </AlertTitle>
        <AlertDescription>
          Cadastro efetuado.
        </AlertDescription>
      </Alert>
      <a class="mt-4 text-center link" href="#" @click.prevent="router.push('/login')">Acessar Conta</a>
    </div>

    <form v-else class="col-span-12 flex flex-col !gap-9" @submit="register">
      <FormField v-slot="{ componentField }" name="trueName">
        <FormItem class="flex flex-col col-span-12 relative">
          <!-- <FormLabel class="!font-semibold">
            Nome
          </FormLabel> -->
          <FormControl>
            <Input type="text" v-bind="componentField" placeholder="Nome Pessoal" class="placeholder:text-gray-300" />
          </FormControl>
          <FormMessage class="text-xs absolute -bottom-5" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="name">
        <FormItem class="flex flex-col col-span-12 relative">
          <!-- <FormLabel class="!font-semibold">
            Login no jogo
          </FormLabel> -->
          <FormControl>
            <Input type="text" v-bind="componentField" placeholder="Login no Jogo" class="placeholder:text-gray-300" />
          </FormControl>
          <FormMessage class="text-xs absolute -bottom-5" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="email">
        <FormItem class="flex flex-col col-span-12 relative">
          <!-- <FormLabel>Email</FormLabel> -->
          <FormControl>
            <Input type="text" v-bind="componentField" placeholder="E-mail" class="placeholder:text-gray-300" />
          </FormControl>
          <FormMessage class="text-xs absolute -bottom-5" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="password">
        <FormItem class="flex flex-col col-span-12 relative">
          <!-- <FormLabel>Senha</FormLabel> -->
          <FormControl>
            <Input type="password" v-bind="componentField" placeholder="Senha" class="placeholder:text-gray-300" />
          </FormControl>
          <FormMessage class="text-xs absolute -bottom-5" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ componentField }" name="passwordConfirm">
        <FormItem class="flex flex-col col-span-12 relative">
          <!-- <FormLabel>Confirme a senha</FormLabel> -->
          <FormControl>
            <Input type="password" v-bind="componentField" placeholder="Confirmar Senha" class="placeholder:text-gray-300" />
          </FormControl>
          <FormMessage class="text-xs absolute -bottom-5" />
        </FormItem>
      </FormField>

      <FormField v-slot="{ value, handleChange }" name="terms">
        <FormItem class="relative col-span-6 flex flex-col gap-2 items-start gap-x-3 space-y-0 rounded-md">
          <FormControl class="flex flex-row w-full">
            <div class="flex flex-row items-center gap-2">
              <Checkbox :checked="value" @update:checked="handleChange" />
              <FormLabel class="w-full cursor-pointer font-semibold">
                Eu li e concordo com os Termos de Uso
              </FormLabel>
            </div>
          </FormControl>
          <div>
            <FormMessage class="text-xs absolute -bottom-3" />
          </div>
        </FormItem>
      </FormField>

      <div class="col-span-12">
        <Button
          type="submit"
          class="w-full"
          :class="{ 'btn-disabled cursor-default': isSubmitting || !meta.valid, 'btn': meta.valid && !isSubmitting }"
          :disabled="isSubmitting || !meta.valid "
        >
          <Loader2 v-if="isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
          <span v-else>Registrar</span>
        </Button>

        <div class="mt-2 center flex items-center justify-center text-white">
          Já possui uma conta?
          <a class="block text-center ml-1 link" href="#" @click.prevent="router.push('/login')">Acessar Conta</a>
        </div>
      </div>
    </form>
  </div>
</template>
