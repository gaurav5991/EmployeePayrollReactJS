import axios from 'axios';
export default class AxiosService {

    postService(url = '', payload = null, tokenRequired = false, httpOptions = null) {
        return axios.post(url, payload, tokenRequired && httpOptions);
    }

    getService(url = '') {
        let data = axios.get(url);
        //alert("From axios:" + data.toString())
        return data;
    }
}