
      
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioCtx = new AudioContext();
        let soundEnabled = true;

        function playSound(frequency, duration, type = 'sine') {
            if (!soundEnabled) return;
            
            const oscillator = audioCtx.createOscillator();
            const gainNode = audioCtx.createGain();
            
            oscillator.connect(gainNode);
            gainNode.connect(audioCtx.destination);
            
            oscillator.frequency.value = frequency;
            oscillator.type = type;
            
            gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
            gainNode.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + duration);
            
            oscillator.start(audioCtx.currentTime);
            oscillator.stop(audioCtx.currentTime + duration);
        }

        
        const soundToggle = document.getElementById('soundToggle');
        const soundOnIcon = document.getElementById('soundOn');
        const soundOffIcon = document.getElementById('soundOff');

        soundToggle.addEventListener('click', () => {
            soundEnabled = !soundEnabled;
            soundOnIcon.style.display = soundEnabled ? 'block' : 'none';
            soundOffIcon.style.display = soundEnabled ? 'none' : 'block';
            playSound(soundEnabled ? 800 : 400, 0.1);
        });

        
        const cursor = document.querySelector('.cursor');
        const cursorFollower = document.querySelector('.cursor-follower');
        
        let mouseX = 0, mouseY = 0;
        let followerX = 0, followerY = 0;

        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
            cursor.style.transform = `translate(${mouseX - 10}px, ${mouseY - 10}px)`;
            
            
            const homePage = document.querySelector('.home');
            if (homePage && homePage.classList.contains('active') && Math.random() > 0.95) {
                createSparkle(mouseX, mouseY);
            }
        });

        function createSparkle(x, y) {
            const sparkle = document.createElement('div');
            sparkle.className = 'sparkle';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            document.body.appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 2000);
        }

        function animateFollower() {
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;
            requestAnimationFrame(animateFollower);
        }
        animateFollower();

        // Cursor hover effects
        document.querySelectorAll('a, button, .skill-card, .project-card, input, textarea').forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.classList.add('hover');
                playSound(600, 0.05);
            });
            el.addEventListener('mouseleave', () => {
                cursor.classList.remove('hover');
            });
            el.addEventListener('mousedown', () => {
                cursor.classList.add('click');
            });
            el.addEventListener('mouseup', () => {
                cursor.classList.remove('click');
            });
        });

       
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'particle';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 15 + 's';
            particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
            particlesContainer.appendChild(particle);
        }

        
        const codeRainContainer = document.getElementById('codeRain');
        const codeSnippets = [
            'function init() {\n  console.log("Hello");\n}',
            'const data = {\n  name: "user",\n  id: 123\n};',
            'if (x > 0) {\n  return true;\n}',
            'for (let i = 0; i < 10; i++) {\n  console.log(i);\n}',
            'class App {\n  constructor() {\n    this.init();\n  }\n}',
            'const result = arr.map(\n  item => item * 2\n);',
            'async function fetch() {\n  const res = await api();\n  return res;\n}',
            'import React from "react";\nimport { useState } from "react";',
            'export default {\n  name: "config",\n  version: "1.0"\n};'
        ];
        
        function createCodeColumn() {
            const column = document.createElement('div');
            column.className = 'code-column';
            column.style.left = Math.random() * 100 + '%';
            column.style.animationDuration = (Math.random() * 8 + 10) + 's';
            
            const snippet = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];
            column.textContent = snippet;
            
            codeRainContainer.appendChild(column);
            
            setTimeout(() => {
                column.remove();
            }, parseFloat(column.style.animationDuration) * 1000);
        }
        
        
        for (let i = 0; i < 15; i++) {
            setTimeout(createCodeColumn, i * 300);
        }
        
        
        setInterval(createCodeColumn, 1000);

        
        const floatingCodeContainer = document.getElementById('floatingCode');
        const floatingSnippets = [
            '{ success: true }',
            'npm install',
            'git commit -m',
            'const app = () =>',
            'return <div>',
            'async/await',
            'import { }',
            'export default'
        ];

        function createFloatingCode() {
            const code = document.createElement('div');
            code.className = 'floating-code';
            code.style.left = Math.random() * 90 + '%';
            code.style.animationDuration = (Math.random() * 10 + 15) + 's';
            code.textContent = floatingSnippets[Math.floor(Math.random() * floatingSnippets.length)];
            
            floatingCodeContainer.appendChild(code);
            
            setTimeout(() => {
                code.remove();
            }, parseFloat(code.style.animationDuration) * 1000);
        }

        for (let i = 0; i < 8; i++) {
            setTimeout(createFloatingCode, i * 500);
        }

        setInterval(createFloatingCode, 3000);

        
        const themeToggle = document.getElementById('themeToggle');
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');
        const html = document.documentElement;

        const savedTheme = localStorage.getItem('theme') || 'dark';
        if (savedTheme === 'light') {
            html.setAttribute('data-theme', 'light');
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        }

        themeToggle.addEventListener('click', () => {
            const currentTheme = html.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            html.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            
            if (newTheme === 'light') {
                sunIcon.style.display = 'none';
                moonIcon.style.display = 'block';
            } else {
                sunIcon.style.display = 'block';
                moonIcon.style.display = 'none';
            }
            
            playSound(newTheme === 'light' ? 1000 : 600, 0.1);
        });

        // Page Navigation
        const pages = document.querySelectorAll('.page');
        const navLinks = document.querySelectorAll('.nav-link');
        let currentPage = 'home';

        function switchPage(targetPage) {
            if (targetPage === currentPage) return;

            playSound(800, 0.15);

            const currentPageEl = document.querySelector(`.page[data-page="${currentPage}"]`);
            const targetPageEl = document.querySelector(`.page[data-page="${targetPage}"]`);

            currentPageEl.classList.remove('active');
            currentPageEl.classList.add('exit-left');

            setTimeout(() => {
                currentPageEl.classList.remove('exit-left');
                targetPageEl.classList.add('active');
                
                
                if (targetPage === 'skills') {
                    const skillCards = document.querySelectorAll('.skill-card');
                    const skillsGrid = document.querySelector('.skills-grid');
                    
                    
                    skillCards.forEach((card, index) => {
                        card.classList.remove('visible');
                        card.classList.add('gathering');
                    });
                    
                    
                    setTimeout(() => {
                        skillCards.forEach((card, index) => {
                            setTimeout(() => {
                                card.classList.remove('gathering');
                                card.classList.add('visible');
                            }, index * 100);
                        });
                    }, 500);
                }

                // Animate project cards
                if (targetPage === 'projects') {
                    const projectCards = document.querySelectorAll('.project-card');
                    projectCards.forEach((card, index) => {
                        setTimeout(() => {
                            card.classList.add('visible');
                        }, index * 150);
                    });
                }
            }, 300);

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.dataset.page === targetPage) {
                    link.classList.add('active');
                }
            });

            currentPage = targetPage;
        }

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                switchPage(link.dataset.page);
            });
        });

        document.querySelectorAll('.btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const targetPage = btn.dataset.page;
                if (targetPage) {
                    switchPage(targetPage);
                }
            });
        });

       
        const typewriterElement = document.getElementById('typewriter');
        const roles = [
            'Full Stack Developer',
            'AI/ML Engineer',
            'Problem Solver',
            'Creative Technologist',
            'Code Craftsman'
        ];
        let roleIndex = 0;
        let charIndex = 0;
        let isDeleting = false;
        let typeSpeed = 100;

        function typeWriter() {
            const currentRole = roles[roleIndex];
            
            if (isDeleting) {
                typewriterElement.textContent = currentRole.substring(0, charIndex - 1);
                charIndex--;
                typeSpeed = 50;
            } else {
                typewriterElement.textContent = currentRole.substring(0, charIndex + 1);
                charIndex++;
                typeSpeed = 100;
            }

            if (!isDeleting && charIndex === currentRole.length) {
                typeSpeed = 2000; // Pause at end
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                typeSpeed = 500; // Pause before typing new role
            }

            setTimeout(typeWriter, typeSpeed);
        }

        // Loading Screen
        const loadingScreen = document.getElementById('loadingScreen');
        setTimeout(() => {
            loadingScreen.classList.add('hidden');
            setTimeout(() => {
                loadingScreen.style.display = 'none';
                typeWriter(); // Start typewriter animation
                
                // Animate initial skill cards
                const skillCards = document.querySelectorAll('.skill-card');
                skillCards.forEach((card, index) => {
                    setTimeout(() => {
                        card.classList.add('visible');
                    }, index * 100);
                });
            }, 800);
        }, 2500);

        // Contact Form
        const contactForm = document.getElementById('contactForm');
        const formMessage = document.getElementById('formMessage');

        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const submitBtn = contactForm.querySelector('.submit-btn');
            submitBtn.classList.add('loading');
            submitBtn.textContent = 'Sending...';
            
            playSound(700, 0.1);

            setTimeout(() => {
                submitBtn.classList.remove('loading');
                submitBtn.textContent = 'Send Message';
                
                formMessage.textContent = 'Message sent successfully! I\'ll get back to you soon.';
                formMessage.className = 'form-message success show';
                
                playSound(1200, 0.2);
                
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.classList.remove('show');
                }, 5000);
            }, 2000);
        });

      
        document.addEventListener('keydown', (e) => {
            const pageOrder = ['home', 'about', 'skills', 'projects', 'contact'];
            const currentIndex = pageOrder.indexOf(currentPage);
            
            if (e.key === 'ArrowRight' && currentIndex < pageOrder.length - 1) {
                switchPage(pageOrder[currentIndex + 1]);
            } else if (e.key === 'ArrowLeft' && currentIndex > 0) {
                switchPage(pageOrder[currentIndex - 1]);
            }
        });

        
        let touchStartX = 0;
        let touchEndX = 0;

        document.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        });

        document.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        });

        function handleSwipe() {
            const pageOrder = ['home', 'about', 'skills', 'projects', 'contact'];
            const currentIndex = pageOrder.indexOf(currentPage);
            
            if (touchEndX < touchStartX - 50 && currentIndex < pageOrder.length - 1) {
                switchPage(pageOrder[currentIndex + 1]);
            }
            
            if (touchEndX > touchStartX + 50 && currentIndex > 0) {
                switchPage(pageOrder[currentIndex - 1]);
            }
        }

       
        const profileImage = document.getElementById('profileImage');
        const profilePlaceholder = document.getElementById('profilePlaceholder');
        
        profileImage.addEventListener('error', () => {
            profileImage.style.display = 'none';
            profilePlaceholder.style.display = 'flex';
        });
    