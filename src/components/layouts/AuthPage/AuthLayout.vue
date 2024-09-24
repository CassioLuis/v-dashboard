<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
  <div class="flex flex-col items-center justify-center select-none font-roboto">
    <Card class="w-[350px] py-8 h-auto rounded-none">
      <CardHeader class="flex justify-center items-center">
        <Avatar class="h-36 w-36">
          <AvatarImage src="/logo-2.png" alt="@radix-vue" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent class="grid grid-cols-12 h-full">
        <div class="col-span-12 grid grid-cols-12">
          <slot />
        </div>
      </CardContent>
    </card>
  </div>
</template>

<style lang="css" scoped>
.bg-image {
  background-image: url('../../public/bg-image.jpg');
  background-size: cover; /* Redimensiona a imagem para cobrir todo o elemento */
  background-repeat: no-repeat; /* Evita a repetição da imagem */
  background-position: center; /* Alinha a imagem ao centro do elemento */
}
</style>
