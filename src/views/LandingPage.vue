<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { AspectRatio } from '@/components/ui/aspect-ratio'

const router = useRouter()

const isDark = ref()

function toggleDarkMode() {
  document.querySelector('body')?.classList.toggle('dark')
  isDark.value = document.querySelector('body')?.classList.contains('dark')
}

// function changeThemes(theme: string): void {
//   document.querySelector('body')?.classList.toggle(theme)
// }
</script>

<template>
  <div class="flex flex-col h-screen w-screen">
    <nav class="font-outfit container py-7 flex justify-between items-center">
      <div class="space-x-4 flex items-center">
        <Avatar>
          <AvatarImage src="/logo-2.png" alt="@radix-vue" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
        <span class="font-semibold text-lg">Perfect World Blackstar</span>
      </div>
      <div class="flex gap-2">
        <Button variant="ghost">
          Home
        </Button>
        <Button variant="ghost">
          Home
        </Button>
        <Button variant="ghost">
          Home
        </Button>
        <Button variant="ghost">
          Home
        </Button>
      </div>
      <div class="flex items-center gap-4">
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
    </nav>
    <Separator class="container" />
    <main class="font-domine grow container py-8 flex items-center">
      <div class="flex items-center w-full lg:w-1/2">
        <div class="max-w-2xl mb-8">
          <h1 class="text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight dark:text-white">
            Perfect World Blackstar, Explore um mundo único e exclusivo.
          </h1>
          <p class="py-5 text-xl leading-normal text-gray-500 lg:text-xl xl:text-2xl dark:text-gray-400">
            Apresentamos um ambiente personalizado e dedicado, construído para
            oferecer a melhor experiência de jogo. Desfrute de recursos exclusivos
            e uma comunidade apaixonada. Bem-vindo ao nosso reino,
            onde a aventura é infinita e a diversão é garantida.
          </p>

          <div class="flex flex-col items-start space-y-3 sm:space-x-4 sm:space-y-0 sm:items-center sm:flex-row">
            <Button size="xl" class="font-semibold">
              Download
            </Button>
            <Button variant="ghost" size="xl" @click="router.push('/register')">
              Cadastre-se
            </Button>
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center w-full lg:w-1/2">
        <AspectRatio :ratio="9 / 10" class="flex justify-end">
          <img src="/landing-img.png" alt="Image" class="rounded-md object-cover">
          <!-- <img
            src="/landing-img.png"
            class="bg-cover overflow-hidden w-[500px]"
            alt="Hero Illustration"
            loading="eager"
            placeholder="blur"
          > -->
        </AspectRatio>
      </div>
    </main>
  </div>
</template>
