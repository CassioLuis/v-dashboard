<script setup lang="ts">
import { onMounted } from 'vue'
import links from './downloadLinks'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'

const img = [
  'characters.png',
  'Perfect_world_2.png',
  'racas_guardiao_ilustracao.png',
  'racas_humano_ilustracao.png',
  'characters (1).png',
]

function shuffleArray(array: string[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]
  }
  return img
}

onMounted(() => {
  setInterval(() => document.getElementById('nextCarousel')!.click(), 3000)
})
</script>

<template>
  <main class="col-span-12 self-start grid grid-cols-12 font-domine">
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
          <Dialog>
            <DialogTrigger as-child>
              <Button variant="default" size="lg" class="font-semibold sm:h-14 sm:px-9 sm:text-lg">
                Download
              </Button>
            </DialogTrigger>
            <DialogContent class="sm:max-w-auto">
              <DialogHeader>
                <DialogTitle>Efetuar Download</DialogTitle>
                <DialogDescription>
                  Para efetuar o download, escolha uma das opções abaixo.
                </DialogDescription>
              </DialogHeader>
              <div class="gap-4 py-4 overflow-hidden">
                <div class="flex flex-col gap-2">
                  <div v-for="(link, idx) of links" :key="idx">
                    <a :href="link.link" target="_blank" class="hover:underline text-orange-500">
                      <Button class="w-full" type="button" variant="outline">
                        {{ link.title }}
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
              <DialogFooter>
                <DialogClose as-child>
                  <Button class="w-full" type="button" variant="secondary">
                    Fechar
                  </Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>

          <a href="/register">
            <Button variant="secondary" size="lg" class="sm:h-14 sm:px-9 sm:text-lg">
              Cadastre-se
            </Button>
          </a>
        </div>
      </div>
    </section>
    <section class="right-section col-span-12 lg:col-span-6 flex justify-center lg:justify-end items-center">
      <Carousel
        v-slot="{ canScrollNext }"
        class="h-full relative w-full"
        :opts="{
          align: 'center',
          loop: true,
        }"
      >
        <CarouselContent class="!h-full">
          <CarouselItem v-for="(url, index) in shuffleArray(img)" :key="index" class="!h-full">
            <div class="p-1 h-full dark:bg-stone-950">
              <Card class="h-full dark:bg-stone-950 border-none ">
                <CardContent class="flex aspect-square items-center justify-center p-6 !h-full">
                  <img :src="url" alt="Image" class="rounded-md object-cover">
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        </CarouselContent>
        <CarouselPrevious class="hidden" />
        <CarouselNext v-if="canScrollNext" id="nextCarousel" class="hidden" />
      </Carousel>
    </section>
  </main>
</template>
