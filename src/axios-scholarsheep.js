import axios from "axios";

const instance = axios.create({
  baseURL: "https://scholar-sheep.firebaseio.com/",
});

export default instance;
