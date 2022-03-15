const token = "aa5b9386c01093221626a38f461ace4e52fb769a";

const url =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/findById/party";

const urlForSuggest =
  "https://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/party";

export const MainFetchApi = {
  async findCompanies(value) {
    const options = {
      method: "POST",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: "Token " + token,
      },
      body: JSON.stringify({ query: value }),
      count: 15,
    };
    const response = await fetch(urlForSuggest, options);
    const text = await response.text();
    const companies = JSON.parse(text);
    // console.warn("companies.suggestions", companies);
    return companies.suggestions;
  },
};
