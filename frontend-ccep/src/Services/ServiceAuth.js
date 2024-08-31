import axios from "axios";

const baseUrl = "http://localhost:8080/auth";

class ServiceAuth {

    authentication(login) {
        return axios.post(baseUrl + "/login", login)
    }

}

const authServiceInstance = new ServiceAuth();

export default authServiceInstance;