<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSidebar } from '@/composables/useSidebar'

const router = useRouter()

interface SvgMeta {
  viewBox: string
  paths: string[]
}

const { isOpen } = useSidebar()
const activeClass = ref(
  'bg-gray-600 bg-opacity-25 text-gray-100 border-gray-100',
)
const inactiveClass = ref(
  'border-gray-900 text-gray-500 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100',
)
</script>

<template>
  <div class="flex">
    <!-- Backdrop -->
    <div
      :class="isOpen ? 'block' : 'hidden'" class="fixed inset-0 z-20 transition-opacity bg-black opacity-50 lg:hidden"
      @click="isOpen = false"
    />
    <!-- End Backdrop -->

    <div
      :class="isOpen ? 'translate-x-0 ease-out' : '-translate-x-full ease-in'"
      class="fixed inset-y-0 left-0 z-30 w-64 overflow-y-auto transition duration-300 transform bg-gray-900 lg:translate-x-0 lg:static lg:inset-0"
    >
      <div class="flex items-center justify-center mt-8">
        <div class="flex items-center">
          <img src="/_68313cf0-4bad-45b1-971f-558eb48cf754.jpeg" alt="" class="h-24 rounded-full">
        </div>
      </div>

      <nav class="mt-10">
        <div v-for="(route, idx) of router.options.routes" :key="idx">
          <router-link
            v-if="route.meta?.isSideMenuOption" :to="route.path"
            class="font-semibold flex items-center px-6 py-2 mt-2 transition-all duration-100 border-l-2 hover:bg-gray-600 hover:bg-opacity-25 hover:text-gray-100"
            :class="[$route.name === route.name ? activeClass : inactiveClass]"
          >
            <svg
              class="w-5 h-5"
              :viewBox="(route.meta.svg as SvgMeta)?.viewBox"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                v-for="(path, pathIdx) in (route.meta.svg as SvgMeta)?.paths" :key="pathIdx"
                fill="currentColor"
                :d="path"
              />
            </svg>
            <span class="mx-4">{{ route.name }}</span>
          </router-link>
        </div>
      </nav>
    </div>
  </div>
</template>
