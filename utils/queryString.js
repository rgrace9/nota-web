import qs from 'qs'

const formatQuery = (params) => {
  return qs.stringify(params)
}


const createQueryString = (params) => {

  const formattedQueryString = Object.keys(params).map(key => {

    if (params[key] !== 'all') {
      return `${key}=${params[key]}`

    }
  
  })
    .join('&');
  
  return formattedQueryString;
}


export {
  createQueryString,
  formatQuery
}