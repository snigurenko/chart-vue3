<template>
  <div class="container mx-auto p-5 h-screen overflow-y-auto bg-gray-200">
    <div v-if="dataFeeds" class="text-red-800">to proper fetch the manifests list, please run the server, with includet as separate project</div>
    <div v-for="(feed, key) in dataFeeds" :key="key" class="data-feed bg-white p-6 mb-6 rounded-lg shadow hover:shadow-lg transition-shadow duration-300 ease-in-out">
      <h2 class="text-2xl font-semibold mb-4">{{ key }}</h2>
      <div class="feed-content grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="feed-section mb-4">
          <p><strong>Chain:</strong> {{ feed.chain.name }} (ID: {{ feed.chain.id }})</p>
          <div @click="viewDetails(feed.adapterContract)" class="flex justify-between cursor-pointer text-blue-600 hover:text-blue-800 transition-colors duration-200 ease-in-out">
            <span>Adapter Contract:</span>
            <span role="button" class="text-green-600 hover:text-green-800 transition-colors duration-200 ease-in-out">{{ feed.adapterContract }}</span>
          </div>
        </div>
        <div class="feed-section mb-4">
          <p><strong>Data Service ID:</strong> {{ feed.dataServiceId }}</p>
          <p><strong>Update Triggers:</strong></p>
          <ul class="list-disc list-inside">
            <li v-if="feed.updateTriggers.deviationPercentage">Deviation Percentage: {{ feed.updateTriggers.deviationPercentage }}%</li>
            <li v-if="feed.updateTriggers.timeSinceLastUpdateInMilliseconds">Time Since Last Update: {{ feed.updateTriggers.timeSinceLastUpdateInMilliseconds / 1000 / 60 }} minutes</li>
            <li v-if="feed.updateTriggers.cron">
              Cron:
              <ul class="list-disc list-inside ml-4">
                <li v-for="cron in feed.updateTriggers.cron" :key="cron">{{ cron }}</li>
              </ul>
            </li>
          </ul>
        </div>
        <div class="feed-section mb-4">
          <p><strong>Price Feeds:</strong></p>
          <ul class="list-disc list-inside">
            <li v-for="(address, currency) in feed.priceFeeds" :key="currency">{{ currency }}: {{ address }}</li>
          </ul>
        </div>
        <div class="feed-section mb-4">
          <button @click="fetchLiveData(feed.adapterContract)" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition-colors duration-200 ease-in-out">Get Latest Update</button>
          <div v-if="liveData[feed.adapterContract]" class="live-data mt-4">
            <p>Latest Update Time: {{ liveData[feed.adapterContract]?.updateTime }}</p>
            <p>Latest Value: {{ liveData[feed.adapterContract]?.value }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios';
import Web3 from 'web3';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const contractABI = []; // I did not get from where should I take ABI

const dataFeeds = ref({});
const liveData = ref({});
const web3 = ref({});

web3.value = new Web3(Web3.givenProvider);

const fetchDataFeeds = async () => {
      try {
        const response = await axios.get('http://localhost:4000/fetch-manifests');
        dataFeeds.value = response.data;
      } catch (error) {
        console.error('Error fetching data feeds:', error);
      }
    };

fetchDataFeeds();

const fetchLiveData = async (adapterContract) => {
      try {
        const contract = new this.web3.eth.Contract(contractABI, adapterContract);

        const updateTime = await contract.methods.getBlockTimestampFromLatestUpdate().call();
        const value = await contract.methods.getValueForDataFeed(this.web3.utils.asciiToHex('BTC')).call();

        this.$set(liveData.value, adapterContract, {
          updateTime: new Date(updateTime * 1000).toLocaleString(),
          value
        });
      } catch (error) {
        console.error('Error fetching live data:', error);
      }
};

const viewDetails = (arg) => {
      console.log(arg);
      router.push({ path: `manifests/${arg}` });
};
</script>

<style>
.data-feed {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>






