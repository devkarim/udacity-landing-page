/**
 *
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 *
 * Dependencies: None
 *
 * JS Version: ES2015/ES6
 *
 * JS Standard: ESlint
 *
 */

/**
 * Define Global Variables
 *
 */

const allSections = document.getElementsByTagName('section');
const navList = document.getElementById('navbar__list');
const scrollToUp = document.getElementById('scrollTop');
let scrollTimer;

/**
 * End Global Variables
 * Start Helper Functions
 *
 */

/**
 * @description Checks whether an element is in viewport
 * @param {HTMLElement} element Element to check if in viewport
 * @returns {boolean} If element is in viewport
 */
const isInViewport = (element) => {
  const { top, bottom } = element.getBoundingClientRect();
  return top >= 0 && bottom <= window.innerHeight;
};

/**
 * @description Get all sections data in a good format
 * @returns {Array} Array of sections data
 */
const getAllSectionsData = () => {
  const sections = [];
  for (const section of allSections) {
    sections.push({
      id: section.id,
      text: section.getAttribute('data-nav'),
    });
  }
  return sections;
};

const ALL_SECTIONS_DATA = getAllSectionsData();

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

/**
 * @description Adds navbar items to navbar list
 */
const buildNavBar = () => {
  const fragment = document.createDocumentFragment();
  for (const section of ALL_SECTIONS_DATA) {
    const li = document.createElement('li');
    const link = document.createElement('a');
    link.id = `${section.id}-item`;
    link.setAttribute('href', '#' + section.id);
    link.textContent = section.text;
    link.className = 'menu__link';
    li.appendChild(link);
    fragment.appendChild(li);
  }
  navList.appendChild(fragment);
};

buildNavBar();

/**
 * End Main Functions
 * Begin Events
 *
 */

/**
 * @description Hide/show navbar
 * @param {boolean} show Whether to show or hide
 */
const setNavbarVisible = (show) => {
  navList.style = `display: ${show ? 'block' : 'none'};`;
};

/**
 * @description Hide/show scroll to up button
 * @param {boolean} show Whether to show or hide
 */
const setScrollToUpVisislbe = (show) => {
  scrollToUp.style = `display: ${show ? 'block' : 'none'};`;
};

/**
 * @description Multiple checks to user scroll like if user stopped scrolling to hide navbar, etc
 * @param {Event} e Whether to show or hide
 */
const checkUserScroll = (e) => {
  // Show scroll to up button if user is at the bottom of the page
  const isAtTheBottom =
    window.innerHeight + window.scrollY >= document.body.offsetHeight;
  if (isAtTheBottom) {
    setScrollToUpVisislbe(true);
  } else {
    setScrollToUpVisislbe(false);
  }
  // Stop scroll if user stopped scrolling for a while
  setNavbarVisible(true);
  if (scrollTimer) clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => setNavbarVisible(false), 5000);
};

document.addEventListener('scroll', checkUserScroll);

/**
 * @description Checks active status of navbar items
 */
const checkActiveSection = (_) => {
  for (const section of allSections) {
    if (isInViewport(section)) {
      const activeSection = document.querySelector('section.active');
      const link = document.querySelector('#' + section.id + '-item');
      const activeLink = document.querySelector('a.active');
      if (activeSection != section) {
        activeSection?.classList?.remove('active');
        activeLink?.classList?.remove('active');
        section.classList.add('active');
        link.classList.add('active');
      }
      return;
    }
  }
};
document.addEventListener('scroll', checkActiveSection);

// Check active section on start
checkActiveSection();

/**
 * @description Scroll to section once user clicks
 */
navList.addEventListener('click', (e) => {
  if (e.target.tagName != 'A') return;
  e.preventDefault();
  const element = document.querySelector(e.target.getAttribute('href'));
  element.scrollIntoView({ behavior: 'smooth', block: 'center' });
});

/**
 * @description Scroll to up once user clicks
 */
scrollToUp.addEventListener('click', (_) => {
  window.scrollTo(0, 0);
});
