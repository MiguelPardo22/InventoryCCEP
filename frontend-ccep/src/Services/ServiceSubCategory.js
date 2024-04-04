import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServiceSubCategory {
  getAll() {
    return axios.get(baseUrl + "/subcategories");
  }

  add(subCategory) {
    return axios.post(baseUrl + "/subcategories/create", subCategory);
  }

  update(id, subCategory) {
    return axios.put(baseUrl + "/subcategories/update/" + id, subCategory)
  }

  delete(id) {
    return axios.delete(baseUrl + "/subcategories/delete/" + id)
  }
}

const subCategoryServiceInstance = new ServiceSubCategory();

export default subCategoryServiceInstance;