// =============================================================================
// REVIEWS SLIDER FUNCTIONALITY
// =============================================================================

class ReviewsSlider {
  constructor() {
    this.container = document.querySelector('.reviews .slider-container');
    this.prevBtn = document.querySelector('.reviews__prev');
    this.nextBtn = document.querySelector('.reviews__next');
    this.cards = document.querySelectorAll('.reviews__slide');

    if (!this.container || !this.prevBtn || !this.nextBtn) return;

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.slidePrev());
    this.nextBtn.addEventListener('click', () => this.slideNext());

    this.container.addEventListener('mousedown', (e) => this.startDrag(e));
    this.container.addEventListener('mousemove', (e) => this.drag(e));
    this.container.addEventListener('mouseup', () => this.endDrag());
    this.container.addEventListener('mouseleave', () => this.endDrag());

    this.container.addEventListener('touchstart', (e) => this.startTouch(e), { passive: true });
    this.container.addEventListener('touchmove', (e) => this.moveTouch(e), { passive: true });
    this.container.addEventListener('touchend', () => this.endTouch());

    this.container.addEventListener('scroll', () => this.updateButtonStates());

    window.addEventListener('resize', () => this.handleResize());

    this.updateButtonStates();
  }

  slidePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollToCard();
    }
  }

  slideNext() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.scrollToCard();
    }
  }

  scrollToCard() {
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 20;
    const scrollPosition = this.currentIndex * (cardWidth + gap);

    this.container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  startDrag(e) {
    this.isDown = true;
    this.startX = e.pageX - this.container.offsetLeft;
    this.scrollLeft = this.container.scrollLeft;
    this.container.classList.add('dragging');
  }

  drag(e) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.container.scrollLeft = this.scrollLeft - walk;
  }

  endDrag() {
    this.isDown = false;
    this.container.classList.remove('dragging');
    this.snapToNearestCard();
  }

  startTouch(e) {
    this.startX = e.touches[0].clientX;
    this.scrollLeft = this.container.scrollLeft;
  }

  moveTouch(e) {
    const x = e.touches[0].clientX;
    const walk = (x - this.startX) * 2;
    this.container.scrollLeft = this.scrollLeft - walk;
  }

  endTouch() {
    this.snapToNearestCard();
  }

  snapToNearestCard() {
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 20;
    const scrollPosition = this.container.scrollLeft;
    const cardIndex = Math.round(scrollPosition / (cardWidth + gap));

    this.currentIndex = Math.max(0, Math.min(cardIndex, this.maxIndex));
    this.scrollToCard();
  }

  updateButtonStates() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
  }

  handleResize() {
    this.cardsPerView = this.getCardsPerView();
    this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
    this.scrollToCard();
  }
}

// =============================================================================
// FAQ ACCORDION FUNCTIONALITY
// =============================================================================

class FAQAccordion {
  constructor() {
    this.headers = document.querySelectorAll('.faq__accordion-header');
    this.items = document.querySelectorAll('.faq__accordion-item');

    if (!this.headers.length) return;

    this.init();
  }

  init() {
    this.headers.forEach((header, index) => {
      header.addEventListener('click', () => this.toggleItem(index));
    });
  }

  toggleItem(index) {
    const item = this.items[index];
    const isActive = item.classList.contains('active');

    this.items.forEach((item, itemIndex) => {
      if (itemIndex !== index) {
        item.classList.remove('active');
      }
    });

    if (!isActive) {
      item.classList.add('active');
    }
  }
}

// =============================================================================
// NEWS SLIDER FUNCTIONALITY
// =============================================================================

class NewsSlider {
  constructor() {
    this.container = document.querySelector('.news-slider-container');
    this.slides = document.querySelectorAll('.news-slide');
    this.prevBtn = document.getElementById('news-prev');
    this.nextBtn = document.getElementById('news-next');
    this.currentIndex = 0;

    if (this.container && this.slides.length > 0) {
      this.init();
    }
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.updateButtons();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  updateSlider() {
    const offset = -this.currentIndex * 100;
    this.container.style.transform = `translateX(${offset}%)`;
    this.updateButtons();
  }

  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
  }
}

// =============================================================================
// ARTICLES SLIDER FUNCTIONALITY
// =============================================================================

class ArticlesSlider {
  constructor() {
    this.container = document.querySelector('.polezno .slider-container');
    this.prevBtn = document.querySelector('.articles__prev');
    this.nextBtn = document.querySelector('.articles__next');
    this.cards = document.querySelectorAll('.articles__slide');

    if (!this.container || !this.prevBtn || !this.nextBtn) return;

    this.currentIndex = 0;
    this.cardsPerView = this.getCardsPerView();
    this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
    this.isDown = false;
    this.startX = 0;
    this.scrollLeft = 0;

    this.init();
  }

  getCardsPerView() {
    if (window.innerWidth <= 480) return 1;
    if (window.innerWidth <= 768) return 2;
    return 3;
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.slidePrev());
    this.nextBtn.addEventListener('click', () => this.slideNext());

