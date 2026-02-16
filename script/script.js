// Reviews Slider Functionality
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
    // Button navigation
    this.prevBtn.addEventListener('click', () => this.slidePrev());
    this.nextBtn.addEventListener('click', () => this.slideNext());
    
    // Touch/drag navigation
    this.container.addEventListener('mousedown', (e) => this.startDrag(e));
    this.container.addEventListener('mousemove', (e) => this.drag(e));
    this.container.addEventListener('mouseup', () => this.endDrag());
    this.container.addEventListener('mouseleave', () => this.endDrag());
    
    // Touch events for mobile
    this.container.addEventListener('touchstart', (e) => this.startTouch(e), { passive: true });
    this.container.addEventListener('touchmove', (e) => this.moveTouch(e), { passive: true });
    this.container.addEventListener('touchend', () => this.endTouch());
    
    // Scroll event for snap behavior
    this.container.addEventListener('scroll', () => this.updateButtonStates());
    
    // Window resize
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
    const gap = 20; // gap between cards
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

// FAQ Accordion Functionality
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
    
    // Close all items except the clicked one
    this.items.forEach((item, itemIndex) => {
      if (itemIndex !== index) {
        item.classList.remove('active');
      }
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
      item.classList.add('active');
    }
  }
}

// News Slider Functionality
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

// Initialize all components
document.addEventListener('DOMContentLoaded', () => {
  new ReviewsSlider();
  new FAQAccordion();
  new NewsSlider();
});
