document.addEventListener('DOMContentLoaded', () => {
    // Audio setup with memory prompt
    const bgMusic = document.getElementById('bg-music');
    const memoryPrompt = document.getElementById('memory-prompt');
    const totoroTrigger = document.getElementById('totoro-trigger');
    const heroText = document.querySelector('.hero-text');
    const infoSection = document.querySelector('.info');
    
    // Hero text is now visible by default, no need to hide it
    
    // Hide info section initially - keeping any CSS transitions intact
    if (infoSection) {
        // We don't need to set inline styles as we're using CSS for transitions
        // Just make sure it doesn't have the reveal class
        infoSection.classList.remove('reveal');
    }
    
    // Create stars for memory effect
    const createStars = (element, count = 30) => {
        // Get the position and dimensions of the element
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;
        
        // Create stars
        const stars = [];
        for (let i = 0; i < count; i++) {
            const star = document.createElement('div');
            star.classList.add('star');
            
            // Random position within the element
            const angle = Math.random() * Math.PI * 2; // random angle
            const distance = Math.random() * rect.width * 0.5; // random distance from center
            const startX = centerX + Math.cos(angle) * distance;
            const startY = centerY + Math.sin(angle) * distance;
            
            star.style.left = `${startX}px`;
            star.style.top = `${startY}px`;
            
            // Random size and delay for more natural effect
            const size = Math.random() * 5 + 2;
            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.opacity = '0';
            
            document.body.appendChild(star);
            stars.push(star);
        }
        
        return stars;
    };
    
    // Animate stars floating upward
    const animateStars = (stars) => {
        stars.forEach((star, index) => {
            // Random animation duration and delay
            const duration = Math.random() * 1500 + 1500;
            const delay = Math.random() * 500;
            
            // Create random end position (float upward direction)
            const endAngle = Math.random() * Math.PI; // semi-circle upward
            const distance = 100 + Math.random() * 150;
            const translateX = Math.cos(endAngle) * distance;
            const translateY = -Math.abs(Math.sin(endAngle) * distance); // always upward
            
            // Create animation
            star.animate([
                { transform: 'translate(0, 0) rotate(0deg)', opacity: 0 },
                { opacity: 1, offset: 0.1 },
                { opacity: 0.8, offset: 0.4 },
                { transform: `translate(${translateX}px, ${translateY}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: duration,
                delay: delay,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                fill: 'forwards'
            }).onfinish = () => {
                // Remove the star from DOM after animation
                star.remove();
            };
        });
    };
    
    // Create magic particles for dissolve effect
    const createMagicParticles = (element, count = 40) => {
        const rect = element.getBoundingClientRect();
        const particles = [];
        
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('star'); // Reuse star class for styling
            
            // Position particles along the text - from right to left
            const posX = rect.left + rect.width - (rect.width * (i / count));
            const posY = rect.top + (Math.random() * rect.height);
            
            particle.style.left = `${posX}px`;
            particle.style.top = `${posY}px`;
            
            // Varied sizes for particles
            const size = 2 + Math.random() * 3;
            particle.style.width = `${size}px`;
            particle.style.height = `${size}px`;
            
            document.body.appendChild(particle);
            particles.push(particle);
        }
        
        return particles;
    };
    
    // Animate magic particles
    const animateMagicParticles = (particles) => {
        particles.forEach((particle, index) => {
            // Sequential delay from right to left
            const delay = (particles.length - index) * 10;
            const duration = 800 + Math.random() * 400;
            
            particle.animate([
                { opacity: 0 },
                { opacity: 1, offset: 0.1 },
                { opacity: 1, transform: 'translateY(0px)', offset: 0.2 },
                { opacity: 0, transform: `translateY(-${20 + Math.random() * 30}px)` }
            ], {
                duration: duration,
                delay: delay,
                easing: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
                fill: 'forwards'
            }).onfinish = () => {
                particle.remove();
            };
        });
    };
    
    // Enhanced function to play audio with magical effects
    const playAudio = (clickElement = null) => {
        if (bgMusic && memoryPrompt && !memoryPrompt.classList.contains('playing')) {
            // Add playing class to prevent multiple clicks
            memoryPrompt.classList.add('playing');
            
            // Determine which element was clicked for star origin
            const targetElement = clickElement || memoryPrompt;
            
            // Create and animate stars from the clicked element
            const stars = createStars(targetElement);
            animateStars(stars);
            
            // Create magic particles for dissolve effect
            const particles = createMagicParticles(memoryPrompt);
            
            // Animate the prompt with magical right-to-left dissolve
            const magicFade = memoryPrompt.animate([
                { clipPath: 'inset(0 0 0 0)', opacity: 1 },
                { clipPath: 'inset(0 0 0 100%)', opacity: 0 }
            ], { 
                duration: 1500, 
                easing: 'cubic-bezier(0.42, 0, 0.58, 1)',
                fill: 'forwards'
            });
            
            // Trigger the particle animation once the main fade begins
            setTimeout(() => {
                animateMagicParticles(particles);
            }, 200);
            
            // Set a slight delay for the audio to match the animation
            setTimeout(() => {
                bgMusic.volume = 0.3;
                bgMusic.play()
                    .then(() => {
                        console.log('Audio playback started');
                        // Hide the prompt after successful play
                        memoryPrompt.classList.add('hidden');
                        
                        // Move hero text up to where the prompt was
                        if (heroText) {
                            // Wait a little for the prompt to disappear
                            setTimeout(() => {
                                heroText.classList.add('move-up');
                            }, 200);
                        }
                        
                        // After hero text is moved, show credits
                        setTimeout(() => {
                            if (infoSection) {
                                // Add reveal class to trigger credits animation
                                infoSection.classList.add('reveal');
                                
                                // After credits complete, remove info section
                                setTimeout(() => {
                                    infoSection.classList.remove('reveal');
                                }, 10000); // Match duration with CSS animation (10s)
                            }
                        }, 2500); // Wait for hero text animation to finish
                    })
                    .catch(err => {
                        console.error('Audio playback failed:', err);
                        memoryPrompt.classList.remove('playing');
                    });
            }, 300);
        }
    };
    
    // Listen for clicks on the memory prompt
    if (memoryPrompt) {
        memoryPrompt.addEventListener('click', () => {
            playAudio(memoryPrompt);
        });
        
        // Add hover animation
        memoryPrompt.addEventListener('mouseenter', () => {
            memoryPrompt.style.animationPlayState = 'paused';
        });
        
        memoryPrompt.addEventListener('mouseleave', () => {
            memoryPrompt.style.animationPlayState = 'running';
        });
    }
    
    // Listen for clicks on Totoro
    if (totoroTrigger) {
        totoroTrigger.addEventListener('click', () => {
            playAudio(totoroTrigger);
        });
    }
    
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
        
        // Info section is now handled by credits animation, not scroll
        
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