    this.container.addEventListener('mousedown', (e) => this.startDrag(e));
    this.container.addEventListener('mousemove', (e) => this.drag(e));
    this.container.addEventListener('mouseup', () => this.endDrag());
    this.container.addEventListener('mouseleave', () => this.endDrag());

    this.container.addEventListener('touchstart', (e) => this.startTouch(e), { passive: true });
    this.container.addEventListener('touchmove', (e) => this.moveTouch(e), { passive: true });
    this.container.addEventListener('touchend', () => this.endTouch());

    this.container.addEventListener('scroll', () => this.updateButtonStates());

    window.addEventListener('resize', () => this.handleResize());

    this.updateButtonStates();
  }

  slidePrev() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.scrollToCard();
    }
  }

  slideNext() {
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
      this.scrollToCard();
    }
  }

  scrollToCard() {
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 20;
    const scrollPosition = this.currentIndex * (cardWidth + gap);

    this.container.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
  }

  startDrag(e) {
    this.isDown = true;
    this.startX = e.pageX - this.container.offsetLeft;
    this.scrollLeft = this.container.scrollLeft;
    this.container.classList.add('dragging');
  }

  drag(e) {
    if (!this.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.container.offsetLeft;
    const walk = (x - this.startX) * 2;
    this.container.scrollLeft = this.scrollLeft - walk;
  }

  endDrag() {
    this.isDown = false;
    this.container.classList.remove('dragging');
    this.snapToNearestCard();
  }

  startTouch(e) {
    this.startX = e.touches[0].clientX;
    this.scrollLeft = this.container.scrollLeft;
  }

  moveTouch(e) {
    const x = e.touches[0].clientX;
    const walk = (x - this.startX) * 2;
    this.container.scrollLeft = this.scrollLeft - walk;
  }

  endTouch() {
    this.snapToNearestCard();
  }

  snapToNearestCard() {
    const cardWidth = this.cards[0].offsetWidth;
    const gap = 20;
    const scrollPosition = this.container.scrollLeft;
    const cardIndex = Math.round(scrollPosition / (cardWidth + gap));

    this.currentIndex = Math.max(0, Math.min(cardIndex, this.maxIndex));
    this.scrollToCard();
  }

  updateButtonStates() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex >= this.maxIndex;
  }

  handleResize() {
    this.cardsPerView = this.getCardsPerView();
    this.maxIndex = Math.max(0, this.cards.length - this.cardsPerView);
    this.currentIndex = Math.min(this.currentIndex, this.maxIndex);
    this.scrollToCard();
  }
}

// =============================================================================
// GRID INTERACTIVITY FUNCTIONALITY (FAQ)
// =============================================================================

// =============================================================================
// GRID INTERACTIVITY FUNCTIONALITY (FAQ)
// =============================================================================

class GridInteractivity {
  constructor() {
    this.gridItems = document.querySelectorAll('.left__grid-item');

    if (!this.gridItems.length) return;

    this.init();
  }

  init() {
    this.gridItems.forEach(item => {
      item.addEventListener('click', () => this.toggleActiveItem(item));
    });

    // Если есть data-faq атрибут, загружаем контент при клике
    this.gridItems.forEach(item => {
      const faqData = item.getAttribute('data-faq');
      if (faqData) {
        item.addEventListener('click', () => this.loadFAQ(faqData));
      }
    });
  }

  toggleActiveItem(clickedItem) {
    this.gridItems.forEach(item => {
      item.classList.remove('left__grid-item--active');
    });

    clickedItem.classList.add('left__grid-item--active');
  }

  loadFAQ(faqData) {
    try {
      const data = JSON.parse(faqData);
      const accordion = document.querySelector('.faq__accordion');

      if (!accordion) return;

      // Очищаем аккордеон
      accordion.innerHTML = '';

      // Генерируем элементы аккордеона (без активного класса по умолчанию)
      data.forEach((item, index) => {
        const faqItem = document.createElement('div');
        faqItem.className = 'faq__accordion-item'; // Убрали ' active'

        faqItem.innerHTML = `
          <div class="faq__accordion-header">
            <span class="faq__accordion-title">${item.q}</span>
            <span class="faq__accordion-icon">+</span>
          </div>
          <div class="faq__accordion-content">
            <p>${item.a}</p>
          </div>
        `;

        accordion.appendChild(faqItem);
      });

      // Переподключаем обработчики событий для новых элементов
      this.reinitAccordion();

    } catch (e) {
      console.error('Ошибка парсинга FAQ данных:', e);
    }
  }

  reinitAccordion() {
    const headers = document.querySelectorAll('.faq__accordion-header');
    const items = document.querySelectorAll('.faq__accordion-item');

    headers.forEach((header, index) => {
      header.addEventListener('click', () => {
        const item = items[index];
        const isActive = item.classList.contains('active');

        items.forEach((i) => i.classList.remove('active'));

        if (!isActive) {
          item.classList.add('active');
        }
      });
    });
  }
}

// =============================================================================
// DOCS GRID INTERACTIVITY FUNCTIONALITY
// =============================================================================

class DocsGridInteractivity {
  constructor() {
    this.docsItems = document.querySelectorAll('.docs__left-item');

    if (!this.docsItems.length) return;

    this.init();
  }

