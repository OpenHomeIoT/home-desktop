import axios from "axios";

const HOST = "localhost";
const PORT = 30027;

/**
 * Perform a DELETE request and receive a JSON object back.
 * @param {string} url the url to DELETE.
 * @param {any} data the data to DELETE.
 */
const jsonDelete = (url, data) => {
  return axios.delete(_buildUrl(url), { data: data }).then(response => response.data);
}

/**
 * Perform a GET request and receive a JSON object back.
 * @param {string} url the url to GET.
 * @returns {Promise<object>}
 */
const jsonGet = (url) => {
  return axios.get(_buildUrl(url)).then(response => response.data);
};

/**
 * Perform a POST request and receive a JSON object back.
 * @param {string} url the url to POST.
 * @param {any} data the data to send.
 * @returns {Promise<object>}
 */
const jsonPost = (url, data) => {
  return axios.post(_buildUrl(url), data).then(response => response.data);
};

/**
 * Perform a PUT request and receive a JSON object back.
 * @param {string} url the url to PUT.
 * @param {any} data the data to send.
 * @returns {Promise<object>}
 */
const jsonPut = (url, data) => {
  return axios.put(_buildUrl(url), data).then(response => response.data);
};

/**
 * Build out a full url to the api.
 * @param {string} url the url.
 */
const _buildUrl = url => `http://${HOST}:${PORT}${url}`;

export { jsonDelete, jsonGet, jsonPost, jsonPut };
