function $(id) {
  return document.getElementById(id);
}

function openModal(modalId) {
  const modal = $(modalId);
  if (modal) {
    modal.classList.remove('pb-hidden');
  }
}

function closeModal(modalId) {
  const modal = $(modalId);
  if (modal) {
    modal.classList.add('pb-hidden');
  }
}

export { openModal, closeModal };
