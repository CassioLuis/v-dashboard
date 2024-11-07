<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { NavMenu } from './components'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'

const router = useRouter()

const isDark: { value: boolean | undefined } = ref<boolean>(true)

function toggleDarkMode() {
  document.querySelector('body')?.classList.toggle('dark')
  isDark.value = document.querySelector('body')?.classList.contains('dark')
}

onMounted(() => {
  document.addEventListener('DOMContentLoaded', () => {
    const defaultAddClasses = ['opacity-0', 'transition-transform', 'ease-in-out', 'duration-200']
    const defaultRemoveClasses = ['opacity-0', '-translate-x-40', 'translate-x-40']

    const nav = document.querySelector('nav')
    const leftSection = document.querySelector('.left-section')
    const rightSection = document.querySelector('.right-section')
    const footer = document.querySelector('footer')

    nav?.classList.add(...defaultAddClasses)
    leftSection?.classList.add(...defaultAddClasses, '-translate-x-40')
    rightSection?.classList.add(...defaultAddClasses, 'translate-x-40')
    footer?.classList.add(...defaultAddClasses)

    setTimeout(() => {
      nav?.classList.remove(...defaultRemoveClasses)
      leftSection?.classList.remove(...defaultRemoveClasses)
      rightSection?.classList.remove(...defaultRemoveClasses)
      footer?.classList.remove(...defaultRemoveClasses)
    }, 0)
  })
})
</script>

<template>
  <div class="container grid grid-cols-12 gap-2 h-screen w-screen select-none">
    <nav class="col-span-12 border-b self-start font-outfit py-7 flex justify-between gap-8 items-center">
      <div
        class="shadow-sm space-x-4 flex items-center bg-secondary px-4 py-2 rounded-md bg-gradient-to-r from-secondary to-background"
      >
        <Avatar>
          <AvatarImage src="/_2d8770bb-d9f3-48c5-99cd-33b9bd3dddf9.jpeg" alt="@radix-vue" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <span class="font-semibold text-lg text-primary">Pw Blackstar</span>
      </div>
      <NavMenu class="hidden lg:block" />
      <div class="hidden lg:flex flex-col sm:flex-row items-center gap-4">
        <a href="/login" target="_blank">
          <Button variant="default">
            Área do Jogador
          </Button>
        </a>
        <i
          v-if="isDark" class="cursor-pointer text-gray-300 rounded-full outline-none focus:outline-none"
          @click="toggleDarkMode"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
            <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
          </svg>
        </i>
        <i
          v-else
          class="cursor-pointer text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20"
          @click="toggleDarkMode"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
            stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5" />
            <path
              d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
            />
          </svg>
        </i>
      </div>
      <Sheet>
        <SheetTrigger class="lg:hidden">
          <svg class="w-6 h-6" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M4 6H20M4 12H20M4 18H11" stroke="currentColor" stroke-width="2" stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetDescription>
              <NavMenu orientation="col" />
              <div class="flex sm:flex-row items-center gap-4">
                <Button variant="default" @click="router.push('/login')">
                  Área do Jogador
                </Button>
                <i
                  v-if="isDark" class="cursor-pointer text-gray-300 rounded-full outline-none focus:outline-none"
                  @click="toggleDarkMode"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                </i>
                <i
                  v-else
                  class="cursor-pointer text-gray-500 rounded-full outline-none focus:outline-none focus-visible:ring focus-visible:ring-gray-100 focus:ring-opacity-20"
                  @click="toggleDarkMode"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none"
                    stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="5" />
                    <path
                      d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"
                    />
                  </svg>
                </i>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </nav>
    <div class="col-span-12 overflow-y-auto">
      <slot />
    </div>
    <footer
      class="col-span-12 border-t self-end flex flex-col sm:flex-row justify-center sm:gap-4 items-center font-outfit py-8"
    >
      <a href="https://discord.gg/W9XRQJZ82C" target="_blank">
        <Button variant="link" class="text-lg font-semibold">
          <img src="/discord.png" alt="" width="20" class="mr-2">
          discord
        </Button>
      </a>
      <a href="https://www.youtube.com/@PerfectWorldBlackstar-i7q" target="_blank">
        <Button variant="link" class="text-lg font-semibold">
          <img src="/youtube.png" alt="" width="20" class="mr-2">
          YouTube
        </Button>
      </a>
      <a href="https://www.instagram.com/pw_blackstar/" target="_blank">
        <Button variant="link" class="text-lg font-semibold">
          <img src="/instagram.png" alt="" width="20" class="mr-2">
          instagram
        </Button>
      </a>
      <a href="https://www.facebook.com/profile.php?id=61567372379518" target="_blank">
        <Button variant="link" class="text-lg font-semibold">
          <img src="/facebook.png" alt="" width="20" class="mr-2">
          facebook
        </Button>
      </a>
    </footer>
  </div>
</template>
