'use strict';
// var pageHeader = document.querySelector('.page-header');
// var headerToggle = document.querySelector('.page-header__toggle');

// pageHeader.classList.remove('page-header--nojs');

// headerToggle.addEventListener('click', function () {
//   if (pageHeader.classList.contains('page-header--closed')) {
//     pageHeader.classList.remove('page-header--closed');
//     pageHeader.classList.add('page-header--opened');
//   } else {
//     pageHeader.classList.add('page-header--closed');
//     pageHeader.classList.remove('page-header--opened');
//   }
// });
(function () {

  function switchTabs() {
    let tabsItems = document.querySelectorAll('.tabs__item');
    let tabsContents = document.querySelectorAll('.tabs__inset');
    let tabName;

    tabsItems.forEach((item) => {
      item.addEventListener('click', selectedTabsItem);
  });

    function selectedTabsItem() {
      tabsItems.forEach((item) => {
        item.classList.remove('tabs__item--active');
    });
      this.classList.add('tabs__item--active');
      tabName = this.getAttribute('data-tab-name');
      selectedTabContent(tabName);
    }

    function selectedTabContent(tab) {
      tabsContents.forEach((item) => {
        item.classList.contains(tab) ? item.classList.add('tabs__inset--active') : item.classList.remove('tabs__inset--active')
    })
    }
  }

  switchTabs();

  function getPhoneMask() {
    $('.to-go__phone').focus(function (e) {
      var $self = $(this);
      if ($self.val() === '') {
        $self.val('+7 ');
      }
      $self.data('placeholder-tmp', $self.attr('placeholder'));
      $self.attr('placeholder', '');
    });

    $('.to-go__phone').blur(function (e) {
      var $self = $(this);
      if ($self.val() === '+7' || $self.val() === '+7 ') {
        $self.val('');
      }
      $self.attr('placeholder', $self.data('placeholder-tmp'));
      if ($self.val().length === 18) {
        $self.css('border-color', '#484848');
      } else if ($self.val().length < 4) {
        $self.css('border-color', '#e3e3e3');
      } else {
        $self.css('border-color', '#ff0000');
      }
      console.log($self.val().length);
    });

    $('.to-go__phone').mask('+7 (000) 000 00 00');

    $('.to-go__submit').click(function (evt) {
      evt.preventDefault();
    });
  }

  getPhoneMask();

})();
