'use strict';
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
      item.addEventListener('click', function() {
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

  switchTabs();
  getInputMask();
  getAccordionQuestions();
  getFeedbackSlider();

})();
