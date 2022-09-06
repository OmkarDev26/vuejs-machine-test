<template>
  <div class="home">
    <CountryHome />
  </div>
</template>

<script>
import CountryHome from "./components/CountryHome.vue";

export default {
  name: "HomeView",
  components: {
    CountryHome,
  },
};
</script>
