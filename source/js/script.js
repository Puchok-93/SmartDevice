'use strict';

var body = document.querySelector('body');
var callbackPopup = document.querySelector('.callback-popup');
var openCallbackButton = document.querySelector('.callback-button');
var closePopupButton = document.querySelector('.callback-popup__button-close');
var callbackPopupOverlay = document.querySelector('.callback-popup-overlay');
var wrapper = document.querySelector('.wrapper');

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

var ESC_KEY = 27;

sectionsWebsiteList.classList.add('hide');
ourOfficeList.classList.add('hide');
sectionsWebsiteButtonList.classList.add('sections-website__button--closed');
ourOfficeListButton.classList.add('our-office__button--closed');

var setDefaultValues = function () {
  userName.value = '';
  userPhone.value = '';
  userQuestion.value = '';
  userName.style.border = 'none';
  userPhone.style.border = 'none';
  userQuestion.style.border = 'none';
};

var getBodyScrollTop = function () {
  return self.pageYOffset || (document.documentElement && document.documentElement.ScrollTop) || (document.body && document.body.scrollTop);
}

var openPopup = function (evt) {
  evt.preventDefault();
  body.dataset.scrollY = getBodyScrollTop();
  body.style.top = `-${body.dataset.scrollY}px`;
  callbackPopupOverlay.classList.add('callback-popup-overlay--show');
  callbackPopup.classList.add('callback-popup--show');
  body.classList.add('body-lock');
  userName.focus();
};

var closePopup = function (evt) {
  callbackPopupOverlay.classList.remove('callback-popup-overlay--show');
  callbackPopup.classList.remove('callback-popup--show');
  body.classList.remove('body-lock')
  window.scrollTo(0,body.dataset.scrollY)
  setDefaultValues();
};

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

form.addEventListener('submit', function () {
  localStorage.setItem('name', userName.value);
  localStorage.setItem('phone', userPhone.value);
  localStorage.setItem('question', userQuestion.value);
});

openCallbackButton.addEventListener('click', openPopup);
closePopupButton.addEventListener('click', closePopup);
window.addEventListener('resize', reductionDescription);
callbackPopupOverlay.addEventListener('click', closePopup);
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closePopup();
  }
});

document.getElementById('phone').addEventListener('input', function (e) {
  var x = e.target.value.replace(/\D/g, '').match(/(\d{0,3})(\d{0,3})(\d{0,4})/);
  e.target.value = !x[2] ? x[1] : '(' + x[1] + ') ' + x[2] + (x[3] ? '-' + x[3] : '');
});
