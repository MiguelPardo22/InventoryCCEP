import axios from "axios";

const baseUrl = "http://localhost:8080/user";

class ServiceUser {
  findByEmail(email) {
    return axios.get(baseUrl + "/findByEmail/" + email);
  }
}

const userServiceInstance = new ServiceUser();

export default userServiceInstance;
