

export default class StrapiClient {
  constructor() {}

  async fetchAPI(path) {
    const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
    const response = await fetch(requestUrl);
    const data = await response.json();
    return data;
  }
}