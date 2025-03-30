// JavaScript para animações e interatividade
document.addEventListener('DOMContentLoaded', function() {
    // Animação dos cards de recursos, se existirem na página
    const featureCards = document.querySelectorAll('.feature-card');
    
    if (featureCards.length > 0) {
        featureCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                card.style.transition = 'opacity 0.5s, transform 0.5s';
            }, index * 200);
        });
    }
    
    // Verificando se estamos na página inicial, onde existem estes botões
    const primaryBtn = document.querySelector('.btn-primary');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    if (primaryBtn) {
        primaryBtn.addEventListener('click', function() {
            alert('Bem-vindo ao FinWise! Estamos preparando sua jornada para a educação financeira.');
        });
    }
    
    if (secondaryBtn) {
        secondaryBtn.addEventListener('click', function() {
            // Scroll suave para a seção de recursos
            const featuresSection = document.querySelector('.features');
            if (featuresSection) {
                featuresSection.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    }
    
    // Dark Mode Toggle - isso deve funcionar em todas as páginas
    const darkModeToggle = document.getElementById('darkModeToggle');
    const htmlElement = document.documentElement;
    
    if (darkModeToggle) {
        // Verificar preferência salva no localStorage
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            htmlElement.setAttribute('data-theme', savedTheme);
        }
        
        // Verificar preferência do sistema
        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        if (!savedTheme && prefersDarkScheme.matches) {
            htmlElement.setAttribute('data-theme', 'dark');
        }
        
        // Função para alternar o tema
        function toggleTheme() {
            const currentTheme = htmlElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            
            htmlElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        }
        
        // Adicionar evento de clique ao botão
        darkModeToggle.addEventListener('click', toggleTheme);
    }
    
    // Adicionando animações para a página Sobre, se estiver nela
    const featureItems = document.querySelectorAll('.feature-item');
    if (featureItems.length > 0) {
        featureItems.forEach((item, index) => {
            setTimeout(() => {
                item.style.opacity = '0';
                item.style.transform = 'translateY(20px)';
                item.style.transition = 'opacity 0.5s, transform 0.5s';
                
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }
    
    const differentialCards = document.querySelectorAll('.differential-card');
    if (differentialCards.length > 0) {
        differentialCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                card.style.transition = 'opacity 0.5s, transform 0.5s';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            }, index * 150);
        });
    }
    
    // Animação de digitação para o subtítulo
    const typingElement = document.querySelector('.typing-subtitle');
    if (typingElement) {
        const fullText = "Aprenda, organize e alcance a liberdade financeira com estratégias práticas e ferramentas intuitivas";
        let speed = 70; // Velocidade da digitação
        let pauseDuration = 2000; // Tempo de pausa entre ciclos
        let deleteSpeed = 30; // Velocidade para apagar o texto
        
        let i = 0;
        let isDeleting = false;
        let isWaiting = false;
        
        function typeWriter() {
            if (isWaiting) {
                isWaiting = false;
                isDeleting = true;
                setTimeout(typeWriter, pauseDuration);
                return;
            }
            
            if (!isDeleting) {
                // Digitando
                if (i < fullText.length) {
                    typingElement.textContent += fullText.charAt(i);
                    i++;
                    setTimeout(typeWriter, speed);
                } else {
                    // Terminou de digitar
                    isWaiting = true;
                    setTimeout(typeWriter, pauseDuration);
                }
            } else {
                // Apagando
                if (typingElement.textContent.length > 0) {
                    typingElement.textContent = typingElement.textContent.slice(0, -1);
                    setTimeout(typeWriter, deleteSpeed);
                } else {
                    // Terminou de apagar
                    isDeleting = false;
                    i = 0;
                    setTimeout(typeWriter, 500); // Pausa antes de começar a digitar novamente
                }
            }
        }
        
        // Iniciar animação de digitação
        setTimeout(typeWriter, 1000); // Pequeno atraso antes de começar
    }
});

// Atualiza o ano no rodapé
document.addEventListener('DOMContentLoaded', function() {
    const currentYearElement = document.getElementById('current-year');
    if (currentYearElement) {
        const currentYear = new Date().getFullYear();
        currentYearElement.textContent = currentYear;
    }
});