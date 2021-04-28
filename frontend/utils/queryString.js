const createQueryString = (params) => {

  const qs = Object.keys(params).map(key => {

    if (params[key] !== 'all') {
      return `${key}=${params[key]}`

    }
  
  })
    .join('&');
  
  return qs;
}


export {
  createQueryString,
}