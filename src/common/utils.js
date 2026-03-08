const getRandomArrayElement = (array) =>
  array[Math.floor(Math.random() * array.length)];

const isEscKeyCode = (evt) => evt.key === 'Escape';

const onEscKeydown = (evt, cb) => {
  if (!isEscKeyCode(evt)) {
    return;
  }

  if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) {
    return;
  }

  evt.preventDefault();
  cb();
};

export { getRandomArrayElement, onEscKeydown };
