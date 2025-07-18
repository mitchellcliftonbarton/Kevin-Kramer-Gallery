<template>
  <h1>Exhibitions</h1>

  <ul class="mt-12 flex flex-col gap-4">
    <li
      v-for="exhibition in exhibitions"
      :key="exhibition._id"
    >
      <nuxt-link
        :to="`/exhibitions/${exhibition.slug.current}`"
        class="block inline-block rounded-xl bg-slate-100 px-4 py-1 transition-colors duration-200 lg:hover:bg-slate-400 lg:hover:text-white"
      >
        {{ exhibition.title }}
      </nuxt-link>
    </li>
  </ul>
</template>

<script setup>
const { data, refresh } = await useSanityQuery(`*[_type == "exhibition"]`)

const exhibitions = computed(() => data.value)
</script>
