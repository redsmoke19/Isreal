'use strict';
(function () {

  function switchTabs() {
    let tabsItems = document.querySelectorAll('.tabs__item');
    let tabsContents = document.querySelectorAll('.tabs__inset');
    let tabName;

    tabsItems.forEach((item) => {
      item.addEventListener('click', selectedTabsItem);
  })
    ;

    function selectedTabsItem() {
      tabsItems.forEach((item) => {
        item.classList.remove('tabs__item--active');
    })
      ;
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

  function getInputMask() {
    // $('.js-phone').focus(function (e) {
    //   var $self = $(this);
    //   if ($self.val() === '') {
    //     $self.val('+7 ');
    //   }
    //   $self.data('placeholder-tmp', $self.attr('placeholder'));
    //   $self.attr('placeholder', '');
    // });

    // $('.js-phone').blur(function (e) {
    //   var $self = $(this);
    //   if ($self.val() === '+7' || $self.val() === '+7 ') {
    //     $self.val('');
    //   }
    //   $self.attr('placeholder', $self.data('placeholder-tmp'));
    // });

    $('.js-phone').mask('+7 ');
  }

  function getAccordionQuestions() {
    var questionItem = document.querySelectorAll('.question__title');
    questionItem.forEach((item) => {
      item.addEventListener('click', function () {
      this.classList.toggle('question__title--active');

      var questionAnswer = this.nextElementSibling;
      if (questionAnswer.style.maxHeight) {
        questionAnswer.style.maxHeight = null;
      } else {
        questionAnswer.style.maxHeight = questionAnswer.scrollHeight + "px";
      }
    })
  })
  }

  function getFeedbackSlider() {
    var reviewsList = document.querySelector('.js-sliders');
    var reviewsSlider = new Flickity(reviewsList, {
      pageDots: false,
      prevNextButtons: false,
      draggable: true,
    });
    var counter = document.querySelector('.slider-nav__page-count');

    var prevButton = document.querySelector('.slider-nav__button--left');
    var nextButton = document.querySelector('.slider-nav__button--right');

    function arrowClickPrevHandler() {
      reviewsSlider.previous();
    }

    function arrowClickNextHandler() {
      reviewsSlider.next();
    }

    function arrowClickDisabledHandler(index) {
      if (!reviewsSlider.cells[reviewsSlider.selectedIndex - 1]) {
        prevButton.setAttribute('disabled', '');
        nextButton.removeAttribute('disabled');
      } else if (!reviewsSlider.cells[reviewsSlider.selectedIndex + 1]) {
        nextButton.setAttribute('disabled', '');
        prevButton.removeAttribute('disabled');
      } else {
        prevButton.removeAttribute('disabled');
        nextButton.removeAttribute('disabled');
      }
    }

    function getCurrentReview() {
      var cellNumber = reviewsSlider.selectedIndex + 1;
      counter.textContent = cellNumber + ' / ' + reviewsSlider.slides.length;
    }

    getCurrentReview()
    prevButton.addEventListener('click', arrowClickPrevHandler);
    nextButton.addEventListener('click', arrowClickNextHandler);
    reviewsSlider.on('select', arrowClickDisabledHandler);
    reviewsSlider.on('select', getCurrentReview);
  }

  function getPopup() {
    var callbackButton = document.querySelector('.header__callback');
    var modalCallback = document.querySelector('.modal-callback');
    var modalAccepted = document.querySelector('.modal-accepted');
    var modalActive = document.querySelector('.modal--active');
    var overlay = document.querySelector('.overlay');
    var modalSubminButton = document.querySelector('.js-recall-button');
    var ESC_CODE = 27;
    var ENTER_CODE = 13;

    // var closeButton = modal.querySelector('.modal__close');
    function openPopup() {
      if (modalActive.classList.contains('modal-callback')) {
        modalCallback.classList.add('modal--active');
      }
      if (!modalActive.classList.contains('modal-accepted')) {
        modalAccepted.classList.add('modal--active');
      }
      overlay.style.display = 'block';
      document.addEventListener('keydown', closeEscPopup);
      document.body.style.overflow = 'hidden';
      // closeButton.addEventListener('click', closePopup);
      // closeButton.addEventListener('keydown', closeEnterPopup);
      document.addEventListener('click', closeOverlayClickPopup);
    }

    function closePopup() {
      if (modalActive.classList.contains('modal-callback')) {
        modalCallback.classList.remove('modal--active');
      }
      if (modalActive.classList.contains('modal-accepted')) {
        modalAccepted.classList.remove('modal--active');
      }
      overlay.style.display = 'none';
      document.removeEventListener('keydown', closeEscPopup);
      document.body.style.overflow = 'auto';
      // closeButton.removeEventListener('keydown', closeEnterPopup);
      document.removeEventListener('click', closeOverlayClickPopup);
    }

    function openEnterPopup(evt) {
      if (evt.keyCode === ENTER_CODE) {
        openPopup();
      }
    }

    function closeEscPopup(evt) {
      if (evt.keyCode === ESC_CODE) {
        closePopup();
      }
    }

    function closeEnterPopup(evt) {
      if (evt.keyCode === ENTER_CODE) {
        closePopup();
      }
    }

    function closeOverlayClickPopup(evt) {
      if (evt.target === overlay) {
        closePopup();
      }
    }

    // callbackButton.addEventListener('keydown', openEnterPopup);
    callbackButton.addEventListener('click', openPopup);

    // popupInit(modalCallback);
  }

  function getSlickSlider() {
    $('.tabs__list').slick({
      mobileFirst: true,
      dotsClass: 'tabs__dots',
      dots: true,
      arrows: false,
      infinite: false,
      responsive: [
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 768,
          settings: 'unslick',
        }
      ]
    });
  }

  function getPhotoMobileSlider() {
    var imageContainer = document.querySelector('.life__content');
    var desktopImages = document.querySelector('.life__images');
    var mobileImages = document.querySelectorAll('.js-life-mobile');
    var mobileImageContainer = document.createElement('div');
    desktopImages.style.display = 'none';
    mobileImageContainer.classList.add('life__mobile');
    for (var i = 0; i < mobileImages.length; i++) {
      mobileImageContainer.appendChild(mobileImages[i].cloneNode(true));
    };
    imageContainer.appendChild(mobileImageContainer);
    $('.life__mobile').slick({
      mobileFirst: true,
      dotsClass: 'life__dots',
      dots: true,
      arrows: false,
      infinite: false,
      responsive: [
        {
          breakpoint: 320,
          settings: {
            slidesToShow: 1,
            slidesToShow: 1,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 1024,
          settings: 'unslick',
        }
      ]
    });
  }

  if (window.matchMedia("(max-width: 767px)").matches) {
    getSlickSlider();
  }
  if (window.matchMedia("(max-width: 1023px)").matches) {
    getPhotoMobileSlider();
  }

  (function () {

    window.addEventListener("resize", resizeThrottler, false);

    var resizeTimeout;

    function resizeThrottler() {
        if (!resizeTimeout) {
            resizeTimeout = setTimeout(function () {
                resizeTimeout = null;
                actualResizeHandler();
            }, 66);
        }
    }

    function actualResizeHandler() {
      var lifeMobile = document.querySelector('.life__mobile');
      var desktopImages = document.querySelector('.life__images');
      if (window.matchMedia("(max-width: 1023px)").matches) {
        if (!lifeMobile) {
          getPhotoMobileSlider();
        }
      }
      if (window.matchMedia("(min-width: 1024px)").matches) {
        if (lifeMobile) {
          lifeMobile.remove();
          desktopImages.style.display = 'flex';
        }
      }
      if (window.matchMedia("(min-width: 768px)").matches) {
        $('.tabs__content').slick('unslick');
        $('.tabs__list').slick('unslick');
      }
    }

  }());

  function getFormValiditi() {
    var form = document.querySelectorAll('.js-form');
    var forms = document.querySelectorAll('.novalidate');
    for (var i = 0; i < forms.length; i++) {
      forms[i].setAttribute('novalidate', true);
    }
    console.log(form);

    function hasError(field) {
      if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') {
        return;
      }
      var validity = field.validity;
      if (validity.valid) {
        return;
      }
      if (validity.valueMissing) {
        return 'Пожалуйста, заполните это поле. Оно обязательное';
      }
      if (validity.typeMismatch) {
        if (field.type === 'email') {
          return 'Пожалуйста, введите верное значение почты';
        }
        if (field.type === 'url') {
          return 'Пожалуйста, введите правильный адрес ссылки';
        }
      }
      if (validity.tooShort) {
        if (field.type === 'tel') {
          return 'Неверный номер телефона';
        }
        return 'Длинна имени должна быть не менее ' + field.getAttribute('minLength') + ' символов. Вы ввели ' + field.value.length + ' символа.';
      }
      if (validity.tooLong) {
        return 'Длинна имени должна быть не более ' + field.getAttribute('maxLength') + ' символов. Вы ввели ' + field.value.length + ' символа.';
      }
      if (validity.badInput) {
        return 'Пожалуйста, введите число';
      }
      if (validity.stepMismatch) {
        return 'Указано не верное значение';
      }
      if (validity.rangeOverflow) {
        return 'Введенное значение слишком велико';
      }
      if (validity.rangeUnderflow) {
        return 'Введенное значение слишком мало';
      }
      if (validity.patternMismatch) {
        return 'неверный формат';
      }
      return 'Введенное значение не верно';
    }

    function showError(field, error) {
      field.classList.add('input__error');
    }

    function removeError(field) {
      field.classList.remove('input__error');
    }

    function fieldBlurHandler(evt) {
      if (!evt.target.form.classList.contains('novalidate')) {
        return;
      }
      var error = hasError(evt.target);
      if (error) {
        showError(evt.target, error);
        return;
      }
      removeError(evt.target);
    }

    function submitButtonHandler(evt) {
      if (!evt.target.classList.contains('novalidate')) {
        return;
      }
      var fields = evt.target.elements;
      var error;
      var hasErrors;
      for (var j = 0; j < fields.length; j++) {
        error = hasError(fields[j]);
        if (error) {
          showError(fields[j], error);
          if (!hasErrors) {
            hasErrors = fields[j];
          }
        } else {
          evt.preventDefault();
          removeError(fields[j]);
        }
      }
      if (hasErrors) {
        evt.preventDefault();
        hasErrors.focus();
      } else if (!hasErrors) {
        console.log('Yeeep');
      }

    }

    for(var j = 0; j < form.length; j++) {
      form[j].addEventListener('submit', submitButtonHandler, false);
      form[j].addEventListener('blur', fieldBlurHandler, true);
    }
  }

  switchTabs();
  // getInputMask();
  getAccordionQuestions();
  getFeedbackSlider();
  getFormValiditi();

})();
