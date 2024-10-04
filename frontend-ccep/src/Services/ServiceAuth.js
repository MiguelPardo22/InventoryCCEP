import axios from "axios";

const baseUrl = "http://localhost:8080/auth";

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