import axios from "axios";

const baseUrl = "http://3.144.9.233:8080/backendCCEP-0.0.1-SNAPSHOT/auth";

class ServiceAuth {

    authentication(login) {
        return axios.post(baseUrl + "/login", login)
    }

    verifyToken(token) {
        return axios.post(baseUrl + "/validate-token", token)
    }

}

const authServiceInstance = new ServiceAuth();

export default authServiceInstance;