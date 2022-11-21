export const closeModalStatusFilter = (className, e) => {
  let closeModal = true;

  if (e.target.className.includes(className)) {
    closeModal = false;
  }
  if (closeModal) {
    let i = 0;
    let parent = e.target.parentNode;
    const body = document.querySelector('body')
    while (parent !== body) {
      if (parent.className && parent.className.includes(className)) {
        closeModal = false;
      }
      parent = parent.parentNode;
      i++;
    }
  }
  return closeModal;
}