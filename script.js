document.addEventListener('DOMContentLoaded', () => {
    const pageClassList = document.body.classList;

    // INDEX PAGE LOGIC
    if (pageClassList.contains('index-page')) {
        console.log("Home page script running");
        // Hover Effects for Cards
        const hoverEffects = [
            { cardId: "about-card", linkId: "about-link" },
            { cardId: "projects-card", linkId: "projects-link" },
            { cardId: "vision-card", linkId: "vision-link" },
            { cardId: "gallery-card", linkId: "gallery-link" }
        ];

        hoverEffects.forEach(({ cardId, linkId }) => {
            const card = document.getElementById(cardId);
            const link = document.getElementById(linkId);

            if (card && link) {
                card.addEventListener("mouseenter", () => {
                    link.style.transform = "scale(1.3)";
                });

                card.addEventListener("mouseleave", () => {
                    link.style.transform = "scale(1)";
                });
            }
        });

        // 👋 Wave Emoji Animation
        const waveEmoji = document.getElementById('wave-emoji');
        if (waveEmoji) {
            waveEmoji.classList.add('animate');
            waveEmoji.addEventListener('animationend', () => {
                waveEmoji.classList.remove('animate');
            });
            waveEmoji.addEventListener('click', () => {
                waveEmoji.classList.add('animate');
            });
        }
    }

    // ABOUT ME PAGE LOGIC
    if (pageClassList.contains('aboutme-page')) {
        console.log("About Me page script running");

        const rightArrow = document.getElementById("right-arrow");
        const leftArrow = document.getElementById("left-arrow");
        
        function shakeArrow(arrow, direction) {
            const baseDistance = direction === "right" ? 8 : -8;
            const totalShakes = 8; // must be even for symmetry
            const duration = 100; // ms per shake
    
            let currentShake = 0;
    
            const interval = setInterval(() => {
                // Damping: reduce distance each shake
                const magnitude = baseDistance * (1 - currentShake / totalShakes);
                const offset = currentShake % 2 === 0 ? magnitude : 0;
    
                arrow.style.transform = `translateX(${offset}px)`;
                currentShake++;
    
                if (currentShake > totalShakes) {
                    clearInterval(interval);
                    arrow.style.transform = "translateX(0)";
                }
            }, duration);
        }
    
        // Animate once at load
        shakeArrow(rightArrow, "right");
        shakeArrow(leftArrow, "left");
    }

    // PROJECTS PAGE LOGIC
    if (pageClassList.contains('projects-page')) {
        console.log("Projects page script running");

        const thumb = document.querySelector(".resume-thumb");
        const modal = document.getElementById("resumeModal");
        const fullImg = modal?.querySelector(".resume-full");

        if (thumb && modal && fullImg) {
            const openModal = () => {
                modal.style.display = "flex";
                document.body.style.overflow = "hidden";
                // Ensure browser has time to apply display before animation
                setTimeout(() => {
                    modal.classList.add("show");
                }, 10);
            };

            const closeModal = () => {
                modal.classList.remove("show");
                document.body.style.overflow = "";
                setTimeout(() => {
                    modal.style.display = "none";
                }, 300); // Match CSS transition duration
            };

            thumb.addEventListener("click", openModal);
            modal.addEventListener("click", closeModal);
            fullImg.addEventListener("click", (e) => e.stopPropagation());

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && modal.classList.contains("show")) {
                    closeModal();
                }
            });
        }

        const sliders = document.querySelectorAll('.slider');

        sliders.forEach(slider => {
            const slides = slider.querySelectorAll('.slide');
            const prevBtn = slider.querySelector('.prev');
            const nextBtn = slider.querySelector('.next');
            const dots = slider.querySelectorAll('.dot');
            let currentIndex = 0;
            let startX = 0;

            const showSlide = (index) => {
                slides.forEach((slide, i) => {
                    slide.classList.remove('active');
                    dots[i].classList.remove('active');
                    if (i === index) {
                        slide.classList.add('active');
                        dots[i].classList.add('active');
                    }
                });
            };

            prevBtn.addEventListener('click', () => {
                currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                showSlide(currentIndex);
            });

            nextBtn.addEventListener('click', () => {
                currentIndex = (currentIndex + 1) % slides.length;
                showSlide(currentIndex);
            });

            dots.forEach(dot => {
                dot.addEventListener('click', () => {
                    const index = parseInt(dot.dataset.index);
                    currentIndex = index;
                    showSlide(currentIndex);
                });
            });

            // Swipe support
            slider.addEventListener('touchstart', (e) => {
                startX = e.touches[0].clientX;
            });

            slider.addEventListener('touchend', (e) => {
                const endX = e.changedTouches[0].clientX;
                const deltaX = endX - startX;

                if (deltaX > 50) {
                    currentIndex = (currentIndex - 1 + slides.length) % slides.length;
                    showSlide(currentIndex);
                } else if (deltaX < -50) {
                    currentIndex = (currentIndex + 1) % slides.length;
                    showSlide(currentIndex);
                }
            });

            showSlide(currentIndex); // Initialize
        });

        const sliderModal = document.getElementById("sliderModal");
        const sliderFullImg = sliderModal?.querySelector(".slider-full");

        if (sliderModal && sliderFullImg) {
            document.querySelectorAll('.slide').forEach(slide => {
                slide.addEventListener("click", () => {
                    sliderFullImg.src = slide.src;
                    sliderModal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    setTimeout(() => {
                        sliderModal.classList.add("show");
                    }, 10);
                });
            });

            sliderModal.addEventListener("click", () => {
                sliderModal.classList.remove("show");
                document.body.style.overflow = "";
                setTimeout(() => {
                    sliderModal.style.display = "none";
                }, 300);
            });

            sliderFullImg.addEventListener("click", (e) => e.stopPropagation());

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && sliderModal.classList.contains("show")) {
                    sliderModal.classList.remove("show");
                    document.body.style.overflow = "";
                    setTimeout(() => {
                        sliderModal.style.display = "none";
                    }, 300);
                }
            });
        }

        const schoolButtons = document.querySelectorAll(".schoolButton");
        const schoolModal = document.getElementById("schoolModal");
        const schoolClose = document.getElementById("schoolClose");

        if (schoolButtons.length && schoolModal && schoolClose) {
            schoolButtons.forEach(btn => {
                btn.addEventListener("click", () => {
                    schoolModal.style.display = "flex";
                    document.body.style.overflow = "hidden";
                    setTimeout(() => {
                        schoolModal.classList.add("show");
                    }, 10);
                });
            });

            const closeSchoolModal = () => {
                schoolModal.classList.remove("show");
                document.body.style.overflow = "";
                setTimeout(() => {
                    schoolModal.style.display = "none";
                }, 300);
            };

            schoolClose.addEventListener("click", closeSchoolModal);
            schoolModal.addEventListener("click", closeSchoolModal);
            schoolModal.querySelector(".school-modal-box").addEventListener("click", (e) => e.stopPropagation());

            document.addEventListener("keydown", (e) => {
                if (e.key === "Escape" && schoolModal.classList.contains("show")) {
                    closeSchoolModal();
                }
            });
        }
    }


    // VISION PAGE LOGIC
    if (pageClassList.contains('vision-page')) {
        console.log("Vision page script running");
        window.addEventListener('scroll', function() {
            const timeline = document.querySelector('.timeline');
            const footer = document.querySelector('footer');
        
            const footerTop = footer.getBoundingClientRect().top;
            const viewportHeight = window.innerHeight;
        
            if (footerTop < viewportHeight - 5) {
                timeline.classList.add('stuck');
            } else {
                timeline.classList.remove('stuck');
            }
        });
        
        window.addEventListener('scroll', function() {
            const visionEvents = document.querySelector('.vision-events');
            const timeline = document.querySelector('.timeline');
            const ball = document.querySelector('.timeline-ball');
        
            const visionTop = visionEvents.getBoundingClientRect().top;
            const visionHeight = visionEvents.offsetHeight;
        
            const viewportHeight = window.innerHeight;
        
            // How far have we scrolled into .vision-events (0 to 1)
            let progress = Math.min(Math.max((viewportHeight / 2 - visionTop) / visionHeight, 0), 1);
        
            // Move ball along timeline
            const timelineHeight = timeline.offsetHeight;
            ball.style.top = `${progress * timelineHeight}px`;
        });
        
        window.addEventListener('scroll', function() {
            const visionItems = document.querySelectorAll('.vision-item');
            const dates = document.querySelectorAll('.timeline-date');
        
            let closestIndex = 0;
            let closestDistance = Infinity;
            const viewportCenter = window.innerHeight / 2;
        
            visionItems.forEach((item, index) => {
                const itemRect = item.getBoundingClientRect();
                const itemCenter = itemRect.top + itemRect.height / 2;
                const distance = Math.abs(viewportCenter - itemCenter);
        
                if (distance < closestDistance) {
                    closestDistance = distance;
                    closestIndex = index;
                }
            });
        
            dates.forEach((date, index) => {
                if (index === closestIndex) {
                    date.classList.add('active');
                } else {
                    date.classList.remove('active');
                }
            });
        });
        
    }

    // GALLERY PAGE LOGIC
    if (pageClassList.contains('gallery-page')) {
        console.log("Gallery page script running");
        // Add Gallery-specific JS here
        // Enable tap to toggle active class for gallery items
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function(e) {
                // Prevent click bubbling if necessary (optional)
                e.stopPropagation();

                // Close other active items
                document.querySelectorAll('.gallery-item.active').forEach(i => {
                    if (i !== item) i.classList.remove('active');
                });

                // Toggle this one
                item.classList.toggle('active');
            });
        });

        // Optional: tap outside gallery-item to close all
        document.addEventListener('click', function(e) {
            if (!e.target.closest('.gallery-item')) {
                document.querySelectorAll('.gallery-item.active').forEach(i => i.classList.remove('active'));
            }
        });
    }
});
