<script setup lang="ts">
import { reactive, ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import Cookies from 'js-cookie'
import { Loader2 } from 'lucide-vue-next'
import Auth from '@/service/auth.service'
import type { ILogin } from '@/interfaces'
import { Checkbox } from '@/components/ui/checkbox'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const router = useRouter()

const data = reactive<ILogin>({
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
    Cookies.set('token', token, { expires: 1 })
    return router.push('/inicio')
  }
  return error.value = true
}

watch(data, () => {
  error.value = false
})
</script>

<template>
  <form class="col-span-12 grid grid-cols-12 gap-y-4" @submit.prevent="signin">
    <h1 class="col-span-12 text-center py-4 self-end text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
      Logar
    </h1>
    <FormField name="login">
      <FormItem class="col-span-12">
        <FormLabel>Login</FormLabel>
        <FormControl>
          <Input type="text" placeholder="Login" />
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>

    <FormField name="password">
      <FormItem class="col-span-12">
        <FormLabel>Senha</FormLabel>
        <FormControl>
          <Input type="password" placeholder="Senha" />
        </FormControl>
        <FormMessage class="text-xs" />
      </FormItem>
    </FormField>

    <FormField name="forgotPass">
      <FormItem class="col-span-6 flex flex-row items-start gap-x-3 space-y-0 rounded-md">
        <FormControl>
          <Checkbox />
        </FormControl>
        <div class="space-y-1 leading-none">
          <FormLabel class="cursor-pointer">
            Lembrar senha
          </FormLabel>
        </div>
      </FormItem>
    </FormField>

    <Button variant="link" class="items-start justify-end col-span-6 p-0" @click.prevent="router.push('/recuperacao')">
      Esqueceu sua senha?
    </Button>

    <div class="col-span-12">
      <Button type="submit" class="w-full" :class="{ 'cursor-default': loading }" :disabled="loading">
        <Loader2 v-if="loading" class="w-4 h-4 mr-2 animate-spin" />
        <span v-else>Entrar</span>
      </Button>

      <Button variant="link" class="mt-2 w-full shadow-none" @click.prevent="router.push('/register')">
        Cadastre-se
      </Button>
    </div>
  </form>
</template>
