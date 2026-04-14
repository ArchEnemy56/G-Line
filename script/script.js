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
    
    // Добавляем обработчик клика на контейнеры иконок для сворачивания
    this.iconContainers = document.querySelectorAll('.faq__accordion-icon');
    this.iconContainers.forEach((iconContainer, index) => {
      iconContainer.addEventListener('click', (e) => {
        e.stopPropagation(); // Предотвращаем всплытие события на header
        const item = this.items[index];
        const isActive = item.classList.contains('active');
        
        // Если элемент активен, закрываем его
        if (isActive) {
          item.classList.remove('active');
        } else {
          // Если не активен, закрываем все остальные и открываем этот
          this.items.forEach((item, itemIndex) => {
            if (itemIndex !== index) {
              item.classList.remove('active');
            }
          });
          item.classList.add('active');
        }
      });
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
// GRID INTERACTIVITY FUNCTIONALITY
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
  }
  
  toggleActiveItem(clickedItem) {
    this.gridItems.forEach(item => {
      item.classList.remove('left__grid-item--active');
    });
    
    clickedItem.classList.add('left__grid-item--active');
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
});
