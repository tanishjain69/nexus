// Website functionality
document.addEventListener('DOMContentLoaded', function() {


    // Hamburger menu functionality removed for cleaner mobile experience

    // Simple scroll behavior for about section
    const aboutSection = document.getElementById('about');
    
    if (aboutSection) {
        // Show about section by default
        aboutSection.style.opacity = '1';
        aboutSection.style.transform = 'translateY(0)';
        aboutSection.style.transition = 'all 0.8s ease-out';
    }

    // Schedule Tabs
    const tabs = document.querySelectorAll('.tab');
    if (tabs.length > 0) {
        tabs.forEach(tab => {
            tab.addEventListener('click', function() {
                // Remove active class from all tabs
                tabs.forEach(t => t.classList.remove('active'));
                
                // Add active class to clicked tab
                this.classList.add('active');
                
                // Hide all tab panes
                const tabPanes = document.querySelectorAll('.tab-pane');
                tabPanes.forEach(pane => pane.classList.remove('active'));
                
                // Show corresponding tab pane
                const targetId = this.getAttribute('data-tab');
                const targetPane = document.getElementById(targetId);
                if (targetPane) {
                    targetPane.classList.add('active');
                }
            });
        });
    }

    // Smooth scrolling for anchor links (excluding dropdown section headers)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Check if this click is coming from a dropdown section header
            const isDropdownHeader = this.closest('.section-header');
            if (isDropdownHeader) {
                return; // Don't handle smooth scrolling for dropdown headers
            }
            
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Optimized Animation on scroll with better performance
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -30px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Unobserve after animation to improve performance
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Observe elements for animation with reduced set
    const animateElements = document.querySelectorAll('.section, .card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(15px)';
        el.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
        el.style.willChange = 'opacity, transform';
        observer.observe(el);
    });

    // ===== EARTH SEPARATION SCROLL EFFECT =====
    const crackedEarthSection = document.querySelector('.cracked-earth-section');
    
    if (crackedEarthSection) {
        let earthSeparated = false;
        let isAnimating = false;
        
        // Use Intersection Observer for better performance
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -20% 0px', // Trigger when 60% visible
            threshold: [0, 0.3, 0.6, 1]
        };
        
        const earthObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && entry.intersectionRatio >= 0.3 && !earthSeparated && !isAnimating) {
                    isAnimating = true;
                    crackedEarthSection.classList.add('earth-separated');
                    earthSeparated = true;
                    // Reset animation flag after transition completes
                    setTimeout(() => {
                        isAnimating = false;
                    }, 1500);
                } else if (!entry.isIntersecting && earthSeparated && !isAnimating) {
                    isAnimating = true;
                    crackedEarthSection.classList.remove('earth-separated');
                    earthSeparated = false;
                    // Reset animation flag after transition completes
                    setTimeout(() => {
                        isAnimating = false;
                    }, 1500);
                }
            });
        }, observerOptions);
        
        earthObserver.observe(crackedEarthSection);
        
        // Optimized fallback scroll listener with better throttling
        let lastScrollTime = 0;
        let ticking = false;
        const scrollThrottle = 150; // Increased throttle for better performance
        
        function handleScrollFallback() {
            const now = Date.now();
            if (now - lastScrollTime < scrollThrottle) return;
            lastScrollTime = now;
            
            if (!ticking) {
                requestAnimationFrame(() => {
                    const sectionRect = crackedEarthSection.getBoundingClientRect();
                    const windowHeight = window.innerHeight;
                    const triggerPoint = windowHeight * 0.6;
                    
                    if (sectionRect.top <= triggerPoint && sectionRect.bottom >= 0 && !earthSeparated && !isAnimating) {
                        isAnimating = true;
                        crackedEarthSection.classList.add('earth-separated');
                        earthSeparated = true;
                        setTimeout(() => { isAnimating = false; }, 1000); // Reduced timeout
                    } else if (sectionRect.top > triggerPoint && earthSeparated && !isAnimating) {
                        isAnimating = true;
                        crackedEarthSection.classList.remove('earth-separated');
                        earthSeparated = false;
                        setTimeout(() => { isAnimating = false; }, 1000); // Reduced timeout
                    }
                    ticking = false;
                });
                ticking = true;
            }
        }
        
        // Use passive listener for better performance
        window.addEventListener('scroll', handleScrollFallback, { passive: true });
    }

    // ===== SCHEDULE TABS FUNCTIONALITY =====
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const targetTab = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            const targetContent = document.getElementById(targetTab);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });

    // ===== DROPDOWN SECTIONS FUNCTIONALITY =====
    const dropdownSections = document.querySelectorAll('.dropdown-section');
    
    dropdownSections.forEach(section => {
        const header = section.querySelector('.section-header');
        
        if (header) {
            header.addEventListener('click', function(e) {
                // Basic prevention to avoid unwanted navigation
                e.preventDefault();
                
                // Toggle the collapsed state of this section only
                section.classList.toggle('collapsed');
            });
            
            // Add keyboard accessibility
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    header.click();
                }
            });
        }
    });
    
    // Handle window resize to maintain proper behavior
    window.addEventListener('resize', function() {
        // Optional: You can add logic here if needed when switching between mobile/desktop
    });

    // ===== EVENT CARDS FUNCTIONALITY =====
    const eventCards = document.querySelectorAll('.event-card');
    
    eventCards.forEach(card => {
        card.addEventListener('click', function() {
            // Toggle the expanded state
            card.classList.toggle('expanded');
            
            // Close other expanded cards
            eventCards.forEach(otherCard => {
                if (otherCard !== card) {
                    otherCard.classList.remove('expanded');
                }
            });
        });

        // Add keyboard accessibility
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                card.click();
            }
        });
    });

    // Gallery Folder Functionality
    const galleryFolders = document.querySelectorAll('.gallery-folder');

    galleryFolders.forEach(folder => {
        const header = folder.querySelector('.folder-header');
        const content = folder.querySelector('.folder-content');
        const icon = folder.querySelector('.folder-icon');

        if (header && content) {
            header.addEventListener('click', function() {
                // Simply toggle the current folder without affecting others
                folder.classList.toggle('active');
            });

            // Add keyboard accessibility
            header.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    this.click();
                }
            });
        }
    });

    // Gallery Image Modal Functionality
    const galleryImages = document.querySelectorAll('.gallery-image');
    
    galleryImages.forEach(image => {
        image.addEventListener('click', function() {
            const imageUrl = this.src;
            if (imageUrl) {
                // Create modal overlay
                const modal = document.createElement('div');
                modal.className = 'gallery-modal';
                modal.innerHTML = `
                    <div class="modal-overlay">
                        <div class="modal-content">
                            <img src="${imageUrl}" alt="Gallery Image">
                            <button class="modal-close">&times;</button>
                        </div>
                    </div>
                `;
                
                // Add modal styles
                modal.style.cssText = `
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.9);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10000;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                `;
                
                const modalContent = modal.querySelector('.modal-content');
                modalContent.style.cssText = `
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                    transform: scale(0.8);
                    transition: transform 0.3s ease;
                `;
                
                const modalImg = modal.querySelector('img');
                modalImg.style.cssText = `
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                    border-radius: 10px;
                `;
                
                const closeBtn = modal.querySelector('.modal-close');
                closeBtn.style.cssText = `
                    position: absolute;
                    top: -40px;
                    right: 0;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 2rem;
                    cursor: pointer;
                    padding: 10px;
                    line-height: 1;
                `;
                
                document.body.appendChild(modal);
                document.body.style.overflow = 'hidden';
                
                // Animate in
                setTimeout(() => {
                    modal.style.opacity = '1';
                    modalContent.style.transform = 'scale(1)';
                }, 10);
                
                // Close modal function
                function closeModal() {
                    modal.style.opacity = '0';
                    modalContent.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        document.body.removeChild(modal);
                        document.body.style.overflow = 'auto';
                    }, 300);
                }
                
                // Close modal events
                closeBtn.addEventListener('click', closeModal);
                modal.addEventListener('click', function(e) {
                    if (e.target === modal || e.target.className === 'modal-overlay') {
                        closeModal();
                    }
                });
                
                // Close with Escape key
                document.addEventListener('keydown', function escapeHandler(e) {
                    if (e.key === 'Escape') {
                        closeModal();
                        document.removeEventListener('keydown', escapeHandler);
                    }
                });
            }
        });
    });
});