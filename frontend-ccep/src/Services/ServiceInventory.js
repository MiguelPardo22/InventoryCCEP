import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServiceInventory {

    getInventory(page, size){
        return axios.get(baseUrl + "/inventories" + `?page=${page}&size=${size}`);
    }

}

const inventoryServiceInstance = new ServiceInventory();

export default inventoryServiceInstance;