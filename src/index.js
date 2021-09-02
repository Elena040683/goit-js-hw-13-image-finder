import ImgTpl from './templates/img.hbs';
import fetchImages from './js/apiService';

const refs = {
  form: document.querySelector('#search-form'),
  input: document.querySelector('#search'),
  container: document.querySelector('.gallery'),
  more: document.querySelector('#more'),
};

function renderImages(data) {
  const markup = ImgTpl(data);
  refs.container.innerHTML = markup;
}

refs.form.addEventListener('submit', onSearch);

function onSearch(e) {
  e.preventDefault();
  const form = e.currentTarget;
  const searchQuery = form.elements.query.value;

  fetchImages(searchQuery)
    .then(renderImages)
    .catch(err => console.log(err))
    .finally(() => form.reset());
}
