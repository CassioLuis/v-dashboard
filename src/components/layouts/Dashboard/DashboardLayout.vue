<script setup lang="ts">
import Header from '@/components/Header.vue'
import Sidebar from '@/components/Sidebar.vue'
import { Separator } from '@/components/ui/separator'
</script>

<template>
  <div class="flex h-screen font-roboto">
    <Sidebar />

    <div class="flex-1 flex flex-col overflow-hidden">
      <Header />

      <Separator />

      <main class="flex-1 overflow-x-hidden overflow-y-auto">
        <div class="container mx-auto px-6 py-10">
          <slot />
        </div>
      </main>
    </div>
  </div>
</template>
