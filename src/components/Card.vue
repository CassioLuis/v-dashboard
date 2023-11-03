<script setup lang="ts">
const props = defineProps({
  title: String,
})
</script>

<template>
  <div class="max-w-sm mt-6 overflow-hidden bg-white rounded shadow-lg">
    <slot name="img" class="w-full" />
    <!-- <img
      class="w-full"
      src="https://picsum.photos/id/1016/384/234"
      alt="Sunset in the mountains"
    > -->
    <div class="px-6 py-4">
      <div class="mb-2 text-xl font-bold text-gray-900">
        {{ props.title }}
      </div>
      <p class="text-base text-gray-700">
        <slot name="content" />
        <!-- Lorem ipsum dolor sit amet, consectetur adipisicing elit.
        Voluptatibus quia, nulla! Maiores et perferendis eaque,
        exercitationem praesentium nihil. -->
      </p>
    </div>
    <!-- <div class="px-6 pt-4 pb-2">
      <span
        class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
      >#photography</span>
      <span
        class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
      >#travel</span>
      <span
        class="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full"
      >#winter</span>
    </div> -->
  </div>
</template>
