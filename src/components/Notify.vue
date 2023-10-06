<script setup lang="ts">
import { defineProps } from 'vue';

interface Props {
  emphasisMsg?: string,
  msg?: string,
  status?: string
}

const { emphasisMsg, msg, status } = defineProps<Props>()
</script>

<template>
  <div v-if="status === 'Success'" class="bg-green-500 text-sm text-white rounded-md p-4"
    role="alert">
    <span class="font-bold">{{ emphasisMsg }}</span>{{ msg }}
  </div>
  <div v-else-if="status === 'Error'" class="bg-red-500 text-sm text-white rounded-md p-4"
    role="alert">
    <span class="font-bold">{{ emphasisMsg }}</span>{{ msg }}
  </div>
  <div v-else-if="status === 'Warning'"
    class="bg-orange-50 border border-orange-200 text-sm text-orange-600 rounded-md p-4" role="alert">
    <span class="font-bold">{{ emphasisMsg }}</span>{{ msg }}
</div></template>