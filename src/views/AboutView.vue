<template>
  <div class="about max-w-3xl mx-auto p-4">
    <h1 class="text-3xl font-bold mb-4">This is a Vue 3 project using various packages for functionality and utilities.</h1>
    <div class="mb-4">
      <h2 class="text-xl font-semibold mb-2">Packages Used:</h2>
      <ul class="list-inside list-disc pl-4">
        <li><b>Axios:</b> {{ packageVersions.axios }}</li>
        <li><b>Chart.js:</b> {{ packageVersions['chart.js'] }}</li>
        <li><b>Core-js:</b> {{ packageVersions['core-js'] }}</li>
        <li><b>Vue:</b> {{ packageVersions.vue }}</li>
        <li><b>Vue-Chartjs:</b> {{ packageVersions['vue-chartjs'] }}</li>
        <li><b>Vue-Router:</b> {{ packageVersions['vue-router'] }}</li>
        <li><b>Web3:</b> {{ packageVersions.web3 }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AboutComponent',
  data() {
    return {
      packageVersions: {
        axios: '^1.7.2',
        'chart.js': '^4.4.3',
        'core-js': '^3.8.3',
        vue: '^3.2.13',
        'vue-chartjs': '^5.3.1',
        'vue-router': '^4.0.3',
        web3: '^4.10.0'
      }
    };
  }
};
</script>

<style>
/* No need for additional styles, since Tailwind CSS is used */
</style>
