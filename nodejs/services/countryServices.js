const countryServices = {};
const fs = require("fs");
const countryData = "./data/data.json";

countryServices.getCountries = () => {
  return new Promise(async (resolve, reject) => {
    try {
      fs.readFile(countryData, "utf-8", (err, data) => {
        if (data) {
          const parsedData = JSON.parse(data);
          const assign = parsedData.countries.map((x) => {
            return { name: x.name, rank: x.rank };
          });
          //   console.log(assign);
          resolve(assign);
        }
        if (err) {
          console.log(err);
          reject(err);
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

countryServices.getDetailedList = () => {
  return new Promise(async (resolve, reject) => {
    try {
      fs.readFile(countryData, "utf-8", (err, data) => {
        if (data) {
          const parsedData = JSON.parse(data);
          //   console.log(assign);
          resolve(parsedData);
        }
        if (err) {
          console.log(err);
          reject(err);
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

countryServices.getCountryById = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      fs.readFile(countryData, "utf-8", (err, data) => {
        if (data) {
          const parsedData = JSON.parse(data);
          const assign = parsedData.countries.filter(
            (x) => x.rank == params.country
          );
          resolve(assign);
        }
        if (err) {
          console.log(err);
          reject(err);
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

countryServices.addCountry = (params) => {
  return new Promise(async (resolve, reject) => {
    try {
      fs.readFile(countryData, "utf-8", (err, data) => {
        if (err) reject(err);
        if (data) {
          // console.log(params);
          const parsedData = JSON.parse(data);
          let checkData = [];
          parsedData.countries.filter((x) => {
            if (x.name.toLowerCase() == params.name.toLowerCase()) {
              checkData.push({ duplicate: "name" });
            }
            if (x.rank == params.rank) {
              checkData.push({ duplicate: "rank" });
            }
          });
          if (!checkData.length) {
            parsedData.countries.push(params);
            // resolve(parsedData);
            fs.writeFile(
              countryData,
              JSON.stringify(parsedData),
              "utf-8",
              (err) => {
                if (err) {
                  reject(err);
                } else resolve(JSON.parse(data));
              }
            );
          } else {
            resolve(checkData);
          }
        }
      });
    } catch (error) {
      console.log(error);
      reject(error);
    }
  });
};

module.exports = countryServices;
