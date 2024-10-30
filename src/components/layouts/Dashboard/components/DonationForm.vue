<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { donationSchema } from '@/schemas/zod.donationForm'
import PaymentsService from '@/service/payments.service'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
import { Alert, AlertDescription } from '@/components/ui/alert'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useAppStore } from '@/stores/application'

const userSession = useAppStore()
const { setPaymentsHistory } = userSession

const validationSchema = toTypedSchema(donationSchema)
const { handleSubmit, isSubmitting, meta } = useForm({ validationSchema })

const createDonation = handleSubmit(onValidForm, onInvalidForm)

function onInvalidForm(invalid: any) {
  return toast({
    title: 'Você enviou os seguintes valores:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(invalid, null, 2))),
  })
}

async function onValidForm(values: any, { resetForm }: any) {
  try {
    await PaymentsService.create({
      payment_method_id: values.paymentMethod,
      transaction_amount: values.transactionAmount,
      payer: {
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        identification: {
          type: 'CPF',
          number: values.number,
        },
      },
      description: 'Doação para PW Blackstar',
      external_reference: 'MP0001',
    })
    toast({
      title: 'Pedido de doação enviado com sucesso!',
      description: 'Role até o histórico de doações e efetue o pagamento.',
      variant: 'success',
    })
    await setPaymentsHistory()
    resetForm()
  }
  catch (e: any) {
    toast({
      title: 'Erro: Tentativa de doação falhou!',
      description: `Details: ${e.response.status} - ${e.response.data.message}`,
      variant: 'error',
    })
  }
}
</script>

<template>
  <Card class="mt-8">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" class="border-none">
        <AccordionTrigger class="font-semibold p-4">
          Nova Doação
        </AccordionTrigger>
        <AccordionContent class="px-4">
          <form @submit.prevent="createDonation">
            <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
              <FormField v-slot="{ componentField }" name="firstName">
                <FormItem>
                  <FormLabel>Nome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Primeiro Nome" v-bind="componentField" />
                  </FormControl>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="lastName">
                <FormItem>
                  <FormLabel>Sobrenome</FormLabel>
                  <FormControl>
                    <Input type="text" placeholder="Segundo Nome" v-bind="componentField" />
                  </FormControl>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="number">
                <FormItem>
                  <FormLabel>CPF</FormLabel>
                  <FormControl>
                    <Input v-mask="['###.###.###-##']" type="text" placeholder="000.000.000-00" v-bind="componentField" />
                  </FormControl>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="email">
                <FormItem>
                  <FormLabel>E-mail</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="exemplo@email.com" v-bind="componentField" />
                  </FormControl>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="paymentMethod">
                <FormItem>
                  <FormLabel>Método</FormLabel>
                  <Select v-bind="componentField">
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Selecione o método" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="pix">
                          Pix
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>

              <FormField v-slot="{ componentField }" name="transactionAmount">
                <FormItem>
                  <FormLabel>Valor</FormLabel>
                  <FormControl>
                    <Input type="number" placeholder="R$ 0,00" v-bind="componentField" />
                  </FormControl>
                  <FormMessage class="text-xs" />
                </FormItem>
              </FormField>
            </div>
            <Separator class="my-6" />
            <Alert class="flex items-center gap-4" variant="destructive">
              <div class="flex-shrink-0">
                <img src="/gold-ingot-chinese.png" class="w-10 h-10">
              </div>
              <div class="w-full">
                <AlertDescription class="flex flex-col items-center">
                  <div class="w-full text-lg">
                    <del>
                      A Cada<span class="font-semibold">&nbsp;R$ 1,00&nbsp;</span>Você receberá<span class="font-semibold">&nbsp;<del>1.000</del>&nbsp;Golds.</span>
                    </del>
                  </div>
                  <div class="w-full text-lg text-green-500">
                    Cash em <span class="font-semibold">DOBRO</span> até 05/11/2024 às 23:59:00 horas. A Cada<span class="font-semibold">&nbsp;R$ 1,00&nbsp;</span>Você receberá<span class="font-semibold">&nbsp;2.000 Golds.</span>
                  </div>
                </AlertDescription>
              </div>
            </Alert>
            <Button
              variant="default"
              type="submit" :disabled="isSubmitting || !meta.valid"
              class="w-full mt-4"
            >
              <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
              <span v-else>Enviar Donate</span>
            </Button>
          </form>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Card>
</template>
