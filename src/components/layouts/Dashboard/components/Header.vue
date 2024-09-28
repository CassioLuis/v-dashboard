<script setup lang="ts">
import { ref } from 'vue'
import Cookies from 'js-cookie'
import { useSidebar } from '@/composables/useSidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

function logOut() {
  Cookies.remove('token')
  return window.location.assign('/login')
}

const dropdownOpen = ref(false)
const { isOpen } = useSidebar()

const isDark: { value: boolean | undefined } = ref<boolean>(true)

function toggleDarkMode() {
  document.querySelector('body')?.classList.toggle('dark')
  isDark.value = document.querySelector('body')?.classList.contains('dark')
}
</script>

<template>
  <header
    class="flex items-center justify-between px-6 py-4 order-b-4"
  >
    <div class="flex items-center">
      <button
        class="text-gray-500 focus:outline-none lg:hidden"
        @click="isOpen = true"
      >
        <svg
          class="w-6 h-6"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 6H20M4 12H20M4 18H11"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
    </div>

    <div class="flex items-center gap-4">
      <i v-if="isDark" class="cursor-pointer text-gray-300 rounded-full outline-none focus:outline-none" @click="toggleDarkMode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-5 h-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
        </svg>
      </i>
      <i v-else class="cursor-pointer text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20" @click="toggleDarkMode">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
      </i>

      <DropdownMenu>
        <DropdownMenuTrigger>
          <Avatar class="cursor-pointer border focus:outline-none" @click="dropdownOpen = !dropdownOpen">
            <AvatarImage src="/_2d8770bb-d9f3-48c5-99cd-33b9bd3dddf9.jpeg" alt="@radix-vue" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem class="cursor-pointer" @click.prevent="logOut">
            Sair
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  </header>
</template>
