'use strict';

var callbackPopup = document.querySelector('.callback-popup');
var callbackPopupOverlay = document.querySelector('.callback-popup-overlay');
var callbackButton = document.querySelector('.callback-button');
var closePopupButton = callbackPopup.querySelector('.callback-popup__button-close');
var form = document.querySelector('.callback-popup-form');
var userName = form.querySelector('[name=user-name]');
var userPhone = form.querySelector('[name=user-phone]');
var userQuestion = form.querySelector('[name=user-question]');
var aboutCompanyBlock = document.querySelector('.about-company');
var companyDescription = aboutCompanyBlock.querySelector('.about-company__description--hired');

var sectionsWebsiteList = document.querySelector('.sections-website-list');
var sectionsWebsiteButtonList = document.querySelector('.sections-website__button');
var ourOfficeList = document.querySelector('.our-office-list');
var ourOfficeListButton = document.querySelector('.our-office__button');

sectionsWebsiteList.classList.add('hide');
ourOfficeList.classList.add('hide');
sectionsWebsiteButtonList.classList.add('sections-website__button--closed');
ourOfficeListButton.classList.add('our-office__button--closed');

userPhone.addEventListener('focus', function (evt) {
  evt.preventDefault();
  userPhone.value = '+7(';

  if (userPhone.length === 6) {
    userPhone.value.style.color = 'red';
  }
});

var ESC_KEY = 27;

var setDefaultValues = function () {
  userName.style.border = 'none';
  userPhone.style.border = 'none';
  userQuestion.style.border = 'none';
};

var openPopup = function () {
  callbackPopupOverlay.classList.add('callback-popup-overlay--show');
  callbackPopup.classList.add('callback-popup--show');
  userName.focus();
};

var closePopup = function () {
  callbackPopupOverlay.classList.remove('callback-popup-overlay--show');
  callbackPopup.classList.remove('callback-popup--show');
  setDefaultValues();
};

form.addEventListener('submit', function () {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('phone', userPhone.value);
  localStorage.setItem('question', userQuestion.value);
});

var reductionDescription = function () {
  if (window.matchMedia('screen and (min-width: 1023px)').matches) {
    companyDescription.textContent = 'Наши поставщики - мировые производители электронных компонентов: OSRAM, CREE, HOLGLITRONIC, REFOND. ' +
    'Печатные платы и комплектующие Service Devices применяются на предприятиях Российских Железных Дорог..';
  }
};

var openSectionsWebsiteList = function () {
  sectionsWebsiteList.classList.toggle('hide');
  sectionsWebsiteButtonList.classList.toggle('sections-website__button--closed');
  ourOfficeList.classList.add('hide');
  ourOfficeListButton.classList.add('our-office__button--closed');
};

var openOurOfficeList = function () {
  ourOfficeList.classList.toggle('hide');
  ourOfficeListButton.classList.toggle('our-office__button--closed');
  sectionsWebsiteList.classList.add('hide');
  sectionsWebsiteButtonList.classList.add('sections-website__button--closed');
};

sectionsWebsiteButtonList.addEventListener('click', openSectionsWebsiteList);
ourOfficeListButton.addEventListener('click', openOurOfficeList);

window.addEventListener('resize', reductionDescription);
callbackButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
callbackPopupOverlay.addEventListener('click', closePopup);
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closePopup();
  }
});
