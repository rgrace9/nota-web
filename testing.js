module.exports.blah = (hey) => {
  console.log(`${hey}!!!!`)
}

// blah()

const parseAuthor = (author) => {
  const authorLocation = author?.location?.name;
  const authorTimePeriod = author?.timePeriod?.name;
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

const authorsList = (authors) => {
  return authors.map(author => parseAuthor(author))
}