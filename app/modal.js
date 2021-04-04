let modalWindow = document.querySelector('.modal')
let onClose = document.querySelector('.modal__close')



onClose.addEventListener('click', () => {
    modalWindow.style.display = 'none'
})
window.onclick = (event) => {
  
    if (event.target === modalWindow) {
        modalWindow.style.display = 'none'
    }
}