function fetchImages(searchQuery) {
  return fetch(
    `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${searchQuery}&page=1&per_page=12&key=23140878-cc837524a3fe3a996e92890e9`,
  ).then(res => res.json());
}
