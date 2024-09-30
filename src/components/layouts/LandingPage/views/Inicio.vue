<script setup lang="ts">
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
</script>

<template>
  <main class="col-span-12 self-start grid grid-cols-12 font-domine py-8">
    <section class="left-section col-span-12 lg:col-span-6 flex items-center">
      <div>
        <h1
          class="text-2xl sm:text-4xl font-bold leading-snug tracking-tight text-gray-800 lg:text-4xl lg:leading-tight xl:text-6xl xl:leading-tight bg-gradient-to-r from-blue-500 to-green-500 bg-clip-text text-transparent"
        >
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
        <div class="flex items-center gap-4">
          <a target="_blank" href="https://drive.google.com/file/d/1yiFTmss2GUHO6p2II7NIqWo197b1uUud/view?usp=drive_link">
            <Button variant="default" size="lg" class="font-semibold sm:h-14 sm:px-9 sm:text-lg">
              Download
            </Button>
          </a>
          <a href="/register" target="_blank">
            <Button variant="secondary" size="lg" class="sm:h-14 sm:px-9 sm:text-lg">
              Cadastre-se
            </Button>
          </a>
        </div>
      </div>
    </section>
    <section class="right-section col-span-12 lg:col-span-6 flex justify-center lg:justify-end items-center">
      <img src="/landing-img.png" alt="Image" class="rounded-md object-cover">
    </section>
  </main>
</template>
