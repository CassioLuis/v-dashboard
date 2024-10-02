<script setup lang="ts">
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

const links = [
  {
    link: 'https://drive.google.com/file/d/1sbI-O7uumv_tagQ2gehDcYLAiXfZyFWl/view?usp=drive_link',
    origin: 'Google Drive',
    title: 'Link Alternativo 1',
  },
  {
    link: 'https://drive.google.com/file/d/1EpgB8gmP12JMjdwZ-sQYjIIrw-1hhDQ8/view?usp=drive_link',
    origin: 'Google Drive',
    title: 'Link Alternativo 2',
  },
  {
    link: 'https://drive.google.com/file/d/1elHDItSIoSiwzGmh4JMfRDjSErSXhRZS/view?usp=drive_link',
    origin: 'Google Drive',
    title: 'Link Alternativo 3',
  },
  {
    link: 'https://drive.google.com/file/d/1ahytjIkk-xZiSy_Sqg41WYaiTVY7Yqrn/view?usp=drive_link',
    origin: 'Google Drive',
    title: 'Link Alternativo 4',
  },
]
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
                <div class="flex flex-col gap-10">
                  <div v-for="(link, idx) of links" :key="idx">
                    <div class="flex gap-2">
                      <DialogTitle class="text-gray-500 dark:text-gray-100">
                        {{ link.title }}
                      </DialogTitle>
                      <svg
                        xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1443.061 1249.993"
                      >
                        <path fill="#3777e3" d="M240.525 1249.993l240.492-416.664h962.044l-240.514 416.664z" />
                        <path fill="#ffcf63" d="M962.055 833.329h481.006L962.055 0H481.017z" />
                        <path fill="#11a861" d="M0 833.329l240.525 416.664 481.006-833.328L481.017 0z" />
                      </svg>
                      <DialogTitle class="text-gray-300 dark:text-gray-400">
                        {{ link.origin }}
                      </DialogTitle>
                    </div>
                    <a :href="link.link" target="_blank" class="hover:underline text-orange-500">
                      {{ link.link }}
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
