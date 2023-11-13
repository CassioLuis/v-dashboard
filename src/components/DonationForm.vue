<script setup lang="ts">
import { h } from 'vue'
import { useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { donationSchema } from '../schemas/zod.donationForm'
import PaymentsService from '../service/payments.service'
import { Card } from './ui/card'
import { Button } from './ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { Input } from '@/components/ui/input'
import { toast } from '@/components/ui/toast'
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

const validationSchema = toTypedSchema(donationSchema)
const { handleSubmit, isSubmitting, meta } = useForm({ validationSchema })

const createDonation = handleSubmit(onValidForm, onInvalidForm)

function onInvalidForm(invalid: any) {
  return toast({
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(invalid, null, 2))),
  })
}

async function onValidForm(values: any, { resetForm }: any) {
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
    title: 'You submitted the following values:',
    description: h('pre', { class: 'mt-2 w-[340px] rounded-md bg-slate-950 p-4' }, h('code', { class: 'text-white' }, JSON.stringify(values, null, 2))),
  })
  resetForm()
}
</script>

<template>
  <Card class="mt-8">
    <Accordion type="single" collapsible>
      <AccordionItem value="item-1" class="border-none">
        <AccordionTrigger class="font-semibold p-4">
          Nova Doação
        </AccordionTrigger>
        <AccordionContent class="p-4">
          <div class="w-full transition-[height] duration-300">
            <form @submit.prevent="createDonation">
              <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                <FormField v-slot="{ componentField }" name="firstName">
                  <FormItem>
                    <FormLabel>Nome</FormLabel>
                    <FormControl>
                      <Input type="text" v-bind="componentField" />
                    </FormControl>
                    <FormMessage class="text-xs" />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="lastName">
                  <FormItem>
                    <FormLabel>Sobrenome</FormLabel>
                    <FormControl>
                      <Input type="text" v-bind="componentField" />
                    </FormControl>
                    <FormMessage class="text-xs" />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="number">
                  <FormItem>
                    <FormLabel>CPF</FormLabel>
                    <FormControl>
                      <Input v-mask="['###.###.###-##']" type="text" v-bind="componentField" />
                    </FormControl>
                    <FormMessage class="text-xs" />
                  </FormItem>
                </FormField>

                <FormField v-slot="{ componentField }" name="email">
                  <FormItem>
                    <FormLabel>E-mail</FormLabel>
                    <FormControl>
                      <Input type="email" v-bind="componentField" />
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
                            pix
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
                      <Input type="number" v-bind="componentField" />
                    </FormControl>
                    <FormMessage class="text-xs" />
                  </FormItem>
                </FormField>
              </div>
              <div class="bg-orange-50 border border-orange-200 rounded-md p-4 mt-12" role="alert">
                <div class="flex items-center">
                  <div class="flex-shrink-0">
                    <img src="/gold-ingot-chinese.png" class="w-10 h-10">
                  </div>
                  <div class="flex-1 items-center md:flex md:justify-between ml-4">
                    <p class="flex items-center text-md text-orange-700">
                      A Cada<span class="flex font-semibold">&nbsp;R$ 1,00&nbsp;</span>Você receberá<span class="flex font-semibold">&nbsp;1.000 Golds.</span>
                    </p>
                  </div>
                </div>
              </div>
              <div class="flex justify-end mt-4 gap-2">
                <Button
                  variant="secondary"
                  type="submit" :disabled="isSubmitting || !meta.valid"
                  :class="{ 'btn-success-disabled': isSubmitting || !meta.valid, 'btn-success': meta.valid && !isSubmitting }"
                >
                  <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
                  <span v-else>Enviar Donate</span>
                </Button>
              </div>
            </form>
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  </Card>
</template>
