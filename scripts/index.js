// Объявили перменные
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddBtn = document.querySelector('.profile__add-button');
const profilEditBtn = document.querySelector('.profile__edit-button');

const everyPopup = document.querySelectorAll('.popup')
const modalWindowEdit = document.querySelector('.popup_type_profile-edit');
const modalEditCloseBtn = modalWindowEdit.querySelector('.popup__close-button');

const modalForm = document.querySelector('.popup__form');
const modalInputName = document.querySelector('.popup__input_username');
const modalInputJob = document.querySelector('.popup__input_userjob');

const modalWindowAdd = document.querySelector('.popup_type_add-photo');
const modalAddCloseBtn = modalWindowAdd.querySelector('.popup__close-button');
const submitBtn = modalWindowAdd.querySelector('.popup__submit-button');

const modalInputPlaceName = document.querySelector('.popup__input_place');
const modalInputLink = document.querySelector('.popup__input_link');

const modalImageBox = document.querySelector('.popup_type_photos-open');
const modalImageBoxCloseBtn = modalImageBox.querySelector('.popup__close-button');
const modalImageOpen = document.querySelector('.popup__image');
const modalImagetext = document.querySelector('.popup__caption');

// Объявили перменные для функции авто-добавления
const listContainer = document.querySelector('.photos__elements');
const template = document.querySelector('.template__photos');

// Функция создания и добавления фото на страницу
function renderPhotos() {
  const html = initialCards.map(createCard);
  listContainer.append(...html);
}

// Используем template как шаблон
function createCard(item) {
  const photosItem = template.content.cloneNode(true);
  const photosImg = photosItem.querySelector('.photos__image'); 
  const photosTitle = photosItem.querySelector('.photos__title');
  const photosLikeBtn = photosItem.querySelector('.photos__like-button');
  const photosDeleteBtn = photosItem.querySelector('.photos__delete-button');

  photosImg.src = item.link;
  photosImg.alt = item.name;
  photosTitle.textContent = item.name;

  //Установили слушателей для кнопок лайка, удаления, масштабирования
  photosLikeBtn.addEventListener('click', handleLikePhoto);
  photosDeleteBtn.addEventListener('click', handleDeletePhoto);
  photosImg.addEventListener('click', function() {
    modalImageOpen.src = item.link;
    modalImageOpen.alt = item.name;
    modalImagetext.textContent = item.name;
    openModalWindow(modalImageBox);
  });

  return photosItem;
}

renderPhotos();

// Функция лайка фото
function handleLikePhoto(evt) {
  evt.target.classList.toggle('photos__like-button_active');
}

// Функция удаления фото
function handleDeletePhoto(evt) {
  const elementDelete = evt.target.closest('.photos__element');
  elementDelete.remove();
}

// Универсальные функции октрытия/закрытия popup
function openModalWindow(popup) {
  popup.classList.add('popup_opened');
  document.addEventListener('keyup', handleCloseEscape);
}

function closeModalWindow(popup) {
  popup.classList.remove('popup_opened');
  document.removeEventListener('keyup', handleCloseEscape);
}

// Функция закрытия через Overlay
function handleCloseOverlay(popup) {
  popup.addEventListener('click', (evt) => {
  if (evt.target.classList.contains('popup') || evt.target.classList.contains('popup__close-button')) {
    closeModalWindow(evt.currentTarget); }
  });
}

everyPopup.forEach((popup) => {
  handleCloseOverlay(popup);
});

// Функция закрытия через Escape
function handleCloseEscape(evt) {
  if (evt.key === 'Escape') {
    const modalWindow = document.querySelector('.popup_opened');
    closeModalWindow(modalWindow);
  }
}

// Функция закрытия окна просмотра фото
  modalImageBoxCloseBtn.addEventListener('click', function () {
  closeModalWindow(modalImageBox);
});

// Функция редактирования профиля
function handleEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = modalInputName.value;
  profileJob.textContent = modalInputJob.value;
  closeModalWindow(modalWindowEdit);
}

// Кнопка редактирования профиля
profilEditBtn.addEventListener('click', function() {
  modalInputJob.value = profileJob.textContent;
  modalInputName.value = profileName.textContent;
  openModalWindow(modalWindowEdit);
});

modalEditCloseBtn.addEventListener('click', function () {
  closeModalWindow(modalWindowEdit);
});

// Функция добавления фото
function handleAddnewPhoto(evt) {
  evt.preventDefault();
  const newPhoto = createCard({name: modalInputPlaceName.value, link: modalInputLink.value});
  listContainer.prepend(newPhoto);
  evt.target.reset();
  closeModalWindow(modalWindowAdd);
}

// Кнопка добавления фото и блокировка кнопки
profileAddBtn.addEventListener('click', function () {
  disableSubmitButton(submitBtn, configData.inactiveButtonClass);
  resetForm(modalWindowAdd, configData);
  openModalWindow(modalWindowAdd);
});

modalAddCloseBtn.addEventListener('click', function () {
  closeModalWindow(modalWindowAdd);
});

//Слушатели событий сабмита
modalWindowAdd.addEventListener('submit', handleAddnewPhoto);
modalForm.addEventListener('submit', handleEditProfile);