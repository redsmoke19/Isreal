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
    $('.js-phone__input').focus(function (e) {
      var $self = $(this);
      if ($self.val() === '') {
        $self.val('+7 ');
      }
      $self.data('placeholder-tmp', $self.attr('placeholder'));
      $self.attr('placeholder', '');
    });

    $('.js-phone__input').blur(function (e) {
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
    });

    $('.js-phone__input').mask('+7 (000) 000 00 00');

    $('.details__input--name').blur(function (e) {
      var $self = $(this);
      $self.attr('placeholder', $self.data('placeholder-tmp'));
      if ($self.val().length > 2 || $self.val().length < 21) {
        $self.css('border-color', '#484848');
      }
      if ($self.val().length < 3 || $self.val().length > 20) {
        $self.css('border-color', '#ff0000');
      }
      if ($self.val().length == 0) {
        $self.css('border-color', '#e3e3e3');
      }
    });

    $('.to-go__submit').click(function (evt) {
      evt.preventDefault();
    });
  }

  function getAccordionQuestions() {
    var questionItem = document.querySelectorAll('.question__title');
    questionItem.forEach((item) => {
      item.addEventListener('click', function () {
      this.classList.toggle('question__title--active');

      var questionAnswer = this.nextElementSibling;
      console.log(questionAnswer);
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
      draggable: false,
    });
    var counter = document.querySelector('.slider__page-count');

    var prevButton = document.querySelector('.slider__button--left');
    var nextButton = document.querySelector('.slider__button--right');

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

  switchTabs();
  getInputMask();
  getAccordionQuestions();
  getFeedbackSlider();
  getPopup();

})();
