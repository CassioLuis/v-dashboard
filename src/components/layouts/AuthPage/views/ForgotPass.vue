<!-- eslint-disable no-console -->
<script setup lang="ts">
import { reactive, watch } from 'vue'
import { useRouter } from 'vue-router'
import { AlertCircle, Loader2, MailCheck } from 'lucide-vue-next'
import Auth from '@/service/auth.service'
import { useAppStore } from '@/stores/application'
import { FormControl, FormDescription, FormField, FormItem } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

const auth = useAppStore()
const { setForgotPassTokenInvalid } = auth

const router = useRouter()

interface Recover {
  email: string
  error: boolean
  mailSended: boolean
  isSubmitting: boolean
}

const recoverStatus = reactive<Recover>({
  email: '',
  error: false,
  mailSended: false,
  isSubmitting: false,
})

async function recover() {
  try {
    recoverStatus.isSubmitting = true
    const response = await Auth.forgot(recoverStatus)
    recoverStatus.isSubmitting = false
    if (!response.status || response.status !== 200) {
      setForgotPassTokenInvalid(false)
      recoverStatus.mailSended = false
      recoverStatus.error = true
    }
    else {
      setForgotPassTokenInvalid(false)
      recoverStatus.mailSended = true
      recoverStatus.error = false
    }
  }
  catch (error) {
    setForgotPassTokenInvalid(false)
    recoverStatus.error = true
    console.log(error)
  }
}

watch(recoverStatus, () => {
  setForgotPassTokenInvalid(false)
})
</script>

<template>
  <form class="col-span-12 grid grid-cols-12 gap-y-4" @submit.prevent="recover">
    <h1 class="col-span-12 self-end py-4 text-2xl font-bold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
      Esqueceu sua senha?
    </h1>
    <FormField v-if="!recoverStatus.mailSended" name="email">
      <FormItem class="col-span-12">
        <!-- <FormLabel>E-mail</FormLabel> -->
        <FormControl>
          <Input v-model="recoverStatus.email" type="email" placeholder="E-mail" class="placeholder:text-gray-200" />
        </FormControl>
        <FormDescription>
          <p class="col-span-12 text-sm">
            Basta digitar seu e-mail e enviaremos as instruções para redefinir sua senha!
          </p>
        </FormDescription>
      </FormItem>
    </FormField>

    <Alert v-else variant="success" class="col-span-12">
      <MailCheck class="w-4 h-4" />
      <AlertTitle>Menssagem enviada!</AlertTitle>
      <AlertDescription>Acesse seu o email e siga as instruções!</AlertDescription>
    </Alert>

    <Alert v-if="recoverStatus.error" variant="destructive" class="col-span-12">
      <AlertCircle class="w-4 h-4" />
      <AlertTitle>Erro! e-mail inválido!</AlertTitle>
    </Alert>

    <div class="col-span-12">
      <Button
        v-if="!recoverStatus.mailSended"
        type="submit"
        class="w-full"
        :disabled="recoverStatus.isSubmitting || !recoverStatus.email"
        :class="{ 'cursor-default': recoverStatus.isSubmitting }"
      >
        <Loader2 v-if="recoverStatus.isSubmitting" class="w-4 h-4 mr-2 animate-spin" />
        <span v-else>Enviar</span>
      </Button>

      <Button variant="link" class="mt-2 w-full" @click.prevent="router.push('/login')">
        Voltar para o login
      </Button>
    </div>
  </form>
</template>
