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



});
