import axios from "axios";

const baseUrl = "http://localhost:8080/vendor";

class ServiceSale {

  getAllPaymentsMethods() {
    return axios.get(baseUrl + "/paymentmethod");
  }

  saveSaleWithDetails(saleData) {
    return axios.post(baseUrl + "/sales/create", saleData);
  }

}

const saleServiceInstance = new ServiceSale();

export default saleServiceInstance;