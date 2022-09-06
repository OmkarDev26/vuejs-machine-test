<template>
  <div class="country d-flex justify-content-around">
    <b-form class="mx-auto">
      <b-form-group
        class="mb-2"
        id="input-group-2"
        label="Country Name:"
        v-model="name"
        label-for="input-2"
      >
        <b-form-input
          id="input-1"
          placeholder="Enter country name"
          v-model="name"
          required
          :state="invalidName || duplicateName"
          type="text"
        ></b-form-input>
        <span class="text-danger" v-if="!invalidName && invalidName != null"
          >Country name length should be greater than 2</span
        >
      </b-form-group>

      <b-form-group
        class="mb-2"
        id="input-group-2"
        label="Country Rank:"
        label-for="input-2"
      >
        <b-form-input
          id="input-2"
          placeholder="Enter country rank"
          v-model="rank"
          type="number"
          min="1"
          required
          :state="duplicateRank"
        ></b-form-input>
        <span class="text-danger" v-if="!duplicateRank && duplicateRank != null"
          >duplicate rank</span
        >
      </b-form-group>

      <div class="mb-2">
        Select Country Continent:
        <b-form-select
          label-field="Select Country Continent"
          v-model="selectedContinent"
          :options="continents"
          class="align"
        >
          <template #first>
            <b-form-select-option value="null" disabled
              >-- Please select an option --</b-form-select-option
            >
          </template></b-form-select
        >
      </div>

      <b-form-file
        v-model="file2"
        @input="showFile"
        class="mt-3"
        plain
        accept="image/jpeg, image/png"
        required
      ></b-form-file>
      <div class="m-3">
        <img v-if="preview" :src="preview" alt="preview" height="200px" />
      </div>

      <b-button @click="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger">Reset</b-button>
    </b-form>
    <b-table class="w-50" striped hover :items="allCountries">
      <template #cell(flag)="data">
        <img :src="getCountryImage(data)" :alt="data" height="50px" />
      </template>
    </b-table>
  </div>
</template>
<script>
export default {
  name: "AddCountry",
  data() {
    return {
      name: "",
      invalidName: null,
      duplicateName: null,
      duplicateRank: null,
      rank: "",
      file2: null,
      preview: "",
      continents: [],
      selectedContinent: "",
      allCountries: [],
      isInvalid: "",
    };
  },

  watch: {
    name(newValue) {
      if (newValue.length < 3) {
        this.invalidName = false;
      } else if (newValue.length == 0) {
        this.invalidName = null;
      } else {
        this.invalidName = true;
      }
    },
  },

  methods: {
    async getAllCountries() {
      const { data } = await this.$store.dispatch(
        "country/getCountryAllDetails"
      );
      this.allCountries = data.countries;
    },

    async getContinents() {
      this.allCountries.forEach((element) => {
        const index = this.continents.findIndex(
          (x) => x.value === element.continent
        );
        if (index < 0) {
          this.continents.push({
            value: element.continent,
            text: element.continent,
          });
        }
      });
    },

    async submit() {
      if (this.invalidName) {
        const formData = new FormData();
        formData.append("name", this.name);
        formData.append("rank", this.rank);
        formData.append("continent", this.selectedContinent);
        formData.append("image", this.file2);
        const payload = {
          name: this.name,
          rank: this.rank,
          continent: this.selectedContinent,
        };
        Object.keys(payload).every((key) => {
          if (
            payload[key] == "" ||
            payload[key] == null ||
            this.file2 === null
          ) {
            alert("Please fill all the details");
            this.isInvalid = true;
          } else {
            this.isInvalid = false;
          }
        });

        if (!this.isInvalid) {
          const { data } = await this.$store.dispatch(
            "country/addCountry",
            formData
          );
          if (data && data.length) {
            data.forEach(async (element) => {
              if (element.duplicate == "rank") {
                this.duplicateRank = false;
              }
              if (element.duplicate == "name") {
                this.duplicateName = false;
              }
            });
          } else {
            this.name = "";
            this.rank = "";
            this.selectedContinent = "";
            this.preview = null;
            this.invalidName = false;
            debugger;
            await this.getAllCountries();
          }
        }
      }
    },

    getCountryImage(item) {
      return item ? `http://localhost:8080/${item.value}` : "";
    },

    showFile() {
      if (this.file2 != null && this.file2.size > 4194304) {
        this.file2 = null;
        this.preview = "";
        alert("large file not supported");
      } else if (this.file2 != null && this.file2.size < 4194304) {
        const input = event.target;
        if (input.files) {
          var reader = new FileReader();
          reader.onload = (e) => {
            this.preview = e.target.result;
          };
          reader.readAsDataURL(input.files[0]);
        }
      }
    },
  },

  async mounted() {
    await this.getAllCountries();
    await this.getContinents();
  },
};
</script>

<style>
.align {
  padding: 0.375rem 0.75rem;
}
</style>
