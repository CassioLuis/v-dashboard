<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const { currentRoute } = useRouter()

const layout = computed(() => currentRoute.value.meta.layout || 'DefaultLayout')
</script>

<template>
  <component :is="layout" class="overflow-y-auto">
    <router-view />
  </component>
</template>
