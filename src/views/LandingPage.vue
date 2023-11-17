<script setup lang="ts">
import { onBeforeMount, ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'

const router = useRouter()

const isDark: { value: boolean | undefined } = ref<boolean>(true)

function toggleDarkMode() {
  document.querySelector('body')?.classList.toggle('dark')
  isDark.value = document.querySelector('body')?.classList.contains('dark')
}

// function changeThemes(theme: string): void {
//   document.querySelector('body')?.classList.toggle(theme)
// }
onBeforeMount(() => {
})

document.addEventListener('DOMContentLoaded', () => {
  const defaultAddClasses = ['opacity-0', 'transition-all', 'ease-in-out', 'duration-1000']
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
</script>

<template>
  <div class="container grid grid-cols-12 gap-2 h-screen w-screen">
    <nav class="border-b col-span-12 self-start font-outfit py-7 flex justify-between gap-8 items-center">
      <div class="space-x-4 flex items-center bg-secondary px-4 py-2 rounded-md bg-gradient-to-r from-secondary to-background">
        <Avatar>
          <AvatarImage src="/logo-2.png" alt="@radix-vue" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <span class="font-semibold text-lg">Pw Blackstar</span>
      </div>
      <div class="hidden lg:flex gap-2">
        <Button variant="ghost">
          Início
        </Button>
        <Button variant="ghost">
          Info
        </Button>
        <Button variant="ghost">
          Doação
        </Button>
        <Button variant="ghost">
          Download
        </Button>
        <Button variant="ghost">
          Registro
        </Button>
      </div>
      <div class="hidden lg:flex flex-col sm:flex-row items-center gap-4">
        <Button variant="default">
          <a href="/login" target="_blank">
            Área do Jogador
          </a>
        </Button>
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
      </div>
      <Popover>
        <PopoverTrigger class="lg:hidden">
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
          <!-- </button> -->
        </PopoverTrigger>
        <PopoverContent class="w-[100vw]">
          <div class="flex flex-col items-start gap-2">
            <Button variant="ghost">
              Início
            </Button>
            <Button variant="ghost">
              Info
            </Button>
            <Button variant="ghost">
              Doação
            </Button>
            <Button variant="ghost">
              Download
            </Button>
            <Button variant="ghost">
              Registro
            </Button>
            <div class="flex flex-col sm:flex-row items-center gap-4">
              <Button variant="default" @click="router.push('/login')">
                Área do Jogador
              </Button>
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
            </div>
          </div>
        </PopoverContent>
      </Popover>
    </nav>
    <main class="col-span-12 self-center grid grid-cols-12 font-domine py-8">
      <section class="left-section col-span-12 lg:col-span-6 flex items-center">
        <div>
          <h1 class="text-2xl sm:text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
            Perfect World Blackstar, Explore um mundo único e exclusivo.
          </h1>
          <div class="col-span-12 flex gap-4">
            <Badge variant="outlinePrimary">
              1.5.5 @ 1.3.6
            </Badge>
            <Badge variant="outlinePrimary">
              Bug Cast
            </Badge>
            <Badge variant="outlinePrimary">
              Rate Alta
            </Badge>
            <Badge variant="outlinePrimary">
              Custom
            </Badge>
          </div>
          <p class="py-5 text-md leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-400">
            Apresentamos um ambiente personalizado e dedicado, construído para
            oferecer a melhor experiência de jogo. Desfrute de recursos exclusivos
            e uma comunidade apaixonada. Bem-vindo ao nosso reino,
            onde a aventura é infinita e a diversão é garantida.
          </p>
          <div class="flex items-center gap-2">
            <Button variant="default" size="lg" class="font-semibold sm:h-14 sm:px-9 sm:text-lg">
              Download
            </Button>
            <Button variant="ghost" size="lg" class="sm:h-14 sm:px-9 sm:text-lg" @click="router.push('/register')">
              Cadastre-se
            </Button>
          </div>
        </div>
      </section>
      <section class="right-section col-span-12 lg:col-span-6 flex justify-center lg:justify-end items-center">
        <img src="/landing-img.png" alt="Image" class="rounded-md object-cover">
      </section>
    </main>
    <footer class="col-span-12 self-end flex gap-4 justify-center items-center font-outfit p-8">
      <Button variant="link" class="text-lg font-semibold">
        <img src="/instagram.png" alt="" width="20" class="mr-2">
        instagram
      </Button>
      <Separator orientation="vertical" class="bg-foreground h-[30px]" />
      <Button variant="link" class="text-lg font-semibold">
        <img src="/discord.png" alt="" width="20" class="mr-2">
        discord
      </Button>
      <Separator orientation="vertical" class="bg-foreground h-[30px]" />
      <Button variant="link" class="text-lg font-semibold">
        <img src="/facebook.png" alt="" width="20" class="mr-2">
        facebook
      </Button>
    </footer>
  </div>
</template>
