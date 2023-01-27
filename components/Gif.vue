<!-- <template>
  <div id="app">
    <h1>Amazing Gif Searcher</h1>
    <select v-model="category">
      <option value="animals">Animals</option>
      <option value="food">Food</option>
      <option value="funny">Funny</option>
    </select>
    <input v-model="searchTerm" type="text" />
    <button
      class="bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus:outline-none focus:ring focus:ring-violet-300"
      @click="getGifs()"
    >
      Search
    </button>
    <div class="gif-container">
      <img
        v-for="gif in gifs"
        :src="gif"
        :key="gif.id"
        @click="selectGif(gif)"
      /> <button clas="bg-violet-500" @click="send()">Send Gif</button>
    </div>
   
  </div>
</template>

<script>
  import { toRefs } from "vue";
  import io from "socket.io-client";
  let socket;
  export default {
    data() {
      return {
        searchTerm: "",
        category: "",
        gifs: [],
        selectedGif: null,
        messages: []
      };
    },
    methods: {
        getGifs() {
    let apiKey = "MiwESYfmygMOK30bkzKSGhuDiQ5pZbZB";
    let searchEndPoint = "https://api.giphy.com/v1/gifs/search?";
    let limit = 5;
    let query = encodeURIComponent(this.category + " " + this.searchTerm);
    let url = `${searchEndPoint}api_key=${apiKey}&q=${query}&limit=${limit}`;
    fetch(url)
      .then(response => response.json())
      .then(json => this.buildGifs(json))
      .catch(err => console.log(err));
  },
      buildGifs(json) {
        this.gifs = json.data.map(gif => gif.id).map(gifId => {
          return `https://media.giphy.com/media/${gifId}/giphy.gif`;
        });
      },
      selectGif(gif) {
        this.selectedGif = gif
        console.log({gif});
},
 addToChat(m) {
  if (m.startsWith("http") || m.startsWith("www")) {
    m = `<a class="hover:underline" href="${m}" target="_blank">${m}</a>`;
  }
  chatLog.value += `<div>${m}</div>`;
},
 send() {
  socket.emit("message", this.selectedGif.value);
  addToChat(this.selectedGif.value); 
  this.selectedGif.value = "";
}
  
    }
  };
</script>
<style>
#app {
  font-family: "CosiTimes";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
input {
  padding: 5px;
  margin-bottom: 20px;
}
.button {
  background-color: rgb(0, 172, 0);
  color: white;
  padding: 5px 20px;
  border: none;
  display: block;
  margin: 0 auto;
}
.button:hover {
  background-color: rgb(0, 148, 0);
}
.gif-container {
  margin-top: 30px;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style> -->
