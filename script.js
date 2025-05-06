// JavaScript para animações e interatividade
document.addEventListener('DOMContentLoaded', function() {
    // ========== ANIMAÇÃO DE DIGITAÇÃO ==========
    function setupTypingAnimation() {
        const element = document.querySelector('.typing-subtitle');
        if (!element) return;

        const texts = [
            "Pequenas Mudanças, Grandes Conquistas!",
            "Controle Financeiro Simplificado", 
            "Liberdade Financeira em Suas Mãos"
        ];
        let currentTextIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        const pauseBetweenTexts = 2000;

        function type() {
            const currentText = texts[currentTextIndex];
            
            if (isDeleting) {
                element.textContent = currentText.substring(0, charIndex - 1);
                charIndex--;
                typingSpeed = 50;
            } else {
                element.textContent = currentText.substring(0, charIndex + 1);
                charIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && charIndex === currentText.length) {
                typingSpeed = pauseBetweenTexts;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                currentTextIndex = (currentTextIndex + 1) % texts.length;
                typingSpeed = 500;
            }

            setTimeout(type, typingSpeed);
        }

        setTimeout(type, 1000);
    }

    // ========== DARK MODE TOGGLE ==========
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;

    function toggleTheme() {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Atualiza ícones
        document.querySelector('.dark-mode-icon').style.display = newTheme === 'light' ? 'inline' : 'none';
        document.querySelector('.light-mode-icon').style.display = newTheme === 'dark' ? 'inline' : 'none';
    }

    if (darkModeToggle) {
        // Verificar preferência salva ou do sistema
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme);
        } else if (systemPrefersDark) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
        
        // Configurar ícones iniciais
        document.querySelector('.dark-mode-icon').style.display = 
            htmlElement.getAttribute('data-theme') === 'light' ? 'inline' : 'none';
        document.querySelector('.light-mode-icon').style.display = 
            htmlElement.getAttribute('data-theme') === 'dark' ? 'inline' : 'none';
        
        darkModeToggle.addEventListener('click', toggleTheme);
    }

    // ========== MENU HAMBURGUER ==========
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('navLinks');

    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });
    }

    // ========== NAVBAR FIXA COM SCROLL ==========
    let lastScrollTop = 0;
    const header = document.querySelector('header');
    
    if (header) {
        const headerHeight = header.offsetHeight;
        
        window.addEventListener('scroll', function() {
            let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
                header.style.top = `-${headerHeight}px`;
            } else {
                header.style.top = '0';
            }
            
            lastScrollTop = scrollTop;
        });
    }

    // ========== CONTADOR DE ESTATÍSTICAS ==========
    const statCounts = document.querySelectorAll('.stat-count');
    
    if (statCounts.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const target = entry.target;
                    const targetNumber = parseInt(target.getAttribute('data-count'));
                    let count = 0;
                    const duration = 2000;
                    const interval = Math.floor(duration / targetNumber);
                    
                    const counter = setInterval(() => {
                        count++;
                        target.textContent = count;
                        
                        if (count >= targetNumber) {
                            clearInterval(counter);
                        }
                    }, interval);
                    
                    observer.unobserve(target);
                }
            });
        }, { threshold: 0.5 });
        
        statCounts.forEach(counter => {
            observer.observe(counter);
        });
    }

    // ========== SLIDER DE DEPOIMENTOS ==========
    const testimonialDots = document.querySelectorAll('.testimonial-dots .dot');
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    const prevBtn = document.querySelector('.testimonial-btn.prev');
    const nextBtn = document.querySelector('.testimonial-btn.next');
    
    if (testimonialDots.length > 0 && testimonialCards.length > 0) {
        let currentIndex = 0;
        
        function showTestimonial(index) {
            testimonialDots.forEach(dot => dot.classList.remove('active'));
            testimonialCards.forEach(card => card.classList.remove('active'));
            
            testimonialDots[index].classList.add('active');
            testimonialCards[index].classList.add('active');
            currentIndex = index;
        }
        
        testimonialDots.forEach((dot, index) => {
            dot.addEventListener('click', () => showTestimonial(index));
        });
        
        if (prevBtn && nextBtn) {
            prevBtn.addEventListener('click', () => {
                let newIndex = currentIndex - 1;
                if (newIndex < 0) newIndex = testimonialCards.length - 1;
                showTestimonial(newIndex);
            });
            
            nextBtn.addEventListener('click', () => {
                let newIndex = currentIndex + 1;
                if (newIndex >= testimonialCards.length) newIndex = 0;
                showTestimonial(newIndex);
            });
        }
        
        // Rotação automática
        setInterval(() => {
            let newIndex = currentIndex + 1;
            if (newIndex >= testimonialCards.length) newIndex = 0;
            showTestimonial(newIndex);
        }, 5000);
    }

    // ========== FORMULÁRIO NEWSLETTER ==========
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            
            if (!emailInput.value) {
                showMessage('Por favor, insira um e-mail válido.', 'error');
                return;
            }
            
            // Simulação de sucesso
            showMessage('Inscrição realizada com sucesso!', 'success');
            emailInput.value = '';
        });
    }

    // ========== REDIRECIONAMENTO DE BOTÕES ==========
    document.querySelectorAll('.btn-primary').forEach(btn => {
        btn.addEventListener('click', function() {
            if (this.textContent.includes('Começar') || this.textContent.includes('Criar')) {
                window.location.href = 'login.html';
            }
        });
    });

    document.querySelectorAll('.btn-secondary').forEach(btn => {
        btn.addEventListener('click', function() {
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ========== FUNÇÃO PARA MENSAGENS ==========
    function showMessage(message, type) {
        const existingMessage = document.querySelector('.message-alert');
        if (existingMessage) existingMessage.remove();
        
        const messageElement = document.createElement('div');
        messageElement.className = `message-alert ${type}`;
        messageElement.textContent = message;
        document.body.appendChild(messageElement);
        
        setTimeout(() => {
            messageElement.classList.add('hide');
            setTimeout(() => messageElement.remove(), 300);
        }, 3000);
    }

    // ========== INICIALIZAÇÃO ==========
    setupTypingAnimation();
    
    // Inicializa AOS (Animate On Scroll)
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true
        });
    }

    // Atualiza o ano no rodapé
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }
});