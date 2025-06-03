import axios from 'axios';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
// ----------------------------------------------
import { fetchData } from './js/pixabay-api';
import {
  renderGallery,
  showLoader,
  hideLoader,
  clearGallery,
  showLoadMoreButton,
  hideLoadMoreButton,
} from './js/render-functions';

const input = document.querySelector("input[name='search-text']");
const form = document.querySelector('.form');
const loadMoreBtn = document.querySelector('.load-more');
const perPage = 15;
let query = '';
let page = 1;

form.addEventListener('submit', async event => {
  event.preventDefault();
  query = input.value.trim();
  if (query === '') {
    iziToast.show({
      message: `No data`,
      messageColor: '#fff',
      messageSize: '16px',
      messageLineHeight: '1.5',
      backgroundColor: '#ffa000',
      progressBar: false,
      position: 'topRight',
    });
    return;
  }
  page = 1;
  clearGallery();
  hideLoadMoreButton();
  showLoader();

  try {
    const data = await fetchData(query, page, perPage);
    if (data.hits.length === 0) {
      iziToast.show({
        message: `There are no images matching your search query`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ffa000',
        progressBar: false,
        position: 'topRight',
      });
      return;
    }
    renderGallery(data.hits);
    if (page * perPage < data.totalHits) showLoadMoreButton();
  } catch (error) {
    iziToast.show({
      message: 'Error: Please try again later.',
      messageColor: '#fff',
      messageSize: '16px',
      messageLineHeight: '1.5',
      backgroundColor: '#ffa000',
      progressBar: false,
      position: 'topRight',
    });
  } finally {
    hideLoader();
    form.reset();
  }
});

loadMoreBtn.addEventListener('click', async () => {
  page += 1;
  showLoader();
  // --
  const galleryCard = document.querySelector('.gallery li');
  const scrollHeight = galleryCard.getBoundingClientRect().height * 2;
  // --
  try {
    const data = await fetchData(query, page, perPage);
    renderGallery(data.hits, true);
    //   --
    window.scrollBy({
      top: scrollHeight,
      behavior: 'smooth',
    });
    //   --
    if (page * perPage >= data.totalHits) {
      hideLoadMoreButton();
      iziToast.show({
        message: `We're sorry, but you've reached the end of search results.`,
        messageColor: '#fff',
        messageSize: '16px',
        messageLineHeight: '1.5',
        backgroundColor: '#ffa000',
        progressBar: false,
        position: 'topRight',
      });
    }
  } catch (error) {
    iziToast.show({
      message: 'Error: Please try again later.',
      messageColor: '#fff',
      messageSize: '16px',
      messageLineHeight: '1.5',
      backgroundColor: '#ffa000',
      progressBar: false,
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
