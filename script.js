// Mobile Navigation Toggle
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active");
  navMenu.classList.toggle("active");
});

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
  });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  });
});

// Header background on scroll
window.addEventListener("scroll", () => {
  const header = document.querySelector(".header");
  if (window.scrollY > 100) {
    header.style.background = "rgba(0, 0, 0, 0.95)";
  } else {
    header.style.background = "rgba(0, 0, 0, 0.9)";
  }
});

// Button click handlers
document.addEventListener("DOMContentLoaded", () => {
  // Join Now buttons
  document.querySelectorAll(".btn-primary, .btn-plan").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      if (
        btn.textContent.includes("Join") ||
        btn.textContent.includes("Choose")
      ) {
        e.preventDefault();
        showNotification(
          "🎉 Welcome to CityStarGym! Redirecting to membership...",
          "success"
        );
        setTimeout(() => {
          window.location.href =
            btn.getAttribute("href") || "pages/membership.html";
        }, 1500);
      }
    });
  });

  // Learn More / About buttons
  document.querySelectorAll('a[href*="about"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification("📖 Loading about information...", "info");
      setTimeout(() => {
        window.location.href = btn.getAttribute("href");
      }, 1000);
    });
  });

  // Meet Trainers buttons
  document.querySelectorAll('a[href*="trainers"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification("💪 Meet our expert trainers...", "info");
      setTimeout(() => {
        window.location.href = btn.getAttribute("href");
      }, 1000);
    });
  });

  // View Gallery buttons
  document.querySelectorAll('a[href*="gallery"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification("🏋️ Loading gym gallery...", "info");
      setTimeout(() => {
        window.location.href = btn.getAttribute("href");
      }, 1000);
    });
  });

  // Services buttons
  document.querySelectorAll('a[href*="services"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification("⚡ Exploring our services...", "info");
      setTimeout(() => {
        window.location.href = btn.getAttribute("href");
      }, 1000);
    });
  });

  // Contact buttons
  document.querySelectorAll('a[href*="contact"]').forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      showNotification("📞 Opening contact form...", "info");
      setTimeout(() => {
        window.location.href = btn.getAttribute("href");
      }, 1000);
    });
  });
});

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;
  notification.innerHTML = `
        <div class="notification-content">
            <span>${message}</span>
            <div class="notification-progress"></div>
        </div>
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.classList.add("show");
  }, 100);

  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 2000);
}

// Add click effects to all buttons
document.addEventListener("DOMContentLoaded", () => {
  // Add ripple effect to buttons
  document
    .querySelectorAll(".btn-primary, .btn-secondary, .btn-plan")
    .forEach((btn) => {
      btn.addEventListener("click", function (e) {
        const ripple = document.createElement("span");
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;

        ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.3);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple 0.6s linear;
                pointer-events: none;
            `;

        this.style.position = "relative";
        this.style.overflow = "hidden";
        this.appendChild(ripple);

        setTimeout(() => {
          if (this.contains(ripple)) {
            this.removeChild(ripple);
          }
        }, 600);
      });
    });

  // Service card interactions
  document.querySelectorAll(".service-card").forEach((card) => {
    card.addEventListener("click", () => {
      card.style.transform = "scale(1.05)";
      setTimeout(() => {
        card.style.transform = "";
      }, 200);
      showNotification(
        "🔥 Service selected! Contact us for more details.",
        "info"
      );
    });
  });

  // Feature card interactions
  document.querySelectorAll(".feature").forEach((feature) => {
    feature.addEventListener("click", () => {
      feature.style.transform = "scale(1.1) rotate(5deg)";
      setTimeout(() => {
        feature.style.transform = "";
      }, 300);
    });
  });

  // Instagram link interactions
  document
    .querySelectorAll(".instagram-link, .nav-instagram")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        showNotification("📱 Opening Instagram...", "info");
        // Let the default behavior continue (opening the link)
      });
    });

  // Plan card interactions
  document.querySelectorAll(".plan").forEach((plan) => {
    plan.addEventListener("mouseenter", () => {
      plan.style.transform = "translateY(-10px) scale(1.02)";
    });

    plan.addEventListener("mouseleave", () => {
      plan.style.transform = plan.classList.contains("featured")
        ? "scale(1.05)"
        : "";
    });
  });

  // Trainer and Manager card interactions
  document.querySelectorAll(".trainer-card, .manager-card").forEach((card) => {
    card.addEventListener("click", () => {
      const name = card.querySelector("h3").textContent;
      showNotification(`💪 Learn more about ${name}!`, "info");
      createParticleExplosion(card);
    });
  });

  // Initialize advanced features
  initDynamicCounters();
  initSoundEffects();
  initFloatingElements();
});

