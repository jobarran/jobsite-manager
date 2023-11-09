import axios from "axios";

const jobSiteManagementApi = axios.create({
    baseURL: '/api'
});

export default jobSiteManagementApi