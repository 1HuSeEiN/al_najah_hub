// ==========================================
// Al-Najah Platform (Tech & Academic Solutions)
// Modern Interactive Engine
// ==========================================

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('preloader-hidden');
            }, 600);
        });
        // Fallback safety timeout
        setTimeout(() => {
            preloader.classList.add('preloader-hidden');
        }, 1800);
    }

    // --- 2. Dynamic Typewriter Effect with Multi-text Switcher ---
    const typewriterElement = document.getElementById('typewriter-text');
    if (typewriterElement) {
        const textArrayJson = typewriterElement.getAttribute('data-texts');
        let texts = [
            "حلول برمجية وتطوير مواقع احترافية",
            "سورس كود كامل قابل للتحميل المباشر",
            "بحوث وتقارير جامعية معتمدة ورصينة",
            "الطلب والاستفسار متاح عبر الانستقرام"
        ];
        if (textArrayJson) {
            try { texts = JSON.parse(textArrayJson); } catch (e) {}
        }

        let textIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        const typingSpeed = 70;
        const deletingSpeed = 40;
        const delayBetweenTexts = 2200;

        function handleTypewriter() {
            // Get correct language array if available
            const lang = document.documentElement.lang || 'ar';
            const attrName = lang === 'en' ? 'data-texts-en' : 'data-texts-ar';
            const langTextsAttr = typewriterElement.getAttribute(attrName) || typewriterElement.getAttribute('data-texts');
            
            let currentLangTexts = texts;
            if (langTextsAttr) {
                try { currentLangTexts = JSON.parse(langTextsAttr); } catch (e) {}
            }
            
            // Ensure index is within bounds if arrays have different lengths
            textIndex = textIndex % currentLangTexts.length;
            const currentText = currentLangTexts[textIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
            } else {
                typewriterElement.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
            }

            if (!isDeleting && charIndex === currentText.length) {
                isDeleting = true;
                setTimeout(handleTypewriter, delayBetweenTexts);
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                textIndex = (textIndex + 1) % currentLangTexts.length;
                setTimeout(handleTypewriter, 300);
            } else {
                setTimeout(handleTypewriter, isDeleting ? deletingSpeed : typingSpeed);
            }
        }
        setTimeout(handleTypewriter, 400);
    }

    // --- 3. Scroll Reveal Animations ---
    const revealElements = document.querySelectorAll('.reveal');
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));

    // --- 4. Pricing Tabs Switcher (REMOVED) ---

    // --- 5. Mobile Navigation Toggle ---
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });

        // Close on link click
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            });
        });

        // Close when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileBtn.contains(e.target) && !navLinks.contains(e.target)) {
                navLinks.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                if (icon) icon.className = 'fas fa-bars';
            }
        });
    }

    // --- 6. Smooth Scroll for Anchor Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || targetId === '') return;
            const targetElem = document.querySelector(targetId);
            if (targetElem) {
                e.preventDefault();
                targetElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // --- 7. Dynamic Year in Footer ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

    // --- 8. Scroll to Top Button ---
    const scrollBtn = document.getElementById('scrollToTop');
    if (scrollBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });

        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
    // --- 10. Language Toggle ---
    const langBtn = document.getElementById('lang-toggle');
    if (langBtn) {
        let currentLang = 'ar';
        langBtn.addEventListener('click', () => {
            currentLang = currentLang === 'ar' ? 'en' : 'ar';
            langBtn.textContent = currentLang === 'ar' ? 'EN' : 'AR';
            document.documentElement.lang = currentLang;
            document.documentElement.dir = currentLang === 'ar' ? 'rtl' : 'ltr';

            // Find all elements with data-lang-* attributes
            document.querySelectorAll('[data-lang-ar]').forEach(el => {
                let targetText = currentLang === 'ar' ? el.getAttribute('data-lang-ar') : el.getAttribute('data-lang-en');
                
                // If it already contains HTML in the attribute, just use it directly
                if (targetText.includes('<i ') || targetText.includes('<span ')) {
                    el.innerHTML = targetText;
                } else {
                    // Extract existing icons to preserve them
                    const icons = [];
                    el.childNodes.forEach(node => {
                        if (node.nodeType === 1 && node.tagName.toLowerCase() === 'i') {
                            icons.push(node.outerHTML);
                        }
                    });
                    
                    if (icons.length > 0) {
                        el.innerHTML = icons.join(' ') + ' ' + targetText;
                    } else {
                        el.innerHTML = targetText;
                    }
                }
            });
            
            // Adjust typeface for English if needed
            if (currentLang === 'en') {
                document.body.style.fontFamily = "'Fira Code', 'Cairo', sans-serif";
            } else {
                document.body.style.fontFamily = "'Cairo', sans-serif";
            }
        });
    }
});

// --- 9. FAQ Toggle Function (Accessible Globally) ---
function toggleFaq(element) {
    const answer = element.querySelector('.faq-answer');
    const icon = element.querySelector('.toggle-icon');
    const isOpen = answer.classList.contains('open');

    // Close all answers
    document.querySelectorAll('.faq-answer').forEach(el => el.classList.remove('open'));
    document.querySelectorAll('.toggle-icon').forEach(el => {
        el.className = 'fas fa-plus toggle-icon';
        el.style.transform = 'rotate(0deg)';
    });

    // Toggle clicked
    if (!isOpen) {
        answer.classList.add('open');
        if (icon) {
            icon.className = 'fas fa-minus toggle-icon';
            icon.style.transform = 'rotate(180deg)';
        }
    }
}
