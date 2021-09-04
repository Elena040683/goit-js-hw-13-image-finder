import ImgTpl from './templates/img.hbs';
import ApiService from './js/apiService';
import LoadMoreBtn from './js/loadMore';

import { info, error } from '../node_modules/@pnotify/core/dist/PNotify.js';
import '@pnotify/core/dist/BrightTheme.css';

const refs = {
  form: document.querySelector('#search-form'),
  container: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('[data-action="load-more"]'),
};

const newApiService = new ApiService();
const loadMoreBtn = new LoadMoreBtn({
  selector: '[data-action="load-more"]',
  hidden: true,
});

refs.form.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.loadMoreBtn.addEventListener('click', handleBtnClick);

function onSearch(e) {
  e.preventDefault();

  newApiService.query = e.currentTarget.elements.query.value;

  if (newApiService.query === '') {
    return info({
      text: 'Enter the value!',
      delay: 1500,
      closerHover: true,
    });
  }

  loadMoreBtn.show();
  loadMoreBtn.disable();
  newApiService.resetPage();
  newApiService.fetchImages().then(data => {
    if (data.length === 0) {
      return error({ text: 'Bad request.' });
    }
    clearImagesContainer();
    renderImages(data);
    loadMoreBtn.enable();
  });
}

function renderImages(data) {
  refs.container.insertAdjacentHTML('beforeend', ImgTpl(data));
}

function clearImagesContainer() {
  refs.container.innerHTML = '';
}

function onLoadMore() {
  loadMoreBtn.disable();

  newApiService.fetchImages().then(data => {
    renderImages(data);
    loadMoreBtn.enable();
  });
}

let element = document.getElementById('img');

function handleBtnClick() {
  setTimeout(() => {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'end',
    });
  }, 700);
}