// Particle explosion effect
function createParticleExplosion(element) {
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 15; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";
    particle.style.cssText = `
            position: fixed;
            width: 6px;
            height: 6px;
            background: #00ffff;
            border-radius: 50%;
            left: ${centerX}px;
            top: ${centerY}px;
            pointer-events: none;
            z-index: 9999;
        `;

    document.body.appendChild(particle);

    const angle = (i / 15) * Math.PI * 2;
    const velocity = 100 + Math.random() * 100;
    const vx = Math.cos(angle) * velocity;
    const vy = Math.sin(angle) * velocity;

    particle.animate(
      [
        { transform: "translate(0, 0) scale(1)", opacity: 1 },
        { transform: `translate(${vx}px, ${vy}px) scale(0)`, opacity: 0 },
      ],
      {
        duration: 800,
        easing: "cubic-bezier(0.25, 0.46, 0.45, 0.94)",
      }
    ).onfinish = () => particle.remove();
  }
}

// Dynamic counters
function initDynamicCounters() {
  const counters = document.querySelectorAll(".stat h3, .achievement h4");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !entry.target.dataset.animated) {
        const target = parseInt(entry.target.textContent) || 500;
        animateCounter(entry.target, target);
        entry.target.dataset.animated = "true";
      }
    });
  });

  counters.forEach((counter) => observer.observe(counter));
}

function animateCounter(element, target) {
  let current = 0;
  const increment = target / 100;
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent =
      Math.floor(current) + (element.textContent.includes("+") ? "+" : "");
  }, 20);
}

// Sound effects
function initSoundEffects() {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();

  function playTone(frequency, duration) {
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = frequency;
    oscillator.type = "sine";

    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + duration
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + duration);
  }

  document.querySelectorAll(".btn-primary").forEach((btn) => {
    btn.addEventListener("click", () => playTone(800, 0.2));
  });

  document.querySelectorAll(".btn-secondary").forEach((btn) => {
    btn.addEventListener("click", () => playTone(600, 0.15));
  });
}

// Floating elements
function initFloatingElements() {
  const floatingElements = ["💪", "🏋️", "⚡", "🔥", "💯"];

  setInterval(() => {
    if (Math.random() < 0.3) {
      createFloatingElement(
        floatingElements[Math.floor(Math.random() * floatingElements.length)]
      );
    }
  }, 3000);
}

function createFloatingElement(emoji) {
  const element = document.createElement("div");
  element.textContent = emoji;
  element.style.cssText = `
        position: fixed;
        font-size: 2rem;
        pointer-events: none;
        z-index: 1000;
        left: ${Math.random() * window.innerWidth}px;
        top: ${window.innerHeight + 50}px;
    `;

  document.body.appendChild(element);

  element.animate(
    [
      { transform: "translateY(0) rotate(0deg)", opacity: 1 },
      {
        transform: `translateY(-${window.innerHeight + 100}px) rotate(360deg)`,
        opacity: 0,
      },
    ],
    {
      duration: 8000,
      easing: "linear",
    }
  ).onfinish = () => element.remove();
}

