// Объявили ОБЪЕКТ настроек элементов
const configData = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_disable',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
};

// Функция валидации, ответственная за включение валидации всех форм
function enableValidation(form) {
  const formList = Array.from(document.querySelectorAll(form.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, form);
  });
}

// Функция добавляет слушателей событий форме и её полям
function setEventListeners(formElement, configdata) {
  const inputList = Array.from(formElement.querySelectorAll(configdata.inputSelector));
  const buttonElement = formElement.querySelector(configdata.submitButtonSelector);
  toggleSubmitButtonState(inputList, buttonElement, configdata.inactiveButtonClass);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, configdata);
      toggleSubmitButtonState(inputList, buttonElement, configdata.inactiveButtonClass);
    });
  });
}

// Функция переключения кнопки
function toggleSubmitButtonState(formInput, submitButton, inactiveButtonClass) {
  if (hasInvalidInput(formInput)) {
    disableSubmitButton(submitButton, inactiveButtonClass);
  } else {
    enableSubmitButton(submitButton, inactiveButtonClass);
  }
}

// Функция включения кнопки
function disableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.add(inactiveButtonClass);
  buttonElement.setAttribute('disabled', '');
}

// Функция отключения кнопки
function enableSubmitButton(buttonElement, inactiveButtonClass) {
  buttonElement.classList.remove(inactiveButtonClass);
  buttonElement.removeAttribute('disabled', '');
}

// Функция проверяет невалидные поля
function hasInvalidInput(inputList) {
  return Array.from(inputList).some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

// Функция проверяет поля на Валидность
function checkInputValidity(formElement, inputElement, configvalidity) {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, configvalidity.inputErrorClass, configvalidity.errorClass);
  } else {
    hideInputError(formElement, inputElement, configvalidity.inputErrorClass, configvalidity.errorClass);
  }
}

// Функция показывает ошибку инпута
function showInputError(formElement, inputElement, redLine, errorVisible) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.add(redLine);
  errorElement.classList.add(errorVisible);
  errorElement.textContent = inputElement.validationMessage;
}

// Функция убирает ошибку инпута
function hideInputError(formElement, inputElement, redLine, errorVisible) {
  const errorElement = formElement.querySelector(`#${inputElement.id}-error`);
  inputElement.classList.remove(redLine);
  errorElement.classList.remove(errorVisible);
  errorElement.textContent = '';
}

enableValidation(configData);