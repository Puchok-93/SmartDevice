'use strict';
var sectionsWebsiteList = document.querySelector('.sections-website-list');
var sectionsWebsiteButtonList = document.querySelector('.sections-website__button');

var ourOfficeList = document.querySelector('.our-office-list');
var ourOfficeListButton = document.querySelector('.our-office__button');


var test = function () {
  var mainBlockButton = document.querySelector('.main-block-info__link');
  var tabletWidth = 768;

  if (window.outerWidth > tabletWidth) {
    mainBlockButton.textContent = 'Получить бесплатную консультацию';
  } else {
    mainBlockButton.textContent = 'Бесплатная консультация';
  }

};


var openSectionsWebsiteList = function () {
  sectionsWebsiteList.classList.toggle('hide');
};

var openOurOfficeList = function () {
  ourOfficeList.classList.toggle('hide');
};

sectionsWebsiteButtonList.addEventListener('click', openSectionsWebsiteList);
ourOfficeListButton.addEventListener('click', openOurOfficeList);
window.addEventListener('resize', test);
