<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  emphasisMsg: string,
  msg: string,
  status: string
}

const { emphasisMsg, msg, status } = defineProps<Props>() 

</script>

<template>
  <div v-if="status === 'Sucess'" class="bg-green-50 border border-green-200 text-sm text-green-600 rounded-md p-4"
    role="alert">
    <span class="font-bold">{{ emphasisMsg }}. </span>{{ msg }}
  </div>
  <div v-else-if="status === 'Error'" class="bg-red-50 border border-red-200 text-sm text-red-600 rounded-md p-4"
    role="alert">
    <span class="font-bold">Danger</span> alert! You should check in on some of those fields below.
  </div>
  <div v-else-if="status === 'Warning'"
    class="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4" role="alert">
    <span class="font-bold">Warning</span> alert! You should check in on some of those fields below.
</div></template>