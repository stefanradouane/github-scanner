/**
 * Changes the URL to to current query.
 * @param {String} query
 */
export const setUrl = (query) => {
  history.pushState({ query }, null, `?name=${query ? query : ""}`);
};

/**
 * Returns params based on query string.
 * @param {string} query A (serialized) query string.
 * @return {Object} Params (parameters) object.
 */
export const parseQuery = (query) => {
  const searchParams = new URLSearchParams(query["search"]);
  const objectParams = Object.fromEntries(searchParams);
  const queryObject = {
    name: objectParams.name,
  };
  return queryObject;
};
