<script setup lang="ts">
import { reactive } from 'vue'
import { toTypedSchema } from '@vee-validate/zod'
import { useRouter } from 'vue-router'
import { useField, useForm } from 'vee-validate'
import { storeToRefs } from 'pinia'
import { CheckCheck, Loader2 } from 'lucide-vue-next'
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
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'

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
    <div v-if="!recoverStatus.recovered" class="col-span-12">
      <h1 class="col-span-12 self-end text-2xl font-semibold bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent">
        Esquece a senha?
      </h1>
      <p class="col-span-12 text-zinc-100 mt-2 mb-2 text-sm">
        Configure sua nova senha!
      </p>
    </div>
    <Alert v-if="recoverStatus.recovered" variant="success" class="col-span-12">
      <CheckCheck class="w-4 h-4" />
      <AlertTitle>Sucesso!</AlertTitle>
      <AlertDescription>Senha alterada com sucesso!</AlertDescription>
    </Alert>

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
