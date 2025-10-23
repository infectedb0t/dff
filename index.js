document.addEventListener('DOMContentLoaded', () => {
    const splash = document.getElementById('splash');
    const mainContent = document.getElementById('main-content');
    const botsContent = document.getElementById('bots-content');
    const mainTitle = document.querySelector('#main-content .main-title');
    const description = document.querySelector('#main-content .description');
    const mainButtonsContainer = document.getElementById('mainButtonsContainer');
    const showBotsBtn = document.getElementById('showBotsBtn');
    const backToMainBtn = document.getElementById('backToMainBtn');
    const botListContainer = document.getElementById('botListContainer');
    const splashTitle = document.querySelector('#splash h1');
    const transitionOverlay = document.getElementById('transition-overlay');

    /*
    * ====================================================================
    *
    * НАСТРОЙКИ БОТОВ
    *
    * ====================================================================
    */
    const botsData = [
        { "id": 1, "name": "CheckSearch", "description": "Бот проверяет ссылку и показывает инфу со скрином.", "link": "https://t.me/telegram_bot_1" },
        //{ "id": 2, "name": "BOT2", "description": "Описание второго бота, его функционал и ключевые особенности. Постарайтесь кратко и понятно изложить суть, чтобы пользователь сразу понял ценность.", "link": "https://t.me/telegram_bot_2" },
       // { "id": 3, "name": "BOT3", "description": "Текст с описанием третьего бота. Расскажите, чем он отличается от других, какие у него уникальные возможности или для какой аудитории он предназначен.", "link": "https://t.me/telegram_bot_3" },
       // { "id": 4, "name": "BOT4", "description": "Описание четвертого бота.", "link": "https://t.me/telegram_bot_4" },
      //  { "id": 5, "name": "BOT5", "description": "Описание пятого бота.", "link": "https://t.me/telegram_bot_5" },
      //  { "id": 6, "name": "BOT6", "description": "Описание шестого бота.", "link": "https://t.me/telegram_bot_6" },
      //  { "id": 7, "name": "BOT7", "description": "Описание седьмого бота.", "link": "https://t.me/telegram_bot_7" },
      //  { "id": 8, "name": "BOT8", "description": "Описание восьмого бота.", "link": "https://t.me/telegram_bot_8" },
      //  { "id": 9, "name": "BOT9", "description": "Описание девятого бота.", "link": "https://t.me/telegram_bot_9" },
       // { "id": 10, "name": "BOT10", "description": "Описание десятого бота.", "link": "https://t.me/telegram_bot_10" },
      //  { "id": 11, "name": "BOT11", "description": "Описание одиннадцатого бота.", "link": "https://t.me/telegram_bot_11" },
      //  { "id": 12, "name": "BOT12", "description": "Описание двенадцатого бота.", "link": "https://t.me/telegram_bot_12" }
    ];

    const greetings = ['Привет!'];
    const splashText = "Добро пожаловать!"
    let currentGreetingIndex = 0;
    const typingSpeed = 70;
    const erasingSpeed = 40;
    const delayBetweenGreetings = 1500;
    let typingAnimationTimeout;
    let typingAnimationTimeoutSplash;

    function typeText(text, element, callback, speed = typingSpeed) {
        let i = 0;
        element.innerHTML = '';
        const typingInterval = setInterval(() => {
            if (i < text.length) {
                const char = text.charAt(i);
                const charSpan = document.createElement('span');
                charSpan.textContent = char === ' ' ? '\u00A0' : char;
                charSpan.style.opacity = '0';
                charSpan.style.transition = 'opacity 0.05s ease';
                element.appendChild(charSpan);
                void charSpan.offsetWidth;
                charSpan.style.opacity = '1';
                i++;
            } else {
                clearInterval(typingInterval);
                if (callback) callback();
            }
        }, speed);
    }

    function eraseText(element, callback, speed = erasingSpeed) {
        const spans = Array.from(element.children);
        let i = spans.length - 1;
        if (i < 0) {
            if (callback) callback();
            return;
        }
        const erasingInterval = setInterval(() => {
            if (i >= 0) {
                spans[i].style.opacity = '0';
                spans[i].addEventListener('transitionend', function handler() {
                    this.removeEventListener('transitionend', handler);
                    this.remove();
                    if (element.children.length === 0) {
                        clearInterval(erasingInterval);
                        if (callback) callback();
                    }
                }, { once: true });
                i--;
            } else {
                clearInterval(erasingInterval);
                if (callback) callback();
            }
        }, speed);
    }

    function updateSplashWithTyping() {
        setTimeout(()=>{
            typeText(splashText, splashTitle, () => {},50);
        },500)
    }

    function updateMainTitleWithTyping() {
        clearTimeout(typingAnimationTimeout);
        eraseText(mainTitle, () => {
            const nextGreeting = greetings[currentGreetingIndex];
            typeText(nextGreeting, mainTitle, () => {
                currentGreetingIndex = (currentGreetingIndex + 1) % greetings.length;
                typingAnimationTimeout = setTimeout(updateMainTitleWithTyping, delayBetweenGreetings);
            });
        }, erasingSpeed);
    }

    function animateMainContent() {
        botz = document.querySelector(".bot-list")
        if (botz.innerHTML != "") {
            setTimeout(() => {
                botz.innerHTML = ""
            }, 450)
        }
        description.style.animation = 'none';
        mainButtonsContainer.style.animation = 'none';
        description.style.opacity = '0';
        description.style.transform = 'translateY(20px)';
        mainButtonsContainer.style.opacity = '0';
        mainButtonsContainer.style.transform = 'translateY(80px)';
        void description.offsetWidth;
        
        void mainButtonsContainer.offsetWidth;
        updateMainTitleWithTyping();
        description.style.animation = 'fadeIn 1.5s ease-out forwards';
        description.style.animationDelay = '0.5s';
        mainButtonsContainer.style.animation = 'slideInUp 1s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards';
        mainButtonsContainer.style.animationDelay = '1.5s';
    }

    function showSection(sectionToShow, sectionToHide) {
        if (sectionToHide) {
            transitionOverlay.classList.add('active');
            transitionOverlay.addEventListener('transitionend', function handler() {
                transitionOverlay.removeEventListener('transitionend', handler);

                sectionToHide.classList.remove('active');
                sectionToShow.classList.add('active');

                console.log("4")
                const animatedElements = sectionToShow.querySelectorAll('.bot-card, #bots-content h1, #bots-content .back-button, #main-content .description, #main-content .buttons');
                animatedElements.forEach(el => {
                    el.style.animation = 'none';
                    void el.offsetWidth;
                });

                if (sectionToShow.id === 'main-content') {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    animateMainContent();
                    console.log("5")
                }

                if (sectionToShow.id === 'bots-content') {
                    console.log("3")
                    const easeCurve = 'cubic-bezier(0.2, 0.8, 0.2, 1)';
                    const duration = '0.9s';

                    document.querySelector('#bots-content h1').style.animation = `fadeInSlideUpCard ${duration} ${easeCurve} forwards 0.2s`;

                    const botCards = document.querySelectorAll('.bot-card');
                    botCards.forEach((card, index) => {
                        card.style.animation = `fadeInSlideUpCard ${duration} ${easeCurve} forwards ${0.3 + index * 0.11}s`;
                    });

                    const backButton = document.querySelector('#bots-content .back-button');
                    const lastCardDelay = 0.3 + (botCards.length > 0 ? (botCards.length - 1) * 0.11 : 0);
                    backButton.style.animation = `fadeInSlideUpCard ${duration} ${easeCurve} forwards ${lastCardDelay + 0.3}s`;
                }

                setTimeout(() => {
                    console.log("2")
                    transitionOverlay.classList.remove('active');
                }, 100);
            }, { once: true });
        } else {
            sectionToShow.classList.add('active');
            if (sectionToShow.id === 'main-content') {
                console.log("1")
                animateMainContent();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            }
        }
    }

    function loadBots() {
        botListContainer.innerHTML = '';
        botsData.forEach((bot, index) => {
            const botCard = document.createElement('div');
            botCard.classList.add('bot-card');
            const imagePath = `bots/bot${bot.id}.jpg`;
            const placeholderImage = `https://placehold.co/100x100/000000/FFFFFF?text=BOT${bot.id}`;
            const imgElement = document.createElement('img');
            imgElement.src = imagePath;
            imgElement.alt = `Иконка ${bot.name}`;
            imgElement.onerror = () => {
                imgElement.src = placeholderImage;
            };
            botCard.innerHTML = `
                    ${imgElement.outerHTML}
                    <h2>${bot.name}</h2>
                    <p>${bot.description}</p>
                    <a href="${bot.link}" class="btn">Запустить Бота</a>
                `;
            botListContainer.appendChild(botCard);
        });
    }

    const originalSplashText = splashTitle.textContent;
    splashTitle.textContent = originalSplashText;
    console.log("52")
    updateSplashWithTyping()
    setTimeout(() => {
        splash.style.opacity = 0
    }, 2500);
    setTimeout(() => {
        splash.style.display = 'none';
        showSection(mainContent);
    },3500)
    console.log("42")
    showBotsBtn.addEventListener('click', (event) => {
        event.preventDefault();
        clearTimeout(typingAnimationTimeout);
        loadBots();
        showSection(botsContent, mainContent);
    });
    backToMainBtn.addEventListener('click', (event) => {
        event.preventDefault();
        showSection(mainContent, botsContent);
    });

});

