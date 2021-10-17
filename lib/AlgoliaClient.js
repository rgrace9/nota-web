import algoliasearch from 'algoliasearch';

export const algoliaSearchClient = algoliasearch(process.env.NEXT_PUBLIC_ALGOLIA_APPLICATION_ID, process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_ONLY_API_KEY);
export const algoliaSearchIndex = algoliaSearchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_INDEX_NAME);

export const algoliaIndex = algoliaSearchClient.initIndex(process.env.NEXT_PUBLIC_ALGOLIA_API_KEY);