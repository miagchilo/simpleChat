<template>
  <head>
    <link href="https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Press+Start+2P&family=Roboto&display=swap" rel="stylesheet">

  </head>
  <div class="isolate bg-white">
  <div class="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]">
    <svg class="relative left-[calc(50%-11rem)] -z-10 h-[21.1875rem] max-w-none -translate-x-1/2 rotate-[30deg] sm:left-[calc(50%-30rem)] sm:h-[42.375rem]" viewBox="0 0 1155 678" xmlns="http://www.w3.org/2000/svg">
      <path fill="url(#45de2b6b-92d5-4d68-a6a0-9b9b2abad533)" fill-opacity=".3" d="M317.219 518.975L203.852 678 0 438.341l317.219 80.634 204.172-286.402c1.307 132.337 45.083 346.658 209.733 145.248C936.936 126.058 882.053-94.234 1031.02 41.331c119.18 108.451 130.68 295.337 121.53 375.223L855 299l21.173 362.054-558.954-142.079z" />
      <defs>
        <linearGradient id="45de2b6b-92d5-4d68-a6a0-9b9b2abad533" x1="1155.49" x2="-78.208" y1=".177" y2="474.645" gradientUnits="userSpaceOnUse">
          <stop stop-color="#9089FC"></stop>
          <stop offset="1" stop-color="#FF80B5"></stop>
        </linearGradient>
      </defs>
    </svg>
  </div>
  <div>
    <div class="flex justify-center flex h-screen bg-color" v-if="!connected">
      
      <div class="grid justify-items-center m-auto bg-hero">
        <h1 class="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">CHAT</h1>
        <h3>ENTER A USER NAME TO JOIN</h3>
        <NicknameForm @submit="connectToServer"/>
      </div>
      
    </div>
    <div  v-if="connected">
      <h1 class="flex justify-center">CHACHATCHAT</h1>
      <div class="flex justify-center">
      <div class="flex flex-row gap-4">
        <div class="size border border-black	border-2">
          <h4>ONLINE</h4>
          <ul>
            <li v-for="user in connectedUsers" :key="user">{{ user }}</li>
          </ul>
        </div>
        
        <ChatLog :chat-log="chatLog"/> <input v-model="text" @keyup.enter="send"  @focus="startTyping(nickname)" @blur="stopTyping(nickname)" class="border border-gray-100" v-if="connected"/>
      
      <button  class="inline-block rounded-md border border-transparent bg-indigo-600 py-3 px-8 text-center font-medium text-white hover:bg-indigo-700" @click="send" v-if="connected">SEND</button>
      </div>
    </div>
     </div>
  </div>
  </div>

</template>

<script setup>
// const { $socket } = useNuxtApp();
import io from "socket.io-client";
import ChatLog from "./components/ChatLog.vue";
import { ref, computed } from 'vue'
const config = useRuntimeConfig();
const chatLog = ref("");
const gif = ref("");
const text = ref("");
const nickname = ref(""); 
let socket;
const connected = ref(false);
const typing = ref(false);
const typingValue = ref("")
const users = ref({});
// const reader = new FileReader();
function addToChat(m) {
  if (m.startsWith("http") || m.startsWith("www")) {
    m = `<a class="hover:underline" href="${m}" target="_blank">${m}</a>`;
  }
  chatLog.value += `<div>${m}</div>`;
}
function send() {
  socket.emit("message", text.value);
  addToChat(text.value); 
  text.value = "";
}
function startTyping(nickname) {
  typingValue.value = text.value
  typing.value = true;
  socket.emit("typing", nickname);
}
function stopTyping(nickname) {
  typingValue.value = ""
  typing.value = false;
  socket.emit("stop_typing", nickname);
}
function connectToServer(nickname) {
  socket = io(config.public.wssUrl);
  socket.emit('join', { id: socket.id, nickname: nickname });
  connected.value = true;
  socket.on("message", (data) => {
    console.log(data, "<<<<");
    addToChat(data.message);
  });
  socket.on("updateUsers", (data) => {
    users.value = data;
  });
}
const connectedUsers = computed(() => {
  return users.value ? Object.entries(users.value).filter(([user, status]) => status).map(([user]) => user) : []
});
</script>
<style scoped>
* {
  z-index: 1;
}
h1 {
  font-size: 143px;
  line-height: 174px;
 
}
h3 {
  font-size: 30px;
  font-weight: 300;
  font-size: 30px;
  line-height: 39px;
  font-weight: 200;
  letter-spacing: 0.635em;
  padding-bottom: 40px;
}
.bg-color {
  background-color: #EFEFEF;
}
.z-index {
    z-index: 0;
}
.scale {
  transform: scale();
}


.size {
width: 198px;
height: 576px;
}
</style>