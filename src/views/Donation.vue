<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../stores/application'
import DonationForm from '../components/DonationForm.vue'
import Modal from '../components/Modal.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'

const userSession = useAppStore()
const { setPaymentsHistory, setOpenModal } = userSession
const { getPaymentHistory, getPaymentsTotal, getQtdDonations, getGoldDonationTotal } = storeToRefs(userSession)

onMounted(async () => {
  await setPaymentsHistory()
})

const data = reactive({
  refreshing: false,
  modalOpen: false,
})

async function refreshTable() {
  data.refreshing = true
  await setPaymentsHistory()
  data.refreshing = false
}
</script>

<template>
  <div>
    <h1 class="text-3xl font-medium">
      Doações
    </h1>
    <DonationForm />
    <div class="mt-8" />

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <h2>
          Histórico de Doações
        </h2>
        <div class="my-4 -mx-6 px-4">
          <div class="flex justify-between flex-wrap gap-2 sm:gap-0 md:gap-0 lg:gap-0">
            <div class="w-full px-2 mt-6 sm:w-1/3 xl:w-1/3 sm:mt-0">
              <Card>
                <CardContent class="flex flex-row items-center space-x-4 rounded-md p-4">
                  <div class="p-3 bg-blue-600 bg-opacity-75 rounded-full">
                    <svg class="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M4.19999 1.4C3.4268 1.4 2.79999 2.02681 2.79999 2.8C2.79999 3.57319 3.4268 4.2 4.19999 4.2H5.9069L6.33468 5.91114C6.33917 5.93092 6.34409 5.95055 6.34941 5.97001L8.24953 13.5705L6.99992 14.8201C5.23602 16.584 6.48528 19.6 8.97981 19.6H21C21.7731 19.6 22.4 18.9732 22.4 18.2C22.4 17.4268 21.7731 16.8 21 16.8H8.97983L10.3798 15.4H19.6C20.1303 15.4 20.615 15.1004 20.8521 14.6261L25.0521 6.22609C25.2691 5.79212 25.246 5.27673 24.991 4.86398C24.7357 4.45123 24.2852 4.2 23.8 4.2H8.79308L8.35818 2.46044C8.20238 1.83722 7.64241 1.4 6.99999 1.4H4.19999Z"
                        fill="currentColor"
                      />
                      <path
                        d="M22.4 23.1C22.4 24.2598 21.4598 25.2 20.3 25.2C19.1403 25.2 18.2 24.2598 18.2 23.1C18.2 21.9402 19.1403 21 20.3 21C21.4598 21 22.4 21.9402 22.4 23.1Z"
                        fill="currentColor"
                      />
                      <path
                        d="M9.1 25.2C10.2598 25.2 11.2 24.2598 11.2 23.1C11.2 21.9402 10.2598 21 9.1 21C7.9402 21 7 21.9402 7 23.1C7 24.2598 7.9402 25.2 9.1 25.2Z"
                        fill="currentColor"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>{{ getQtdDonations }}</CardTitle>
                    <CardDescription>Total de Compras.</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div class="w-full px-2 sm:w-1/3 xl:w-1/3 xl:mt-0 xs:mt-2">
              <Card>
                <CardContent class="flex flex-row items-center space-x-4 rounded-md p-4">
                  <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                    <svg class="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor"
                        stroke-width="2" stroke-linejoin="round"
                      />
                      <path
                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                        stroke="currentColor" stroke-width="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>{{ getPaymentsTotal }}</CardTitle>
                    <CardDescription>Total em Reais.</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div class="w-full px-2 sm:w-1/3 xl:w-1/3 xl:mt-0 xs:mt-2">
              <Card>
                <CardContent class="flex flex-row items-center space-x-4 rounded-md p-4">
                  <div class="p-3 bg-pink-600 bg-opacity-75 rounded-full">
                    <svg class="w-8 h-8 text-white" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M6.99998 11.2H21L22.4 23.8H5.59998L6.99998 11.2Z" fill="currentColor" stroke="currentColor"
                        stroke-width="2" stroke-linejoin="round"
                      />
                      <path
                        d="M9.79999 8.4C9.79999 6.08041 11.6804 4.2 14 4.2C16.3196 4.2 18.2 6.08041 18.2 8.4V12.6C18.2 14.9197 16.3196 16.8 14 16.8C11.6804 16.8 9.79999 14.9197 9.79999 12.6V8.4Z"
                        stroke="currentColor" stroke-width="2"
                      />
                    </svg>
                  </div>
                  <div>
                    <CardTitle>{{ getGoldDonationTotal }}</CardTitle>
                    <CardDescription>Total de Gold.</CardDescription>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead class="relative">
              <tr>
                <th
                  v-for="(header, idx) in getPaymentHistory.tHeaders" :key="idx"
                  :class="header.styles"
                  class="px-4 py-2 text-xs font-medium leading-4 tracking-wider text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  <span v-if="header.title === 'QR Code'" class="w-full flex justify-between items-center">
                    <span>{{ header.title }}</span>
                    <button
                      class="h-6 w-8 flex items-center p-1 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-indigo-600 rounded-md hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500"
                      @click.prevent="refreshTable"
                    >
                      <svg
                        :class="{ 'elemento-girando': data.refreshing }" class="w-5 h-5 mx-1"
                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </button>
                  </span>
                  <span v-else>
                    {{ header.title }}
                  </span>
                </th>
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="body in getPaymentHistory.tBody" :key="body.orderId">
                <td
                  v-for="(td, idx) in body.cells" :key="idx"
                  :class="td.styles"
                  class="px-4 py-2 border-b border-gray-200 whitespace-nowrap"
                >
                  <span v-if="td.name === 'qrCode'">
                    <a
                      href="#" class="text-indigo-600 hover:text-indigo-900 hover:underline font-semibold"
                      @click.prevent="setOpenModal(body.orderId)"
                    >
                      Ver
                    </a>
                    <Modal :open="body.openModal">
                      <template #content>
                        <div class="flex flex-col gap-2">
                          <img :src="`data:image/jpeg;base64,${td.value}`" class="border w-64">
                          <div class="flex justify-between">
                            <div>
                              <h1 class="text-left font-semibold text-lg">Order</h1>
                              <p class="text-left text-sm">nº {{ body.orderId }}</p>
                            </div>
                            <div>
                              <p class="text-left font-semibold text-lg">{{ body.transactionAmount }}</p>
                            </div>
                          </div>
                        </div>
                      </template>
                      <template #footer>
                        <button
                          class="p-3 px-6 py-3 mr-2 text-indigo-500 bg-transparent rounded-lg hover:bg-gray-100 hover:text-indigo-400 focus:outline-none"
                          @click="setOpenModal(body.orderId)"
                        >
                          Fechar
                        </button>
                      </template>
                    </Modal>
                  </span>
                  <span v-else-if="td.name === 'orderId'" class="flex">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img class="w-10 h-10" src="/gold-coin.png" alt="">
                      </div>

                      <div class="flex flex-col ml-4">
                        <span class="font-semibold text-sm leading-5 text-gray-900">
                          Donate
                        </span>
                        <span class="text-sm leading-5 text-gray-500">
                          nº {{ td.value }}
                        </span>
                      </div>
                    </div>
                  </span>
                  <span
                    v-else-if="td.name === 'status'"
                    :class="{ 'bg-green-100 text-green-800': td.value === 'Aprovado', 'bg-red-100 text-red-800': td.value === 'Cancelado', 'bg-orange-100 text-orange-800': td.value === 'Pendente' }"
                    class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full"
                  >
                    {{ td.value }}
                  </span>
                  <span v-else>
                    {{ td.value }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.elemento-girando {
  animation: girar 3s linear infinite;
}

@keyframes girar {
  0% {
    transform: rotate(360deg);
  }

  25%,
  75% {
    transform: rotate(0deg);
  }
}
</style>
