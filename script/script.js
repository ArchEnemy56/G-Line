// =============================================================================
// REVIEWS SLIDER FUNCTIONALITY
// =============================================================================

class ReviewsSlider {
  constructor() {
    this.container = document.querySelector('.reviews__container');
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
    this.container = document.querySelector('.articles__container');
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
// INITIALIZATION
// =============================================================================

document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
  new ArticlesSlider();
  new FAQAccordion();
  new NewsSlider();
  new GridInteractivity();
});
