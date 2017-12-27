const axios = require('axios');

function getDataFromRange(dataType, from, to) {
  // dataTypes are 'pupd', 'aggr', and 'mfgmix'
  return axios
    .get(`${process.env.BASE_URL}/${dataType}?from=${from}&to=${to}`)
    .then(response => {
      return response.data;
    })
    .catch(err => {
      console.log(`Error fetching ${dataType} data from range:`, err);
      return err;
    });
}

module.exports = {
  getDataFromRange: getDataFromRange
};