// Contact form submission with WhatsApp integration
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const name = document.getElementById('contactName').value;
    const email = document.getElementById('contactEmail').value;
    const phone = document.getElementById('contactPhone').value;
    const message = document.getElementById('contactMessage').value;
    
    if (!name || !email || !phone || !message) {
      showNotification('❌ Please fill in all fields', 'error');
      return;
    }
    
    // Format WhatsApp message
    const whatsappMessage = `*New Contact Form Submission*\n\n*Name:* ${name}\n*Email:* ${email}\n*Phone:* ${phone}\n*Message:* ${message}\n\n*From:* CityStarGym Website`;
    
    // WhatsApp number
    const whatsappNumber = '919588563701';
    
    // Create WhatsApp URL
    const whatsappURL = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
    
    // Open WhatsApp
    window.open(whatsappURL, '_blank');
    
    // Reset form and show success message
    contactForm.reset();
    showNotification(`✅ Thank you ${name}! Redirecting to WhatsApp...`, 'success');
  });
}

// Admin functionality for updating membership and trainers
function updateMembershipDisplay() {
  const membershipData = JSON.parse(localStorage.getItem('membershipPlans') || '{}');
  
  // Update membership prices on pages if elements exist
  if (membershipData.basic) {
    const basicElements = document.querySelectorAll('[data-plan="basic"] .price');
    basicElements.forEach(el => el.textContent = membershipData.basic);
  }
  
  if (membershipData.premium) {
    const premiumElements = document.querySelectorAll('[data-plan="premium"] .price');
    premiumElements.forEach(el => el.textContent = membershipData.premium);
  }
  
  if (membershipData.elite) {
    const eliteElements = document.querySelectorAll('[data-plan="elite"] .price');
    eliteElements.forEach(el => el.textContent = membershipData.elite);
  }
}

function updateTrainersDisplay() {
  const trainerData = JSON.parse(localStorage.getItem('trainersData') || '{}');
  
  // Update trainer names and specialties if elements exist
  Object.keys(trainerData).forEach(trainerKey => {
    const trainer = trainerData[trainerKey];
    const trainerElements = document.querySelectorAll(`[data-trainer="${trainerKey}"]`);
    
    trainerElements.forEach(element => {
      const nameEl = element.querySelector('h3');
      const specialtyEl = element.querySelector('.trainer-specialty');
      
      if (nameEl) nameEl.textContent = trainer.name;
      if (specialtyEl) specialtyEl.textContent = trainer.specialty;
    });
  });
}

// Load updated data on page load
document.addEventListener('DOMContentLoaded', () => {
  updateMembershipDisplay();
  updateTrainersDisplay();
});

// Animate elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, observerOptions);

// Observe elements for animation
document
  .querySelectorAll(
    ".animate-card, .service-card, .plan, .stat, .trainer-card, .gallery-item"
  )
  .forEach((el) => {
    observer.observe(el);
  });

// Add staggered animation delay
document
  .querySelectorAll(".trainers-grid .trainer-card, .gallery-grid .gallery-item")
  .forEach((card, index) => {
    card.style.animationDelay = `${index * 0.2}s`;
  });

// Parallax effect for hero sections
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset;
  const parallax = document.querySelector(
    ".hero, .trainers-hero, .gallery-hero"
  );
  if (parallax) {
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
  }
});

// Add active class to current section in navigation
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");

  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.scrollY >= sectionTop - 200) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.classList.remove("active");
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active");
    }
  });
});

