<template>
  <div class="flex">
    <nav class="w-1/4 bg-gray-200 h-screen p-4">
      <router-link to="/" class="block py-2 px-4 mb-2 rounded-lg bg-white text-gray-800 hover:bg-gray-300">Home</router-link>
      <router-link to="/manifests" class="block py-2 px-4 mb-2 rounded-lg bg-white text-gray-800 hover:bg-gray-300">Manifests</router-link>
      <router-link to="/chart" class="block py-2 px-4 mb-2 rounded-lg bg-white text-gray-800 hover:bg-gray-300">Example Chart (Step 3)</router-link>
      <router-link to="/about" class="block py-2 px-4 mb-2 rounded-lg bg-white text-gray-800 hover:bg-gray-300">About</router-link>
    </nav>
    <div class="flex-1 p-4">
      <router-view/>
    </div>
  </div>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
