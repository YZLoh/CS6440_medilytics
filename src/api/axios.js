import axios from "axios";

export const axiosSetup1 =  axios.create({
    baseURL: 'http://localhost:8088'
    // baseURL:'https://fhir.collablynk.com/edifecs/fhir/R4'
});

export const axiosSetup2 =  axios.create({  
    baseURL: 'http://localhost:8089'
});

export default axiosSetup2;