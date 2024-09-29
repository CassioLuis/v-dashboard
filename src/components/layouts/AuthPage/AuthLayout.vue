<script lang="ts" setup>
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

import { Card, CardContent, CardHeader } from '@/components/ui/card'

const navigate = (url: any) => window.location.assign(url)
</script>

<template>
  <div class="bg-image h-screen flex flex-col items-center !overflow-auto select-none font-roboto">
    <Card class="w-full sm:w-[350px] !rounded-none glass min-h-screen !h-full">
      <CardHeader class="flex justify-center items-center">
        <Avatar class="h-36 w-36 !bg-transparent">
          <AvatarImage
            src="/_2d8770bb-d9f3-48c5-99cd-33b9bd3dddf9-removebg-preview.png"
            alt="@radix-vue"
            class="!bg-transparent cursor-pointer"
            @click="navigate('/')"
          />
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
  background-image: url('../../public/authbg.jpg');
  background-size: cover; /* Redimensiona a imagem para cobrir todo o elemento */
  background-repeat: no-repeat; /* Evita a repetição da imagem */
  background-position: center; /* Alinha a imagem ao centro do elemento */
}
</style>
