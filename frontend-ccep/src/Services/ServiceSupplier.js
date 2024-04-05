import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServiceSupplier {
  getAllSuppliers() {
    return axios.get(baseUrl + "/suppliers");
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