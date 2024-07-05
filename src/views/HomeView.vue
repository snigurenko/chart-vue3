<template>
  <div>
    <h1>Data Feeds</h1>
    <div v-for="(feed, key) in dataFeeds" :key="key" class="data-feed">
      <h2>{{ key }}</h2>
      <p>Chain: {{ feed.chain.name }} (ID: {{ feed.chain.id }})</p>
      <div @click="viewDetails(feed.adapterContract)" class="flex"><span>Adapter Contract:</span><span role="button"  class="text-success">{{ feed.adapterContract }}</span></div>
      <p>Data Service ID: {{ feed.dataServiceId }}</p>
      <p>Update Triggers:</p>
      <ul>
        <li v-if="feed.updateTriggers.deviationPercentage">Deviation Percentage: {{ feed.updateTriggers.deviationPercentage }}%</li>
        <li v-if="feed.updateTriggers.timeSinceLastUpdateInMilliseconds">Time Since Last Update: {{ feed.updateTriggers.timeSinceLastUpdateInMilliseconds / 1000 / 60 }} minutes</li>
        <li v-if="feed.updateTriggers.cron">Cron: <ul><li v-for="cron in feed.updateTriggers.cron" :key="cron">{{ cron }}</li></ul></li>
      </ul>
      <p>Price Feeds:</p>
      <ul>
        <li v-for="(address, currency) in feed.priceFeeds" :key="currency">{{ currency }}: {{ address }}</li>
      </ul>
      <button @click="fetchLiveData(feed.adapterContract)">Get Latest Update</button>
      <div v-if="liveData[feed.adapterContract]" >
        <p>Latest Update Time: {{ liveData[feed.adapterContract]?.updateTime }}</p>
        <p>Latest Value: {{ liveData[feed.adapterContract]?.value }}</p>
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

const contractABI = [
  {
    "constant": true,
    "inputs": [],
    "name": "getBlockTimestampFromLatestUpdate",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "dataFeedId",
        "type": "bytes32"
      }
    ],
    "name": "getValueForDataFeed",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
];

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
      router.push({ path: `about/${arg}` });
};
</script>

<style>
.data-feed {
  border: 1px solid #ccc;
  padding: 1rem;
  margin-bottom: 1rem;
}
</style>






