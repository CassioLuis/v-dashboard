<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'

const defaultLayout = 'default'

const { currentRoute } = useRouter()

const layout = computed(
  () => `${currentRoute.value.meta.layout || defaultLayout}-layout`,
)
</script>

<template>
  <component :is="layout">
    <router-view />
  </component>
</template>

<!-- how to transition -->

<!-- <template>
  <component :is="layout">
    <router-view v-slot="{ Component }">
      <transition name="slide" mode="out-in">
        <component :is="Component" />
      </transition>
    </router-view>
  </component>
</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: opacity 1s, transform 1s;
}

.slide-enter-form,
.slide-leave-to {
  opacity: 0;
  transform: translateX(-30%)
}
</style> -->
