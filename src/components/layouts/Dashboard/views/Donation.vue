<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { storeToRefs } from 'pinia'
import { DonationForm } from '../components'
import { useAppStore } from '@/stores/application'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

const userSession = useAppStore()
const { setPaymentsHistory } = userSession
const { getPaymentHistory, getPaymentsTotal, getQtdDonations, getGoldDonationTotal } = storeToRefs(userSession)

onMounted(async () => {
  await setPaymentsHistory()
})

const data = reactive({
  refreshing: false,
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

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <h2>Histórico de Doações</h2>
        <div class="mt-4 -mx-6 px-4">
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
        <div class="mt-8 p-4 border inline-block min-w-full overflow-hidden align-middle shadow-sm rounded-lg">
          <div class="p-2 flex justify-end">
            <Button
              variant="secondary"
              :disabled="data.refreshing"
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
              Atualizar Status
            </Button>
          </div>
          <Table>
            <TableCaption>Lista de suas ordens recentes.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead v-for="(header, idx) in getPaymentHistory.tHeaders" :key="idx" class="w-[100px] font-semibold">
                  {{ header.title }}
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow v-for="body in getPaymentHistory.tBody" :key="body.orderId">
                <TableCell v-for="(td, idx) in body.cells" :key="idx" class="font-medium">
                  <span v-if="td.name === 'qrCode'">
                    <Dialog v-if="body.status === 'pending'">
                      <DialogTrigger as-child>
                        <Button variant="link" class="font-semibold">
                          Pagar
                        </Button>
                      </DialogTrigger>
                      <DialogContent class="sm:max-w-[425px]">
                        <DialogHeader>
                          <DialogTitle>Efetuar Pagamento</DialogTitle>
                          <DialogDescription>
                            Para efetuar o pagamento, aponte a câmera do seu celular para o qr-code.
                          </DialogDescription>
                        </DialogHeader>
                        <div class="grid gap-4 py-4">
                          <div class="flex justify-center">
                            <img :src="`data:image/jpeg;base64,${td.value}`" class="border w-64">
                          </div>
                          <div class="flex justify-between">
                            <div>
                              <DialogTitle>
                                Order
                              </DialogTitle>
                              <DialogDescription>
                                nº {{ body.orderId }}
                              </DialogDescription>
                            </div>
                            <div>
                              <DialogTitle class="text-left">
                                {{ body.transactionAmount }}
                              </DialogTitle>
                            </div>
                          </div>
                        </div>
                        <DialogFooter>
                          <DialogClose as-child>
                            <Button class="w-full" type="button" variant="secondary">
                              Fechar
                            </Button>
                          </DialogClose>
                        </DialogFooter>
                      </DialogContent>
                    </Dialog>
                  </span>
                  <span v-else-if="td.name === 'status'">
                    <Badge
                      v-if="td.value === 'Cancelado'"
                      variant="secondaryDanger"
                    >
                      {{ td.value }}
                    </Badge>
                    <Badge
                      v-else-if="td.value === 'Aprovado'"
                      variant="secondarySuccess"
                    >
                      {{ td.value }}
                    </Badge>
                    <Badge
                      v-else
                      variant="secondaryWarning"
                    >
                      {{ td.value }}
                    </Badge>
                  </span>
                  <span v-else-if="td.name === 'paymentMethod'">
                    <Badge variant="outline">
                      {{ td.value }}
                    </Badge>
                  </span>
                  <span v-else-if="td.name === 'orderId'" class="flex">
                    <div class="flex items-center">
                      <Avatar class="flex-shrink-0 w-10 h-10">
                        <AvatarImage class="w-10 h-10" src="/gold-coin.png" />
                        <AvatarFallback>CN</AvatarFallback>
                      </Avatar>

                      <div class="flex flex-col ml-4">
                        <span class="font-medium text-sm leading-5">
                          Donate
                        </span>
                        <span class="text-sm leading-5 text-gray-400">
                          nº {{ td.value }}
                        </span>
                      </div>
                    </div>
                  </span>
                  <span v-else>
                    {{ td.value }}
                  </span>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
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
