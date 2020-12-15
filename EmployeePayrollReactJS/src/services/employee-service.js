import config from "../config/config";
import AxiosService from "./axios-service";
export default class EmployeeService {
    baseUrl = config.baseUrl;
    axiosService = new AxiosService()
    addEmployee(data) {
        return this.axiosService.postService(`${this.baseUrl}/create/`, data);
    }

    getAllEmployee() {
        return this.axiosService.getService(`${this.baseUrl}`);
    }
}