// Add CSS for active navigation link, animations, and notifications
const style = document.createElement("style");
style.textContent = `
    .nav-menu a.active {
        color: #00ffff !important;
        text-shadow: 0 0 5px rgba(0, 255, 255, 0.5);
    }
    
    .nav-brand a {
        color: inherit;
        text-decoration: none;
    }
    
    .animate-card {
        opacity: 0;
        transform: translateY(30px);
        transition: all 0.6s ease;
    }
    
    .animate-card.visible {
        opacity: 1;
        transform: translateY(0);
    }
    
    .notification {
        position: fixed;
        top: 20px;
        right: 20px;
        background: rgba(26, 26, 26, 0.95);
        backdrop-filter: blur(15px);
        color: #fff;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        border-left: 4px solid #00ffff;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        transform: translateX(400px);
        transition: all 0.3s ease;
        z-index: 10000;
        min-width: 300px;
    }
    
    .notification.show {
        transform: translateX(0);
    }
    
    .notification.success {
        border-left-color: #00ff88;
    }
    
    .notification.error {
        border-left-color: #ff4444;
    }
    
    .notification.info {
        border-left-color: #00ffff;
    }
    
    .notification-content {
        position: relative;
    }
    
    .notification-progress {
        position: absolute;
        bottom: -8px;
        left: -1.5rem;
        right: -1.5rem;
        height: 3px;
        background: rgba(0, 255, 255, 0.3);
        border-radius: 0 0 10px 10px;
    }
    
    .notification-progress::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        background: #00ffff;
        border-radius: inherit;
        animation: progress 2s linear;
    }
    
    @keyframes progress {
        from { width: 100%; }
        to { width: 0%; }
    }
    
    @keyframes ripple {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .btn-primary:active, .btn-secondary:active, .btn-plan:active {
        transform: scale(0.95);
    }
    
    .service-card {
        cursor: pointer;
        user-select: none;
    }
    
    .feature {
        cursor: pointer;
        user-select: none;
    }
    
    .service-card:hover {
        cursor: pointer;
    }
    
    .trainer-card, .manager-card {
        cursor: pointer;
        user-select: none;
    }
    
    .interactive-bg {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        background: radial-gradient(circle at var(--mouse-x, 50%) var(--mouse-y, 50%), rgba(0, 255, 255, 0.05) 0%, transparent 50%);
        transition: all 0.3s ease;
    }
    
    .service-card::before {
        content: '';
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: linear-gradient(45deg, transparent, rgba(0, 255, 255, 0.1), transparent);
        transform: rotate(45deg);
        transition: all 0.5s ease;
        opacity: 0;
    }
    
    .service-card:hover::before {
        animation: rotate 1s linear;
        opacity: 1;
    }
    
    .trainer-card::after {
        content: '💪';
        position: absolute;
        top: 10px;
        right: 10px;
        font-size: 1.5rem;
        opacity: 0;
        transition: all 0.3s ease;
        transform: scale(0);
    }
    
    .trainer-card:hover::after {
        opacity: 1;
        transform: scale(1);
        animation: bounce 0.6s ease;
    }
    
    .gallery-item::before {
        content: '📸';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        font-size: 3rem;
        opacity: 0;
        transition: all 0.3s ease;
        z-index: 2;
    }
    
    .gallery-item:hover::before {
        opacity: 1;
        animation: bounce 0.6s ease;
    }
    
    .contact-form input:focus,
    .contact-form textarea:focus {
        transform: scale(1.02);
        box-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
    }
    
    .info-item {
        transition: all 0.3s ease;
        cursor: pointer;
    }
    
    .info-item:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0, 255, 255, 0.1);
    }
    
    .plan {
        transition: all 0.3s ease;
    }
    

`;
document.head.appendChild(style);

