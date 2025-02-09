import axios from "axios";

const baseUrl = "https://fuji-bargains-kilometers-indie.trycloudflare.com/backendCCEP-0.0.1-SNAPSHOT/user";

class ServiceUser {
  findByEmail(email) {
    return axios.get(baseUrl + "/findByEmail/" + email);
  }
}

const userServiceInstance = new ServiceUser();

export default userServiceInstance;
