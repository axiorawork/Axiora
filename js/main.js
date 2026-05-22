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

  // 9. Contact Form & Zoho Integration
  const contactForm = document.querySelector('.premium-form');
  const toast = document.getElementById('toast');
  const ZOHO_ENDPOINT = 'https://forms.zohopublic.in/helloaxi1/form/ClientDetails/formperma/CTU0iRKiYCj3APla5EC4sSdvEGMvJCCXFaeVPaCAbvo/htmlRecords/submit';
  
  if (contactForm) {
    // Utility to show toast
    const showToast = (message, type) => {
      if(!toast) return;
      const toastIcon = toast.querySelector('.toast-icon');
      const toastMessage = toast.querySelector('.toast-message');
      
      toast.className = `premium-toast show ${type}`;
      toastMessage.innerHTML = message;
      
      if (type === 'success') {
        toastIcon.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>`;
      } else {
        toastIcon.innerHTML = `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>`;
      }
      
      setTimeout(() => {
        toast.classList.remove('show');
      }, 5000);
    };

    // Validation Utility
    const validateField = (input, rules) => {
      let isValid = true;
      let errorMsg = '';
      const val = input.value.trim();
      const parent = input.closest('.form-group') || input.closest('.form-checkbox');
      const errorDiv = parent ? parent.querySelector('.form-error-msg') : null;

      if (rules.required && !val && input.type !== 'checkbox') {
        isValid = false;
        errorMsg = 'This field is required.';
      } else if (input.type === 'checkbox' && rules.required && !input.checked) {
        isValid = false;
        errorMsg = 'You must agree to proceed.';
      } else if (val && rules.minLength && val.length < rules.minLength) {
        isValid = false;
        errorMsg = `Must be at least ${rules.minLength} characters.`;
      } else if (val && rules.isEmail) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(val)) {
          isValid = false;
          errorMsg = 'Please enter a valid email address.';
        }
      } else if (val && rules.isPhone) {
        const phoneRegex = /^[0-9\+\-\s\(\)]+$/;
        if (!phoneRegex.test(val) || val.replace(/\D/g,'').length < 10) {
          isValid = false;
          errorMsg = 'Enter a valid phone number (min 10 digits).';
        }
      }

      if (errorDiv) {
        if (!isValid) {
          parent.classList.add('has-error');
          errorDiv.innerText = errorMsg;
          errorDiv.classList.add('visible');
        } else {
          parent.classList.remove('has-error');
          errorDiv.innerText = '';
          errorDiv.classList.remove('visible');
        }
      }
      
      return isValid;
    };

    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Fields to validate
      const name = document.getElementById('name');
      const email = document.getElementById('email');
      const phone = document.getElementById('phone');
      const projectType = document.getElementById('project-type');
      const message = document.getElementById('message');
      const consent = document.getElementById('consent');
      
      // Run validation
      const isNameValid = validateField(name, { required: true, minLength: 2 });
      const isEmailValid = validateField(email, { required: true, isEmail: true });
      const isPhoneValid = validateField(phone, { required: true, isPhone: true });
      const isTypeValid = validateField(projectType, { required: true });
      const isMessageValid = validateField(message, { required: true, minLength: 10 });
      const isConsentValid = validateField(consent, { required: true });

      if (!isNameValid || !isEmailValid || !isPhoneValid || !isTypeValid || !isMessageValid || !isConsentValid) {
        showToast('Please fix the errors in the form.', 'error');
        return;
      }

      const submitBtn = contactForm.querySelector('.form-submit-btn');
      const btnSpan = submitBtn.querySelector('span');
      const originalText = btnSpan.innerText;
      
      // Add loading state
      submitBtn.classList.add('loading');
      btnSpan.innerText = "Sending...";
      submitBtn.disabled = true;

      // Prepare FormData
      const formData = new FormData(contactForm);

      try {
        const response = await fetch(ZOHO_ENDPOINT, {
          method: 'POST',
          body: formData,
        });

        // Use opaque to handle potential no-cors successful responses gracefully
        if (response.ok || response.type === 'opaque') {
          // Success
          showToast('✓ Inquiry sent successfully.<br>We\'ll get back to you shortly.', 'success');
          contactForm.reset();
          
          // Clear any visual error states just in case
          document.querySelectorAll('.form-error-msg').forEach(el => el.classList.remove('visible'));
          document.querySelectorAll('.has-error').forEach(el => el.classList.remove('has-error'));
        } else {
          throw new Error('Network response was not ok.');
        }
      } catch (error) {
        console.error('Submission error:', error);
        showToast('Something went wrong.<br>Please try again.', 'error');
      } finally {
        // Restore Button
        submitBtn.classList.remove('loading');
        btnSpan.innerText = originalText;
        submitBtn.disabled = false;
      }
    });

    // Clear validation on input/change
    const inputs = contactForm.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('input', () => {
        const parent = input.closest('.form-group') || input.closest('.form-checkbox');
        const errorDiv = parent ? parent.querySelector('.form-error-msg') : null;
        if (errorDiv) {
          parent.classList.remove('has-error');
          errorDiv.classList.remove('visible');
        }
      });
    });
  }

});
