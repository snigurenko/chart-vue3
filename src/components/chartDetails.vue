<template>
  <div>
    <h1>Details Page with chart</h1>
    <span>Id: {{ id }}</span>
  </div>
</template>

<script setup>
  import { computed } from 'vue';
  import { useRoute } from 'vue-router';

  const route = useRoute();
  const id = computed(() => route.params.id);

</script>
