<script setup>
import { onMounted } from "vue";

import Socket from "./utils/socket.js";

const socket = new Socket('ws://localhost:3001');

onMounted(() => {
  socket.connectWebSocket()
})

</script>

<template>

  <img src="/vite.svg" class="logo" alt="Vite logo" />

</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}

.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}

.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
