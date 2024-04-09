import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServiceSupplier {
  getAllSuppliersPaginated(page, size) {
    return axios.get(baseUrl + "/suppliers?page=" + page + "&size=" + size);
  }

  getAllSuppliersNotPaginated() {
    return axios.get(baseUrl + "/suppliersnotpaginated");
  }

  add(supplier) {
    return axios.post(baseUrl + "/suppliers/create", supplier);
  }

  byId(id) {
    return axios.get(baseUrl + "/suppliers/" + id);
  }

  update(id, supplier) {
    return axios.put(baseUrl + "/suppliers/update/" + id, supplier)
  }

  delete(id) {
    return axios.delete(baseUrl + "/suppliers/delete/" + id)
  }
}

const supplierServiceInstance = new ServiceSupplier();

export default supplierServiceInstance;