  init() {
    this.docsItems.forEach(item => {
      item.addEventListener('click', () => this.toggleActiveItem(item));
    });
  }

  toggleActiveItem(clickedItem) {
    this.docsItems.forEach(item => {
      item.classList.remove('docs__left-item--active');
    });

    clickedItem.classList.add('docs__left-item--active');
  }
}

class DocsAccordion {
  constructor() {
    this.accordionItems = document.querySelectorAll('.docs__accordion-item');
    this.downloadBtns = document.querySelectorAll('.docs__download-btn');

    if (!this.accordionItems.length) return;

    this.init();
  }

  init() {
    // Accordion functionality
    this.accordionItems.forEach(item => {
      const header = item.querySelector('.docs__accordion-header');
      if (header) {
        header.addEventListener('click', () => this.toggleAccordion(item));
      }
    });

    // Download functionality
    this.downloadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation(); // Prevent accordion toggle when clicking download
        this.downloadDocument(btn);
      });
    });
  }

  toggleAccordion(item) {
    const isActive = item.classList.contains('active');

    // Close all items
    this.accordionItems.forEach(accordionItem => {
      accordionItem.classList.remove('active');
    });

    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  }

  downloadDocument(btn) {
    // Get document title from the accordion
    const accordionItem = btn.closest('.docs__accordion-item');
    const title = accordionItem.querySelector('.docs__accordion-title').textContent;

    // For now, create a placeholder download
    // Later you can replace this with actual file paths
    const fileName = title.toLowerCase().replace(/\s+/g, '_') + '.pdf';

    // Create a temporary download link
    const link = document.createElement('a');
    link.href = '#'; // Placeholder - replace with actual file path
    link.download = fileName;
    link.style.display = 'none';

    // For demo purposes, just log the download action
    console.log(`Downloading: ${fileName}`);

    // When you have actual files, uncomment this:
    // document.body.appendChild(link);
    // link.click();
    // document.body.removeChild(link);

    // Visual feedback
    btn.style.transform = 'scale(0.9)';
    setTimeout(() => {
      btn.style.transform = 'scale(1)';
    }, 200);
  }
}

// =============================================================================
// NAVIGATION ACTIVE STATE FUNCTIONALITY
// =============================================================================

class NavigationActiveState {
  constructor() {
    // WordPress wp_nav_menu generates different structure, try multiple selectors
    this.menuLinks = document.querySelectorAll('.nav-menu-link, .menu-item a, .nav-main-menu a, .nav-main-menu .menu-item a');

    console.log('Found menu links:', this.menuLinks.length);
    console.log('Menu links:', this.menuLinks);

    if (!this.menuLinks.length) return;

    this.init();
  }

  init() {
    console.log('NavigationActiveState init() called');
    this.setActivePage();
  }

  setActivePage() {
    const currentPath = window.location.pathname;
    const currentHash = window.location.hash;

    // Debug logging
    console.log('Current path:', currentPath);
    console.log('Current hash:', currentHash);

    // Remove existing aria-current attributes
    this.menuLinks.forEach(link => {
      link.removeAttribute('aria-current');
    });

    // Find and set active link based on current URL
    this.menuLinks.forEach(link => {
      const href = link.getAttribute('href');
      console.log('Checking href:', href);

      // Handle different URL patterns
      if (this.isCurrentPage(href, currentPath, currentHash)) {
        link.setAttribute('aria-current', 'page');
        console.log('Set aria-current for:', href);
      }
    });
  }

  isCurrentPage(href, currentPath, currentHash) {
    // Extract only the path from currentPath if it's a full URL
    let pathOnly = currentPath;
    try {
      const url = new URL(currentPath);
      pathOnly = url.pathname;
    } catch (e) {
      // currentPath is likely already a path, not a full URL
    }

    // Extract only the path from href if it's a full URL
    let hrefOnly = href;
    try {
      const hrefUrl = new URL(href);
      hrefOnly = hrefUrl.pathname;
    } catch (e) {
      // href is likely already a path, not a full URL
    }

    console.log('Checking:', hrefOnly, 'vs', pathOnly);

    // Home page - ONLY match if it's exactly the home page
    if ((hrefOnly === '/' || hrefOnly === '/index.html' || hrefOnly === './') &&
        (pathOnly === '/' || pathOnly === '/index.html' || pathOnly === '/')) {
      console.log('Home page match');
      return true;
    }

    // Other pages - check if href matches current path
    if (hrefOnly && hrefOnly !== '/') {
      // Remove leading slash and .html for comparison
      const cleanHref = hrefOnly.replace(/^\//, '').replace('.html', '');
      const cleanPath = pathOnly.replace(/^\//, '').replace('.html', '');

      console.log('Comparing:', cleanHref, 'vs', cleanPath);

      // Handle WordPress pretty URLs and .html extensions
      if (cleanPath === cleanHref ||
          cleanPath.startsWith(cleanHref + '/') ||
          pathOnly.includes(hrefOnly)) {
        console.log('Page match:', hrefOnly);
        return true;
      }

      // Additional WordPress-specific checks
      // Check if path ends with page name (WordPress permalinks)
      if (pathOnly.endsWith('/' + cleanHref) ||
          pathOnly === '/' + cleanHref ||
          pathOnly.includes('/' + cleanHref + '/')) {
        console.log('WordPress permalink match:', hrefOnly);
        return true;
      }
    }

    return false;
  }
}

class InterestingSlider {
  constructor() {
    this.container = document.querySelector('.interesting');
    this.slides = document.querySelectorAll('.interesting__info');
    this.titles = document.querySelectorAll('.geo__office-title');
    this.prevBtn = document.getElementById('geo-prev');
    this.nextBtn = document.getElementById('geo-next');
    this.currentIndex = 0;

    if (this.container && this.slides.length > 0 && this.prevBtn && this.nextBtn) {
      this.init();
    }
  }

  init() {
    this.prevBtn.addEventListener('click', () => this.prevSlide());
    this.nextBtn.addEventListener('click', () => this.nextSlide());
    this.updateButtons();
    this.updateSlideVisibility();
  }

  prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateSlider();
    }
  }

