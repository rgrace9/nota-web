import axios from 'axios';

const fetchStrapiApi = async (path) => {
 
      const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
      const response = await axios({
        method: 'get',
        url: requestUrl,
      });
      return response.data;
}
export default class StrapiClient {
  constructor() {
    this.fetchAPI = this.fetchAPI.bind(this)
  }

   async fetchAPI(path) {
      const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
      const response = await fetch(requestUrl);
      const data = response.json();
      return data;
  }

}

const STRAPI_CLIENT = new StrapiClient();

export {
  STRAPI_CLIENT,
  fetchStrapiApi
};