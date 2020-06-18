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

var sectionsWebsite = document.querySelector('.sections-website');
var ourOffice = document.querySelector('.our-office');

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
/*
var reductionDescription = function () {
  if (window.matchMedia('screen and (min-width: 1023px)').matches) {
    companyDescription.textContent = 'Наши поставщики - мировые производители электронных компонентов: OSRAM, CREE, HOLGLITRONIC, REFOND. ' +
    'Печатные платы и комплектующие Service Devices применяются на предприятиях Российских Железных Дорог..';
  }
};*/

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

sectionsWebsite.addEventListener('click', openSectionsWebsiteList);
ourOffice.addEventListener('click', openOurOfficeList);


/*window.addEventListener('resize', reductionDescription);*/
callbackPopupOverlay.addEventListener('click', closePopup);
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEY) {
    evt.preventDefault();
    closePopup();
  }
});


window.addEventListener('DOMContentLoaded', function() {
  function setCursorPosition(pos, elem) {
      elem.focus();
      if (elem.setSelectionRange) elem.setSelectionRange(pos, pos);
      else if (elem.createTextRange) {
          var range = elem.createTextRange();
          range.collapse(true);
          range.moveEnd('character', pos);
          range.moveStart('character', pos);
          range.select()
      }
  }

  function mask(event) {
        var matrix = '+7(___)_______',
            i = 0,
            def = matrix.replace(/\D/g, ''),
            val = this.value.replace(/\D/g, '');
        if (def.length >= val.length) val = def;
        this.value = matrix.replace(/./g, function(a) {
            return /[_\d]/.test(a) && i < val.length ? val.charAt(i++) : i >= val.length ? '' : a
        });
        if (event.type == 'blur') {
            if (this.value.length == 2) this.value = ""
        } else setCursorPosition(this.value.length, this)
    };
    var userPhoneForm = document.querySelector('#tel');
    var userPhonePopup = form.querySelector('#phone');
      userPhoneForm.addEventListener('input', mask, false);
      userPhoneForm.addEventListener('focus', mask, false);
      userPhoneForm.addEventListener('blur', mask, false);

      userPhonePopup.addEventListener('input', mask, false);
      userPhonePopup.addEventListener('focus', mask, false);
      userPhonePopup.addEventListener('blur', mask, false);
});