  nextSlide() {
    if (this.currentIndex < this.slides.length - 1) {
      this.currentIndex++;
      this.updateSlider();
    }
  }

  updateSlider() {
    this.updateSlideVisibility();
    this.updateButtons();
  }

  updateSlideVisibility() {
    this.slides.forEach((slide, index) => {
      if (index === this.currentIndex) {
        slide.classList.add('active');
      } else {
        slide.classList.remove('active');
      }
    });

    this.titles.forEach((title, index) => {
      if (index === this.currentIndex) {
        title.classList.add('active');
      } else {
        title.classList.remove('active');
      }
    });
  }

  updateButtons() {
    this.prevBtn.disabled = this.currentIndex === 0;
    this.nextBtn.disabled = this.currentIndex === this.slides.length - 1;
  }
}

// =============================================================================
// FILIAL NAVIGATION FUNCTIONALITY
// =============================================================================

class FilialNavigation {
  constructor() {
    this.navButtons = document.querySelectorAll('.filial__nav-btn');
    this.infoBlocks = document.querySelectorAll('.filial__info-block');

    if (!this.navButtons.length || !this.infoBlocks.length) return;

    this.init();
  }

  init() {
    this.navButtons.forEach(button => {
      button.addEventListener('click', () => this.switchFilial(button));
    });
  }

  switchFilial(clickedButton) {
    const targetCity = clickedButton.getAttribute('data-city');

    // Удаляем активный класс у всех кнопок
    this.navButtons.forEach(btn => {
      btn.classList.remove('active');
    });

    // Добавляем активный класс нажатой кнопке
    clickedButton.classList.add('active');

    // Скрываем все блоки информации
    this.infoBlocks.forEach(block => {
      block.classList.remove('active');
    });

    // Показываем соответствующий блок информации
    const targetBlock = document.getElementById(targetCity);
    if (targetBlock) {
      targetBlock.classList.add('active');

      // Если выбран Норильск, показываем оба блока
      if (targetCity === 'norilsk') {
        const secondNorilskBlock = document.getElementById('norilsk-2');
        if (secondNorilskBlock) {
          secondNorilskBlock.classList.add('active');
        }
      }
    }
  }
}

// =============================================================================
// TRACKING FORM FUNCTIONALITY
// =============================================================================

class TrackingForm {
  constructor() {
    this.trackForms = document.querySelectorAll('.track-form');

    if (!this.trackForms.length) return;

    this.init();
  }

  init() {
    this.trackForms.forEach(form => {
      form.addEventListener('submit', (e) => this.handleFormSubmit(e, form));
    });
  }

  handleFormSubmit(e, form) {
    // Find the form card to get "From/To" values
    const card = form.closest('.form-card');
    if (card) {
      const fromInput = card.querySelector('input[name="from-location"]');
      const toInput = card.querySelector('input[name="to-location"]');

      // Find hidden fields in tracking form
      const hiddenFrom = form.querySelector('input.track-from');
      const hiddenTo = form.querySelector('input.track-to');

      // Fill with values if fields found
      if (fromInput && hiddenFrom) hiddenFrom.value = fromInput.value;
      if (toInput && hiddenTo) hiddenTo.value = toInput.value;
    }
  }
}

// =============================================================================
// HERO CONTENT ROTATION FUNCTIONALITY
// =============================================================================

