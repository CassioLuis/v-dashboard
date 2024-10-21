<!-- eslint-disable no-console -->
<script setup lang="ts">
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { inject } from '@vercel/analytics'

const { currentRoute } = useRouter()

const layout = computed(() => currentRoute.value.meta.layout || 'DefaultLayout')

declare global {
  interface Window {
    fbq: any
  }
}

onMounted (() => {
  inject();
  // Carrega o script do Facebook Pixel
  ((f: any, b: any, e: any, v: any, n?: any, t?: any, s?: any) => {
    if (f.fbq)
      return
    n = f.fbq = function (...args: any[]) {
      n.callMethod
        ? n.callMethod(...args)
        : n.queue.push(args)
    }
    if (!f._fbq) {
      f._fbq = n
      n.push = n
      n.loaded = true
      n.version = '2.0'
    }
    n.queue = []
    t = b.createElement(e)
    t.async = true
    t.src = v
    t.onload = () => console.log('Facebook Pixel script loaded successfully')
    t.onerror = () => console.error('Facebook Pixel script blocked or failed to load')
    s = b.getElementsByTagName(e)[0]
    s.parentNode.insertBefore(t, s)
  })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js')

  // Inicializa o Facebook Pixel
  if (window.fbq) {
    window.fbq('init', '1362202448556022')
    window.fbq('track', 'PageView')
  }
  else {
    console.warn('Facebook Pixel could not be initialized.')
  }
})
</script>

<template>
  <component :is="layout" class="overflow-y-auto">
    <router-view />
  </component>
</template>
