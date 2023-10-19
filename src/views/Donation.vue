<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAppStore } from '../stores/application'
import PaymentsService from '../service/payments.service'

const userSession = useAppStore()
const { setPaymentsHistory } = userSession
const { getPaymentHistory } = storeToRefs(userSession)

interface UserPayment {
  username: string
  email: string
  password: string
  confirm: string
}

const user = ref<UserPayment>({
  username: '',
  email: '',
  password: '',
  confirm: '',
})

function getTotal() {
  console.log(getPaymentHistory.target)
  return getPaymentHistory.reduce((item, acc) => {
    console.log(item)
    return acc = acc + item.transactionAmount
  }, 0)
}

const qrCode = ref('')

async function newPayment() {
  const response = await PaymentsService.create({
    payment_method_id: 'pix',
    transaction_amount: 0.1,
    payer: {
      first_name: 'Test',
      last_name: 'Test',
      email: 'teste@gmail.com',
      identification: {
        type: 'CPF',
        number: '05663593160',
      },
    },
    description: 'Payment for product',
    external_reference: 'MP0001',
  })
  qrCode.value = response.data.qrCode
  setPaymentsHistory()
}

const toggle = ref(false)
</script>

<template>
  <div>
    <h3 class="text-3xl font-medium text-gray-700">
      Doações
    </h3>
    <div class="mt-8">
      <!-- <h4 class="text-gray-600">
        Forms
      </h4> -->
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
                <form @submit.prevent="newPayment">
                  <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                    <div>
                      <label class="text-gray-700" for="username">Username</label>
                      <input
                        v-model="user.username"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        type="text"
                      >
                    </div>

                    <div>
                      <label class="text-gray-700" for="emailAddress">Email Address</label>
                      <input
                        v-model="user.email"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        type="email"
                      >
                    </div>

                    <div>
                      <label class="text-gray-700" for="password">Password</label>
                      <input
                        v-model="user.password"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        type="password"
                      >
                    </div>

                    <div>
                      <label class="text-gray-700" for="passwordConfirmation">Password Confirmation</label>
                      <input
                        v-model="user.confirm"
                        class="w-full mt-2 border-gray-200 rounded-md focus:border-indigo-600 focus:ring focus:ring-opacity-40 focus:ring-indigo-500"
                        type="password"
                      >
                    </div>
                  </div>

                  <div class="flex justify-end mt-4 gap-2">
                    <button
                      class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    >
                      Save
                    </button>
                    <button
                      class="px-4 py-2 text-gray-200 bg-gray-800 rounded-md hover:bg-gray-700 focus:outline-none focus:bg-gray-700"
                    >
                      Search
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-8" />

    <div class="flex flex-col mt-8">
      <div class="py-2 -my-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
        <h4 class="text-gray-600">
          Histório de Doações
        </h4>
        <div class="my-4">
          <div class="flex justify-between flex-wrap -mx-6">
            <div class="w-full px-6 mt-6 sm:w-1/2 xl:w-1/2 sm:mt-0">
              <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
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

                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">
                    {{ getPaymentHistory.length }}
                  </h4>
                  <div class="text-gray-500">
                    Total de Compras
                  </div>
                </div>
              </div>
            </div>

            <div class="w-full px-6 sm:w-1/2 xl:w-1/2 xl:mt-0 xs:mt-2">
              <div class="flex items-center px-5 py-6 bg-white rounded-md shadow-sm">
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

                <div class="mx-5">
                  <h4 class="text-2xl font-semibold text-gray-700">
                    {{ getTotal() }}
                  </h4>
                  <div class="text-gray-500">
                    Total de Cash
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="inline-block min-w-full overflow-hidden align-middle border-b border-gray-200 shadow sm:rounded-lg">
          <table class="min-w-full">
            <thead>
              <tr>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Name
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Title
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Status
                </th>
                <th
                  class="px-6 py-3 text-xs font-medium leading-4 tracking-wider text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50"
                >
                  Role
                </th>
                <th class="px-6 py-3 border-b border-gray-200 bg-gray-50" />
              </tr>
            </thead>

            <tbody class="bg-white">
              <tr v-for="(u, index) in getPaymentHistory" :key="index">
                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="flex items-center">
                    <div class="flex-shrink-0 w-10 h-10">
                      <img
                        class="w-10 h-10 rounded-full"
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                      >
                    </div>

                    <div class="ml-4">
                      <div class="text-sm font-medium leading-5 text-gray-900">
                        {{ u._id }}
                      </div>
                      <div class="text-sm leading-5 text-gray-500">
                        {{ u.orderId }}
                      </div>
                    </div>
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <div class="text-sm leading-5 text-gray-900">
                    {{ u.mysqlUserId }}
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    {{ u.paymentMethod }}
                  </div>
                </td>

                <td class="px-6 py-4 border-b border-gray-200 whitespace-nowrap">
                  <span
                    :class="{ 'bg-green-100 text-green-800': u.status === 'Sucesso', 'bg-red-100 text-red-800': u.status === 'Cancelado', 'bg-orange-100 text-orange-800': u.status === 'Pendente' }"
                    class="inline-flex px-2 text-xs font-semibold leading-5 rounded-full"
                  >{{ u.status }}</span>
                </td>

                <td class="px-6 py-4 text-sm leading-5 text-gray-500 border-b border-gray-200 whitespace-nowrap">
                  {{ u.transactionAmount }}
                </td>

                <td class="px-6 py-4 text-sm font-medium leading-5 text-right border-b border-gray-200 whitespace-nowrap">
                  <a href="#" class="text-indigo-600 hover:text-indigo-900">Edit</a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
