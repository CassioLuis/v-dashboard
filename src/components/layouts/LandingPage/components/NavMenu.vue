<script setup lang="ts">
import { defineProps } from 'vue'
import landingLayoutRoute from '../routes'
import { cn } from '@/lib/utils'
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu'

const props = defineProps({
  orientation: String, // col or row
})

const navigate = (url: any) => window.location.assign(url)

const activeClass = cn(`${navigationMenuTriggerStyle()} bg-accent outline-none text-accent-foreground`)
const inactiveClass = navigationMenuTriggerStyle()
</script>

<template>
  <NavigationMenu>
    <NavigationMenuList>
      <NavigationMenuItem class="flex gap-2" :class="`flex-${props.orientation}`">
        <router-link
          v-for="(route, idx) in landingLayoutRoute"
          :key="idx"
          to=""
          @click="navigate(route.path)"
        >
          <NavigationMenuLink
            :class="[$route.path === route.path ? activeClass : inactiveClass, route.meta?.adcStyle]"
            class="cursor-pointer"
          >
            {{ route.name }}
          </NavigationMenuLink>
        </router-link>
      </NavigationMenuItem>
    </NavigationMenuList>
  </NavigationMenu>
</template>
