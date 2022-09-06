import { RepositoryFactory } from "@/api/RepositoryFactory";

const countryRepository = RepositoryFactory.get("country");

export default {
  async getCountryAllDetails(payload) {
    return await countryRepository.getCountryAllDetails(payload);
  },

  async getCountries(payload) {
    return await countryRepository.getCountries(payload);
  },

  async getCountryById(_, payload) {
    return await countryRepository.getCountryById(payload);
  },

  async addCountry(_, payload) {
    return await countryRepository.addCountry(payload);
  },
};
