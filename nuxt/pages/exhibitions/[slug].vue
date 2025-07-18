<template>
  <nuxt-link
    to="/exhibitions"
    class="rounded-xl bg-slate-100 px-4 py-2 transition-colors duration-200 lg:hover:bg-slate-400 lg:hover:text-white"
    >&larr; Back to all exhibitions</nuxt-link
  >

  <h1 class="mt-12">{{ exhibition.title }}</h1>

  <div class="mt-12">
    <div class="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <div></div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const { data, refresh } = await useSanityQuery(`*[_type == "exhibition" && slug.current == "${route.params.slug}"][0]`)

const exhibition = computed(() => data.value)
</script>
