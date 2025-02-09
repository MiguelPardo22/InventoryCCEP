import axios from "axios";

const baseUrl = "http://3.144.9.233:8080/backendCCEP-0.0.1-SNAPSHOT/user";

class ServiceUser {
  findByEmail(email) {
    return axios.get(baseUrl + "/findByEmail/" + email);
  }
}

const userServiceInstance = new ServiceUser();

export default userServiceInstance;
