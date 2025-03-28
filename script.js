document.addEventListener('DOMContentLoaded', () => {
    // Audio setup with autoplay overlay workaround
    const bgMusic = document.getElementById('bg-music');
    const autoplayButton = document.getElementById('autoplay-button');
    const autoplayOverlay = document.getElementById('autoplay-overlay');
    
    // Simple function to play audio
    const playAudio = () => {
        if (bgMusic) {
            bgMusic.volume = 0.3;
            bgMusic.play()
                .then(() => {
                    console.log('Audio playback started');
                    // Remove the overlay after successful play
                    if (autoplayOverlay) {
                        autoplayOverlay.style.display = 'none';
                    }
                })
                .catch(err => {
                    console.error('Audio playback failed:', err);
                });
        }
    };
    
    // Option 1: Use the autoplay button (almost invisible to user)
    if (autoplayButton) {
        autoplayButton.addEventListener('click', () => {
            playAudio();
            // Remove the overlay after click
            if (autoplayOverlay) {
                autoplayOverlay.style.display = 'none';
            }
        });
        
        // Auto-trigger the click in multiple ways
        const triggerClick = () => {
            try {
                // Method 1: Direct click
                autoplayButton.click();
                
                // Method 2: Programmatic event
                const clickEvent = new MouseEvent('click', {
                    view: window,
                    bubbles: true,
                    cancelable: true
                });
                autoplayButton.dispatchEvent(clickEvent);
                
                // Method 3: Dispatch touch events for mobile
                if ('ontouchstart' in window) {
                    const touchStartEvent = new TouchEvent('touchstart');
                    const touchEndEvent = new TouchEvent('touchend');
                    autoplayButton.dispatchEvent(touchStartEvent);
                    autoplayButton.dispatchEvent(touchEndEvent);
                }
            } catch (err) {
                console.log('Auto-trigger failed:', err);
            }
        };
        
        // Try multiple times with increasing delays
        setTimeout(triggerClick, 100);
        setTimeout(triggerClick, 500);
        setTimeout(triggerClick, 1000);
        setTimeout(triggerClick, 2000);
    }
    
    // Option 2: Capture any user interaction with the page
    const userInteractionEvents = ['mousedown', 'keydown', 'touchstart', 'scroll'];
    
    const handleUserInteraction = () => {
        playAudio();
        
        // Remove event listeners after first interaction
        userInteractionEvents.forEach(event => {
            document.removeEventListener(event, handleUserInteraction);
        });
    };
    
    // Add interaction listeners
    userInteractionEvents.forEach(event => {
        document.addEventListener(event, handleUserInteraction);
    });
    
    // Option 3: Re-play when the document becomes visible
    document.addEventListener('visibilitychange', () => {
        if (document.visibilityState === 'visible' && bgMusic && !bgMusic.paused) {
            bgMusic.currentTime = 0; // Restart the audio
            bgMusic.play().catch(err => {
                console.log('Visibility play failed:', err);
            });
        }
    });
    
    // Page load animations
    const mainTitle = document.querySelector('header h1');
    mainTitle.style.opacity = '0';
    mainTitle.style.transform = 'translateY(-20px)';
    mainTitle.style.transition = 'opacity 1s ease, transform 1s ease';
    
    setTimeout(() => {
        mainTitle.style.opacity = '1';
        mainTitle.style.transform = 'translateY(0)';
    }, 300);
    
    // Contract address style adaptation
    const contractAddress = document.getElementById('contract-address');
    if (contractAddress) {
        const addressSpan = contractAddress.querySelector('.address-text');
        const caLabel = contractAddress.querySelector('.ca-label');
        
        // Function to detect device and adapt styles
        const adaptToScreenSize = () => {
            const isMobile = window.innerWidth <= 768;
            const isVerySmall = window.innerWidth <= 375;
            
            if (addressSpan) {
                if (isMobile) {
                    // For small screens, ensure address is visible
                    addressSpan.style.display = 'block';
                    addressSpan.style.wordBreak = 'break-all';
                    addressSpan.style.fontWeight = 'bold';
                    addressSpan.style.textAlign = 'center';
                    
                    if (caLabel) {
                        caLabel.style.display = 'block';
                        caLabel.style.fontWeight = 'bold';
                        caLabel.style.textAlign = 'center';
                    }
                    
                    // Set the parent container to center as well
                    const tokenAddress = document.querySelector('.token-address');
                    if (tokenAddress) {
                        tokenAddress.style.textAlign = 'center';
                    }
                    
                    if (isVerySmall) {
                        // Special handling for very small screens
                        addressSpan.style.fontSize = '0.75rem';
                        addressSpan.style.lineHeight = '1.4';
                        
                        if (caLabel) {
                            caLabel.style.fontSize = '0.85rem';
                        }
                    }
                } else {
                    // For large screens, restore default styles
                    addressSpan.style.display = 'inline';
                    addressSpan.style.wordBreak = 'normal';
                    addressSpan.style.fontSize = '';
                    addressSpan.style.lineHeight = '';
                    addressSpan.style.fontWeight = '';
                    addressSpan.style.textAlign = '';
                    
                    if (caLabel) {
                        caLabel.style.display = 'inline';
                        caLabel.style.marginRight = '5px';
                        caLabel.style.fontWeight = '';
                        caLabel.style.textAlign = '';
                    }
                }
            }
        };
        
        // Initial call
        adaptToScreenSize();
        
        // Readjust when window size changes
        window.addEventListener('resize', adaptToScreenSize);
    }
    
    // Animation elements
    const galleryItems = document.querySelectorAll('.gallery-item');
    const infoSection = document.querySelector('.info');
    const features = document.querySelectorAll('.feature');
    const tokenSection = document.querySelector('.token-info');
    
    // Check if element is in viewport
    function isInViewport(element, offset = 0) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight - offset) &&
            rect.bottom >= 0
        );
    }
    
    // Add visible class to elements entering viewport
    function handleScrollAnimation() {
        // Handle gallery items
        galleryItems.forEach((item, index) => {
            if (isInViewport(item, 50)) {
                setTimeout(() => {
                    item.classList.add('visible');
                }, index * 100);
            }
        });
        
        // Handle info section
        if (isInViewport(infoSection, 100)) {
            infoSection.classList.add('visible');
            
            // Handle feature items
            setTimeout(() => {
                features.forEach((feature, index) => {
                    setTimeout(() => {
                        feature.classList.add('visible');
                    }, index * 150);
                });
            }, 300);
        }
        
        // Handle token information section
        if (isInViewport(tokenSection, 100)) {
            tokenSection.classList.add('visible');
        }
    }
    
    // Initial check
    setTimeout(handleScrollAnimation, 300);
    
    // Listen for scroll events
    window.addEventListener('scroll', () => {
        handleScrollAnimation();
    });
    
    // Smooth scrolling to anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Add parallax scrolling effects
    window.addEventListener('scroll', () => {
        const scrollPosition = window.scrollY;
        
        // Add parallax effect to main title
        mainTitle.style.transform = `translateY(${scrollPosition * 0.05}px)`;
        
        // Add parallax effect to Totoro image
        const totoroImage = document.querySelector('.main-totoro');
        if (totoroImage) {
            totoroImage.style.transform = `translateY(${scrollPosition * -0.03}px) translateY(${Math.sin(Date.now() / 1000) * 5}px)`;
        }
    });
    
    // Apply entrance animations
    const applyEntranceAnimation = (elements, delay = 0, stagger = 100) => {
        elements.forEach((element, index) => {
            element.style.opacity = '0';
            element.style.transform = 'translateY(20px)';
            element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
            
            setTimeout(() => {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }, delay + (index * stagger));
        });
    };
    
    // Apply entrance animations to social links
    const socialLinks = document.querySelectorAll('.social-link');
    applyEntranceAnimation(socialLinks, 1000, 150);
}); 