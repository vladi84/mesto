const initialCards = [
    {
      name: 'Архыз',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
    },
    {
      name: 'Челябинская область',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
    },
    {
      name: 'Иваново',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
    },
    {
      name: 'Камчатка',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
    },
    {
      name: 'Холмогорский район',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
    },
    {
      name: 'Байкал',
      link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
    }
];

const profilEditBtn = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const modalWindow = document.querySelector('.popup');
const modalCloseBtn = document.querySelector('.popup__close-button');
const modalForm = document.querySelector('.popup__form');
const modalInputName = document.querySelector('.popup__input-text_type_username');
const modalInputJob = document.querySelector('.popup__input-text_type_userjob');


function openmodalWindow() {
    modalWindow.classList.add('popup_opened');
    modalInputName.value = profileName.textContent;
    modalInputJob.value = profileJob.textContent;
}

function closemodalWindow() {
    modalWindow.classList.remove('popup_opened');
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileJob.textContent = modalInputJob.value;
    profileName.textContent = modalInputName.value;
    closemodalWindow();
}

profilEditBtn.addEventListener('click', openmodalWindow);
modalCloseBtn.addEventListener('click', closemodalWindow);
modalForm.addEventListener('submit', formSubmitHandler);