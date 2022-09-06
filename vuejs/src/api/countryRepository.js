import Repository from "./Repository";

const getCountryAllDetails = "/";
const getCountries = "/countries";
const getCountryById = "/country/";
const addCountry = "/country";

const formDataConfig = {
  headers: { "Content-Type": "multipart/form-data" },
};

export default {
  getCountryAllDetails(payload) {
    return Repository.get(`${getCountryAllDetails}`, payload);
  },

  getCountries(payload) {
    return Repository.get(`${getCountries}`, payload);
  },

  getCountryById(payload) {
    return Repository.get(`${getCountryById}${payload}`);
  },

  addCountry(payload) {
    return Repository.post(`${addCountry}`, payload, formDataConfig);
  },
};
