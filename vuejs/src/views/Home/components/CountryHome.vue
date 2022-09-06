<template>
  <div class="home">
    <h3>Please Select a Country</h3>
    <b-form-select
      v-model="selectedCountry"
      :options="countries"
      @change="getCountryById"
      class="align"
    >
      <template #first>
        <b-form-select-option value="null" disabled
          >-- Please select an option --</b-form-select-option
        >
      </template></b-form-select
    >
    <b-card
      border-variant="light"
      :img-src="getCountryImage"
      img-alt="Image"
      img-top
      tag="article"
      style="max-width: 20rem"
      class="mt-2 mb-2 pt-1 container"
      v-if="selectedCountryData.length"
    >
      <b-card-text>
        #{{ selectedCountryData[0].rank }} {{ selectedCountryData[0].name }}
      </b-card-text>
    </b-card>
  </div>
</template>

<script>
export default {
  name: "CountryHome",
  data() {
    return {
      countries: [],
      selectedCountry: "",
      selectedCountryData: {},
    };
  },

  methods: {
    async getCountries() {
      const { data } = await this.$store.dispatch("country/getCountries");
      this.countries = data.map((x) => {
        return {
          value: x.rank,
          text: x.name,
        };
      });
    },

    async getCountryById() {
      const { data } = await this.$store.dispatch(
        "country/getCountryById",
        this.selectedCountry
      );

      this.selectedCountryData = data;
    },
  },

  computed: {
    getCountryImage() {
      return this.selectedCountryData.length
        ? `http://localhost:8080/${this.selectedCountryData[0].flag}`
        : "";
    },
  },

  mounted() {
    console.log(process.env.VUE_APP_BASE_CORE_API);
    this.getCountries();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
