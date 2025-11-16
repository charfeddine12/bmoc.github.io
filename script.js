// =====================================================
// JAVASCRIPT FOR PORTFOLIO WEBSITE WITH MICROSERVICES BACKGROUND
// =====================================================

document.addEventListener('DOMContentLoaded', function() {
    
    // =====================================================
    // MICROSERVICES ANIMATED BACKGROUND
    // =====================================================
    
    const archContainer = document.getElementById('archContainer');
    const connectionsSvg = document.getElementById('connectionsSvg');
    const sparksContainer = document.getElementById('sparksContainer');
    
    // Architecture nodes configuration
    const nodes = [
        { id: 'api-gateway', label: 'API Gateway', x: 15, y: 15 },
        { id: 'auth-service', label: 'Auth Service', x: 45, y: 10 },
        { id: 'user-service', label: 'User Service', x: 75, y: 15 },
        { id: 'billing-service', label: 'Billing Service', x: 20, y: 45 },
        { id: 'notification', label: 'Notification', x: 50, y: 50 },
        { id: 'kafka', label: 'Kafka', x: 80, y: 45 },
        { id: 'postgres', label: 'PostgreSQL', x: 25, y: 75 },
        { id: 'mongodb', label: 'MongoDB', x: 55, y: 80 },
        { id: 'redis', label: 'Redis Cache', x: 85, y: 75 }
    ];
    
    // Connections between nodes
    const connections = [
        ['api-gateway', 'auth-service'],
        ['api-gateway', 'user-service'],
        ['api-gateway', 'billing-service'],
        ['auth-service', 'user-service'],
        ['user-service', 'kafka'],
        ['billing-service', 'kafka'],
        ['notification', 'kafka'],
        ['user-service', 'postgres'],
        ['billing-service', 'mongodb'],
        ['auth-service', 'redis']
    ];
    
    // Create nodes
    if (archContainer) {
        nodes.forEach(node => {
            const nodeEl = document.createElement('div');
            nodeEl.className = 'arch-node';
            nodeEl.id = node.id;
            nodeEl.textContent = node.label;
            nodeEl.style.left = node.x + '%';
            nodeEl.style.top = node.y + '%';
            nodeEl.style.animationDelay = Math.random() * 2 + 's';
            archContainer.appendChild(nodeEl);
        });
    }
    
    // Create connections
    if (connectionsSvg && archContainer) {
        function updateConnections() {
            connectionsSvg.innerHTML = '<defs><filter id="glow"><feGaussianBlur stdDeviation="3" result="coloredBlur"/><feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge></filter></defs>';
            
            connections.forEach(([from, to]) => {
                const fromEl = document.getElementById(from);
                const toEl = document.getElementById(to);
                
                if (fromEl && toEl) {
                    const fromRect = fromEl.getBoundingClientRect();
                    const toRect = toEl.getBoundingClientRect();
                    const svgRect = connectionsSvg.getBoundingClientRect();
                    
                    const x1 = fromRect.left + fromRect.width / 2 - svgRect.left;
                    const y1 = fromRect.top + fromRect.height / 2 - svgRect.top;
                    const x2 = toRect.left + toRect.width / 2 - svgRect.left;
                    const y2 = toRect.top + toRect.height / 2 - svgRect.top;
                    
                    const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
                    line.setAttribute('x1', x1);
                    line.setAttribute('y1', y1);
                    line.setAttribute('x2', x2);
                    line.setAttribute('y2', y2);
                    line.setAttribute('class', 'connection-line');
                    connectionsSvg.appendChild(line);
                }
            });
        }
        
        updateConnections();
        window.addEventListener('resize', updateConnections);
        setInterval(updateConnections, 100);
    }
    
    // Create sparks
    if (sparksContainer) {
        for (let i = 0; i < 50; i++) {
            const spark = document.createElement('div');
            spark.className = 'spark';
            spark.style.left = Math.random() * 100 + '%';
            spark.style.top = Math.random() * 100 + '%';
            spark.style.setProperty('--tx', (Math.random() - 0.5) * 200 + 'px');
            spark.style.setProperty('--ty', (Math.random() - 0.5) * 200 + 'px');
            spark.style.animationDelay = Math.random() * 15 + 's';
            sparksContainer.appendChild(spark);
        }
    }
    
    // =====================================================
    // LANGUAGE SWITCHER - FIXED
    // =====================================================
    
    const langButtons = document.querySelectorAll('.lang-btn');
    let currentLang = localStorage.getItem('preferredLanguage') || 'fr';
    
    // Language translations for typed text
    const translations = {
        fr: [
            'Ingénieur Full-Stack',
            'Expert Java',
            'Architecte Microservices',
            'Développeur Spring Boot',
            'Spécialiste Kafka'
        ],
        en: [
            'Full-Stack Engineer',
            'Java Expert',
            'Microservices Architect',
            'Spring Boot Developer',
            'Kafka Specialist'
        ]
    };
    
    // Declare typed text variables early
    const typedTextSpan = document.querySelector('.typed-text');
    let textArray = translations[currentLang];
    const typingDelay = 100;
    const erasingDelay = 50;
    const newTextDelay = 2000;
    let textArrayIndex = 0;
    let charIndex = 0;
    let typeTimer;
    let eraseTimer;
    
    // Function to switch language
    function switchLanguage(lang) {
        currentLang = lang;
        
        // Update active button
        langButtons.forEach(btn => {
            if (btn.dataset.lang === lang) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        // Update all elements with language attributes
        document.querySelectorAll('[data-fr][data-en]').forEach(element => {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = element.dataset[lang];
            } else {
                const newText = element.dataset[lang];
                if (newText) {
                    element.textContent = newText;
                }
            }
        });
        
        // Restart typing animation with new language
        if (typedTextSpan) {
            textArray = translations[lang];
            typedTextSpan.textContent = '';
            textArrayIndex = 0;
            charIndex = 0;
            if (typeTimer) clearTimeout(typeTimer);
            if (eraseTimer) clearTimeout(eraseTimer);
            setTimeout(type, 500);
        }
        
        // Save language preference
        localStorage.setItem('preferredLanguage', lang);
    }
    
    // Add click event to language buttons
    langButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            switchLanguage(btn.dataset.lang);
        });
    });
    
    // Apply saved language on load
    switchLanguage(currentLang);
    
    // =====================================================
    // NAVIGATION FUNCTIONALITY
    // =====================================================
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            
            // Animate hamburger
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(45deg) translateY(8px)' 
                : 'none';
            spans[1].style.opacity = navMenu.classList.contains('active') 
                ? '0' 
                : '1';
            spans[2].style.transform = navMenu.classList.contains('active') 
                ? 'rotate(-45deg) translateY(-8px)' 
                : 'none';
        });
    }
    
    // Close mobile menu when link is clicked
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });
    
    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // =====================================================
    // SMOOTH SCROLLING FOR NAVIGATION LINKS
    // =====================================================
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // =====================================================
    // TYPED TEXT EFFECT - FIXED
    // =====================================================
    
    function type() {
        if (charIndex < textArray[textArrayIndex].length) {
            if (!typedTextSpan.classList.contains('typing')) {
                typedTextSpan.classList.add('typing');
            }
            typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
            charIndex++;
            typeTimer = setTimeout(type, typingDelay);
        } else {
            typedTextSpan.classList.remove('typing');
            eraseTimer = setTimeout(erase, newTextDelay);
        }
    }
    
    function erase() {
        if (charIndex > 0) {
            if (!typedTextSpan.classList.contains('typing')) {
                typedTextSpan.classList.add('typing');
            }
            typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
            charIndex--;
            eraseTimer = setTimeout(erase, erasingDelay);
        } else {
            typedTextSpan.classList.remove('typing');
            textArrayIndex++;
            if (textArrayIndex >= textArray.length) textArrayIndex = 0;
            typeTimer = setTimeout(type, typingDelay + 1100);
        }
    }
    
    // Start typing effect
    if (typedTextSpan) {
        textArray = translations[currentLang];
        setTimeout(type, 1000);
    }
    
    // =====================================================
    // TECH ITEM HOVER PROGRESS BARS
    // =====================================================
    
    const techItems = document.querySelectorAll('.tech-item');
    
    techItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const progressBar = this.querySelector('.skill-progress-fill');
            const level = this.dataset.level || 80;
            
            if (progressBar) {
                progressBar.style.width = level + '%';
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const progressBar = this.querySelector('.skill-progress-fill');
            
            if (progressBar) {
                progressBar.style.width = '0%';
            }
        });
    });
    
    // =====================================================
    // EXPERIENCE MODAL FUNCTIONALITY
    // =====================================================
    
    const modal = document.getElementById('experienceModal');
    const modalClose = document.querySelector('.modal-close');
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    // Experience data with detailed information
    const experienceData = {
        mgen: {
            logo: 'mgen-logo.png',
            company: 'MGEN',
            position: {
                fr: 'Ingénieur Développement Java - Kafka - Apache Camel',
                en: 'Java Development Engineer - Kafka - Apache Camel'
            },
            duration: {
                fr: 'Janvier 2025 - Présent',
                en: 'January 2025 - Present'
            },
            missions: {
                fr: [
                    'Développement de microservices REST avec Spring Boot pour la gestion des données de santé',
                    'Implémentation de pipelines Kafka pour le streaming de données en temps réel',
                    'Conception et développement de traitements batch avec Apache Camel',
                    'Migration et optimisation de bases de données Couchbase et PostgreSQL',
                    'Mise en place de tests unitaires et d\'intégration avec JUnit et Mockito'
                ],
                en: [
                    'Development of REST microservices with Spring Boot for health data management',
                    'Implementation of Kafka pipelines for real-time data streaming',
                    'Design and development of batch processing with Apache Camel',
                    'Migration and optimization of Couchbase and PostgreSQL databases',
                    'Implementation of unit and integration tests with JUnit and Mockito'
                ]
            },
            achievements: {
                fr: [
                    'Amélioration des performances de 40% sur les traitements batch',
                    'Réduction de 60% du temps de traitement des messages Kafka',
                    'Automatisation complète du déploiement CI/CD avec GitLab et CloudBees',
                    'Mise en place d\'une architecture hexagonale pour la maintenabilité',
                    'Optimisation des requêtes N1QL réduisant le temps de réponse de 50%'
                ],
                en: [
                    '40% performance improvement on batch processing',
                    '60% reduction in Kafka message processing time',
                    'Full automation of CI/CD deployment with GitLab and CloudBees',
                    'Implementation of hexagonal architecture for maintainability',
                    'N1QL query optimization reducing response time by 50%'
                ]
            },
            technologies: ['Java 21', 'Spring Boot', 'Apache Kafka', 'Apache Camel', 'Couchbase', 'PostgreSQL', 'Kubernetes', 'GCP', 'GitLab CI', 'CloudBees'],
            context: {
                fr: 'Environnement Agile (Scrum) au sein de l\'équipe Data, travaillant sur des systèmes critiques de gestion des adhérents et remboursements de la mutuelle MGEN. Architecture cloud-native sur GCP avec déploiement Kubernetes.',
                en: 'Agile environment (Scrum) within the Data team, working on critical systems for member management and reimbursements at MGEN mutual insurance. Cloud-native architecture on GCP with Kubernetes deployment.'
            }
        },
        bnp: {
            logo: 'bnp-logo.png',
            company: 'BNP Paribas Cardif',
            position: {
                fr: 'Ingénieur Développement Full Stack',
                en: 'Full Stack Development Engineer'
            },
            duration: {
                fr: 'Octobre 2021 - Décembre 2024',
                en: 'October 2021 - December 2024'
            },
            missions: {
                fr: [
                    'Développement d\'applications en marque blanche pour assurances prévoyance',
                    'Architecture microservices avec Spring Cloud Config et Eureka',
                    'Développement front-end Angular 14 avec GraphQL pour les requêtes',
                    'Implémentation de la communication asynchrone via Apache Kafka',
                    'Création d\'algorithmes Python pour la collecte et analyse de données'
                ],
                en: [
                    'Development of white-label applications for insurance',
                    'Microservices architecture with Spring Cloud Config and Eureka',
                    'Front-end development with Angular 14 and GraphQL queries',
                    'Implementation of asynchronous communication via Apache Kafka',
                    'Creation of Python algorithms for data collection and analysis'
                ]
            },
            achievements: {
                fr: [
                    'Livraison de 15+ applications en marque blanche pour différents partenaires',
                    'Mise en place d\'un tableau de bord de monitoring en temps réel',
                    'Développement d\'un comparateur de versions automatisé',
                    'Réduction de 70% du temps de déploiement grâce à Docker',
                    'Intégration continue avec Jenkins et déploiement sur IBM Cloud'
                ],
                en: [
                    'Delivery of 15+ white-label applications for different partners',
                    'Implementation of real-time monitoring dashboard',
                    'Development of automated version comparator',
                    '70% reduction in deployment time using Docker',
                    'Continuous integration with Jenkins and deployment on IBM Cloud'
                ]
            },
            technologies: ['Java 17', 'Spring Cloud', 'Angular 14', 'Kafka', 'GraphQL', 'Python', 'Docker', 'IBM Cloud', 'Jenkins', 'PostgreSQL'],
            context: {
                fr: 'Projet stratégique de digitalisation des contrats d\'assurance prévoyance. Équipe de 12 développeurs en méthodologie Agile SAFe. Infrastructure containerisée sur IBM Cloud avec orchestration Docker.',
                en: 'Strategic project for digitalization of insurance contracts. Team of 12 developers using Agile SAFe methodology. Containerized infrastructure on IBM Cloud with Docker orchestration.'
            }
        },
        tessi: {
            logo: 'tessi-logo.png',
            company: 'Tessi',
            position: {
                fr: 'Ingénieur Développement Full Stack',
                en: 'Full Stack Development Engineer'
            },
            duration: {
                fr: 'Février 2017 - Août 2021',
                en: 'February 2017 - August 2021'
            },
            missions: {
                fr: [
                    'Migration complète de Liferay 6.3 vers 7.3 pour applications d\'assurance',
                    'Développement de portails multi-accès (Assuré/Entreprise/Agent)',
                    'Intégration SSO via JWT et OAuth2 pour l\'authentification',
                    'Création de batch jobs Spring Batch pour synchronisation de données',
                    'Intégration avec systèmes de paiement et signature électronique'
                ],
                en: [
                    'Complete migration from Liferay 6.3 to 7.3 for insurance applications',
                    'Development of multi-access portals (Insured/Company/Agent)',
                    'SSO integration via JWT and OAuth2 for authentication',
                    'Creation of Spring Batch jobs for data synchronization',
                    'Integration with payment and electronic signature systems'
                ]
            },
            achievements: {
                fr: [
                    'Migration réussie de 20+ applications Liferay sans interruption de service',
                    'Développement de 8 applications marque blanche pour mutuelles',
                    'Mise en place d\'une architecture REST/SOAP pour les intégrations',
                    'Réduction de 80% des temps de chargement après optimisation',
                    'Formation de 10+ développeurs sur Liferay DXP 7.3'
                ],
                en: [
                    'Successful migration of 20+ Liferay applications without service interruption',
                    'Development of 8 white-label applications for mutual insurance',
                    'Implementation of REST/SOAP architecture for integrations',
                    '80% reduction in loading times after optimization',
                    'Training of 10+ developers on Liferay DXP 7.3'
                ]
            },
            technologies: ['Java 8', 'Liferay DXP', 'Angular 8', 'Spring Batch', 'MongoDB', 'OAuth2', 'SOAP/REST', 'MySQL', 'Jenkins'],
            context: {
                fr: 'Équipe de développement dédiée aux solutions d\'assurance et mutuelles. Méthodologie Scrum avec sprints de 2 semaines. Environnement multi-clients nécessitant une forte capacité d\'adaptation.',
                en: 'Development team dedicated to insurance and mutual solutions. Scrum methodology with 2-week sprints. Multi-client environment requiring strong adaptability.'
            }
        }
    };
    
    // Open modal with company details
    timelineItems.forEach(item => {
        const moreBtn = item.querySelector('.btn-more-info');
        if (moreBtn) {
            moreBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                const companyKey = item.dataset.company;
                const data = experienceData[companyKey];
                
                if (data) {
                    // Set modal content
                    document.getElementById('modalCompanyLogo').src = data.logo;
                    document.getElementById('modalCompanyName').textContent = data.company;
                    document.getElementById('modalPosition').textContent = data.position[currentLang];
                    document.getElementById('modalDuration').textContent = data.duration[currentLang];
                    
                    // Set missions
                    const missionsList = document.getElementById('modalMissions');
                    missionsList.innerHTML = '';
                    data.missions[currentLang].forEach(mission => {
                        const li = document.createElement('li');
                        li.textContent = mission;
                        missionsList.appendChild(li);
                    });
                    
                    // Set achievements
                    const achievementsList = document.getElementById('modalAchievements');
                    achievementsList.innerHTML = '';
                    data.achievements[currentLang].forEach(achievement => {
                        const li = document.createElement('li');
                        li.textContent = achievement;
                        achievementsList.appendChild(li);
                    });
                    
                    // Set technologies
                    const techContainer = document.getElementById('modalTechnologies');
                    techContainer.innerHTML = '';
                    data.technologies.forEach(tech => {
                        const span = document.createElement('span');
                        span.className = 'tag';
                        span.textContent = tech;
                        techContainer.appendChild(span);
                    });
                    
                    // Set context
                    document.getElementById('modalContext').textContent = data.context[currentLang];
                    
                    // Show modal
                    modal.style.display = 'flex';
                    setTimeout(() => modal.classList.add('show'), 10);
                }
            });
        }
    });
    
    // Close modal
    if (modalClose) {
        modalClose.addEventListener('click', () => {
            if (modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        });
    }
    
    if (modal) {
        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('show');
                setTimeout(() => modal.style.display = 'none', 300);
            }
        });
    }
    
    // =====================================================
    // INTERSECTION OBSERVER FOR ANIMATIONS
    // =====================================================
    
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // Animate progress bars when they come into view
                if (entry.target.classList.contains('progress-item')) {
                    const progressFill = entry.target.querySelector('.progress-fill');
                    const targetWidth = progressFill.style.width;
                    progressFill.style.width = '0';
                    setTimeout(() => {
                        progressFill.style.width = targetWidth;
                    }, 100);
                }
                
                // Animate timeline items
                if (entry.target.classList.contains('timeline-item')) {
                    entry.target.classList.add('animate-in');
                }
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements
    document.querySelectorAll('.info-card, .skill-category, .timeline-item, .cert-card, .progress-item').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'all 0.6s ease-out';
        observer.observe(el);
    });
    
    // =====================================================
    // BACK TO TOP BUTTON
    // =====================================================
    
    const backToTopButton = document.getElementById('backToTop');
    
    if (backToTopButton) {
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopButton.classList.add('show');
            } else {
                backToTopButton.classList.remove('show');
            }
        });
        
        backToTopButton.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // =====================================================
    // ACTIVE SECTION HIGHLIGHTING
    // =====================================================
    
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
    
    // =====================================================
    // LOADING ANIMATION
    // =====================================================
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    
});

// =====================================================
// CONSOLE EASTER EGG
// =====================================================

console.log('%c👋 Bonjour! Bienvenue sur mon portfolio!', 'font-size: 24px; font-weight: bold; color: #2563eb;');
console.log('%c🚀 Développé avec passion par Charfeddine BENMOHAMED', 'font-size: 14px; color: #10b981;');
console.log('%c📧 Contact: charfeddinebenmohamed24@gmail.com', 'font-size: 12px; color: #94a3b8;');