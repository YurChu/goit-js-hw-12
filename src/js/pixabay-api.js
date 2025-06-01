import axios from 'axios';
// -------------------------------------------
// https://pixabay.com/users/50311976/   ------   u_2ddhzk1lhb ---------
//  My API key: 50311976-cfb8a0f5325f69922ed901f36
const API_KEY = '50311976-cfb8a0f5325f69922ed901f36';

const BASE_URL = 'https://pixabay.com/api/';
// --------------------------------------------------------------

export async function fetchData(query, page, perPage) {
  try {
    const response = await axios.get(BASE_URL, {
      params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: page,
        per_page: perPage,
      },
    });

    return {
      hits: response.data.hits,
      totalHits: response.data.totalHits,
    };
  } catch (error) {
    console.error('Request error:', error);
    throw error;
  }
}
