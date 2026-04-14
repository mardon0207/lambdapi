const app = {
    state: {
        currentView: 'home',
        lang: 'ru',
        exam: null,
        testId: null,
        questions: [],
        currentIdx: 0,
        userAnswers: [],
        timeLeft: 3600,
        timer: null,
        lastResult: null,
        isReviewMode: false,
        githubToken: localStorage.getItem('mc_gh_token') || ''
    },

    translations: {
        ru: {
            pageTitle: 'LambdaPi - Академия точных наук',
            navResults: 'Результаты',
            navAdmin: 'Админ',
            heroTag: 'ПЛАТФОРМА ПОДГОТОВКИ',
            heroTitle: 'Собранная и спокойная подготовка к <span class="text-accent">экзаменам</span>',
            heroSubtitle: 'Профессиональная образовательная среда для эффективного освоения математики. Подготовка к DTM, Milliy Sertifikat и квалификационной аттестации педагогов.',
            heroCTA: 'Начать обучение',
            heroDemo: 'Демо-тест',
            heroStatTests: 'тестов в базе',
            heroStatQuestions: 'вопросов доступно',
            heroStatMode: 'режим подготовки',
            heroStatModeValue: 'онлайн',
            examSelect: 'Выберите направление',
            examSubtitle: 'Специализированные траектории подготовки, адаптированные под конкретные требования экзаменов.',
            advantageLabel: 'LAMBDAPI ADVANTAGE',
            advantageTitle: 'Точность в каждой детали обучения',
            advantageAnalytics: 'Аналитика',
            advantageAnalyticsDesc: 'Подробный разбор каждой ошибки после теста.',
            advantageRelevance: 'Актуальность',
            advantageRelevanceDesc: 'Контент соответствует последним стандартам DTM.',
            examCountLabel: 'тестов',
            questionCountLabel: 'вопросов',
            openExam: 'Перейти к блоку',
            navCurriculum: 'Программы',
            navResources: 'Ресурсы',
            navPricing: 'Тарифы',
            navSign: 'Войти',
            navGetStarted: 'Начать',
            listTitle: 'Тесты по направлению',
            back: 'Назад',
            demoBadge: 'Демо',
            regularBadge: 'Экзамен',
            demoTitle: 'Демо-тест',
            testTitle: 'Тест',
            start: 'Начать тест',
            quizQuestion: 'Вопрос',
            timerLabel: 'Осталось времени',
            next: 'Далее',
            prev: 'Назад',
            finish: 'Завершить',
            resultTitle: 'Результат теста',
            resultSubtitle: 'Работа завершена. Ниже показаны баллы, процент и оставшееся время.',
            scoreLabel: 'Баллы',
            percentLabel: 'Процент',
            timeLabel: 'Остаток времени',
            homeButton: 'На главную',
            historyButton: 'История',
            reviewButton: 'Просмотр ответов',
            historyTitle: 'Архив результатов',
            clearHistory: 'Очистить историю',
            dateCol: 'Дата',
            examCol: 'Экзамен',
            testCol: 'Тест',
            scoreCol: 'Баллы',
            percentCol: 'Процент',
            emptyHistory: 'История пока пуста.',
            clearConfirm: 'Удалить все результаты?',
            quizMetaTitle: 'Контроль прогресса',
            quizMetaSubtitle: 'Выберите формат ответа и двигайтесь дальше без перегрузки интерфейса.',
            adminTitle: 'Панель управления',
            adminPassLabel: 'Пароль администратора',
            adminLogin: 'Войти',
            adminTokenLabel: 'GitHub Token',
            adminUploadTitle: 'Добавить новый тест',
            adminExamSelect: 'Направление',
            adminTestNum: 'Номер теста',
            adminFilesLabel: 'Выберите файлы (.tex, .txt, фотографии)',
            adminSave: 'Сохранить на GitHub',
            adminStatus: 'Статус',
            confirmExit: 'Тест не закончен. Выйти?',
            openAnswerPlaceholder: 'Введите ответ...'
        },
        uz: {
            pageTitle: 'LambdaPi - Matematika imtihonlariga tayyorgarlik',
            navResults: 'Natijalar',
            navAdmin: 'Admin',
            heroEyebrow: 'Matematika bo‘yicha tayyorgarlik platformasi',
            heroTitle: 'Imtihonlarga puxta va tartibli <span class="text-accent">tayyorgarlik</span>',
            heroSubtitle: 'DTM, Milliy sertifikat va Attestatsiya yo‘nalishlari bo‘yicha mashq qiling, tilni almashtiring va testlarni qulay interfeysda yeching.',
            heroStatTests: 'ta test mavjud',
            heroStatQuestions: 'ta savol mavjud',
            heroStatMode: 'tayyorlov rejimi',
            heroStatModeValue: 'onlayn',
            examSelect: 'Yo‘nalishni tanlang',
            examCountLabel: 'ta test',
            questionCountLabel: 'ta savol',
            openExam: 'Bo‘limni ochish',
            listTitle: 'Yo‘nalish bo‘yicha testlar',
            back: 'Orqaga',
            demoBadge: 'Demo',
            regularBadge: 'Imtihon',
            demoTitle: 'Demo test',
            testTitle: 'Test',
            start: 'Testni boshlash',
            quizQuestion: 'Savol',
            timerLabel: 'Qolgan vaqt',
            next: 'Keyingisi',
            prev: 'Orqaga',
            finish: 'Tugatish',
            resultTitle: 'Test natijasi',
            resultSubtitle: 'Test tugadi. Quyida ball, foiz va qolgan vaqt ko‘rsatilgan.',
            scoreLabel: 'Ball',
            percentLabel: 'Foiz',
            timeLabel: 'Qolgan vaqt',
            homeButton: 'Bosh sahifa',
            historyButton: 'Tarix',
            reviewButton: 'Javoblarni ko\'rish',
            historyTitle: 'Natijalar arxivi',
            clearHistory: 'Tarixni tozalash',
            dateCol: 'Sana',
            examCol: 'Imtihon',
            testCol: 'Test',
            scoreCol: 'Ball',
            percentCol: 'Foiz',
            emptyHistory: 'Hozircha tarix bo‘sh.',
            clearConfirm: 'Barcha natijalar o‘chirilsinmi?',
            quizMetaTitle: 'Jarayon nazorati',
            quizMetaSubtitle: 'Javobni kiriting va ortiqcha chalg‘imasdan keyingi savolga o‘ting.',
            adminTitle: 'Boshqaruv paneli',
            adminPassLabel: 'Admin paroli',
            adminLogin: 'Kirish',
            adminTokenLabel: 'GitHub Token',
            adminUploadTitle: 'Yangi test qo\'shish',
            adminExamSelect: 'Yo\'nalish',
            adminTestNum: 'Test raqami',
            adminFilesLabel: 'Fayllarni tanlang (.tex, .txt, rasmlar)',
            adminSave: 'GitHubga saqlash',
            adminStatus: 'Holati',
            navGetStarted: 'Boshlash',
            heroTag: 'TAYYORLOV PLATFORMASI',
            heroTitle: 'Imtihonlarga puxta va tartibli <span class="text-accent">tayyorgarlik</span>',
            heroSubtitle: 'Matematika bo‘yicha professional ta’lim muhiti. DTM, Milliy sertifikat va o‘qituvchilar attestatsiyasiga samarali tayyorlaning.',
            heroCTA: 'O‘qishni boshlash',
            heroDemo: 'Demo test',
            heroStatTests: 'bazadagi testlar',
            heroStatQuestions: 'savollar mavjud',
            heroStatMode: 'tayyorlov rejimi',
            heroStatModeValue: 'onlayn',
            examSelect: 'Yo‘nalishni tanlang',
            examSubtitle: 'Imtihon talablariga moslashtirilgan ixtisoslashtirilgan tayyorgarlik yo‘nalishlari.',
            advantageLabel: 'LAMBDAPI AFZALLIGI',
            advantageTitle: 'Ta’limdagi har bir detalda aniqlik',
            advantageAnalytics: 'Analitika',
            advantageAnalyticsDesc: 'Testdan so‘ng har bir xato ustida batafsil ishlash imkoniyati.',
            advantageRelevance: 'Dolzarblik',
            advantageRelevanceDesc: 'Kontent DTM ning oxirgi standartlariga to‘la mos keladi.',
            openExam: 'Bo\'limga o\'tish',
            confirmExit: 'Test hali tugamadi. Chiqasizmi?',
            openAnswerPlaceholder: 'Javobni kiriting...'
        }
    },

    examMeta: {
        ru: {
            DTM: { 
                title: 'ДТМ', 
                subtitle: 'Базовый поток для абитуриентов. Подготовка к государственному тестированию.', 
                points: ['2 тренировочных теста', '40 тематических вопросов'],
                icon: 'check-badge',
                accent: 'accent-cyan' 
            },
            MS: { 
                title: 'Национальный сертификат', 
                subtitle: 'Общая математика. Подготовка к получению национального сертификата компетенции.', 
                points: ['1 расширенный тест', '5 эталонных вопросов'],
                icon: 'medal',
                accent: 'accent-gold' 
            },
            Attestatsiya: { 
                title: 'Аттестация', 
                subtitle: 'Профильный блок для преподавателей. Повышение квалификационной категории.', 
                points: ['10 комплексных тестов', '350 практических вопросов'],
                icon: 'shield',
                accent: 'accent-emerald' 
            }
        },
        uz: {
            DTM: { 
                title: 'DTM', 
                subtitle: 'Davlat test markazi imtihonlari. Abituriyentlar uchun asosiy yo\'nalish.',
                points: ['2 ta mashq testi', '40 ta mavzulashtirilgan savol'],
                icon: 'check-badge',
                accent: 'accent-cyan' 
            },
            MS: { 
                title: 'Milliy sertifikat', 
                subtitle: 'Matematika bo\'yicha milliy sertifikat. Umumiy kompetensiya bahosi.',
                points: ['1 ta kengaytirilgan test', '5 ta namunaviy savol'],
                icon: 'medal',
                accent: 'accent-gold' 
            },
            Attestatsiya: { 
                title: 'Attestatsiya', 
                subtitle: 'O\'qituvchilar attestatsiyasi. Malaka toifasini oshirish uchun tayyorgarlik.',
                points: ['10 ta kompleks test', '350 ta amaliy savol'],
                icon: 'shield',
                accent: 'accent-emerald' 
            }
        }
    },

    async init() {
        this.bindEvents();
        this.initParticles();
        this.syncHeader();
        this.renderView('home', {}, { instant: true });

        window.addEventListener('beforeunload', (e) => {
            if (this.state.currentView === 'quiz' && !this.state.isReviewMode) {
                e.preventDefault();
                e.returnValue = this.t().confirmExit;
                return this.t().confirmExit;
            }
        });
    },

    bindEvents() {
        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.addEventListener('click', (event) => {
                this.setLanguage(event.currentTarget.dataset.lang);
            });
        });
    },

    t() {
        return this.translations[this.state.lang];
    },

    getExamMeta(exam) {
        return this.examMeta[this.state.lang][exam];
    },

    getExamName(exam) {
        return this.getExamMeta(exam)?.title || exam;
    },

    getTotalStats() {
        const exams = Object.keys(EXAMS_METADATA);
        let testsCount = 0;
        let questionsCount = 0;
        exams.forEach(exam => {
            const data = EXAMS_METADATA[exam];
            const testIds = Object.keys(data);
            testsCount += testIds.length;
            testIds.forEach(id => {
                questionsCount += data[id];
            });
        });
        return { tests: testsCount, questions: questionsCount };
    },

    setLanguage(lang) {
        if (lang === this.state.lang) return;
        this.state.lang = lang;
        this.syncHeader();

        if (this.state.currentView === 'quiz') {
            this.renderQuizContent();
        } else {
            this.renderView(this.state.currentView, { exam: this.state.exam, testId: this.state.testId }, { instant: true });
        }
    },

    syncHeader() {
        const current = this.t();
        document.title = current.pageTitle;
        document.documentElement.lang = this.state.lang;

        document.querySelectorAll('.lang-btn').forEach((btn) => {
            btn.classList.toggle('active', btn.dataset.lang === this.state.lang);
        });

        const navResults = document.getElementById('nav-results');
        if (navResults) navResults.textContent = current.navResults;

        const navAdmin = document.getElementById('nav-admin');
        if (navAdmin) {
            navAdmin.textContent = (this.state.currentView === 'admin' || this.state.currentView === 'admin-login') 
                ? current.adminTitle 
                : current.navAdmin;
        }
    },

    async loadTestData(exam, testId) {
        return new Promise((resolve, reject) => {
            const script = document.createElement('script');
            script.src = `js/data/${exam}/${testId}.js`;
            script.onload = () => {
                const data = window.TEST_DATA;
                // delete window.TEST_DATA; // Keep if needed for multiple loads, but usually safer to delete
                resolve(data);
            };
            script.onerror = () => reject(new Error(`Failed to load ${exam}/${testId}`));
            document.head.appendChild(script);
        });
    },

    async renderView(viewId, params = {}, options = {}) {
        const root = document.getElementById('app-root');
        const doRender = async () => {
            this.state.currentView = viewId;
            root.innerHTML = this.getViewHTML(viewId, params);

            if (viewId === 'test-list') this.renderTestList(params.exam || this.state.exam);
            if (viewId === 'quiz') {
                if (!options.preserveQuiz) {
                    try {
                        const data = await this.loadTestData(params.exam || this.state.exam, params.testId || this.state.testId);
                        this.startQuiz(params.testId || this.state.testId, data);
                    } catch (e) {
                        console.error(e);
                        this.renderView('home');
                        return;
                    }
                } else {
                    this.renderQuizContent();
                }
            }
            if (viewId === 'history') this.renderHistoryTable();
            if (viewId === 'admin-login') this.attachAdminLoginEvents();
            if (viewId === 'admin') this.attachAdminEvents();
        };

        if (options.instant) {
            await doRender();
            return;
        }

        root.classList.add('fade-out');
        setTimeout(async () => {
            await doRender();
            root.classList.remove('fade-out');
        }, 180);
    },

    getViewHTML(viewId, params = {}) {
        const current = this.t();

        switch (viewId) {
            case 'home': {
                const stats = this.getGlobalStats();
                return `
                    <section class="hero-landing">
                        <div class="hero-content">
                            <div class="hero-tag">${current.heroTag}</div>
                            <h1 class="hero-title">${current.heroTitle}</h1>
                            <p class="hero-description">${current.heroSubtitle}</p>
                            <div class="hero-btns">
                                <button class="btn-glow" onclick="document.getElementById('selection').scrollIntoView({behavior:'smooth'})">${current.heroCTA}</button>
                                <button class="btn-ghost" onclick="app.startDemo()">${current.heroDemo}</button>
                            </div>
                        </div>
                        <div class="hero-visual">
                            <div class="stats-card">
                                <div class="stats-card-header">
                                    <span class="icon">💻</span>
                                    <span>System Status</span>
                                </div>
                                <div class="stat-item">
                                    <span class="label">${current.heroStatTests}</span>
                                    <span class="value">${stats.tests}</span>
                                </div>
                                <div class="stat-item">
                                    <span class="label">${current.heroStatQuestions}</span>
                                    <span class="value">${stats.totalQuestions}+</span>
                                </div>
                                <div class="platform-load">
                                    <div class="stat-item">
                                        <span class="label">Platform Load</span>
                                        <div style="display:flex; justify-content:space-between; align-items:center;">
                                            <span style="font-size:0.8rem; font-weight:700;">Active</span>
                                            <span style="font-size:0.8rem; color:var(--accent);">24%</span>
                                        </div>
                                    </div>
                                    <div class="load-bar"><div class="load-fill"></div></div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <section class="selection-section" id="selection">
                        <div class="section-header">
                            <div>
                                <h2>${current.examSelect}</h2>
                                <p style="color:var(--text-secondary); margin-top:1rem;">${current.examSubtitle}</p>
                            </div>
                        </div>
                        <div class="selection-grid">
                            ${this.renderExamCards()}
                        </div>
                    </section>

                    <section class="advantage-section">
                        <div class="advantage-grid">
                            <div class="advantage-content">
                                <span class="advantage-label">${current.advantageLabel}</span>
                                <h2 class="advantage-title">${current.advantageTitle}</h2>
                                <div class="advantage-features">
                                    <div class="feature-item">
                                        <h4>${current.advantageAnalytics}</h4>
                                        <p>${current.advantageAnalyticsDesc}</p>
                                    </div>
                                    <div class="feature-item">
                                        <h4>${current.advantageRelevance}</h4>
                                        <p>${current.advantageRelevanceDesc}</p>
                                    </div>
                                </div>
                            </div>
                            <div class="advantage-graphic" id="advantage-graphic">
                                <img src="assets/advantage.png" alt="LambdaPi Advantage">
                            </div>
                        </div>
                    </section>

                    <footer>
                        <div class="footer-top">
                            <div class="logo">
                                <div class="logo-icon">λπ</div>
                                <span class="logo-wordmark">LambdaPi</span>
                            </div>
                            <div class="footer-links">
                                <span class="footer-link">Integrity</span>
                                <span class="footer-link">Privacy</span>
                                <span class="footer-link">Terms</span>
                            </div>
                        </div>
                        <div class="footer-bottom">
                            <span>© 2026 LambdaPi. Precision in Pedagogy.</span>
                            <div style="display:flex; gap:1.5rem;">
                                <span>🌐</span>
                                <span>💬</span>
                            </div>
                        </div>
                    </footer>
                `;
            }
            case 'test-list':
                return `
                    <section class="section-top">
                        <button class="btn-secondary" onclick="app.renderView('home')">${current.back}</button>
                        <div class="section-heading section-heading-tight">
                            <h2>${current.listTitle}</h2>
                            <p>${this.getExamName(params.exam || this.state.exam)}</p>
                        </div>
                    </section>
                    <section class="test-grid" id="test-grid"></section>
                `;
            case 'quiz':
                return `
                    <section class="quiz-layout">
                        <div class="quiz-dashboard">
                            <div class="quiz-pill">
                                <span class="quiz-pill-label">${current.timerLabel}</span>
                                <strong id="timer-val">00:00</strong>
                            </div>
                            <div class="progress-box">
                                <div class="progress-container"><div class="progress-fill" id="progress-fill"></div></div>
                                <div id="quiz-map" class="quiz-map"></div>
                            </div>
                            <div class="quiz-pill">
                                <span class="quiz-pill-label">${current.quizQuestion}</span>
                                <strong id="quiz-count">1 / 1</strong>
                            </div>
                        </div>
                        <div class="question-view glass-container">
                            <div class="question-meta">
                                <div>
                                    <span class="question-kicker">${this.getExamName(this.state.exam)}</span>
                                    <h2 id="question-text"></h2>
                                </div>
                                <div class="question-note">
                                    <strong>${current.quizMetaTitle}</strong>
                                    <span>${current.quizMetaSubtitle}</span>
                                </div>
                            </div>
                            <div id="question-image-wrap"></div>
                            <div class="options-list" id="options-list"></div>
                            <div class="quiz-actions">
                                <button class="btn-secondary" id="prev-btn" onclick="app.handlePrev()">${current.prev}</button>
                                <button class="btn-primary" id="next-btn" onclick="app.handleNext()">${current.next}</button>
                            </div>
                        </div>
                    </section>
                `;
            case 'results': {
                const result = this.state.lastResult;
                const remaining = this.formatTime(result?.timeLeft || 0);
                return `
                    <section class="glass-container results-panel">
                        <span class="hero-eyebrow">${this.getExamName(result.exam)}</span>
                        <h1 class="result-title">${current.resultTitle}</h1>
                        <p class="result-subtitle">${current.resultSubtitle}</p>
                        <div class="stats-summary">
                            <div class="stat-box">
                                <span class="val">${result.score} / ${result.total}</span>
                                <span class="label">${current.scoreLabel}</span>
                            </div>
                            <div class="stat-box">
                                <span class="val">${result.percent}%</span>
                                <span class="label">${current.percentLabel}</span>
                            </div>
                            <div class="stat-box">
                                <span class="val">${remaining}</span>
                                <span class="label">${current.timeLabel}</span>
                            </div>
                        </div>
                        <div class="result-actions">
                            <button class="btn-primary" onclick="app.renderView('home')">${current.homeButton}</button>
                            <button class="btn-secondary" onclick="app.startReview()">${current.reviewButton}</button>
                            <button class="btn-secondary" onclick="app.renderView('history')">${current.historyButton}</button>
                        </div>
                    </section>
                `;
            }
            case 'history':
                return `
                    <section class="section-top">
                        <button class="btn-secondary" onclick="app.renderView('home')">${current.back}</button>
                        <div class="section-heading section-heading-tight">
                            <h2>${current.historyTitle}</h2>
                            <p>${current.navResults}</p>
                        </div>
                        <button class="btn-secondary danger" onclick="app.clearHistory()">${current.clearHistory}</button>
                    </section>
                    <section class="glass-container history-panel">
                        <table class="history-table">
                            <thead>
                                <tr>
                                    <th>${current.dateCol}</th>
                                    <th>${current.examCol}</th>
                                    <th>${current.testCol}</th>
                                    <th>${current.scoreCol}</th>
                                    <th>${current.percentCol}</th>
                                </tr>
                            </thead>
                            <tbody id="history-body"></tbody>
                        </table>
                        <div id="history-empty" class="history-empty" style="display: none;">${current.emptyHistory}</div>
                    </section>
                `;
            case 'admin-login':
                return `
                    <section class="glass-container results-panel small-auth">
                        <h2>${current.adminTitle}</h2>
                        <div class="auth-form">
                            <label>${current.adminPassLabel}</label>
                            <input type="password" id="admin-pass" class="glass-input">
                            <button class="btn-primary" id="login-btn">${current.adminLogin}</button>
                        </div>
                    </section>
                `;
            case 'admin':
                return `
                    <section class="section-top">
                        <button class="btn-secondary" onclick="app.renderView('home')">${current.back}</button>
                        <div class="section-heading section-heading-tight">
                            <h2>${current.adminUploadTitle}</h2>
                        </div>
                    </section>
                    <section class="glass-container admin-panel-ui">
                        <div class="admin-tabs">
                            <button class="admin-tab-btn active" onclick="app.switchAdminTab('add')">${current.adminUploadTitle}</button>
                            <button class="admin-tab-btn" onclick="app.switchAdminTab('manage')">Управление тестами</button>
                        </div>
                        
                        <div id="admin-tab-add" class="admin-tab-content active">
                            <div class="admin-grid-form">
                                <div class="input-shell">
                                    <label>${current.adminTokenLabel}</label>
                                    <input type="password" id="gh-token" class="glass-input" value="${this.state.githubToken}">
                                </div>
                                <div class="input-shell">
                                    <label>${current.adminExamSelect}</label>
                                    <select id="admin-exam" class="glass-input">
                                        <option value="Attestatsiya">Attestation</option>
                                        <option value="DTM">DTM</option>
                                        <option value="MS">Milliy Sertifikat</option>
                                    </select>
                                </div>
                                <div class="input-shell">
                                    <label>${current.adminTestNum}</label>
                                    <input type="number" id="admin-test-id" class="glass-input" placeholder="e.g. 11">
                                </div>
                                <div class="input-shell full">
                                    <label>${current.adminFilesLabel}</label>
                                    <input type="file" id="admin-files" class="glass-input" multiple>
                                </div>
                                <button class="btn-primary full" id="admin-save-btn">${current.adminSave}</button>
                                <div id="admin-log" class="admin-log"></div>
                            </div>
                        </div>

                        <div id="admin-tab-manage" class="admin-tab-content">
                            <div class="admin-test-manager" id="admin-test-list">
                                <!-- Populated by renderAdminTestList -->
                            </div>
                        </div>
                    </section>
                `;
            default:
                return '';
        }
    },

    renderExamCards() {
        const current = this.translations[this.state.lang];
        const meta = this.examMeta[this.state.lang];
        
        return Object.entries(EXAMS_METADATA).map(([key, data]) => {
            const m = meta[key];
            const icons = { 'shield': '🛡️', 'medal': '🎖️', 'check-badge': '✔️' };
            const icon = icons[m.icon] || '📦';
            const points = m.points || [`${Object.keys(data).length} ${current.examCountLabel}`, `${Object.values(data).reduce((a,b)=>a+b,0)} ${current.questionCountLabel}`];
            
            return `
                <div class="exam-card ${m.accent}" onclick="app.renderView('test-list', {exam: '${key}'})">
                    <div class="card-icon">${icon}</div>
                    <h3 class="card-title">${m.title}</h3>
                    <p class="card-desc">${m.subtitle}</p>
                    <div class="card-points">
                        ${points.map(p => `
                            <div class="card-point">
                                <span class="dot">✦</span>
                                <span>${p}</span>
                            </div>
                        `).join('')}
                    </div>
                    <div class="card-cta">
                        <span>${current.openExam}</span>
                        <span>→</span>
                    </div>
                </div>
            `;
        }).join('');
    },

    renderTestList(exam) {
        this.state.exam = exam;
        const current = this.t();
        const tests = EXAMS_METADATA[exam] || {};
        const grid = document.getElementById('test-grid');
        grid.innerHTML = '';

        Object.keys(tests).forEach((id) => {
            const count = tests[id];
            const isDemo = id === 'demo';
            const card = document.createElement('article');
            card.className = 'glass-container test-card';
            card.innerHTML = `
                <div class="test-badge">${isDemo ? current.demoBadge : current.regularBadge}</div>
                <h3>${isDemo ? current.demoTitle : `${current.testTitle} #${id}`}</h3>
                <p>${count} ${current.questionCountLabel}</p>
                <div class="exam-cta">${current.start}</div>
            `;
            card.onclick = () => this.renderView('quiz', { exam, testId: id });
            grid.appendChild(card);
        });
    },

    startQuiz(testId, data) {
        this.state.testId = testId;
        this.state.questions = data;
        this.state.currentIdx = 0;
        this.state.userAnswers = [];
        this.state.timeLeft = 3600;
        this.state.isReviewMode = false;
        this.startTimer();
        this.renderQuizContent();
    },

    startTimer() {
        if (this.state.timer) clearInterval(this.state.timer);
        this.state.timer = setInterval(() => {
            this.state.timeLeft -= 1;
            this.updateTimer();
            if (this.state.timeLeft <= 0) this.finishQuiz();
        }, 1000);
    },

    formatTime(totalSeconds) {
        const safe = Math.max(0, totalSeconds);
        const minutes = Math.floor(safe / 60);
        const seconds = safe % 60;
        return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    },

    updateTimer() {
        const timer = document.getElementById('timer-val');
        if (timer) timer.textContent = this.formatTime(this.state.timeLeft);
    },

    getOptionLabels(count) {
        return 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.slice(0, count).split('');
    },

    renderQuizContent() {
        const current = this.t();
        const question = this.state.questions[this.state.currentIdx];
        const variant = question.variants[this.state.lang];
        const userAnswer = this.state.userAnswers[this.state.currentIdx];

        document.getElementById('question-text').innerHTML = variant.text;
        document.getElementById('quiz-count').textContent = `${this.state.currentIdx + 1} / ${this.state.questions.length}`;
        document.getElementById('progress-fill').style.width = `${((this.state.currentIdx + 1) / this.state.questions.length) * 100}%`;
        this.updateTimer();
        this.renderQuestionMap();

        const imageWrap = document.getElementById('question-image-wrap');
        if (question.image) {
            const path = `${this.state.exam}/${this.state.testId}/${question.image}`;
            imageWrap.innerHTML = `
                <figure class="question-image-shell">
                    <img src="${path}" class="question-image" alt="${current.quizQuestion} ${this.state.currentIdx + 1}">
                </figure>
            `;
        } else {
            imageWrap.innerHTML = '';
        }

        const list = document.getElementById('options-list');
        list.innerHTML = '';

        const isMultipleChoice = /^[A-D]$/i.test(question.correct);

        if (isMultipleChoice) {
            const labels = this.getOptionLabels(variant.options.length);
            variant.options.forEach((option, index) => {
                const label = labels[index];
                const button = document.createElement('button');
                button.className = 'option-btn regular';
                if (userAnswer === label) button.classList.add('selected');
                
                if (this.state.isReviewMode) {
                    button.disabled = true;
                    if (label === question.correct) button.classList.add('correct-answer');
                    if (userAnswer === label && label !== question.correct) button.classList.add('wrong-answer');
                }

                button.innerHTML = `
                    <span class="opt-idx">${label}</span>
                    <span class="opt-val">${option}</span>
                `;
                button.onclick = () => !this.state.isReviewMode && this.selectOption(label);
                list.appendChild(button);
            });
        } else {
            const inputContainer = document.createElement('div');
            inputContainer.className = 'open-answer-container';
            const input = document.createElement('input');
            input.type = 'text';
            input.className = 'glass-input open-answer-input';
            input.placeholder = current.openAnswerPlaceholder;
            input.value = userAnswer || '';
            input.disabled = this.state.isReviewMode;
            
            if (this.state.isReviewMode) {
                const isCorrect = this.compareNumericalAnswers(userAnswer, question.correct);
                input.classList.add(isCorrect ? 'correct-answer' : 'wrong-answer');
                const feedback = document.createElement('div');
                feedback.className = 'answer-feedback';
                feedback.innerHTML = `Correct: <strong>${question.correct}</strong>`;
                inputContainer.appendChild(feedback);
            }

            input.oninput = (e) => !this.state.isReviewMode && this.saveOpenAnswer(e.target.value);
            inputContainer.prepend(input);
            list.appendChild(inputContainer);
        }

        const prevBtn = document.getElementById('prev-btn');
        prevBtn.disabled = this.state.currentIdx === 0;

        const nextButton = document.getElementById('next-btn');
        nextButton.textContent = this.state.currentIdx === this.state.questions.length - 1 ? (this.state.isReviewMode ? current.homeButton : current.finish) : current.next;
        
        if (this.state.isReviewMode) {
            nextButton.disabled = false;
        } else {
            nextButton.disabled = !userAnswer;
        }

        if (window.renderMathInElement) {
            renderMathInElement(document.getElementById('app-root'), {
                delimiters: [
                    { left: '\\(', right: '\\)', display: false },
                    { left: '\\[', right: '\\]', display: true }
                ]
            });
        }
    },

    renderQuestionMap() {
        const map = document.getElementById('quiz-map');
        if (!map) return;
        map.innerHTML = '';
        this.state.questions.forEach((_, idx) => {
            const dot = document.createElement('div');
            dot.className = 'map-dot';
            if (idx === this.state.currentIdx) dot.classList.add('current');
            if (this.state.userAnswers[idx]) dot.classList.add('answered');
            if (this.state.isReviewMode) {
                const isCorrect = this.checkAnswerCorrectness(idx);
                dot.classList.add(isCorrect ? 'correct' : 'wrong');
            }
            dot.textContent = idx + 1;
            dot.onclick = () => {
                this.state.currentIdx = idx;
                this.renderQuizContent();
            };
            map.appendChild(dot);
        });
    },

    checkAnswerCorrectness(idx) {
        const q = this.state.questions[idx];
        const ans = this.state.userAnswers[idx];
        if (!ans) return false;
        if (/^[A-D]$/i.test(q.correct)) return ans.toUpperCase() === q.correct.toUpperCase();
        return this.compareNumericalAnswers(ans, q.correct);
    },

    compareNumericalAnswers(user, correct) {
        if (!user || !correct) return false;
        const norm = (s) => parseFloat(s.toString().replace(',', '.').trim());
        const uVal = norm(user);
        const cVal = norm(correct);
        if (isNaN(uVal) || isNaN(cVal)) return user.toString().toLowerCase().trim() === correct.toString().toLowerCase().trim();
        return Math.abs(uVal - cVal) < 0.001;
    },

    selectOption(label) {
        this.state.userAnswers[this.state.currentIdx] = label;
        this.renderQuizContent();
    },

    saveOpenAnswer(val) {
        this.state.userAnswers[this.state.currentIdx] = val;
        document.getElementById('next-btn').disabled = !val;
        this.renderQuestionMap();
    },

    handleNext() {
        if (this.state.currentIdx < this.state.questions.length - 1) {
            this.state.currentIdx += 1;
            this.renderQuizContent();
        } else {
            if (this.state.isReviewMode) {
                this.renderView('home');
            } else {
                this.finishQuiz();
            }
        }
    },

    handlePrev() {
        if (this.state.currentIdx > 0) {
            this.state.currentIdx -= 1;
            this.renderQuizContent();
        }
    },

    finishQuiz() {
        clearInterval(this.state.timer);
        let score = 0;
        this.state.questions.forEach((_, idx) => {
            if (this.checkAnswerCorrectness(idx)) score += 1;
        });

        const result = {
            exam: this.state.exam,
            testId: this.state.testId,
            score,
            total: this.state.questions.length,
            percent: Math.round((score / this.state.questions.length) * 100),
            timeLeft: this.state.timeLeft,
            date: new Date().toISOString()
        };

        this.state.lastResult = result;
        this.saveHistory(result);
        this.renderView('results');
    },

    startReview() {
        this.state.isReviewMode = true;
        this.state.currentIdx = 0;
        this.renderView('quiz', {}, { preserveQuiz: true });
    },

    saveHistory(result) {
        const history = JSON.parse(localStorage.getItem('mathpro_history') || '[]');
        history.unshift(result);
        localStorage.setItem('mathpro_history', JSON.stringify(history));
    },

    renderHistoryTable() {
        const history = JSON.parse(localStorage.getItem('mathpro_history') || '[]');
        const body = document.getElementById('history-body');
        const empty = document.getElementById('history-empty');

        body.innerHTML = '';
        if (!history.length) {
            empty.style.display = 'block';
            return;
        }

        empty.style.display = 'none';
        history.forEach((item) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${new Date(item.date).toLocaleDateString()}</td>
                <td>${this.getExamName(item.exam)}</td>
                <td>${item.testId === 'demo' ? this.t().demoTitle : `#${item.testId}`}</td>
                <td>${item.score} / ${item.total}</td>
                <td class="${item.percent >= 70 ? 'success' : 'warning'}">${item.percent}%</td>
            `;
            body.appendChild(row);
        });
    },

    clearHistory() {
        if (confirm(this.t().clearConfirm)) {
            localStorage.removeItem('mathpro_history');
            this.renderHistoryTable();
        }
    },

    attachAdminLoginEvents() {
        const btn = document.getElementById('login-btn');
        const pass = document.getElementById('admin-pass');
        const login = () => {
            if (pass.value === 'TestMath002') {
                this.renderView('admin');
            } else {
                alert('Wrong password');
            }
        };
        btn.onclick = login;
        pass.onkeyup = (e) => e.key === 'Enter' && login();
    },

    attachAdminEvents() {
        const saveBtn = document.getElementById('admin-save-btn');
        const tokenInput = document.getElementById('gh-token');
        if (tokenInput) {
            tokenInput.onchange = (e) => {
                this.state.githubToken = e.target.value;
                localStorage.setItem('mc_gh_token', e.target.value);
            };
        }

        if (saveBtn) {
            saveBtn.onclick = async () => {
                const exam = document.getElementById('admin-exam').value;
                const testId = document.getElementById('admin-test-id').value;
                const files = document.getElementById('admin-files').files;
                
                if (!testId || files.length === 0) return alert('Fill all fields');
                if (!this.state.githubToken) return alert('GitHub Token required');

                this.adminLog('Starting process...', 'info');
                try {
                    const testData = await this.parseAdminFiles(files, testId);
                    await this.saveTestToGitHub(exam, testId, testData, files);
                    this.adminLog('Success! GitHub repository updated.', 'success');
                    this.renderAdminTestList(); // Refresh list if open
                } catch (e) {
                    this.adminLog('Error: ' + e.message, 'error');
                }
            };
        }
        
        this.renderAdminTestList();
    },

    switchAdminTab(tab) {
        document.querySelectorAll('.admin-tab-btn').forEach(btn => btn.classList.remove('active'));
        document.querySelectorAll('.admin-tab-content').forEach(content => content.classList.remove('active'));
        
        event.currentTarget.classList.add('active');
        document.getElementById(`admin-tab-${tab}`).classList.add('active');
    },

    renderAdminTestList() {
        const list = document.getElementById('admin-test-list');
        if (!list) return;
        
        list.innerHTML = '';
        Object.keys(EXAMS_METADATA).forEach(exam => {
            const h3 = document.createElement('h3');
            h3.textContent = exam;
            h3.style.margin = '1rem 0 0.5rem';
            h3.style.fontSize = '0.9rem';
            h3.style.color = 'var(--accent)';
            list.appendChild(h3);

            const tests = EXAMS_METADATA[exam];
            Object.keys(tests).forEach(testId => {
                const row = document.createElement('div');
                row.className = 'admin-manage-row';
                row.innerHTML = `
                    <span>Test #${testId} (${tests[testId]} questions)</span>
                    <button class="btn-delete" onclick="app.handleDeleteTest('${exam}', '${testId}')">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2M10 11v6M14 11v6"/></svg>
                        Delete
                    </button>
                `;
                list.appendChild(row);
            });
        });
    },

    async handleDeleteTest(exam, testId) {
        if (!confirm(`Вы уверены, что хотите удалить тест ${exam} #${testId}?`)) return;
        if (!this.state.githubToken) return alert('GitHub Token required');

        const owner = 'mardon0207';
        const repo = 'lambdapi';

        try {
            this.adminLog(`Deleting ${exam} #${testId}...`, 'info');
            
            // 1. Remove from Metadata
            delete EXAMS_METADATA[exam][testId];
            const metaContent = `const EXAMS_METADATA = ${JSON.stringify(EXAMS_METADATA, null, 2)};`;
            await this.githubCommit(owner, repo, 'js/metadata.js', metaContent, `Delete metadata for ${exam} #${testId}`);

            // 2. Delete test data file
            try {
                await this.githubDelete(owner, repo, `js/data/${exam}/${testId}.js`, `Delete data file for ${exam} #${testId}`);
            } catch (e) {
                console.warn('Data file not found or already deleted', e);
            }

            this.adminLog(`Test ${testId} deleted successfully.`, 'success');
            this.renderAdminTestList();
        } catch (e) {
            this.adminLog('Error: ' + e.message, 'error');
        }
    },

    async githubDelete(owner, repo, path, message) {
        const token = this.state.githubToken;
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        
        const resGet = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        if (!resGet.ok) throw new Error(`Could not find file to delete: ${path}`);
        
        const data = await resGet.json();
        const sha = data.sha;

        const resDel = await fetch(url, {
            method: 'DELETE',
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ message, sha })
        });

        if (!resDel.ok) {
            const err = await resDel.json();
            throw new Error(err.message);
        }
    },

    adminLog(msg, type) {
        const log = document.getElementById('admin-log');
        log.innerHTML = `<span class="${type}">${msg}</span>`;
    },

    async parseAdminFiles(fileList, testId) {
        const files = Array.from(fileList);
        const rusFile = files.find(f => f.name === 'rus.tex');
        const uzbFile = files.find(f => f.name === 'uzb.tex');
        const ansFile = files.find(f => f.name.endsWith('.txt'));

        if (!rusFile || !uzbFile || !ansFile) throw new Error('Missing rus.tex, uzb.tex or answers .txt');

        const rusText = await rusFile.text();
        const uzbText = await uzbFile.text();
        const ansText = await ansFile.text();

        const answers = this.parseAnswerKey(ansText);
        const rusQs = this.parseLaTeX(rusText);
        const uzbQs = this.parseLaTeX(uzbText);

        const count = Math.min(rusQs.length, uzbQs.length, answers.length);
        const questions = [];

        for (let i = 0; i < count; i++) {
            questions.push({
                id: i + 1,
                image: rusQs[i].image || uzbQs[i].image,
                correct: answers[i].correct,
                variants: {
                    ru: { text: rusQs[i].text, options: rusQs[i].options },
                    uz: { text: uzbQs[i].text, options: uzbQs[i].options }
                }
            });
        }
        return questions;
    },

    parseAnswerKey(text) {
        const lines = text.split('\n');
        const answers = [];
        lines.forEach(line => {
            const match = line.trim().match(/^(\d+)\s+(\S+)$/);
            if (match) {
                answers.push({ id: parseInt(match[1]), correct: match[2] });
            }
        });
        return answers.sort((a,b) => a.id - b.id);
    },

    parseLaTeX(text) {
        const questions = [];
        const clean = (t) => t.replace(/\\tg/g, '\\tan').replace(/\\ctg/g, '\\cot').replace(/\\begin\{options\}|\\end\{options\}|\\begin\{enumerate\}|\\end\{enumerate\}/g, '').trim();
        
        const qBlocks = text.split(/\\begin\{questionbox\}\{\d+\}/).slice(1);
        qBlocks.forEach(block => {
            const end = block.indexOf('\\end{questionbox}');
            const content = end === -1 ? block : block.substring(0, end);
            
            const imgMatch = content.match(/\\includegraphics.*?\{([^}]+)\}/);
            const optMatch = [...content.matchAll(/\\item\s+([\s\S]*?)(?=\\item|$)/g)];
            
            const qTextPart = content.split(/\\begin\{options\}|\\begin\{enumerate\}/)[0];
            const qText = clean(qTextPart);
            const options = optMatch ? optMatch.map(o => clean(o[1])) : [];
            
            questions.push({
                text: qText,
                image: imgMatch ? imgMatch[1].split('/').pop() : null,
                options: options
            });
        });
        return questions;
    },

    async saveTestToGitHub(exam, testId, testData, files) {
        const token = this.state.githubToken;
        const owner = 'mardon0207';
        const repo = 'lambdapi';
        
        const jsPath = `js/data/${exam}/${testId}.js`;
        const jsContent = `TEST_DATA = ${JSON.stringify(testData, null, 2)};`;
        await this.githubCommit(owner, repo, jsPath, jsContent, `Add test ${exam} #${testId}`);
        
        // Update Metadata
        EXAMS_METADATA[exam][testId] = testData.length;
        const metaContent = `const EXAMS_METADATA = ${JSON.stringify(EXAMS_METADATA, null, 2)};`;
        await this.githubCommit(owner, repo, 'js/metadata.js', metaContent, `Update metadata for ${exam} #${testId}`);

        // Upload images
        for (const file of Array.from(files)) {
            if (file.type.startsWith('image/')) {
                const reader = new FileReader();
                const base64 = await new Promise((res) => {
                    reader.onload = () => res(reader.result.split(',')[1]);
                    reader.readAsDataURL(file);
                });
                await this.githubCommit(owner, repo, `${exam}/${testId}/${file.name}`, base64, `Add image for ${exam} #${testId}`, true);
            }
        }
    },

    async githubCommit(owner, repo, path, content, message, isBase64 = false) {
        const token = this.state.githubToken;
        const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
        
        const resGet = await fetch(url, { headers: { Authorization: `Bearer ${token}` } });
        let sha = null;
        if (resGet.ok) {
            const data = await resGet.json();
            sha = data.sha;
        }

        const body = {
            message,
            content: isBase64 ? content : this.toBase64(content),
            sha
        };

        const resPut = await fetch(url, {
            method: 'PUT',
            headers: { 
                Authorization: `Bearer ${token}`, 
                'Content-Type': 'application/json',
                'Accept': 'application/vnd.github+json'
            },
            body: JSON.stringify(body)
        });

        if (!resPut.ok) {
            const err = await resPut.json();
            console.error('GitHub API Error:', err);
            throw new Error(`${err.message} (${path})`);
        }
    },

    toBase64(str) {
        return btoa(encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (match, p1) => String.fromCharCode('0x' + p1)));
    },

    initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const context = canvas.getContext('2d');
        let width, height;
        const particles = [];
        const resize = () => { width = canvas.width = window.innerWidth; height = canvas.height = window.innerHeight; };
        window.addEventListener('resize', resize);
        resize();
        for (let i = 0; i < 40; i++) particles.push({ x: Math.random() * width, y: Math.random() * height, vx: (Math.random() - 0.5) * 0.18, vy: (Math.random() - 0.5) * 0.18, size: Math.random() * 1.8 + 0.5 });
        const animate = () => {
            context.clearRect(0, 0, width, height);
            context.fillStyle = 'rgba(125, 211, 252, 0.45)';
            particles.forEach((p) => {
                p.x += p.vx; p.y += p.vy;
                if (p.x < 0) p.x = width; if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height; if (p.y > height) p.y = 0;
                context.beginPath(); context.arc(p.x, p.y, p.size, 0, Math.PI * 2); context.fill();
            });
            requestAnimationFrame(animate);
        };
        animate();
    },

    startDemo() {
        // Find the first exam that has a demo test
        for (const exam of Object.keys(EXAMS_METADATA)) {
            if (EXAMS_METADATA[exam]['demo']) {
                this.state.exam = exam;
                this.renderView('quiz', { exam, testId: 'demo' });
                return;
            }
        }
        // If no demo, go to home
        this.renderView('home');
    },

    getGlobalStats() {
        let tests = 0;
        let questions = 0;
        Object.values(EXAMS_METADATA).forEach(category => {
            tests += Object.keys(category).length;
            Object.values(category).forEach(qCount => questions += qCount);
        });
        return { tests, totalQuestions: questions };
    }
};

window.onload = () => app.init();
