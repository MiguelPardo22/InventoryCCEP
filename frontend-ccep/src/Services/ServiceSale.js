import axios from "axios";

const baseUrl = "http://localhost:8080/vendor";

class ServiceSale {

  getSalesList(page, size) {
    return axios.get(baseUrl + "/sales?page=" + page + "&size=" + size);
  }

  getSaleDetailById(saleId) {
    return axios.get(baseUrl + "/detailsbyid/" + saleId);
  }

  getAllPaymentsMethods() {
    return axios.get(baseUrl + "/paymentmethod");
  }

  saveSaleWithDetails(saleData) {
    return axios.post(baseUrl + "/sales/create", saleData);
  }

}

const saleServiceInstance = new ServiceSale();

export default saleServiceInstance;