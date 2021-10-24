const axios = require('axios');
require('dotenv').config({path: __dirname + '/./../../.env'});
const algoliasearch = require('algoliasearch');

const DATA_TYPES = [
  'authors'
]

const algoliaSearchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY);


// const algoliaIndex = algoliaSearchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);
const algoliaIndex = algoliaSearchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

const updateAlgoliaData = async (dataArray) => {
  try {
    const res = await algoliaIndex.replaceAllObjects(dataArray, { autoGenerateObjectIDIfNotExist : true})
    return res;
  } catch(err) {
    console.log('err', err)
    return err;
  }
}

const parseAuthor = (author) => {
  const authorLocation = author.location ? author.location.name : '';
  const authorTimePeriod = author.timePeriod ? author.timePeriod.name : '';
  return {
    type: 'authors',
    location: authorLocation,
    period: authorTimePeriod,
    shortBiography: author.shortBiography,
    date: author.date,
    name: author.name,
    id: author.id
  }
}

const fetchStrapiApi = async (path) => {
  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
  const response = await axios({
    method: 'get',
    url: requestUrl,
  });
  return response.data.map(datum => parseAuthor(datum));
  // return JSON.stringify(response.data.map(datum => parseAuthor(datum)));
  } catch(err) {
    console.log(err)
  }
}


const performRequest = async (endpoint) => {

  const authorOptions = await fetchStrapiApi("authors");
  const updateRes = await updateAlgoliaData(authorOptions)
  console.log(authorOptions)
  console.log('updateRes', updateRes)
}

module.exports = performRequest();