// Exercise Modal functionality
function initExerciseModal() {
  const exercisesBtn = document.getElementById("exercisesBtn");
  const levelModal = document.getElementById("levelModal");
  const bodyPartModal = document.getElementById("bodyPartModal");
  const closeBtns = document.querySelectorAll(".close, .close-body");
  const levelCards = document.querySelectorAll(".level-card");
  const bodyPartCards = document.querySelectorAll(".body-part-card");
  const exerciseSection = document.getElementById("exercises");

  let selectedLevel = "";

  if (!exercisesBtn || !levelModal) return;

  // Open level modal when exercises button is clicked
  exercisesBtn.addEventListener("click", (e) => {
    e.preventDefault();
    levelModal.style.display = "block";
    document.body.style.overflow = "hidden";
  });

  // Close modals
  closeBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      levelModal.style.display = "none";
      bodyPartModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Handle level selection
  levelCards.forEach((card) => {
    card.addEventListener("click", () => {
      selectedLevel = card.getAttribute("data-level");
      document.getElementById("selectedLevel").textContent = selectedLevel;
      levelModal.style.display = "none";
      bodyPartModal.style.display = "block";
    });
  });

  // Handle body part selection
  bodyPartCards.forEach((card) => {
    card.addEventListener("click", () => {
      const bodyPart = card.getAttribute("data-part");
      showExercises(selectedLevel, bodyPart);
      bodyPartModal.style.display = "none";
      document.body.style.overflow = "auto";
    });
  });

  // Navigation buttons
  const backToLevelsFromBody = document.getElementById("backToLevelsFromBody");
  const backToBodyParts = document.getElementById("backToBodyParts");

  if (backToLevelsFromBody) {
    backToLevelsFromBody.addEventListener("click", () => {
      bodyPartModal.style.display = "none";
      levelModal.style.display = "block";
    });
  }

  if (backToBodyParts) {
    backToBodyParts.addEventListener("click", () => {
      exerciseSection.style.display = "none";
      bodyPartModal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  }
}

function showExercises(level, bodyPart) {
  const exerciseSection = document.getElementById("exercises");
  const exerciseTitle = document.getElementById("exerciseTitle");
  const exerciseGrid = document.getElementById("exerciseGrid");

  // Update title
  exerciseTitle.textContent = `${
    level.charAt(0).toUpperCase() + level.slice(1)
  } ${bodyPart.charAt(0).toUpperCase() + bodyPart.slice(1)} Exercises`;

  // Get exercises for the level and body part
  const exercises = getExercisesForLevelAndBodyPart(level, bodyPart);

  // Clear and populate exercise grid
  exerciseGrid.innerHTML = "";
  exercises.forEach((exercise) => {
    const exerciseCard = createExerciseCard(exercise);
    exerciseGrid.appendChild(exerciseCard);
  });

  // Show exercise section
  exerciseSection.style.display = "block";
  exerciseSection.scrollIntoView({ behavior: "smooth" });
}

function getExercisesForLevelAndBodyPart(level, bodyPart) {
  const exercises = {
    beginner: {
      chest: [
        {
          name: "Push-ups",
          reps: "3 sets × 12-15 reps",
          description: "Standing chest exercise",
        },
        {
          name: "Bench Press",
          reps: "3 sets × 8-12 reps",
          description: "Modified push-ups",
        },
        {
          name: "Incline Bench Press",
          reps: "3 sets × 10-15 reps",
          description: "Elevated surface push-ups",
        },
        {
          name: "Decline Bench Press",
          reps: "3 sets × 15-20 reps",
          description: "Isometric chest exercise",
        },
        {
          name: "Butterfly",
          reps: "3 sets × 15 each",
          description: "Chest warm-up",
        },
      ],
      back: [
        {
          name: "Superman",
          reps: "3 sets × 12-15 reps",
          description: "Lower back strengthening",
        },
        {
          name: "Reverse Fly",
          reps: "3 sets × 12-15 reps",
          description: "Upper back exercise",
        },
        {
          name: "Cat-Cow Stretch",
          reps: "3 sets × 10-15 reps",
          description: "Spine mobility",
        },
        {
          name: "Wall Angels",
          reps: "3 sets × 15-20 reps",
          description: "Posture improvement",
        },
        {
          name: "Prone Y-Raises",
          reps: "3 sets × 12-15 reps",
          description: "Upper back activation",
        },
      ],
      shoulders: [
        {
          name: "Arm Circles",
          reps: "3 sets × 15 each",
          description: "Shoulder mobility",
        },
        {
          name: "Wall Handstand",
          reps: "3 sets × 20-30 sec",
          description: "Shoulder stability",
        },
        {
          name: "Shoulder Shrugs",
          reps: "3 sets × 15-20 reps",
          description: "Trap activation",
        },
        {
          name: "Band Pull-Aparts",
          reps: "3 sets × 15-20 reps",
          description: "Rear delt exercise",
        },
        {
          name: "Pike Push-ups",
          reps: "3 sets × 8-12 reps",
          description: "Shoulder press variation",
        },
      ],
      arms: [
        {
          name: "Wall Push-ups",
          reps: "3 sets × 12-15 reps",
          description: "Tricep activation",
        },
        {
          name: "Arm Circles",
          reps: "3 sets × 15 each",
          description: "Bicep warm-up",
        },
        {
          name: "Tricep Dips (Chair)",
          reps: "3 sets × 8-12 reps",
          description: "Tricep strengthening",
        },
        {
          name: "Bicep Curls (Water)",
          reps: "3 sets × 12-15 reps",
          description: "Light resistance curls",
        },
        {
          name: "Wrist Circles",
          reps: "3 sets × 10 each",
          description: "Forearm mobility",
        },
      ],
      legs: [
        {
          name: "Bodyweight Squats",
          reps: "3 sets × 15-20 reps",
          description: "Basic leg exercise",
        },
        {
          name: "Wall Sits",
          reps: "3 sets × 30-45 sec",
          description: "Isometric leg hold",
        },
        {
          name: "Calf Raises",
          reps: "3 sets × 15-20 reps",
          description: "Calf strengthening",
        },
        {
          name: "Glute Bridges",
          reps: "3 sets × 12-15 reps",
          description: "Glute activation",
        },
        {
          name: "Marching in Place",
          reps: "3 sets × 30 sec",
          description: "Leg coordination",
        },
      ],
      abs: [
        {
          name: "Crunches",
          reps: "3 sets × 15-20 reps",
          description: "Basic ab exercise",
        },
        {
          name: "Plank",
          reps: "3 sets × 20-30 sec",
          description: "Core stability",
        },
        {
          name: "Dead Bug",
          reps: "3 sets × 10 each side",
          description: "Core coordination",
        },
        {
          name: "Modified Bicycle",
          reps: "3 sets × 15-20 reps",
          description: "Oblique exercise",
        },
        {
          name: "Knee Raises",
          reps: "3 sets × 12-15 reps",
          description: "Lower ab focus",
        },
      ],
    },
    intermediate: {
      chest: [
        {
          name: "Barbell Bench Press",
          reps: "4 sets × 8-10 reps",
          description: "Heavy compound chest exercise",
        },
        {
          name: "Dumbbell Flyes",
          reps: "3 sets × 10-12 reps",
          description: "Chest isolation movement",
        },
        {
          name: "Incline Dumbbell Press",
          reps: "4 sets × 8-10 reps",
          description: "Upper chest focus",
        },
        {
          name: "Dips",
          reps: "3 sets × 10-15 reps",
          description: "Bodyweight chest exercise",
        },
        {
          name: "Cable Crossovers",
          reps: "3 sets × 12-15 reps",
          description: "Cable chest isolation",
        },
      ],
      back: [
        {
          name: "Pull-ups",
          reps: "4 sets × 6-10 reps",
          description: "Compound back exercise",
        },
        {
          name: "Barbell Rows",
          reps: "4 sets × 8-10 reps",
          description: "Heavy back builder",
        },
        {
          name: "Lat Pulldowns",
          reps: "3 sets × 10-12 reps",
          description: "Lat-focused exercise",
        },
        {
          name: "T-Bar Rows",
          reps: "3 sets × 8-10 reps",
          description: "Mid-back thickness",
        },
        {
          name: "Cable Rows",
          reps: "3 sets × 10-12 reps",
          description: "Controlled back movement",
        },
      ],
      shoulders: [
        {
          name: "Military Press",
          reps: "4 sets × 6-8 reps",
          description: "Heavy shoulder press",
        },
        {
          name: "Lateral Raises",
          reps: "4 sets × 12-15 reps",
          description: "Side delt isolation",
        },
        {
          name: "Rear Delt Flyes",
          reps: "3 sets × 12-15 reps",
          description: "Rear deltoid focus",
        },
        {
          name: "Arnold Press",
          reps: "3 sets × 10-12 reps",
          description: "Full shoulder rotation",
        },
        {
          name: "Upright Rows",
          reps: "3 sets × 10-12 reps",
          description: "Trap and delt builder",
        },
      ],
      arms: [
        {
          name: "Barbell Curls",
          reps: "4 sets × 8-10 reps",
          description: "Heavy bicep builder",
        },
        {
          name: "Close-Grip Bench",
          reps: "4 sets × 8-10 reps",
          description: "Tricep mass builder",
        },
        {
          name: "Hammer Curls",
          reps: "3 sets × 10-12 reps",
          description: "Brachialis focus",
        },
        {
          name: "Tricep Dips",
          reps: "3 sets × 10-15 reps",
          description: "Bodyweight tricep exercise",
        },
        {
          name: "Cable Curls",
          reps: "3 sets × 12-15 reps",
          description: "Constant tension biceps",
        },
      ],
      legs: [
        {
          name: "Barbell Squats",
          reps: "4 sets × 8-10 reps",
          description: "King of leg exercises",
        },
        {
          name: "Romanian Deadlifts",
          reps: "4 sets × 8-10 reps",
          description: "Hamstring and glute focus",
        },
        {
          name: "Bulgarian Split Squats",
          reps: "3 sets × 10-12 each",
          description: "Unilateral leg strength",
        },
        {
          name: "Leg Press",
          reps: "3 sets × 12-15 reps",
          description: "Quad-focused exercise",
        },
        {
          name: "Walking Lunges",
          reps: "3 sets × 12-15 each",
          description: "Functional leg movement",
        },
      ],
      abs: [
        {
          name: "Hanging Leg Raises",
          reps: "4 sets × 10-15 reps",
          description: "Advanced core exercise",
        },
        {
          name: "Russian Twists",
          reps: "3 sets × 20-25 reps",
          description: "Oblique strengthening",
        },
        {
          name: "Plank to Push-up",
          reps: "3 sets × 10-12 reps",
          description: "Dynamic core stability",
        },
        {
          name: "Mountain Climbers",
          reps: "3 sets × 30-40 reps",
          description: "Core and cardio combo",
        },
        {
          name: "Ab Wheel Rollouts",
          reps: "3 sets × 8-12 reps",
          description: "Advanced ab exercise",
        },
      ],
    },
    advanced: {
      chest: [
        {
          name: "Heavy Bench Press",
          reps: "5 sets × 3-5 reps",
          description: "Maximum strength building",
        },
        {
          name: "Weighted Dips",
          reps: "4 sets × 6-8 reps",
          description: "Advanced bodyweight variation",
        },
        {
          name: "Pause Bench Press",
          reps: "4 sets × 5-6 reps",
          description: "Strength and control focus",
        },
        {
          name: "Deficit Push-ups",
          reps: "3 sets × 15-20 reps",
          description: "Extended range of motion",
        },
        {
          name: "Single-Arm DB Press",
          reps: "3 sets × 6-8 each",
          description: "Unilateral chest strength",
        },
      ],
      back: [
        {
          name: "Weighted Pull-ups",
          reps: "5 sets × 3-6 reps",
          description: "Advanced pulling strength",
        },
        {
          name: "Deadlifts",
          reps: "5 sets × 3-5 reps",
          description: "Ultimate back builder",
        },
        {
          name: "One-Arm Rows",
          reps: "4 sets × 6-8 each",
          description: "Unilateral back strength",
        },
        {
          name: "Rack Pulls",
          reps: "4 sets × 5-6 reps",
          description: "Heavy partial deadlifts",
        },
        {
          name: "Muscle-ups",
          reps: "3 sets × 3-5 reps",
          description: "Advanced compound movement",
        },
      ],
      shoulders: [
        {
          name: "Heavy Overhead Press",
          reps: "5 sets × 3-5 reps",
          description: "Maximum shoulder strength",
        },
        {
          name: "Handstand Push-ups",
          reps: "4 sets × 5-8 reps",
          description: "Advanced bodyweight press",
        },
        {
          name: "Behind Neck Press",
          reps: "3 sets × 6-8 reps",
          description: "Advanced shoulder mobility",
        },
        {
          name: "Single-Arm Press",
          reps: "3 sets × 5-6 each",
          description: "Unilateral shoulder strength",
        },
        {
          name: "Pike Push-up Progression",
          reps: "3 sets × 8-12 reps",
          description: "Handstand preparation",
        },
      ],
      arms: [
        {
          name: "Weighted Chin-ups",
          reps: "4 sets × 5-8 reps",
          description: "Heavy bicep builder",
        },
        {
          name: "Close-Grip Press",
          reps: "5 sets × 5-6 reps",
          description: "Maximum tricep strength",
        },
        {
          name: "21s Bicep Curls",
          reps: "3 sets × 21 reps",
          description: "Advanced bicep technique",
        },
        {
          name: "Ring Dips",
          reps: "3 sets × 8-12 reps",
          description: "Unstable surface training",
        },
        {
          name: "Archer Push-ups",
          reps: "3 sets × 5-8 each",
          description: "Single-arm progression",
        },
      ],
      legs: [
        {
          name: "Heavy Back Squats",
          reps: "5 sets × 3-5 reps",
          description: "Maximum leg strength",
        },
        {
          name: "Pistol Squats",
          reps: "3 sets × 5-8 each",
          description: "Single-leg mastery",
        },
        {
          name: "Front Squats",
          reps: "4 sets × 5-6 reps",
          description: "Quad-dominant squat",
        },
        {
          name: "Single-Leg RDL",
          reps: "3 sets × 6-8 each",
          description: "Unilateral posterior chain",
        },
        {
          name: "Jump Squats",
          reps: "4 sets × 8-10 reps",
          description: "Explosive leg power",
        },
      ],
      abs: [
        {
          name: "Dragon Flags",
          reps: "4 sets × 5-8 reps",
          description: "Elite core exercise",
        },
        {
          name: "Human Flag Progression",
          reps: "3 sets × 10-15 sec",
          description: "Advanced core stability",
        },
        {
          name: "Weighted Planks",
          reps: "3 sets × 45-60 sec",
          description: "Heavy core endurance",
        },
        {
          name: "L-Sits",
          reps: "4 sets × 15-30 sec",
          description: "Advanced core hold",
        },
        {
          name: "Windshield Wipers",
          reps: "3 sets × 10-12 each",
          description: "Dynamic core rotation",
        },
      ],
    },
  };
  return exercises[level]?.[bodyPart] || [];
}

function createExerciseCard(exercise) {
  const card = document.createElement("div");
  card.className = "exercise-card";
  card.innerHTML = `
        <div class="exercise-info">
            <h4>${exercise.name}</h4>
            <p>${exercise.reps}</p>
            <div class="exercise-description">${exercise.description}</div>
        </div>
    `;
  return card;
}

// Exercise filters functionality
function initExerciseFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const level = btn.getAttribute("data-level");

      // Update active filter button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter exercises
      filterExercises(level);
    });
  });
}

