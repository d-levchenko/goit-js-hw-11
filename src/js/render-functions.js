import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryList = document.querySelector('.gallery');

export function createGallery(images) {
  const markup = images
    ?.map(image => {
      const {
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      } = image;

      return `<li class='gallery-item'>
        <a class='gallery-link' href='${largeImageURL}'>
          <img class='gallery-image' src='${webformatURL}' alt='${tags}'>
        </a>
        <div class='image-description-wrapper'>
          <p class='image-text-info'>Likes <span class='additional-text-info'>${likes}</span></p>
          <p class='image-text-info'>Views <span class='additional-text-info'>${views}</span></p>
          <p class='image-text-info'>Comments <span class='additional-text-info'>${comments}</span></p>
          <p class='image-text-info'>Downloads <span class='additional-text-info'>${downloads}</span></p>
        </div>
      </li>`;
    })
    .join('');

  galleryList.insertAdjacentHTML('afterbegin', markup);
}

export function createSimplelightbox(className) {
  new SimpleLightbox(`${className}`, {
    overlayOpacity: 0.8,
    captionDelay: 250,
    captionsData: 'alt',
  }).refresh();
}

export function clearGallery() {
  galleryList.innerHTML = '';
}

const loader = document.querySelector('.loader');

export function showLoader() {
  galleryList.style.display = 'none';
  loader.classList.remove('is-hidden');
}

export function hideLoader() {
  loader.classList.add('is-hidden');
  galleryList.style.display = 'flex';
}
