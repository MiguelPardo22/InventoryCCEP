import axios, { AxiosHeaders } from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServicePurchase {
  getPurchasesPaginated(page, size) {
    return axios.get(baseUrl + "/purchases?page=" + page + "&size=" + size);
  }

  getPurchaseDetailsById(purchaseId) {
    return axios.get(baseUrl + "/detailsbyid/" + purchaseId);
  }

  savePurchaseWithDetails(purchase) {
    return axios.post(baseUrl + "/purchase/create", purchase);
  }

  deletePurchasesAndDetails(id){
    return axios.delete(baseUrl + "/purchase/delete/" + id);
  }
}

const purchaseServiceInstance = new ServicePurchase();

export default purchaseServiceInstance;
