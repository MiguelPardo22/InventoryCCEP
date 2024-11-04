import axios from "axios";

const baseUrl = "http://localhost:8080/admin";

class ServiceReport {
  getSalesSummary(startDate, endDate) {
    return axios.get(baseUrl + "/report/summary" + `?startDate=${startDate}&endDate=${endDate}`);
  }
}

const reportServiceInstance = new ServiceReport();

export default reportServiceInstance;