class HeroContentRotation {
  constructor() {
    // Only run on homepage
    if (!document.body.classList.contains('home') && !document.body.classList.contains('front-page')) {
      return;
    }

    // Get template directory URL from WordPress global variable
    const templateUrl = window.themeUrl || '/wp-content/themes/g-line';

    this.heroData = [
      {
        background: `url('${templateUrl}/assets/img/hero-block.webp')`,
        title: "Эксперты в экстремальной логистике Севера.<br>25 лет доставляем груз в любой сезон",
        subtitle: "Авиа, море, река, зимник — 99% грузов без задержек"
      },
      {
        background: `url('${templateUrl}/assets/img/hero-block-1.webp')`,
        title: "Переезд из Норильска на материк - под ключ.<br>Быстро, просто и без стресса",
        subtitle: "Заберем груз из дома, упакуем, застрахуем и доставим вовремя"
      },
      {
        background: `url('${templateUrl}/assets/img/hero-block-2.webp')`,
        title: "Доставляем для бизнеса: промышленные грузы, спецтехника, опасные грузы, температурный режим",
        subtitle: "Решим любую сложную задачу! Лицензии, опыт, гарании",
        rotateBackground: true,
        rotationClass: 'header-rotate-180'
      },
      {
        background: `url('${templateUrl}/assets/img/hero-block-3.webp')`,
        title: "Автодоставка по всей Сибири. <br>Без посредников и задержек",
        subtitle: "Ежедневные рейсы. От документов до спецтехники",
        overlay: 'rgba(0, 0, 0, 0.3)'
      }
    ];

    this.currentIndex = 0;
    this.header = document.querySelector('.header');
    this.titleElement = document.querySelector('.header-title');
    this.subtitleElement = document.querySelector('.header-subtitle');

    if (!this.header || !this.titleElement || !this.subtitleElement) {
      return;
    }

    this.init();
  }

  init() {
    // Set initial transition styles
    this.header.style.transition = 'opacity 0.5s ease-in-out, background-image 0.5s ease-in-out';
    this.titleElement.style.transition = 'opacity 0.5s ease-in-out';
    this.subtitleElement.style.transition = 'opacity 0.5s ease-in-out';

    // Start rotation
    this.rotationInterval = setInterval(() => {
      this.currentIndex = (this.currentIndex + 1) % this.heroData.length;
      this.updateHeroContent(this.currentIndex);
    }, 10000);
  }

  updateHeroContent(index) {
    const data = this.heroData[index];

    // Fade out effect
    this.header.style.opacity = '0.8';
    this.titleElement.style.opacity = '0';
    this.subtitleElement.style.opacity = '0';

    setTimeout(() => {
      // Update background
      this.header.style.backgroundImage = data.background;
      this.header.style.backgroundSize = 'cover';
      this.header.style.backgroundPosition = 'center';
      this.header.style.backgroundRepeat = 'no-repeat';

      // Apply overlay if exists (for hero-block-3)
      if (data.overlay) {
        this.header.style.backgroundColor = data.overlay;
        this.header.style.backgroundBlendMode = 'overlay';
      } else {
        this.header.style.backgroundColor = 'transparent';
        this.header.style.backgroundBlendMode = 'normal';
      }

      // Apply background rotation if exists (for hero-block-1 and hero-block-2)
      if (data.rotateBackground) {
        // Remove all rotation classes first
        this.header.classList.remove('header-rotate-90', 'header-rotate-180');
        // Add specific rotation class
        this.header.classList.add(data.rotationClass);
        // Set CSS custom property for background image
        this.header.style.setProperty('--hero-bg-image', data.background);
        // Hide main background
        this.header.style.background = 'none';
      } else {
        // Remove all rotation classes
        this.header.classList.remove('header-rotate-90', 'header-rotate-180');
        // Clear CSS custom property
        this.header.style.removeProperty('--hero-bg-image');
        // Restore main background for other blocks
        this.header.style.backgroundImage = data.background;
        this.header.style.backgroundSize = 'cover';
        this.header.style.backgroundPosition = 'center';
        this.header.style.backgroundRepeat = 'no-repeat';
      }

      // Update text
      this.titleElement.innerHTML = data.title;
      this.subtitleElement.innerHTML = data.subtitle;

      // Fade in effect
      this.header.style.opacity = '1';
      this.titleElement.style.opacity = '1';
      this.subtitleElement.style.opacity = '1';
    }, 300);
  }

  destroy() {
    if (this.rotationInterval) {
      clearInterval(this.rotationInterval);
    }
  }
}

// =============================================================================
// CITY SELECTOR FUNCTIONALITY
// =============================================================================

class CitySelector {
  constructor() {
    this.citySelectors = document.querySelectorAll('.nav-city-selector');

    if (!this.citySelectors.length) return;

    // Данные городов: телефон, телефон для tel:, адрес
    this.cityData = {
      'norilsk': {
        phone: '+7 (3919) 32-42-49',
        phoneRaw: '+73919324249',
        address: 'ул. Вокзальная, 35а, стр. 4'
      },
      'barnaul': {
        phone: '+7 (913) 720-10-27',
        phoneRaw: '+79137201027',
        address: 'ул. Власихинская, 141а, корпус 2'
      },
      'kemerovo': {
        phone: '+7 (913) 720-10-27',
        phoneRaw: '+79137201027',
        address: 'ул. Тухачевского, 58а, литера А'
      },
      'krasnoyarsk': {
        phone: '+7 (391) 278-72-76',
        phoneRaw: '+73912787276',
        address: 'ул. Северное шоссе, 35и'
      },
      'novosibirsk': {
        phone: '+7 (383) 363-22-06',
        phoneRaw: '+73833632206',
        address: 'ул. Сухарная, 25'
      },
    };

    this.init();
  }

