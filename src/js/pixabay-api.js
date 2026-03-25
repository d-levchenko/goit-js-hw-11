import axios from 'axios';

const myAPI_Key = '55171799-755350edf6c0ed064d9a514af';
const defaultURL = (axios.defaults.baseURL = 'https://pixabay.com/api/');

export function getImagesByQuery(query) {
  const promise = axios.get(defaultURL, {
    params: {
      key: `${myAPI_Key}`,
      q: query,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
    },
  });

  return promise;
}
