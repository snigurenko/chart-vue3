<template>
  <div>
    <h1>Relayer Details</h1>
    <div v-if="chartData">    <Bar :data="chartData" :options="chartOptions" /></div>

  </div>
</template>

<script setup>
  import axios from 'axios';
  import { ref } from 'vue';
  import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
} from 'chart.js'
import { Bar } from 'vue-chartjs'

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)


  const apiKey = ref('4PZGPPTPWAHYY74TTG9KA4P831MH7RCBHT');
  const contractAddress = ref('0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136'); // harcoded your test id
  const transactions = ref(null);

  const fetchRelayerData = async () => {
        const etherscanUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${contractAddress.value}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey.value}`;
        try {
          const response = await axios.get(etherscanUrl);
          transactions.value = response.data.result;
        } catch (error) {
          console.error('Error fetching relayer data:', error);
        } finally {
          console.log(123, transactions.value);
          renderChart();
        }
  };

  fetchRelayerData();

  const chartData = ref(null);
  const chartOptions = ref({ responsive: true });

  const renderChart = () => {
      const labels = transactions.value.map(tx => new Date(tx.timeStamp * 1000).toLocaleString());
      const data = transactions.value.map(tx => tx.gasPrice / (10 ** 18));

      console.log("labels:", labels);
      console.log("data:", data);

      chartData.value = {
        labels: labels.slice(0, 100),
        datasets: [{ data: data.slice(0, 100) }],
      };
  };
</script>

<style>
canvas {
  max-width: 100%;
}
</style>
