import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import {
  createGallery,
  clearGallery,
  createSimplelightbox,
  showLoader,
  hideLoader,
  refreshLightbox,
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
  showLoader();

  getImagesByQuery(userSearchText)
    .then(data => {
      if (data.hits.length === 0) {
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
        createGallery(data.hits);

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

          createSimplelightbox('.gallery-link');
          refreshLightbox();
        });
      }
    })
    .catch(() => {
      hideLoader();

      iziToast.show({
        message: 'Failed to load image. Please, try again!',
        messageColor: '#fff',
        backgroundColor: '#ef4040',
        position: 'topRight',
        icon: 'bi bi-x-octagon',
        iconColor: '#fff',
      });
    })
    .finally(() => {
      searchForm.reset();
    });
});
