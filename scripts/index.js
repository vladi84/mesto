//Объявили перменные
const profileName = document.querySelector('.profile__name');
const profileJob = document.querySelector('.profile__job');
const profileAddBtn = document.querySelector('.profile__add-button');
const profilEditBtn = document.querySelector('.profile__edit-button');

const modalWindowEdit = document.querySelector('.popup_edit');
const modalEditCloseBtn = modalWindowEdit.querySelector('.popup__close-button');

const modalForm = document.querySelector('.popup__form');
const modalInputName = document.querySelector('.popup__input-text_type_username');
const modalInputJob = document.querySelector('.popup__input-text_type_userjob');

const modalWindowAdd = document.querySelector('.popup_add');
const modalAddCloseBtn = modalWindowAdd.querySelector('.popup__close-button');

const modalFormAdd = document.querySelector('.popup__form-add');
const modalInputPlaceName = document.querySelector('.popup__input-text_type_place');
const modalInputLink = document.querySelector('.popup__input-text_type_link');

const modalImageBox = document.querySelector('.popup_photos-open');
const modalImageBoxCloseBtn = modalImageBox.querySelector('.popup__close-button');
const modalImageOpen = document.querySelector('.popup__image');
const modalImagetext = document.querySelector('.popup__caption');

//Объявили перменные для функции авто-добавления
const listContainer = document.querySelector('.photos__elements');
const template = document.querySelector('.template__photos');

//Функция создания и добавления фото на страницу
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

//Функция лайка фото
function handleLikePhoto(evt) {
  const boxLi = evt.target.closest('.photos__element');
  const elementHeart = boxLi.querySelector('.photos__like-button');
  elementHeart.classList.toggle('photos__like-button_active');
}

//Функция удаления фото
function handleDeletePhoto(evt) {
  const elementDelete = evt.target.closest('.photos__element');
  elementDelete.remove();
}

//Универсальные функции октрытия/закрытия popup, нужно заменить аргумент исходя из необходимости
function openModalWindow(popup) {
  popup.classList.add('popup_opened');
}

function closeModalWindow(popup) {
  popup.classList.remove('popup_opened');
}

// Функция закрытия окна просмотра фото
  modalImageBoxCloseBtn.addEventListener('click', function () {
  closeModalWindow(modalImageBox);
});

//Функция редактирования профиля
function handleEditProfile(evt) {
  evt.preventDefault();
  profileName.textContent = modalInputName.value;
  profileJob.textContent = modalInputJob.value;
  closeModalWindow(modalWindowEdit);
}

//Кнопка редактирования профиля
profilEditBtn.addEventListener('click', function() {
  modalInputJob.value = profileJob.textContent
  modalInputName.value = profileName.textContent
  openModalWindow(modalWindowEdit);
});

modalEditCloseBtn.addEventListener('click', function () {
  closeModalWindow(modalWindowEdit);
});

//Функция добавления фото
function handleAddNewPhoto(evt) {
  evt.preventDefault();
  const NewPhoto = createCard({name: modalInputPlaceName.value, link: modalInputLink.value});
  listContainer.prepend(NewPhoto);
  modalInputPlaceName.value = '';
  modalInputLink.value = '';
  closeModalWindow(modalWindowAdd);
}

//Кнопка добавления фото
profileAddBtn.addEventListener('click', function () {
  openModalWindow(modalWindowAdd);
});

modalAddCloseBtn.addEventListener('click', function () {
  closeModalWindow(modalWindowAdd);
});

//Слушатели событий сабмита
modalWindowAdd.addEventListener('submit', handleAddNewPhoto);
modalForm.addEventListener('submit', handleEditProfile);