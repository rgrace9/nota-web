const axios = require('axios');
require('dotenv').config({path: __dirname + '/./../../.env'});
const algoliasearch = require('algoliasearch');

const DATA_TYPES = [
 {type: 'authors',
 path: 'authors'
  },
  {
    type: 'lessonPlans',
    path: 'lesson-plans'
  },
  {
    type: 'transcriptions',
    path: 'transcriptions'
  },
  {
    type: 'translations',
    path: 'translations'
  },
]

const algoliaSearchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_ADMIN_API_KEY);

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

const createAuthorTitle = (author) => {

  let authorTitleValues = [];

  author.location && authorTitleValues.push(author.location.name);
  author.timePeriod && authorTitleValues.push(author.timePeriod.name);
  author.date && authorTitleValues.push(author.date);
  
  return authorTitleValues.join(` | `)
}

const parseAuthor = (author) => {


  return {
    type: 'authors',
    title: createAuthorTitle(author),
    description: author.shortBiography,
    id: author.id
  }
}

const parseLessonPlan = (lessonPlan) => {

  return {
    type: 'lessonPlans',
    id: lessonPlan.id,
    title: lessonPlan.title,
    description: lessonPlan.description
  }
}

const parseTranscription = (transcription) => {
  return {
    type: 'transcriptions',
    id: transcription.id,
    title: transcription.title,
    description: transcription.description
  }
}

const parseTranslation = (translation) => {
  return {
    type: 'translations',
    id: translation.id,
    title: translation.title,
    description: translation.description
  }
}

const fetchStrapiApi = async (path) => {
  try {
    const requestUrl = `${process.env.NEXT_PUBLIC_STRAPI_API_URL}${path}`;
    const response = await axios({
      method: 'get',
      url: requestUrl,
    });

    return response.data;
  } catch(err) {
    console.log(err)
  }
}


const performRequest =  async () => {
  let dataResponse = [];

  DATA_TYPES.forEach(async (value) => {
    const {type, path} = value;
    const options = await fetchStrapiApi(path);

    switch (type) {
      case type === 'authors':
        dataResponse.concat(options.map(datum => parseAuthor(datum)))
        break;
      case type === 'lessonPlans':
        dataResponse.concat(options.map(option => parseLessonPlan(option)));
        break;
      case type === 'transcriptions':
        dataResponse.concat(options.map(option => parseTranscription(option)));
        break;
      case type === 'translations':
        dataResponse.concat(options.map(option => parseTranslation(option)));
        break;
      default:
        break;
    }

  })
  
  const algoliaResponse = await updateAlgoliaData(dataResponse)

  console.log('algoliaResponse', algoliaResponse)
}

module.exports = performRequest();