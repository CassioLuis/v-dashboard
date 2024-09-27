<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Card, CardContent, CardHeader } from '@/components/ui/card'
</script>

<template>
  <div class="bg-image h-screen flex flex-col items-center !overflow-auto select-none font-roboto">
    <Card class="w-[350px] py-8 rounded">
      <CardHeader class="flex justify-center items-center">
        <Avatar class="h-36 w-36">
          <AvatarImage src="/_68313cf0-4bad-45b1-971f-558eb48cf754.jpeg" alt="@radix-vue" />
          <AvatarFallback>BS</AvatarFallback>
        </Avatar>
      </CardHeader>
      <CardContent>
        <slot />
      </CardContent>
    </card>
  </div>
</template>

<style lang="css" scoped>
.bg-image {
  background-image: url('../../public/2017-01-03_pw_topos-genericos_concurso1.jpg');
  background-size: cover; /* Redimensiona a imagem para cobrir todo o elemento */
  background-repeat: no-repeat; /* Evita a repetição da imagem */
  background-position: center; /* Alinha a imagem ao centro do elemento */
}
</style>
