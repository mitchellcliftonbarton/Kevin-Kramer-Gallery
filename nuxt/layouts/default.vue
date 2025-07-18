<template>
  <div id="root">
    <MainNav />

    <main class="p-8">
      <slot />
    </main>
  </div>
</template>

<script setup>
import MainNav from '~/components/MainNav.vue'

// get runtime config and event bus
const runTimeConfig = useRuntimeConfig()
</script>