function filterExercises(level) {
  const exerciseCards = document.querySelectorAll(".exercise-card");

  exerciseCards.forEach((card) => {
    if (level === "all" || card.getAttribute("data-level") === level) {
      card.style.display = "block";
      card.style.animation = "fadeInUp 0.5s ease";
    } else {
      card.style.display = "none";
    }
  });
}

// Payment Gateway Function
function initiatePayment(plan, amount) {
  // Show loading notification
  showNotification('💳 Redirecting to secure payment...', 'info');
  
  // Always use relative path from current location
  const currentPath = window.location.pathname;
  let paymentPath;
  
  if (currentPath.includes('/pages/')) {
    // We're in pages folder, use relative path
    paymentPath = `payment.html?plan=${plan}&amount=${amount}`;
  } else {
    // We're in root, use pages folder
    paymentPath = `pages/payment.html?plan=${plan}&amount=${amount}`;
  }
  
  // Redirect to payment page with parameters
  setTimeout(() => {
    window.location.href = paymentPath;
  }, 1000);
}

// Initialize new features
document.addEventListener("DOMContentLoaded", () => {
  initExerciseModal();
  initExerciseFilters();
  updateMembershipDisplay();
  updateTrainersDisplay();
});
// Mobile Navbar Toggle - Fixed
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    console.log('Hamburger:', hamburger);
    console.log('Nav Menu:', navMenu);

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
            
            console.log('Menu toggled');
        });

        // Close menu when clicking on a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', function() {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    } else {
        console.log('Hamburger or nav menu not found');
    }
});