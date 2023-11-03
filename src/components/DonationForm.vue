<script setup lang="ts">
import { ref } from 'vue'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { donationSchema } from '../schemas/zod.donationForm'
import PaymentsService from '../service/payments.service'

const validationSchema = toTypedSchema(donationSchema)
const { handleSubmit, isSubmitting, errors, meta } = useForm({ validationSchema })

const { value: paymentMethod } = useField('paymentMethod')
const { value: firstName } = useField('firstName')
const { value: lastName } = useField('lastName')
const { value: email } = useField('email')
const { value: number } = useField('number')
const { value: transactionAmount } = useField('transactionAmount')

const createDonation = handleSubmit(onValidForm)

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
  resetForm()
}

const qrCode = ref('')

const toggle = ref(false)
</script>

<template>
  <div class="mt-8">
    <img v-if="qrCode" width="200" height="200" :src="`data:image/jpeg;base64,${qrCode}`">
    <div class="mt-4">
      <div class="p-6 bg-white rounded-md shadow-sm">
        <div class="hs-accordion-group">
          <div id="hs-basic-with-arrow-heading-one" class="hs-accordion">
            <button
              class="hs-accordion-toggle hs-accordion-active:text-blue-600 group py-3 inline-flex items-center gap-x-3 w-full font-semibold text-left text-black transition hover:text-gray-400"
              aria-controls="hs-basic-with-arrow-collapse-one" @click="toggle = !toggle"
            >
              <svg
                class="hs-accordion-active:hidden hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 block w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 5L8.16086 10.6869C8.35239 10.8637 8.64761 10.8637 8.83914 10.6869L15 5"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round"
                />
              </svg>
              <svg
                class="hs-accordion-active:block hs-accordion-active:text-blue-600 hs-accordion-active:group-hover:text-blue-600 hidden w-3 h-3 text-gray-600 group-hover:text-gray-500 dark:text-gray-400"
                width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 11L8.16086 5.31305C8.35239 5.13625 8.64761 5.13625 8.83914 5.31305L15 11"
                  stroke="currentColor" stroke-width="2" stroke-linecap="round"
                />
              </svg>
              <h2 class="text-lg font-semibold text-gray-700 capitalize">
                Nova doação
              </h2>
            </button>
            <div
              id="hs-basic-with-arrow-collapse-one" :class="{ 'block': toggle, 'h-0': !toggle }"
              class="hs-accordion-content w-full overflow-hidden transition-[height] duration-300"
              aria-labelledby="hs-basic-with-arrow-heading-one"
            >
              <form @submit.prevent="createDonation">
                <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                  <div>
                    <label class="text-gray-700" for="username">Name</label>
                    <input
                      v-model="firstName"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                      type="text"
                    >
                    <span class="text-red-500 font-semibold text-xs">{{ errors.firstName }}</span>
                  </div>
                  <div>
                    <label class="text-gray-700" for="username">Sobrenome</label>
                    <input
                      v-model="lastName"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                      type="text"
                    >
                    <span class="text-red-500 font-semibold text-xs">{{ errors.lastName }}</span>
                  </div>
                  <div>
                    <label class="text-gray-700" for="password">CPF</label>
                    <input
                      v-model="number"
                      v-mask="['###.###.###-##']"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                      type="text"
                    >
                    <span class="text-red-500 font-semibold text-xs">{{ errors.number }}</span>
                  </div>
                  <div>
                    <label class="text-gray-700" for="emailAddress">Email</label>
                    <input
                      v-model="email"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                      type="email"
                    >
                    <span class="text-red-500 font-semibold text-xs">{{ errors.email }}</span>
                  </div>
                  <div>
                    <label class="text-gray-700" for="passwordConfirmation">Método</label>
                    <select
                      v-model="paymentMethod"
                      class="cursor-pointer w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                    >
                      <option v-for="(option, idx) in ['Pix']" :key="idx" class="h-16 cursor-pointer">
                        {{ option }}
                      </option>
                    </select>
                    <span class="text-red-500 font-semibold text-xs">{{ errors.paymentMethod }}</span>
                  </div>
                  <div>
                    <label class="text-gray-700" for="username">Valor</label>
                    <input
                      v-model="transactionAmount"
                      class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                      type="number"
                    >
                    <span class="text-red-500 font-semibold text-xs">{{ errors.transactionAmount }}</span>
                  </div>
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
                  <button
                    type="submit" :disabled="isSubmitting || !meta.valid"
                    class="h-12"
                    :class="{ 'btn-success-disabled': isSubmitting || !meta.valid, 'btn-success': meta.valid && !isSubmitting }"
                  >
                    <font-awesome-icon v-if="isSubmitting" icon="fa-solid fa-circle-notch" spin />
                    <span v-else>Enviar Donate</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
