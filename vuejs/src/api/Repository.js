import axios from "axios";

// const baseDomain = "http://localhost:8080";
const baseDomain = process.env.VUE_APP_BASE_CORE_API;

const baseURL = `${baseDomain}`;

export default axios.create({
  baseURL,
});
