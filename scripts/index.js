const profilEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__close-button');
const modalForm = document.querySelector('.popup__form');
const modalInputName = document.querySelector('.popup__input-text_username');
const modalInputJob = document.querySelector('.popup__input-text_userjob');


function openmodalWindow() {
    modalWindow.classList.add('popup_opened');
    modalInputName.value = profileName.textContent;
    modalInputJob.value = profileJob.textContent;
}

profilEditBtn.addEventListener('click', openmodalWindow);

modalCloseBtn.addEventListener('click', function () {
    modalWindow.classList.remove('popup_opened');
})

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileJob.textContent = modalInputJob.value;
    profileName.textContent = modalInputName.value;
    modalWindow.classList.remove('popup_opened');
}

modalForm.addEventListener('submit', formSubmitHandler);


