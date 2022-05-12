import axios from "axios";
import {getJWT} from "./functions/function";

export default axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-type": "application/json",
    "Authorization": `Bearer ${getJWT()}`
  }
});