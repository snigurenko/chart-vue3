<template>
  <div class="p-6 text-left">
    <h1 class="text-2xl font-bold mb-4">We would like to implement UI which will represent current state of our data feeds deployed on different chains in the classic model.</h1>

    <div class="mb-6">
      <h2 class="text-xl font-semibold">STEP 1</h2>
      <p class="italic">(Simple component)</p>
      <p class="mt-2">Display information from our relayers manifests in a human readable format (UI) with update triggers conditions and links to the corresponding contracts. You can fetch all required information from this url:</p>
      <a href="https://p6s64pjzub.execute-api.eu-west-1.amazonaws.com/dev/execute" target="_blank" class="text-blue-500">https://p6s64pjzub.execute-api.eu-west-1.amazonaws.com/dev/execute</a>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold">STEP 2</h2>
      <p class="italic">(Getting data from smart-contract)</p>
      <p class="mt-2">Add live info (e.g. about the latest update). You can get time of the latest update using <code>getBlockTimestampFromLatestUpdate</code> function on the adapter smart contract. To get the latest value you can use the <code>getValueForDataFeed(bytes32 dataFeedId)</code> function.</p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold">STEP 3</h2>
      <p class="italic">(Simple chart)</p>
      <p class="mt-2">Implement a subpage showing details of a relayer with a chart. The data points could be taken either from smart contract or from external API (like etherscan):</p>
      <a href="https://etherscan.io/address/0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136#events" target="_blank" class="text-blue-500">https://etherscan.io/address/0xdDb6F90fFb4d3257dd666b69178e5B3c5Bf41136#events</a>
      <p class="mt-2">It's enough to implement just one page with the data coming from the url above.</p>
    </div>

    <div class="mb-6">
      <h2 class="text-xl font-semibold">Key details</h2>
      <p class="mt-2">Work on <a href="https://github.com/redstone-finance/redstone-app" target="_blank" class="text-blue-500">https://github.com/redstone-finance/redstone-app</a></p>
      <p class="mt-2">Reuse existing components</p>
      <p class="mt-2">Let's research what are the best way to get valid details about chains, like urls to blockchain explorers, logos, names (maybe something like <a href="https://chainlist.org/chain/42161" target="_blank" class="text-blue-500">https://chainlist.org/chain/42161</a>, maybe we will just hardcode it in our own json file)</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeComponent',
};
</script>

<style scoped>
/* Add any custom styles if needed */
</style>