  init() {
    this.citySelectors.forEach(selector => {
      const button = selector.querySelector('.nav-city-btn');
      const dropdown = selector.querySelector('.nav-city-dropdown');
      const options = selector.querySelectorAll('.nav-city-option');

      if (!button || !dropdown) return;

      // Открытие/закрытие выпадающего списка по клику на кнопку
      button.addEventListener('click', (e) => {
        e.stopPropagation();
        const isExpanded = button.getAttribute('aria-expanded') === 'true';

        // Закрываем все открытые списки
        this.closeAllDropdowns();

        // Открываем/закрываем текущий
        if (!isExpanded) {
          button.setAttribute('aria-expanded', 'true');
          dropdown.classList.add('open');
        }
      });

      // Выбор города
      options.forEach(option => {
        option.addEventListener('click', (e) => {
          e.stopPropagation();
          const city = option.getAttribute('data-city');
          const cityText = option.textContent;

          // Обновляем текст кнопки
          const cityTextSpan = button.querySelector('.nav-city-text');
          if (cityTextSpan) {
            cityTextSpan.textContent = cityText;
          }

          // Обновляем aria-label
          button.setAttribute('aria-label', `Выбрать город: ${cityText}`);

          // Закрываем выпадающий список
          button.setAttribute('aria-expanded', 'false');
          dropdown.classList.remove('open');

          // Обновляем контактную информацию
          this.handleCityChange(city);
        });
      });
    });

    // Закрытие при клике вне списка
    document.addEventListener('click', () => {
      this.closeAllDropdowns();
    });
  }

  closeAllDropdowns() {
    document.querySelectorAll('.nav-city-dropdown').forEach(dropdown => {
      dropdown.classList.remove('open');
    });
    document.querySelectorAll('.nav-city-btn').forEach(button => {
      button.setAttribute('aria-expanded', 'false');
    });
  }

  handleCityChange(selectedCity) {
    const data = this.cityData[selectedCity];

    if (data) {
      // Находим родительский блок контактной информации
      const contactInfo = document.querySelector('.nav-contact-info');

      if (contactInfo) {
        const phoneLink = contactInfo.querySelector('.nav-phone-link');
        const addressText = contactInfo.querySelector('.nav-address-text');

        if (phoneLink) {
          phoneLink.textContent = data.phone;
          phoneLink.href = 'tel:' + data.phoneRaw;
        }

        if (addressText) {
          addressText.textContent = data.address;
        }
      }
    }
  }
}

// =============================================================================
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
  new ArticlesSlider();
  new FAQAccordion();
  new NewsSlider();
  new GridInteractivity();
  new DocsGridInteractivity();
  new DocsAccordion();
  new NavigationActiveState();
  new FilialNavigation();
  new InterestingSlider();
  new TrackingForm();
  new HeroContentRotation();
  new PamyatkaAccordion();
  new CitySelector();
  new NovostiAccordion();
});

// =============================================================================
// ПАМЯТКА ОТПРАВИТЕЛЮ - АККОРДЕОН
// =============================================================================

class PamyatkaAccordion {
  constructor() {
    this.accordion = document.querySelector('.pamyatka-accordion');

    if (!this.accordion) return;

    this.items = this.accordion.querySelectorAll('.pamyatka-accordion-item');
    this.headers = this.accordion.querySelectorAll('.pamyatka-accordion-header');

    this.init();
  }

  init() {
    this.headers.forEach((header, index) => {
      header.addEventListener('click', () => this.toggleItem(index));
    });
  }

  toggleItem(index) {
    const clickedItem = this.items[index];
    const isActive = clickedItem.classList.contains('active');

    // Закрываем все открытые элементы
    this.items.forEach(item => {
      item.classList.remove('active');
    });

    // Если кликнутый элемент не был активен, открываем его
    if (!isActive) {
      clickedItem.classList.add('active');
    }
  }
}

// =============================================================================
// CONTACT POPUP HOVER FUNCTIONALITY
// =============================================================================

class ContactPopup {
  constructor() {
    this.discussBtns = document.querySelectorAll('.discuss-goods-btn, .btn--logist');

    if (!this.discussBtns.length) return;

    this.init();
  }

  init() {
    this.discussBtns.forEach((btn) => {
      // Сначала ищем попап внутри кнопки
      let popup = btn.querySelector('.contact-popup');
      
      // Если не нашли внутри, ищем среди следующих соседей
      if (!popup) {
        let next = btn.nextElementSibling;
        while (next) {
          if (next.classList.contains('contact-popup')) {
            popup = next;
            break;
          }
          next = next.nextElementSibling;
        }
      }
      
      if (!popup) return;

      let hoverTimeout;
      const hoverDelay = 200;

      btn.addEventListener('mouseenter', () => {
        hoverTimeout = setTimeout(() => {
          popup.classList.add('show');
        }, hoverDelay);
      });

      btn.addEventListener('mouseleave', () => {
        clearTimeout(hoverTimeout);
      });

      popup.addEventListener('mouseenter', () => {
        clearTimeout(hoverTimeout);
        popup.classList.add('show');
      });

      popup.addEventListener('mouseleave', () => {
        popup.classList.remove('show');
      });

      btn.addEventListener('touchstart', (e) => {
        e.preventDefault();
        popup.classList.toggle('show');
      });
    });
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ContactPopup();
  });
} else {
  new ContactPopup();
}

