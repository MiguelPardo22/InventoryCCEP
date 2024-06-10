import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServicePurchase {

    savePurchaseWithDetails(purchase) {
        return axios.post(baseUrl +  "/purchase/create", purchase);
    }

};

const purchaseServiceInstance = new ServicePurchase();

export default purchaseServiceInstance;