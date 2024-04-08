import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServiceSubCategory {
  getAll(page, size) {
    return axios.get(baseUrl + "/subcategories" + `?page=${page}&size=${size}`);
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