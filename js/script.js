//Menu Functionality
const menuButton = document.querySelector('.header__nav__menu-button');
const menuButtonImage = menuButton.querySelector('img');
const menu = document.querySelector('.header__nav__menu');
let menuLinks = document.querySelectorAll('.header__nav__menu__link');
const backgroundFade = document.querySelector('.background-fade');


//Menu Functionality
function hideMenu(){
    menu.classList.add('hidden');
    menuButtonImage.src = 'images/icon-hamburger.svg';
    menuButton.setAttribute('aria-expanded', 'false');
    backgroundFade.style.display = 'none';
}

function showMenu(){
    menu.classList.remove('hidden');
    menuButtonImage.src = 'images/icon-close-menu.svg';
    menuButton.setAttribute('aria-expanded', 'true');
    backgroundFade.style.display = 'block';
}

menuButton.addEventListener('click', () => {
    if (menu.classList.contains('hidden')) {
        showMenu();
    } else {
        hideMenu();
    }
});

window.addEventListener('keyup', (event) => {
    if (event.key === 'Escape' && !menu.classList.contains('hidden')) {
        hideMenu();
    }
});

menuLinks.forEach((menuLink) => {
    menuLink.addEventListener('focusout', (event) => {
      if (event.relatedTarget.classList.contains('header__nav__menu__link')) {
        return;
      }
      hideMenu();
    });
  });

  //Fill content
let bambooLeft = document.querySelectorAll('.bamboo-pledge-left');
let blackLeft = document.querySelectorAll('.black-pledge-left');
let mahoganyLeft = document.querySelectorAll('.mahogany-pledge-left');
let bambooNumber = 101;
let blackNumber = 64;
let mahoganyNumber = 0;
let amountRaisedNumber = 89914;
let totalBackersNumber = 5007;
let amountRaised = document.querySelector('.amount-raised');
let totalBackers = document.querySelector('.total-backers');

// Format Thousands numbers
function formatThousands(number) {
    let value;
    let num1 = number.toString().slice(0, -3);
    let num2 = number.toString().slice(-3);
    return (value = `${num1},${num2}`);
  }
  amountRaised.textContent = '$' + formatThousands(amountRaisedNumber);
  totalBackers.textContent = formatThousands(totalBackersNumber);
  
  //Check all pledges left and diasble block if 0
  function checkPledgesLeft(pledge) {
    let number = parseInt(pledge.textContent);
    if (number === 0) {
      pledge.parentElement.parentElement.classList.add('disabled');
      if (pledge.parentElement.nextElementSibling && pledge.parentElement.nextElementSibling.classList.contains('about__pledge-option__button')) {
        pledge.parentElement.nextElementSibling.textContent = 'Out of Stock';
        pledge.parentElement.nextElementSibling.disabled = 'true';
      }
      if (pledge.parentElement.parentElement.firstElementChild.classList.contains('back-project-modal__form__option__input')) {
        pledge.parentElement.parentElement.firstElementChild.disabled = 'true';
      }
    }
  }
  function fillPledgeLeft(content, number) {
    content.forEach((content) => {
      content.textContent = number;
      checkPledgesLeft(content);
    });
  }
  
  //Progress bar
  function fillProgressBar() {
    const progressBarFiller = document.querySelector('.progress-bar__filler');
    const totalBacked = 100000;
    let width = (amountRaisedNumber / totalBacked) * 100;
  
    progressBarFiller.style.width = width + '%';
  }

  //Fill out the page content
function fillPageContent() {
    fillPledgeLeft(bambooLeft, bambooNumber);
    fillPledgeLeft(blackLeft, blackNumber);
    fillPledgeLeft(mahoganyLeft, mahoganyNumber);
    fillProgressBar();
  }
  fillPageContent();

  //Bookmarked
const bookmarkButton = document.querySelector('.intro__text-block__buttons__button-two');
const bookmarked = localStorage.getItem('bookmarked');

function bookmark() {
  bookmarkButton.classList.add('bookmarked');
  bookmarkButton.lastElementChild.textContent = 'Bookmarked';
  localStorage.setItem('bookmarked', 'true');
}
function notBookmarked() {
  bookmarkButton.classList.remove('bookmarked');
  bookmarkButton.lastElementChild.textContent = 'Bookmark';
  localStorage.setItem('bookmarked', 'false');
}
function checkBookmark() {
  if (bookmarked === 'true') {
    bookmark();
  }
}
bookmarkButton.addEventListener('click', () => {
  if (bookmarkButton.classList.contains('bookmarked')) {
    notBookmarked();
  } else {
    bookmark();
  }
});
checkBookmark();


//Pledge Option: show block to enter pledge amount for specific pledge
const pledgeOptions = document.querySelectorAll('.back-project-modal__form__option__input');
const pledgeOptionsOuters = document.querySelectorAll('.back-project-modal__form__option');
const pledgeOptionsInnersTwo = document.querySelectorAll('.back-project-modal__form__option__inner-two');

function resetPledgeOptionsNonSelected() {
  pledgeOptionsOuters.forEach((pledgeOptionOuter) => {
    pledgeOptionOuter.classList.remove('checked');
  });
  pledgeOptionsInnersTwo.forEach((pledgeOptionInnerTwo) => {
    pledgeOptionInnerTwo.style.display = 'none';
  });
}
function openPledgeOptionSelected() {
  pledgeOptions.forEach((pledgeOption) => {
    let optionSelection = pledgeOption.parentElement.parentElement;
    let optionInnerTwo = pledgeOption.parentElement.nextElementSibling;
    if (pledgeOption.checked) {
      previousChecked = pledgeOption;
      optionSelection.classList.add('checked');
      optionInnerTwo.style.display = 'grid';
    }
    pledgeOption.addEventListener('change', () => {
      resetPledgeOptionsNonSelected();
      if (pledgeOption.checked) {
        previousChecked = pledgeOption;
        optionSelection.classList.add('checked');
        optionInnerTwo.style.display = 'grid';
      }
    });
  });
}
openPledgeOptionSelected();
