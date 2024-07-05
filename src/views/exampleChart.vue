<template>
  <div>
    <h1>Example Cart (task step 3) where hardcoded contractAddress (0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136) was used</h1>
    <div v-if="loading">
      <span>Loading...</span>
      <div class="skeleton-loader">
        <div class="skeleton-text" style="width: 100%; height: 20px;"></div>
        <div class="skeleton-chart" style="width: 100%; height: 300px;"></div>
        <div class="skeleton-buttons">
          <div class="skeleton-button" style="width: 150px; height: 40px;"></div>
          <div class="skeleton-button" style="width: 150px; height: 40px;"></div>
        </div>
    </div>


    </div>
    <div v-else>
      <Bar v-if="chartData" :data="chartData" :options="chartOptions" />
      <div class="flex space-x-4">
        <button 
          @click="useFirst100labels" 
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 transition duration-300"
        >
          Show First 100
        </button>
        <button 
          @click="useAllLabels" 
          class="bg-green-500 text-white font-bold py-2 px-4 rounded hover:bg-green-700 transition duration-300"
        >
          Show All
        </button>
      </div>
    </div>
    
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


  const apiKey = ref('4PZGPPTPWAHYY74TTG9KA4P831MH7RCBHT'); // I registered at Etherscan and create my own API key
  const contractAddress = ref('0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136'); // hardcoded your test id
  const transactions = ref(null);
  const loading = ref(true);

  const fetchRelayerData = async () => {
        const etherscanUrl = `https://api.etherscan.io/api?module=account&action=txlist&address=${contractAddress.value}&startblock=0&endblock=99999999&sort=asc&apikey=${apiKey.value}`;
        loading.value = true;
        try {
          const response = await axios.get(etherscanUrl);
          transactions.value = response.data.result;
        } catch (error) {
          console.error('Error fetching relayer data:', error);
        } finally {
          loading.value = false;
          renderChart();
        }
  };

  fetchRelayerData();

  const chartData = ref(null);
  const chartOptions = ref({ responsive: true });

  const generateChartData = (transactionsSubset) => {
  const labels = transactionsSubset.map(tx => new Date(tx.timeStamp * 1000).toLocaleString());
  const data = transactionsSubset.map(tx => tx.gasPrice / (10 ** 18));

  return {
    labels: labels,
    datasets: [{ 
      label: "Gas Price",
      backgroundColor: '#f87979',
      data: data }],
  };
};

const renderChart = () => {
  chartData.value = generateChartData(transactions.value);
};

const useFirst100labels = () => {
  chartData.value = generateChartData(transactions.value.slice(0, 100));
};

const useAllLabels = () => {
  chartData.value = generateChartData(transactions.value);
};
</script>

<style>
  .skeleton-loader {
    padding: 20px;
    background-color: #f3f3f3;
    border-radius: 4px;
    margin-bottom: 20px;
  }
  .skeleton-text {
    background-color: #e0e0e0;
    margin-bottom: 10px;
  }
  .skeleton-chart {
    background-color: #e0e0e0;
    margin-bottom: 10px;
  }
  .skeleton-buttons {
    display: flex;
    gap: 10px;
  }
  .skeleton-button {
    background-color: #4285f4;
    border-radius: 4px;
  }
</style>