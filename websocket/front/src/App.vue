<script setup>
// 1. 实例化
let ws = new WebSocket("ws://localhost:3001");
// 2.open
ws.onopen = function () {
  console.log("连接成功");

  // 客户端给服务端发送数据
  ws.send("hello");
};
// 3.message
ws.onmessage = function (e) {
  // 服务端给客户端发送的数据
  console.log('服务端给客户端发送的数据', e.data);
};
// 4.close
ws.onclose = function () {
  console.log("连接关闭");
};
// 5.error
ws.onerror = function () {
  console.log("连接错误");
};

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
