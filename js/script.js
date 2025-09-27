// Website functionality
document.addEventListener('DOMContentLoaded', function() {
    // Hamburger menu functionality
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sideMenu = document.querySelector('.side-menu');
    const menuOverlay = document.querySelector('.menu-overlay');
    const closeMenu = document.querySelector('.close-menu');
    const sideMenuLinks = document.querySelectorAll('.side-menu-links a');

    // Check if elements exist before adding event listeners
    if (hamburgerMenu && sideMenu && menuOverlay && closeMenu) {
        // Open menu
        hamburgerMenu.addEventListener('click', function() {
            hamburgerMenu.classList.add('active');
            sideMenu.classList.add('active');
            menuOverlay.classList.add('active');
            document.body.style.overflow = 'hidden';
        });

        // Close menu function
        function closeSideMenu() {
            hamburgerMenu.classList.remove('active');
            sideMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
            document.body.style.overflow = 'auto';
        }

        // Close menu when clicking close button
        closeMenu.addEventListener('click', closeSideMenu);

        // Close menu when clicking overlay
        menuOverlay.addEventListener('click', closeSideMenu);

        // Close menu when clicking a menu link
        sideMenuLinks.forEach(link => {
            link.addEventListener('click', closeSideMenu);
        });

        // Close menu with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeSideMenu();
            }
        });
    }

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

    // Smooth scrolling for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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

    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.section, .card, .event-item');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
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
        
        // Fallback scroll listener with improved throttling
        let lastScrollTime = 0;
        const scrollThrottle = 100; // Reduced frequency for better performance
        
        function handleScrollFallback() {
            const now = Date.now();
            if (now - lastScrollTime < scrollThrottle) return;
            lastScrollTime = now;
            
            const sectionRect = crackedEarthSection.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const triggerPoint = windowHeight * 0.6;
            
            if (sectionRect.top <= triggerPoint && sectionRect.bottom >= 0 && !earthSeparated && !isAnimating) {
                isAnimating = true;
                crackedEarthSection.classList.add('earth-separated');
                earthSeparated = true;
                setTimeout(() => { isAnimating = false; }, 1500);
            } else if (sectionRect.top > triggerPoint && earthSeparated && !isAnimating) {
                isAnimating = true;
                crackedEarthSection.classList.remove('earth-separated');
                earthSeparated = false;
                setTimeout(() => { isAnimating = false; }, 1500);
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
            header.addEventListener('click', function() {
                // Check if this section is currently collapsed
                const isCurrentlyCollapsed = section.classList.contains('collapsed');
                
                // Close all other dropdowns first
                dropdownSections.forEach(otherSection => {
                    if (otherSection !== section) {
                        otherSection.classList.add('collapsed');
                    }
                });
                
                // Toggle the current section
                if (isCurrentlyCollapsed) {
                    section.classList.remove('collapsed');
                } else {
                    section.classList.add('collapsed');
                }
            });
        }
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
                const isActive = folder.classList.contains('active');
                
                // Close all other folders
                galleryFolders.forEach(otherFolder => {
                    if (otherFolder !== folder) {
                        otherFolder.classList.remove('active');
                    }
                });

                // Toggle current folder
                if (isActive) {
                    folder.classList.remove('active');
                } else {
                    folder.classList.add('active');
                }
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