// =============================================================================
// DOCS SELECTOR BLOCK - DOCUMENTS CATEGORY SELECTOR WITH SECTIONS
// =============================================================================

class DocsSelectorBlock {
  constructor() {
    this.gridItems = document.querySelectorAll('.docs-selector__grid-item');

    if (!this.gridItems.length) return;

    // Базовый путь к папке PDF (можно задать через data-pdf-base в WordPress)
    const block = document.querySelector('.docs-selector__block');
    this.pdfBaseUrl = block && block.getAttribute('data-pdf-base')
        ? block.getAttribute('data-pdf-base')
        : 'assets/pdf/';

    // Убедимся, что путь заканчивается на /
    if (!this.pdfBaseUrl.endsWith('/')) {
      this.pdfBaseUrl += '/';
    }

    this.init();
  }

  init() {
    this.gridItems.forEach(item => {
      item.addEventListener('click', () => this.toggleActiveItem(item));
    });

    // Load initial category (first active item)
    const activeItem = document.querySelector('.docs-selector__grid-item--active');
    if (activeItem) {
      const docsData = activeItem.getAttribute('data-docs');
      if (docsData) {
        this.loadDocsCategory(docsData);
      }
    }
  }

  toggleActiveItem(clickedItem) {
    this.gridItems.forEach(item => {
      item.classList.remove('docs-selector__grid-item--active');
    });

    clickedItem.classList.add('docs-selector__grid-item--active');

    // Load docs for selected category
    const docsData = clickedItem.getAttribute('data-docs');
    if (docsData) {
      this.loadDocsCategory(docsData);
    }
  }

  loadDocsCategory(docsData) {
    try {
      const data = JSON.parse(docsData);
      const rightContainer = document.querySelector('.docs-selector__right');

      if (!rightContainer) return;

      // Clear right container
      rightContainer.innerHTML = '';

      // Generate sections with documents
      data.forEach((sectionData, index) => {
        const section = document.createElement('div');
        section.className = 'docs-selector__section';

        // Section title (only if section property exists)
        if (sectionData.section) {
          const sectionTitle = document.createElement('h3');
          sectionTitle.className = 'docs-selector__section-title';
          sectionTitle.textContent = sectionData.section;
          section.appendChild(sectionTitle);
        }

        // Documents list container
        const docsList = document.createElement('div');
        docsList.className = 'docs-selector__docs-list';

        sectionData.items.forEach(doc => {
          const docItem = document.createElement('div');
          docItem.className = 'docs-selector__docs-item';

          const docTitle = document.createElement('p');
          docTitle.className = 'docs-selector__docs-item-title';
          docTitle.textContent = doc.title;

          const downloadBtn = document.createElement('button');
          downloadBtn.className = 'docs-selector__download-btn';
          downloadBtn.setAttribute('data-file', doc.file);
          downloadBtn.innerHTML = `
            <img src="${window.themeUrl}/assets/img/svg/symbol_download.svg" alt="Скачать" class="docs__download-icon" />
            Скачать
          `;

          docItem.appendChild(docTitle);
          docItem.appendChild(downloadBtn);
          docsList.appendChild(docItem);
        });

        section.appendChild(docsList);
        rightContainer.appendChild(section);
      });

      // Add download handlers
      this.addDownloadHandlers();

    } catch (e) {
      console.error('Ошибка парсинга данных документов:', e);
    }
  }

  addDownloadHandlers() {
    const downloadBtns = document.querySelectorAll('.docs-selector__download-btn');

    downloadBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        this.downloadDocument(btn);
      });
    });
  }

  downloadDocument(btn) {
    const fileName = btn.getAttribute('data-file');
    const fileUrl = this.pdfBaseUrl + fileName;

    // Visual feedback
    const originalHTML = btn.innerHTML;
    btn.innerHTML = 'Загрузка...';
    btn.style.transform = 'scale(0.95)';

    setTimeout(() => {
      btn.innerHTML = originalHTML;
      btn.style.transform = 'scale(1)';

      const link = document.createElement('a');
      link.href = encodeURI(fileUrl);
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      console.log(`Downloading: ${fileUrl}`);
    }, 300);
  }
}

// Initialize DocsSelectorBlock when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new DocsSelectorBlock();
  });
} else {
  new DocsSelectorBlock();
}

// =============================================================================
// LOGISTIKA SEVERA MENU FUNCTIONALITY
// =============================================================================

class LogistikaSeveraMenu {
  constructor() {
    this.menuItems = document.querySelectorAll('.logistika-severa__menu-item');
    this.infoBlocks = document.querySelectorAll('.logistika-severa__info');
    this.arrowIndicator = document.getElementById('arrow-indicator');
    this.menuContainer = document.querySelector('.logistika-severa__menu');
    
    if (!this.menuItems.length || !this.infoBlocks.length) return;
    
    this.init();
  }
  
