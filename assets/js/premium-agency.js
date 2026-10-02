/**
 * GrowNoww Premium Agency Interactive Scripts
 * Black + White + Gold Experience
 */

document.addEventListener('DOMContentLoaded', function () {
  // 1. Header scroll effect
  const header = document.querySelector('.premium-header');
  if (header) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // 2. Mobile Fullscreen Navigation Overlay
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNavOverlay');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (menuToggle && mobileNav) {
    menuToggle.addEventListener('click', function () {
      mobileNav.classList.add('open');
      document.body.style.overflow = 'hidden';
    });

    if (mobileNavClose) {
      mobileNavClose.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    }

    mobileLinks.forEach(link => {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // 3. Compact Premium FAQ Accordion
  const faqItems = document.querySelectorAll('.faq-luxury-item');
  faqItems.forEach(item => {
    const trigger = item.querySelector('.faq-trigger-btn');
    if (trigger) {
      trigger.addEventListener('click', function () {
        const isActive = item.classList.contains('active');
        // Close other items
        faqItems.forEach(other => {
          if (other !== item) other.classList.remove('active');
        });
        if (isActive) {
          item.classList.remove('active');
        } else {
          item.classList.add('active');
        }
      });
    }
  });

  // 4. Hero Slides / Pillar Switching (Interactive)
  const heroTabs = document.querySelectorAll('.hero-tab-pill');
  const heroSlides = document.querySelectorAll('.hero-slide-pane');

  if (heroTabs.length && heroSlides.length) {
    heroTabs.forEach((tab, index) => {
      tab.addEventListener('click', function () {
        heroTabs.forEach(t => t.classList.remove('active'));
        heroSlides.forEach(s => s.classList.remove('active'));
        tab.classList.add('active');
        if (heroSlides[index]) {
          heroSlides[index].classList.add('active');
        }
      });
    });
  }

  // 5. Modal Quote Dialog Trigger
  const quoteButtons = document.querySelectorAll('.trigger-quote-modal, .fixed_quote, .floating-quote-badge');
  const modal = document.querySelector('.form_bg');
  const closeModalBtn = document.querySelector('.close_btn');

  if (modal) {
    quoteButtons.forEach(btn => {
      btn.addEventListener('click', function (e) {
        if (btn.getAttribute('href') === 'contact.html#Get_in_Touch' && window.location.pathname.includes('contact')) {
          return; // Let standard anchor scroll work on contact page
        }
        e.preventDefault();

        // If button has data-service, prefill modal
        const serviceName = btn.getAttribute('data-service');
        const modalServiceInput = document.getElementById('hidden_service_popup');
        const modalServiceSelect = document.getElementById('modalServiceSelect');
        if (serviceName) {
          if (modalServiceInput) modalServiceInput.value = serviceName;
          if (modalServiceSelect) {
            for (let i = 0; i < modalServiceSelect.options.length; i++) {
              if (modalServiceSelect.options[i].value === serviceName) {
                modalServiceSelect.selectedIndex = i;
                break;
              }
            }
          }
        }

        modal.classList.add('visibleall');
        document.body.style.overflow = 'hidden';
      });
    });

    if (closeModalBtn) {
      closeModalBtn.addEventListener('click', function () {
        modal.classList.remove('visibleall', 'visible');
        document.body.style.overflow = '';
      });
    }

    modal.addEventListener('click', function (e) {
      if (e.target === modal) {
        modal.classList.remove('visibleall', 'visible');
        document.body.style.overflow = '';
      }
    });
  }

  // 6. Smooth scroll for on-page anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '#!') return;
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        const headerOffset = 80;
        const elementPosition = targetEl.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // 7. Services Slideshow Controller (Black + White + Gold Editorial Stage)
  const servicesStage = document.getElementById('servicesStage');
  if (servicesStage) {
    const slides = servicesStage.querySelectorAll('.service-slide');
    const totalSlides = slides.length;
    const currCounter = document.getElementById('svcCounterCurr');
    const totalCounter = document.getElementById('svcCounterTotal');
    const progressFill = document.getElementById('svcProgressFill');
    const prevBtn = document.getElementById('svcPrevBtn');
    const nextBtn = document.getElementById('svcNextBtn');

    let currentIndex = 0;
    let autoPlayTimer = null;
    let isTransitioning = false;

    if (totalCounter) {
      totalCounter.textContent = String(totalSlides).padStart(2, '0');
    }

    function updateControls(idx) {
      if (currCounter) {
        currCounter.textContent = String(idx + 1).padStart(2, '0');
      }
      if (progressFill) {
        const percent = ((idx + 1) / totalSlides) * 100;
        progressFill.style.width = percent + '%';
      }
    }

    function showSlide(newIndex, direction = 'next') {
      if (isTransitioning || newIndex === currentIndex) return;
      isTransitioning = true;

      const currentSlide = slides[currentIndex];
      const targetSlide = slides[newIndex];

      const enterOffset = direction === 'next' ? '35px' : '-35px';
      const exitOffset = direction === 'next' ? '-35px' : '35px';

      targetSlide.style.transition = 'none';
      targetSlide.style.transform = `translateX(${enterOffset})`;
      targetSlide.style.opacity = '0';
      targetSlide.style.display = 'block';

      // Force layout reflow
      targetSlide.offsetHeight;

      // Animate current slide out
      currentSlide.style.transition = 'opacity 0.45s cubic-bezier(0.16, 1, 0.3, 1), transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
      currentSlide.style.opacity = '0';
      currentSlide.style.transform = `translateX(${exitOffset})`;

      // Animate target slide in
      targetSlide.style.transition = 'opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      targetSlide.style.opacity = '1';
      targetSlide.style.transform = 'translateX(0)';

      setTimeout(() => {
        currentSlide.classList.remove('active');
        currentSlide.style.display = 'none';
        targetSlide.classList.add('active');
        currentIndex = newIndex;
        updateControls(currentIndex);
        isTransitioning = false;
      }, 480);
    }

    function nextSlide() {
      const target = (currentIndex + 1) % totalSlides;
      showSlide(target, 'next');
    }

    function prevSlide() {
      const target = (currentIndex - 1 + totalSlides) % totalSlides;
      showSlide(target, 'prev');
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextSlide(); resetTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevSlide(); resetTimer(); });

    function startAutoPlay() {
      if (!autoPlayTimer) {
        autoPlayTimer = setInterval(nextSlide, 6000);
      }
    }

    function stopAutoPlay() {
      if (autoPlayTimer) {
        clearInterval(autoPlayTimer);
        autoPlayTimer = null;
      }
    }

    function resetTimer() {
      stopAutoPlay();
      startAutoPlay();
    }

    // Pause on hover
    servicesStage.addEventListener('mouseenter', stopAutoPlay);
    servicesStage.addEventListener('mouseleave', startAutoPlay);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    servicesStage.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopAutoPlay();
    }, { passive: true });

    servicesStage.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 50) {
        nextSlide();
      } else if (touchEndX - touchStartX > 50) {
        prevSlide();
      }
      startAutoPlay();
    }, { passive: true });

    // Initialize
    updateControls(0);
    startAutoPlay();
  }

  // 8. Hero Right-Side Services Showcase Controller (Automatic + Interactive)
  const heroShowcase = document.getElementById('heroShowcase');
  if (heroShowcase) {
    const items = heroShowcase.querySelectorAll('.hero-showcase-item');
    const totalItems = items.length;
    const currEl = document.getElementById('heroSvcCurr');
    const totalEl = document.getElementById('heroSvcTotal');
    const catEl = document.getElementById('heroSvcCategory');
    const prevBtn = document.getElementById('heroShowcasePrev');
    const nextBtn = document.getElementById('heroShowcaseNext');
    const dots = heroShowcase.querySelectorAll('.hero-dot');
    const progressBar = document.getElementById('heroShowcaseProgressBar');

    let currentHeroIndex = 0;
    let heroTimer = null;

    if (totalEl) {
      totalEl.textContent = String(totalItems).padStart(2, '0');
    }

    function updateHeroControls(idx) {
      if (currEl) {
        currEl.textContent = String(idx + 1).padStart(2, '0');
      }
      if (catEl && items[idx]) {
        catEl.textContent = items[idx].getAttribute('data-service-cat') || 'Service';
      }
      if (progressBar) {
        progressBar.style.width = (((idx + 1) / totalItems) * 100) + '%';
      }
      dots.forEach((dot, dIdx) => {
        if (dIdx === idx) {
          dot.classList.add('active');
        } else {
          dot.classList.remove('active');
        }
      });
    }

    function showHeroService(newIndex) {
      if (newIndex === currentHeroIndex) return;
      const currentItem = items[currentHeroIndex];
      const nextItem = items[newIndex];

      currentItem.classList.remove('active', 'anim-fade-in');
      currentItem.style.display = 'none';

      nextItem.style.display = 'block';
      nextItem.classList.add('active', 'anim-fade-in');

      currentHeroIndex = newIndex;
      updateHeroControls(currentHeroIndex);
    }

    function nextHeroService() {
      const nextIdx = (currentHeroIndex + 1) % totalItems;
      showHeroService(nextIdx);
    }

    function prevHeroService() {
      const prevIdx = (currentHeroIndex - 1 + totalItems) % totalItems;
      showHeroService(prevIdx);
    }

    if (nextBtn) nextBtn.addEventListener('click', () => { nextHeroService(); resetHeroTimer(); });
    if (prevBtn) prevBtn.addEventListener('click', () => { prevHeroService(); resetHeroTimer(); });

    dots.forEach((dot, dIdx) => {
      dot.addEventListener('click', () => {
        showHeroService(dIdx);
        resetHeroTimer();
      });
    });

    function startHeroTimer() {
      if (!heroTimer) {
        heroTimer = setInterval(nextHeroService, 4500);
      }
    }

    function stopHeroTimer() {
      if (heroTimer) {
        clearInterval(heroTimer);
        heroTimer = null;
      }
    }

    function resetHeroTimer() {
      stopHeroTimer();
      startHeroTimer();
    }

    heroShowcase.addEventListener('mouseenter', stopHeroTimer);
    heroShowcase.addEventListener('mouseleave', startHeroTimer);

    // Touch swipe support
    let touchStartX = 0;
    let touchEndX = 0;
    heroShowcase.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].screenX;
      stopHeroTimer();
    }, { passive: true });

    heroShowcase.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].screenX;
      if (touchStartX - touchEndX > 40) {
        nextHeroService();
      } else if (touchEndX - touchStartX > 40) {
        prevHeroService();
      }
      startHeroTimer();
    }, { passive: true });

    // Handle "BOOK THIS SERVICE" CTA clicks to prefill modal service dropdown
    const bookButtons = heroShowcase.querySelectorAll('.hero-showcase-cta');
    const modalServiceInput = document.getElementById('hidden_service_popup');
    const modalServiceSelect = document.getElementById('modalServiceSelect');

    if (modalServiceSelect && modalServiceInput) {
      modalServiceSelect.addEventListener('change', function () {
        modalServiceInput.value = this.value;
      });
    }

    bookButtons.forEach(btn => {
      btn.addEventListener('click', function () {
        const serviceName = btn.getAttribute('data-service');
        if (modalServiceInput && serviceName) {
          modalServiceInput.value = serviceName;
        }
        if (modalServiceSelect && serviceName) {
          let found = false;
          for (let i = 0; i < modalServiceSelect.options.length; i++) {
            if (modalServiceSelect.options[i].value === serviceName) {
              modalServiceSelect.selectedIndex = i;
              found = true;
              break;
            }
          }
          if (!found) {
            modalServiceSelect.value = serviceName;
          }
        }
      });
    });

    updateHeroControls(0);
    startHeroTimer();
  }

  // 9. Single-Question FAQ Carousel Controller
  const faqSingleCard = document.getElementById('faqSingleCard');
  if (faqSingleCard) {
    const faqItems = faqSingleCard.querySelectorAll('.faq-single-item');
    const totalFaq = faqItems.length;
    const currNumEl = document.getElementById('faqCurrNum');
    const totalNumEl = document.getElementById('faqTotalNum');
    const prevBtn = document.getElementById('faqPrevBtn');
    const nextBtn = document.getElementById('faqNextBtn');
    const prevBottomBtn = document.getElementById('faqPrevBottomBtn');
    const nextBottomBtn = document.getElementById('faqNextBottomBtn');
    const pills = document.querySelectorAll('.faq-pill-btn');

    let currentFaqIndex = 0;
    let isFaqTransitioning = false;

    if (totalNumEl) {
      totalNumEl.textContent = String(totalFaq).padStart(2, '0');
    }

    function updateFaqControls(idx) {
      if (currNumEl) {
        currNumEl.textContent = String(idx + 1).padStart(2, '0');
      }
      pills.forEach((p, pIdx) => {
        if (pIdx === idx) {
          p.classList.add('active');
        } else {
          p.classList.remove('active');
        }
      });
    }

    function showFaq(newIndex, direction = 'next') {
      if (isFaqTransitioning || newIndex === currentFaqIndex) return;
      isFaqTransitioning = true;

      const currentItem = faqItems[currentFaqIndex];
      const nextItem = faqItems[newIndex];

      // Close open answer on current
      currentItem.classList.remove('expanded');

      const enterX = direction === 'next' ? '30px' : '-30px';
      const exitX = direction === 'next' ? '-30px' : '30px';

      currentItem.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
      currentItem.style.opacity = '0';
      currentItem.style.transform = `translateX(${exitX})`;

      setTimeout(() => {
        currentItem.classList.remove('active');
        currentItem.style.display = 'none';

        nextItem.style.display = 'block';
        nextItem.style.transition = 'none';
        nextItem.style.opacity = '0';
        nextItem.style.transform = `translateX(${enterX})`;
        nextItem.offsetHeight; // reflow

        nextItem.style.transition = 'opacity 0.45s ease, transform 0.45s cubic-bezier(0.16, 1, 0.3, 1)';
        nextItem.style.opacity = '1';
        nextItem.style.transform = 'translateX(0)';
        nextItem.classList.add('active');

        currentFaqIndex = newIndex;
        updateFaqControls(currentFaqIndex);
        isFaqTransitioning = false;
      }, 400);
    }

    function nextFaq() {
      const nextIdx = (currentFaqIndex + 1) % totalFaq;
      showFaq(nextIdx, 'next');
    }

    function prevFaq() {
      const prevIdx = (currentFaqIndex - 1 + totalFaq) % totalFaq;
      showFaq(prevIdx, 'prev');
    }

    if (nextBtn) nextBtn.addEventListener('click', nextFaq);
    if (prevBtn) prevBtn.addEventListener('click', prevFaq);
    if (nextBottomBtn) nextBottomBtn.addEventListener('click', nextFaq);
    if (prevBottomBtn) prevBottomBtn.addEventListener('click', prevFaq);

    pills.forEach((p, pIdx) => {
      p.addEventListener('click', () => {
        const dir = pIdx >= currentFaqIndex ? 'next' : 'prev';
        showFaq(pIdx, dir);
      });
    });

    // Toggle answer accordion on click
    faqItems.forEach(item => {
      const trigger = item.querySelector('.faq-single-trigger');
      if (trigger) {
        trigger.addEventListener('click', () => {
          item.classList.toggle('expanded');
          const isExpanded = item.classList.contains('expanded');
          trigger.setAttribute('aria-expanded', isExpanded ? 'true' : 'false');
        });
      }
    });

    updateFaqControls(0);
  }

  // 10. Gold Accent Line Reveal on Scroll & Staggered Card Entrances
  const accentLines = document.querySelectorAll('.gold-accent-line');
  if (accentLines.length && 'IntersectionObserver' in window) {
    const lineObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -20px 0px' });

    accentLines.forEach(line => lineObserver.observe(line));
  } else {
    accentLines.forEach(line => line.classList.add('in-view'));
  }

  // Staggered reveal for cards & services
  const animCards = document.querySelectorAll(
    '.result-box, .timeline-card, .process-step-node, .featured-project-card, ' +
    '.service-compact-card, .service-detailed-card, .benefit-compact-card, .result-compact-box, .who-point-card, .tech-luxury-pill'
  );
  if (animCards.length && 'IntersectionObserver' in window) {
    const cardObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const parent = el.closest('.row, .who-we-are-compact-grid, .tech-pills-wrap');
          const allItems = parent ? Array.from(parent.querySelectorAll('.service-compact-card, .service-detailed-card, .benefit-compact-card, .result-compact-box, .who-point-card, .tech-luxury-pill, .result-box, .timeline-card, .process-step-node, .featured-project-card')) : [];
          const idx = allItems.indexOf(el);
          
          // Use 80ms stagger for 9-service grid, 100ms for benefits and results
          const stepMs = el.classList.contains('service-compact-card') ? 80 : 100;
          const delay = (idx >= 0 ? idx : 0) * stepMs;
          
          setTimeout(() => {
            el.classList.add('revealed');
          }, delay);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -25px 0px' });

    animCards.forEach(card => cardObserver.observe(card));
  } else {
    animCards.forEach(card => card.classList.add('revealed'));
  }

  // 11. Hero Service Showcase Slideshow (Autoplay, Controls, Hover/Touch Pause)
  const heroSlideshowWrap = document.querySelector('.hero-slideshow-wrap');
  const heroSlides = document.querySelectorAll('.hero-service-slide');
  const heroDots = document.querySelectorAll('.slideshow-dot');
  const prevSlideBtn = document.querySelector('.slideshow-arrow.prev');
  const nextSlideBtn = document.querySelector('.slideshow-arrow.next');

  if (heroSlides.length > 0) {
    let currentSlideIndex = 0;
    let slideTimer = null;
    const slideDuration = 3500; // 3.5s per service

    function goToSlide(index) {
      if (index < 0) index = heroSlides.length - 1;
      if (index >= heroSlides.length) index = 0;

      heroSlides.forEach((slide, i) => {
        if (i === index) {
          slide.classList.add('active');
        } else {
          slide.classList.remove('active');
        }
      });

      heroDots.forEach((dot, i) => {
        if (i === index) {
          dot.classList.add('active');
          dot.setAttribute('aria-selected', 'true');
        } else {
          dot.classList.remove('active');
          dot.setAttribute('aria-selected', 'false');
        }
      });

      currentSlideIndex = index;
    }

    function nextSlide() {
      goToSlide(currentSlideIndex + 1);
    }

    function prevSlide() {
      goToSlide(currentSlideIndex - 1);
    }

    function startAutoSlide() {
      stopAutoSlide();
      slideTimer = setInterval(nextSlide, slideDuration);
    }

    function stopAutoSlide() {
      if (slideTimer) {
        clearInterval(slideTimer);
        slideTimer = null;
      }
    }

    // Dot click triggers
    heroDots.forEach((dot, idx) => {
      dot.addEventListener('click', (e) => {
        e.preventDefault();
        goToSlide(idx);
        startAutoSlide();
      });
    });

    // Arrow button triggers
    if (nextSlideBtn) {
      nextSlideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        nextSlide();
        startAutoSlide();
      });
    }

    if (prevSlideBtn) {
      prevSlideBtn.addEventListener('click', (e) => {
        e.preventDefault();
        prevSlide();
        startAutoSlide();
      });
    }

    // Hover & touch pause/resume
    if (heroSlideshowWrap) {
      heroSlideshowWrap.addEventListener('mouseenter', stopAutoSlide);
      heroSlideshowWrap.addEventListener('mouseleave', startAutoSlide);
      heroSlideshowWrap.addEventListener('touchstart', stopAutoSlide, { passive: true });
      heroSlideshowWrap.addEventListener('touchend', startAutoSlide, { passive: true });
    }

    // Initialize first slide and start rotation
    goToSlide(0);
    startAutoSlide();
  }

  // 12. Results Section - Number Counter Animation on Scroll
  const counterElements = document.querySelectorAll('.counter-number');
  if (counterElements.length && 'IntersectionObserver' in window) {
    const countObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-target') || '0');
          const prefix = el.getAttribute('data-prefix') || '';
          const suffix = el.getAttribute('data-suffix') || '';
          const isDecimal = target % 1 !== 0;
          const duration = 1500; // 1.5s ease-out count
          const startTime = performance.now();

          function updateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Ease-out cubic curve
            const ease = 1 - Math.pow(1 - progress, 3);
            const current = ease * target;

            el.textContent = prefix + (isDecimal ? current.toFixed(1) : Math.round(current)) + suffix;

            if (progress < 1) {
              requestAnimationFrame(updateCounter);
            } else {
              el.textContent = prefix + (isDecimal ? target.toFixed(1) : target) + suffix;
            }
          }

          requestAnimationFrame(updateCounter);
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    counterElements.forEach(el => countObserver.observe(el));
  }

  // Safety fallback after 1.5s
  setTimeout(() => {
    accentLines.forEach(line => line.classList.add('in-view'));
    animCards.forEach(card => card.classList.add('revealed'));
  }, 1500);
});
