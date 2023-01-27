/** @type {import('tailwindcss').Config} */


module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    fontFamily: {
      sans: ["CosiTimes"],
      serif: ["CosiTimes"],
      mono: ["CosiTimes"],
      display: ["CosiTimes"],
      body: ["CosiTimes"]
    },
    extend: {
      'hero': "url('https://giphy.com/embed/34JMWQFhrdlCiOXuNK/video')",
    },
  },
  plugins: [],
};
