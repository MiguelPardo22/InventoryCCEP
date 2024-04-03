import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServiceCategory {
  getAllCategories() {
    return axios.get(baseUrl + "/categories");
  }

  add(category) {
    return axios.post(baseUrl + "/categories/create", category);
  }

  byId(id) {
    return axios.get(baseUrl + "/categories/" + id);
  }

  update(id, category) {
    return axios.put(baseUrl + "/categories/update/" + id, category)
  }

  delete(id) {
    return axios.delete(baseUrl + "/categories/delete/" + id)
  }
}

const categoryServiceInstance = new ServiceCategory();

export default categoryServiceInstance;