  init() {
    // Присваиваем каждому пункту меню его позицию
    this.menuItems.forEach((item, index) => {
      item.dataset.index = index;
      item.addEventListener('click', (e) => this.handleMenuItemClick(e, item, index));
    });
    
    // Устанавливаем начальный активный элемент
    this.setActiveItem(0);
    
    // Небольшая задержка для корректного позиционирования стрелки
    setTimeout(() => {
      this.updateArrowPosition(0);
    }, 100);
    
    // Добавляем обработчик скролла для меню
    if (this.menuContainer) {
      this.menuContainer.addEventListener('scroll', () => {
        this.handleMenuScroll();
      });
    }
    
    // Обновляем позицию стрелки при изменении размера окна
    window.addEventListener('resize', () => {
      const activeItem = document.querySelector('.logistika-severa__menu-item.active');
      if (activeItem) {
        const index = parseInt(activeItem.dataset.index);
        this.updateArrowPosition(index);
      }
    });
  }
  
  handleMenuItemClick(e, item, index) {
    e.preventDefault();
    this.setActiveItem(index);
  }
  
  setActiveItem(index) {
    // Удаляем активный класс у всех пунктов меню
    this.menuItems.forEach(item => {
      item.classList.remove('active');
    });
    
    // Скрываем все блоки контента
    this.infoBlocks.forEach(block => {
      block.classList.remove('active');
    });
    
    // Добавляем активный класс выбранному пункту меню
    this.menuItems[index].classList.add('active');
    
    // Показываем соответствующий блок контента
    const targetId = this.menuItems[index].dataset.target;
    const targetBlock = document.getElementById(targetId);
    if (targetBlock) {
      targetBlock.classList.add('active');
    }
    
    // Обновляем позицию стрелки
    this.updateArrowPosition(index);
    
    // Скроллим меню, если активный элемент не виден
    this.ensureMenuItemVisible(index);
  }
  
  updateArrowPosition(index) {
    if (!this.arrowIndicator || !this.menuContainer) return;
    
    const menuItem = this.menuItems[index];
    const menuRect = this.menuContainer.getBoundingClientRect();
    const itemRect = menuItem.getBoundingClientRect();
    
    // Вычисляем позицию стрелки относительно разделителя
    const arrowTop = itemRect.top - menuRect.top + (itemRect.height / 2) - 8;
    
    this.arrowIndicator.style.top = `${arrowTop}px`;
  }
  
  ensureMenuItemVisible(index) {
    const menuItem = this.menuItems[index];
    const menuContainer = this.menuContainer;
    
    if (!menuContainer) return;
    
    const itemRect = menuItem.getBoundingClientRect();
    const containerRect = menuContainer.getBoundingClientRect();
    
    // Если элемент не виден, скроллим контейнер
    if (itemRect.top < containerRect.top || itemRect.bottom > containerRect.bottom) {
      menuItem.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      });
    }
  }
  
  // Обновляем позицию стрелки при скролле меню
  handleMenuScroll() {
    const activeItem = document.querySelector('.logistika-severa__menu-item.active');
    if (activeItem) {
      const index = parseInt(activeItem.dataset.index);
      this.updateArrowPosition(index);
    }
  }
}

// Initialize LogistikaSeveraMenu when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new LogistikaSeveraMenu();
  });
} else {
  new LogistikaSeveraMenu();
}

// =============================================================================
// NOVOSTI ACCORDION FUNCTIONALITY
// =============================================================================

class NovostiAccordion {
  constructor() {
    this.accordionItems = document.querySelectorAll('.novosti__accordion-item');
    this.toggles = document.querySelectorAll('.novosti__accordion-toggle');

    if (!this.accordionItems.length) return;

    this.init();
  }

  init() {
    this.toggles.forEach((toggle, index) => {
      toggle.addEventListener('click', (e) => this.toggleAccordion(index, e));
    });

    // Also allow clicking on the header
    this.accordionItems.forEach((item, index) => {
      const header = item.querySelector('.novosti__accordion-header');
      if (header) {
        header.addEventListener('click', (e) => this.toggleAccordion(index, e));
      }
    });

    // Open all accordions by default on page load
    this.openAllAccordions();

    // Initialize expand/collapse functionality for descriptions
    this.initExpandCollapse();
  }

  openAllAccordions() {
    this.accordionItems.forEach((item, index) => {
      const toggle = this.toggles[index];
      const content = item.querySelector('.novosti__accordion-content');
      
      item.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      content.classList.add('active');
    });
  }

  toggleAccordion(index, e) {
    e.preventDefault();
    e.stopPropagation();

    const item = this.accordionItems[index];
    const toggle = this.toggles[index];
    const content = item.querySelector('.novosti__accordion-content');
    const isActive = item.classList.contains('active');

    // Toggle only the clicked accordion - no auto-close of others
    if (isActive) {
      item.classList.remove('active');
      toggle.setAttribute('aria-expanded', 'false');
      content.classList.remove('active');
    } else {
      item.classList.add('active');
      toggle.setAttribute('aria-expanded', 'true');
      content.classList.add('active');
    }
  }

  initExpandCollapse() {
    const links = document.querySelectorAll('.novosti__item-link');

    links.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const desc = link.previousElementSibling;
        if (desc && desc.classList.contains('novosti__item-desc')) {
          desc.classList.toggle('expanded');
          link.textContent = desc.classList.contains('expanded') ? 'Свернуть' : 'Читать далее';
        }
      });
    });
  }
}
