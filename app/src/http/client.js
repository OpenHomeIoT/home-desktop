import * as rp from "request-promise";

const HOST = "plug.local";
const PORT = 30027;

/**
 * Perform a DELETE request and receive a JSON object back.
 * @param {string} url the url to DELETE.
 * @param {any} data the data to DELETE.
 */
const jsonDelete = (url, data) => {
  const request = _buildRequest(url, "DELETE", data);
  return rp(request)
  .catch(err => console.error(`Unable to DELETE ${url}: ${err}`));
}

/**
 * Perform a GET request and receive a JSON object back.
 * @param {string} url the url to GET.
 * @returns {Promise<object>}
 */
const jsonGet = (url) => {
  const request = _buildRequest(url, "GET");
  return rp(request)
  .catch(err => console.error(`Unable to GET ${url}: ${err}`));
};

/**
 * Perform a POST request and receive a JSON object back.
 * @param {string} url the url to POST.
 * @param {any} data the data to send.
 * @returns {Promise<object>}
 */
const jsonPost = (url, data) => {
  const request = _buildRequest(url, "POST", data);
  return rp(request)
  .catch(err => console.error(`Unable to POST ${url}: ${err}`));
};

/**
 * Perform a PUT request and receive a JSON object back.
 * @param {string} url the url to PUT.
 * @param {any} data the data to send.
 * @returns {Promise<object>}
 */
const jsonPut = (url, data) => {
  const request = _buildRequest(url, "PUT", data);
  return rp(request)
  .catch(err => console.error(`Unable to PUT ${url}: ${err}`));
};

/**
 * Build a request.
 * @param {string} url the url
 * @param {string} method the http method.
 * @param {any} data the data, if any.
 */
const _buildRequest = (url, method, data) => {
  return {
    url: `http://${HOST}:${PORT}${url}`,
    method: method,
    body: data,
    transform: (body) => JSON.parse(body)
  };
};

export { jsonDelete, jsonGet, jsonPost, jsonPut };
