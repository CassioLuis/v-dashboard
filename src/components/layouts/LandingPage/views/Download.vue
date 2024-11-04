<script setup lang="ts">
import links from './downloadLinks'
import Button from '@/components/ui/button/Button.vue'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
</script>

<template>
  <div class="flex justify-center">
    <Card class="max-w-lg">
      <CardHeader>
        <CardTitle>Efetuar Download</CardTitle>
        <CardDescription>
          Para efetuar o download, escolha uma das opções abaixo.
        </CardDescription>
        <CardDescription>
          Caso o link falhe, tente outro!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div class="gap-4 py-4 overflow-hidden">
          <div class="flex flex-col gap-2">
            <div v-for="(link, idx2) of links" :key="idx2">
              <a :href="link.link" target="_blank" class="hover:underline text-orange-500">
                <Button class="w-full" type="button" variant="outline">
                  {{ link.title }}
                </Button>
              </a>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  </div>
</template>
