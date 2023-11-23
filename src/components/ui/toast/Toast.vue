<!-- eslint-disable import/first -->
<script lang="ts">
import type { ToastRootEmits, ToastRootProps } from 'radix-vue'
import type { VariantProps } from 'class-variance-authority'

interface ToastVariantProps extends VariantProps<typeof toastVariants> {}

export interface ToastProps extends ToastRootProps {
  class?: string
  variant?: ToastVariantProps['variant']
  'onOpenChange'?: ((value: boolean) => void) | undefined
};
</script>

<script setup lang="ts">
// eslint-disable-next-line import/first
import { ToastRoot, useEmitAsProps } from 'radix-vue'

// eslint-disable-next-line import/first
import { toastVariants } from '.'

// eslint-disable-next-line import/first
import { cn } from '@/lib/utils'

const props = defineProps<ToastProps>()
const emits = defineEmits<ToastRootEmits>()
</script>

<template>
  <ToastRoot
    v-bind="{ ...props, ...useEmitAsProps(emits) }"
    :class="cn(toastVariants({ variant: props.variant }), props.class)"
    @update:open="onOpenChange"
  >
    <slot />
  </ToastRoot>
</template>
