const cacheStore = {};

const callApi = function(url, options, useCache = false) {
  if (useCache === true) {
    let promise = new Promise((resolve, reject) => {
      if (cacheStore[url]) resolve(cacheStore[url]);
      else {
        fetch(url, { ...options }).then(response => {
          let resp = response.json();
          cacheStore[url] = resp;
          resolve(cacheStore[url]);
        });
      }
    });
    return promise;
  } else {
    return fetch(url, { ...options }).then(response => {
      return response.json();
    });
  }
};

const countryApiRequestHeaders = {
  Accept: "application/json",
  "api-token":
    "zZxOcFAd7ekEvx2oRhFifzH3fBQRov9oKYaXAxEkFTNwpi3ENlYGIrotET0b1MURZSc",
  "user-email": "prashant0268@gmail.com"
};

let authToken = "";

export const callCountryApi = url => {
  let promise = new Promise((resolve, reject) => {
    if (authToken) {
      let options = {
        headers: {
          Authorization: `Bearer ${authToken}`,
          Accept: "application/json"
        },
        method: "GET"
      };
      fetch(url, options).then(resp => {
        let response = resp.json();
        resolve(response);
      });
    } else {
      fetch(
        "https://www.universal-tutorial.com/api/getaccesstoken",
        countryApiRequestHeaders
      )
        .then(resp => resp.json())
        .then(response => {
          //let response = resp.json();
          console.log("response with authtoken", response);
          authToken = response.auth_token;
          let options = {
            headers: {
              Authorization: `Bearer ${authToken}`,
              Accept: "application/json"
            },
            method: "GET"
          };
          fetch(url, options).then(resp => {
            let response = resp.json();
            resolve(response);
          });
        });
    }
  });
  return promise;
};

export const getCountries = () =>
  callCountryApi("https://www.universal-tutorial.com/api/countries/");
