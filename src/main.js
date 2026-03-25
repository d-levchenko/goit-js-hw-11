import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { getImagesByQuery } from './js/pixabay-api';
import { createGallery, clearGallery } from './js/render-functions';

const searchForm = document.querySelector('.form');
const loader = document.querySelector('.loader');

searchForm.addEventListener('submit', event => {
  event.preventDefault();
  clearGallery();

  loader.classList.add('is-hidden');

  const userSearchText = searchForm.elements['search-text'].value.trim();

  if (userSearchText === '') {
    alertNoEmptySearch();
    return;
  }

  getImagesByQuery(userSearchText)
    .then(data => {
      if (data.data.hits === 0) {
        alertNoImagesFound();
      } else {
        loader.classList.remove('is-hidden');
        createGallery(data.data.hits);

        new SimpleLightbox('.gallery-link', {
          overlayOpacity: 0.8,
          captionDelay: 250,
          captionsData: 'alt',
        }).refresh();
      }
    })
    .catch(error => console.log(error))
    .finally(searchForm.reset());
});
