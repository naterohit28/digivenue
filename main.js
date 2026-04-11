// Flavor Fusion - Main JavaScript
// Handles interactions, animations, and future Google Sheets integration

document.addEventListener('DOMContentLoaded', function() {
  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  
  if (menuToggle) {
    menuToggle.addEventListener('click', function() {
      nav.classList.toggle('active');
      const spans = menuToggle.querySelectorAll('span');
      if (nav.classList.contains('active')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = 'none';
        spans[1].style.opacity = '1';
        spans[2].style.transform = 'none';
      }
    });
  }

  // Header scroll effect
  const header = document.querySelector('.header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', function() {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
      header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.05)';
    } else {
      header.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Intersection Observer for animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  document.querySelectorAll('.pillar-card, .service-card, .venue-card, .testimonial-card, .offer-card').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });

  // Menu accordion functionality
  const menuHeaders = document.querySelectorAll('.menu-header');
  menuHeaders.forEach(header => {
    header.addEventListener('click', function() {
      const content = this.nextElementSibling;
      const isOpen = content.style.maxHeight && content.style.maxHeight !== '0px';
      
      // Close all others
      document.querySelectorAll('.menu-content').forEach(c => {
        c.style.maxHeight = '0px';
        c.style.padding = '0';
      });
      
      if (!isOpen) {
        content.style.maxHeight = content.scrollHeight + 'px';
        content.style.padding = 'var(--space-md)';
      }
    });
  });

  // Gallery filter (for future implementation)
  const galleryFilters = document.querySelectorAll('.gallery-filter');
  if (galleryFilters.length > 0) {
    galleryFilters.forEach(filter => {
      filter.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active state
        galleryFilters.forEach(f => f.classList.remove('active'));
        this.classList.add('active');
        
        // Filter items (placeholder for future dynamic loading)
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
          if (category === 'all' || item.dataset.category === category) {
            item.style.display = 'block';
          } else {
            item.style.display = 'none';
          }
        });
      });
    });
  }

  // Form submission handling
  const contactForm = document.querySelector('.contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success message
      const btn = this.querySelector('button[type="submit"]');
      const originalText = btn.textContent;
      btn.textContent = 'Message Sent!';
      btn.disabled = true;
      btn.style.background = 'var(--gold-600)';
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        btn.style.background = '';
        this.reset();
      }, 3000);
    });
  }

  // WhatsApp button tracking
  const whatsappBtn = document.querySelector('.whatsapp-float');
  if (whatsappBtn) {
    whatsappBtn.addEventListener('click', function() {
      console.log('WhatsApp clicked - track conversion');
    });
  }
});

// Google Sheets Integration (Future Implementation)
// ================================================

const SheetsAPI = {
  // Configuration for Google Sheets API integration
  config: {
    apiKey: 'YOUR_API_KEY',
    spreadsheetId: 'YOUR_SPREADSHEET_ID',
    ranges: {
      testimonials: 'Testimonials!A:D',
      gallery: 'Gallery!A:E',
      inquiries: 'Inquiries!A:F'
    }
  },

  // Fetch testimonials from Google Sheets
  async fetchTestimonials() {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.ranges.testimonials}?key=${this.config.apiKey}`
      );
      const data = await response.json();
      return this.parseTestimonials(data.values);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
      return [];
    }
  },

  // Fetch gallery images from Google Sheets
  async fetchGallery() {
    try {
      const response = await fetch(
        `https://sheets.googleapis.com/v4/spreadsheets/${this.config.spreadsheetId}/values/${this.config.ranges.gallery}?key=${this.config.apiKey}`
      );
      const data = await response.json();
      return this.parseGallery(data.values);
    } catch (error) {
      console.error('Error fetching gallery:', error);
      return [];
    }
  },

  // Submit inquiry to Google Sheets
  async submitInquiry(formData) {
    try {
      // Using Google Apps Script Web App URL
      const scriptUrl = 'YOUR_GOOGLE_APPS_SCRIPT_URL';
      
      const response = await fetch(scriptUrl, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sheet: 'Inquiries',
          data: formData
        })
      });
      
      return { success: true };
    } catch (error) {
      console.error('Error submitting inquiry:', error);
      return { success: false, error };
    }
  },

  // Parse testimonials data
  parseTestimonials(rows) {
    if (!rows || rows.length < 2) return [];
    const headers = rows[0];
    return rows.slice(1).map(row => ({
      name: row[0] || '',
      eventType: row[1] || '',
      review: row[2] || '',
      date: row[3] || ''
    }));
  },

  // Parse gallery data
  parseGallery(rows) {
    if (!rows || rows.length < 2) return [];
    const headers = rows[0];
    return rows.slice(1).map(row => ({
      id: row[0] || '',
      category: row[1] || '',
      imageUrl: row[2] || '',
      title: row[3] || '',
      description: row[4] || ''
    }));
  },

  // Render testimonials to DOM
  renderTestimonials(testimonials) {
    const container = document.querySelector('.testimonials-grid');
    if (!container) return;
    
    container.innerHTML = testimonials.map(t => `
      <div class="testimonial-card">
        <p class="testimonial-text">"${t.review}"</p>
        <div class="testimonial-author">
          <div class="testimonial-name">${t.name}</div>
          <div class="testimonial-event">${t.eventType}</div>
        </div>
      </div>
    `).join('');
  },

  // Render gallery to DOM
  renderGallery(images) {
    const container = document.querySelector('.gallery-grid');
    if (!container) return;
    
    container.innerHTML = images.map(img => `
      <div class="gallery-item ${img.category}" data-category="${img.category}">
        <img src="${img.imageUrl}" alt="${img.title}" loading="lazy">
        <div class="gallery-overlay">
          <h4>${img.title}</h4>
          <p>${img.description}</p>
        </div>
      </div>
    `).join('');
  }
};

// Initialize dynamic content when DOM is ready
// Uncomment when Google Sheets is configured:
// document.addEventListener('DOMContentLoaded', async () => {
//   const testimonials = await SheetsAPI.fetchTestimonials();
//   if (testimonials.length > 0) {
//     SheetsAPI.renderTestimonials(testimonials);
//   }
//   
//   const gallery = await SheetsAPI.fetchGallery();
//   if (gallery.length > 0) {
//     SheetsAPI.renderGallery(gallery);
//   }
// });

// Export for global access
window.SheetsAPI = SheetsAPI;