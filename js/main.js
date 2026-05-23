document.addEventListener('DOMContentLoaded', () => {
  
  // 1. Navbar Glassmorphism
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }, { passive: true });

  // 1.5 Scroll Spy Navigation
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-links a');
  
  const spyOptions = {
    root: null,
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  };
  
  const spyCallback = (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        if (id) {
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      }
    });
  };
  
  const spyObserver = new IntersectionObserver(spyCallback, spyOptions);
  sections.forEach(section => {
    if (section.getAttribute('id')) {
      spyObserver.observe(section);
    }
  });

  // 2. Mouse-Follow Glow on Cards
  const glowCards = document.querySelectorAll('.glow-card');
  glowCards.forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
    });
  });

  // 3. Magnetic Buttons
  const magneticBtns = document.querySelectorAll('.magnetic-btn');
  magneticBtns.forEach(btn => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      
      // Calculate pull strength
      const pullX = x * 0.3;
      const pullY = y * 0.3;
      
      btn.style.transform = `translate(${pullX}px, ${pullY}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transform = `translate(0px, 0px)`;
    });
  });

  // 4. Scroll Reveal Animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealCallback = (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target);
        
        // Trigger counters if they exist inside this element
        const counters = entry.target.querySelectorAll('.counter');
        if(counters.length > 0) {
          animateCounters(counters);
        }
        // Also check if the element itself is a counter
        if(entry.target.classList.contains('counter')) {
           animateCounters([entry.target]);
        }
      }
    });
  };
  const revealObserver = new IntersectionObserver(revealCallback, {
    root: null,
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });
  revealElements.forEach(el => revealObserver.observe(el));

  // 5. Animated Counters
  function animateCounters(counters) {
    counters.forEach(counter => {
      if (counter.classList.contains('animated')) return;
      counter.classList.add('animated');
      
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const duration = 2000; // 2 seconds
      const stepTime = Math.abs(Math.floor(duration / target));
      let current = 0;

      const timer = setInterval(() => {
        current += 1;
        counter.innerText = current + suffix;
        if (current >= target) {
          clearInterval(timer);
          counter.innerText = target + suffix;
        }
      }, stepTime);
    });
  }

  // 6. Timeline Progress & Active Dots
  const timeline = document.getElementById('timeline');
  const progressLine = document.getElementById('timeline-progress');
  const timelineItems = document.querySelectorAll('.timeline-item');
  
  if (timeline && progressLine) {
    window.addEventListener('scroll', () => {
      const timelineRect = timeline.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate how far we've scrolled into the timeline
      if (timelineRect.top < windowHeight / 2 && timelineRect.bottom > 0) {
        let progress = ((windowHeight / 2 - timelineRect.top) / timelineRect.height) * 100;
        progress = Math.max(0, Math.min(100, progress));
        progressLine.style.height = `${progress}%`;
        
        // Activate dots
        timelineItems.forEach((item, index) => {
          const itemRect = item.getBoundingClientRect();
          if (itemRect.top < windowHeight / 2) {
            item.classList.add('active');
          } else {
            item.classList.remove('active');
          }
        });
      }
    }, { passive: true });
  }

  // 7. Parallax Effects (Hero Visual)
  const parallaxElements = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', () => {
    const scrolled = window.scrollY;
    parallaxElements.forEach(el => {
      const speed = el.getAttribute('data-parallax');
      const yPos = -(scrolled * speed);
      el.style.transform = `translateY(${yPos}px)`;
    });
  }, { passive: true });

  // 8. FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-q');
  faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      const svg = question.querySelector('svg');
      const isActive = question.classList.contains('active');
      
      // Close all
      document.querySelectorAll('.faq-q').forEach(q => {
        q.classList.remove('active');
        q.nextElementSibling.style.maxHeight = null;
        q.querySelector('svg').style.transform = 'rotate(0deg)';
      });
      
      // Open if it wasn't active
      if (!isActive) {
        question.classList.add('active');
        answer.style.maxHeight = answer.scrollHeight + "px";
        svg.style.transform = 'rotate(45deg)';
      }
    });
  });


  // 9. Scroll Progress Indicator
  const scrollProgressBar = document.getElementById('scroll-progress-bar');
  if (scrollProgressBar) {
    window.addEventListener('scroll', () => {
      const scrollPx = document.documentElement.scrollTop;
      const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = `${scrollPx / winHeightPx * 100}%`;
      scrollProgressBar.style.width = scrolled;
    }, { passive: true });
  }

  // 10. Sticky CTA Logic
  const stickyCta = document.getElementById('sticky-cta');
  if (stickyCta) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > window.innerHeight * 0.8) {
        stickyCta.classList.remove('hidden');
      } else {
        stickyCta.classList.add('hidden');
      }
    }, { passive: true });
  }

  // 11. Exit Intent Modal & Calendly Modal
  const exitIntentModal = document.getElementById('exit-intent-modal');
  const calendlyModal = document.getElementById('calendly-modal');
  let exitIntentShown = false;

  if (exitIntentModal) {
    document.addEventListener('mouseleave', (e) => {
      if (e.clientY < 0 && !exitIntentShown && !localStorage.getItem('axiora_exit_intent_dismissed')) {
        exitIntentModal.classList.remove('hidden');
        exitIntentShown = true;
      }
    });

    const closeButtons = exitIntentModal.querySelectorAll('.exit-intent-close');
    closeButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        exitIntentModal.classList.add('hidden');
        localStorage.setItem('axiora_exit_intent_dismissed', 'true');
      });
    });
  }

  if (calendlyModal) {
    const calendlyBtns = document.querySelectorAll('.calendly-trigger'); // Use this class on any button later
    calendlyBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        calendlyModal.classList.remove('hidden');
      });
    });
    const calendlyClose = calendlyModal.querySelector('.calendly-close');
    if (calendlyClose) {
      calendlyClose.addEventListener('click', () => {
        calendlyModal.classList.add('hidden');
      });
    }
  }

  // Close modals on outside click
  document.querySelectorAll('.modal-overlay').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
      }
    });
  });

  // 12. Analytics Event Tracking
  const trackableElements = document.querySelectorAll('[data-track]');
  trackableElements.forEach(el => {
    el.addEventListener('click', (e) => {
      const eventName = el.getAttribute('data-track');
      if (window.gtag) {
        window.gtag('event', eventName);
      }
      if (window.fbq) {
        window.fbq('trackCustom', eventName);
      }
      console.log('Analytics Event Fired:', eventName);
    });
  });

  // 13. Business Growth Engine (BGE) Animation
  const bgeTags = document.querySelectorAll('.bge-tag');
  if (bgeTags.length > 0) {
    let currentTagIndex = 0;
    setInterval(() => {
      bgeTags.forEach((tag, index) => {
        tag.classList.remove('active', 'prev');
        if (index === currentTagIndex) {
          tag.classList.add('prev');
        }
      });
      
      currentTagIndex = (currentTagIndex + 1) % bgeTags.length;
      bgeTags[currentTagIndex].classList.add('active');
    }, 2500);

    // Advanced Count Up for BGE
    const countUpElements = document.querySelectorAll('.count-up');
    const bgeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          countUpElements.forEach(counter => {
            if (counter.classList.contains('counted')) return;
            counter.classList.add('counted');
            
            const target = +counter.getAttribute('data-target');
            let current = 0;
            const increment = target / 60; // 60fps for ~1 second
            
            const updateCounter = () => {
              current += increment;
              if (current < target) {
                counter.innerText = Math.ceil(current).toLocaleString();
                requestAnimationFrame(updateCounter);
              } else {
                counter.innerText = target.toLocaleString();
              }
            };
            updateCounter();
          });
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    const bgeFlow = document.querySelector('.bge-flow');
    if (bgeFlow) {
      bgeObserver.observe(bgeFlow);
    }
  }

});
