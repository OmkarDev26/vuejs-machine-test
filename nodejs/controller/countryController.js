const countryController = {};
const countryServices = require("../services/countryServices");

countryController.getCountries = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await countryServices.getCountries(params);
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

countryController.getDetailedList = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await countryServices.getDetailedList(params);
      console.log(data);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

countryController.getCountryById = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await countryServices.getCountryById(params);
      resolve(data);
    } catch (error) {
      reject(error);
    }
  });
};

countryController.addCountry = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      const data = await countryServices.addCountry(params);
      resolve(data);
      //commit check
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = countryController;
