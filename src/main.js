import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions';

const searchForm = document.querySelector('.form');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  const userSearchText = searchForm.elements['search-text'].value.trim();

  if (userSearchText === '') {
    iziToast.show({
      message: 'Search field cannot be empty!',
      messageColor: '#fff',
      backgroundColor: '#ffa000',
      position: 'topRight',
      icon: 'bi bi-exclamation-triangle',
      iconColor: '#fff',
    });
    return;
  }

  clearGallery();

  getImagesByQuery(userSearchText)
    .then(data => {
      if (data.data.hits.length === 0) {
        iziToast.show({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          messageColor: '#fff',
          backgroundColor: '#ef4040',
          position: 'topRight',
          icon: 'bi bi-x-octagon',
          iconColor: '#fff',
        });
      } else {
        showLoader();
        createGallery(data.data.hits);

        const allImages = document.querySelectorAll('.gallery-image');

        const allPromises = Array.from(allImages).map(img => {
          return new Promise((resolve, rejected) => {
            img.addEventListener('load', () => {
              resolve(img);
            });

            img.addEventListener('error', () => {
              resolve(img);
            });
          });
        });

        Promise.allSettled(allPromises).then(() => {
          hideLoader();

          new SimpleLightbox('.gallery-link', {
            overlayOpacity: 0.8,
            captionDelay: 250,
            captionsData: 'alt',
          }).refresh();
        });
      }
    })
    .catch(error => {
      console.log(error.message);
      return Promise.reject(error);
    })
    .finally(() => {
      searchForm.reset();
    });
});
