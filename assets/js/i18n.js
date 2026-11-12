/* ============================================================
   ProMakers — i18n (RU / EN / ZH)
   Перевод хранится в одном словаре; переключение — через
   data-i18n атрибуты в разметке, выбор сохраняется в localStorage.
   ============================================================ */

const I18N = {
  ru: {
    "nav.services": "Услуги",
    "nav.industries": "Компетенции",
    "nav.contact": "Контакты",
    "nav.cta": "Получить консультацию",

    "hero.badge": "IT-консалтинг · Разработка · Инфраструктура",
    "hero.title": "Экспертный IT-консалтинг и цифровая трансформация",
    "hero.subtitle": "Предоставляем полный спектр консалтинговых услуг: от глубокого аудита текущих процессов до построения сложной микросервисной архитектуры и выстраивания отказоустойчивой инфраструктуры.",
    "hero.cta": "Получить консультацию",
    "hero.cta2": "Наши услуги",

    "stats.1.label": "Профильных экспертов в штате",
    "stats.2.label": "Лет суммарного опыта в индустрии",
    "stats.3.label": "Сопровождение проектов любого масштаба",

    "services.eyebrow": "Что мы делаем",
    "services.title": "Наши консалтинговые услуги",

    "services.1.title": "AI-трансформация бизнеса",
    "services.1.item1": "Аудит готовности процессов к интеграции искусственного интеллекта и генеративных моделей",
    "services.1.item2": "Проектирование и внедрение AI-агентов, LLM и умных ассистентов для автоматизации операций",
    "services.1.item3": "Оптимизация клиентского сервиса и внутренних систем на базе предиктивной аналитики",

    "services.2.title": "Комплексное импортозамещение",
    "services.2.item1": "Технологический аудит ИТ-ландшафта и составление стратегии бесшовной миграции",
    "services.2.item2": "Перенос систем на независимый стек технологий (Astra Linux, РЕД ОС)",
    "services.2.item3": "Миграция баз данных со сторонних платформ (Oracle, MS SQL) на СУБД Postgres Pro",

    "services.3.title": "Стратегический консалтинг",
    "services.3.item1": "Аудит, выявление «узких мест» и оптимизация бизнес-процессов (BPMN, UML)",
    "services.3.item2": "Разработка цифровых стратегий, оценка проектов и инвестиционное планирование",
    "services.3.item3": "Продуктовый консалтинг, тестирование гипотез и управление бэклогами",

    "services.4.title": "Архитектура и интеграция",
    "services.4.item1": "Проектирование целевой архитектуры высоконагруженных микросервисных платформ",
    "services.4.item2": "Интеграционный консалтинг (проектирование API, очередей данных, стриминга)",
    "services.4.item3": "Комплаенс-контроль изменений на соответствие требованиям безопасности",

    "services.5.title": "Внедрение и оптимизация АБС ЦФТ",
    "services.5.item1": "Полный цикл консалтинга при переходе на платформы ЦФТ-Банк / ЦФТ-Ритейл",
    "services.5.item2": "Развертывание ЦФТ в архитектуре 2MCA DBI с учетом требований к ЗОКИИ",
    "services.5.item3": "Аудит, анализ и оптимизация производительности СУБД (Oracle, PostgreSQL)",

    "services.6.title": "Автоматизация процессов и DevOps",
    "services.6.item1": "Аудит, проектирование и настройка CI/CD пайплайнов (GitLab, Jenkins)",
    "services.6.item2": "Внедрение подхода «Инфраструктура как код» (IaC: Ansible, Vault)",
    "services.6.item3": "Контейнеризация (Docker, Kubernetes) и оптимизация серверных затрат",

    "industries.eyebrow": "Где мы сильны",
    "industries.title": "Отраслевые компетенции",

    "industries.1.title": "Финтех и Банковский сектор",
    "industries.1.text": "Глубокая экспертиза в проектировании межбанковских расчетов, систем дистанционного банковского обслуживания (ДБО), расчетных модулей (СБП, цифровой рубль) и запуске современных платежных инструментов.",

    "industries.2.title": "Госплатформы и Цифровизация",
    "industries.2.text": "Практический опыт методологического сопровождения проектов на платформе ГосТех / ГосОблако, а также проектирования сложных информационных систем для министерств и ведомств.",

    "industries.3.title": "Международный консалтинг",
    "industries.3.text": "Методологическая поддержка международных интеграционных проектов, включая сопровождение процессов открытия зарубежных филиалов и дочерних банков (в т.ч. в КНР).",

    "contact.eyebrow": "Свяжитесь с нами",
    "contact.title": "Заказать IT-аудит и консалтинг",
    "contact.text": "Оставьте заявку — эксперт свяжется с вами в течение рабочего дня, проведет первичный разбор задачи и предложит план действий.",
    "contact.emailLabel": "Почта для заявок",
    "contact.siteLabel": "Сайт",
    "contact.qrCaption": "Наведите камеру, чтобы открыть сайт",

    "form.name": "Имя",
    "form.namePh": "Как к вам обращаться",
    "form.company": "Компания",
    "form.companyPh": "Название организации",
    "form.optional": "(необязательно)",
    "form.email": "E-mail",
    "form.phone": "Телефон",
    "form.phonePh": "+7 (___) ___-__-__",
    "form.message": "Задача",
    "form.messagePh": "Опишите вашу задачу",
    "form.submit": "Отправить заявку",
    "form.note": "Нажимая кнопку, вы соглашаетесь с политикой обработки персональных данных",
    "form.success": "Заявка отправлена! Мы свяжемся с вами в ближайшее время.",

    "footer.tagline": "Проектируем цифровое будущее бизнеса",
    "footer.rights": "Все права защищены.",

    "_meta.title": "ProMakers — Экспертный IT-консалтинг и цифровая трансформация",
    "_meta.description": "Полный спектр IT-консалтинговых услуг: AI-трансформация, импортозамещение, архитектура, DevOps, АБС ЦФТ."
  },

  en: {
    "nav.services": "Services",
    "nav.industries": "Expertise",
    "nav.contact": "Contact",
    "nav.cta": "Get a consultation",

    "hero.badge": "IT Consulting · Engineering · Infrastructure",
    "hero.title": "Expert IT consulting and digital transformation",
    "hero.subtitle": "We provide a full range of consulting services: from in-depth audits of your current processes to designing complex microservice architectures and building fault-tolerant infrastructure.",
    "hero.cta": "Get a consultation",
    "hero.cta2": "Our services",

    "stats.1.label": "Dedicated domain experts on staff",
    "stats.2.label": "Combined years of industry experience",
    "stats.3.label": "End-to-end delivery of projects of any scale",

    "services.eyebrow": "What we do",
    "services.title": "Our consulting services",

    "services.1.title": "AI business transformation",
    "services.1.item1": "Readiness audit of processes for integrating artificial intelligence and generative models",
    "services.1.item2": "Design and implementation of AI agents, LLMs and smart assistants to automate operations",
    "services.1.item3": "Optimization of customer service and internal systems based on predictive analytics",

    "services.2.title": "Comprehensive technology substitution",
    "services.2.item1": "Technology audit of the IT landscape and a seamless migration strategy",
    "services.2.item2": "Migration of systems to an independent technology stack (Astra Linux, RED OS)",
    "services.2.item3": "Database migration from third-party platforms (Oracle, MS SQL) to Postgres Pro",

    "services.3.title": "Strategic consulting",
    "services.3.item1": "Audit, bottleneck analysis and business process optimization (BPMN, UML)",
    "services.3.item2": "Digital strategy development, project assessment and investment planning",
    "services.3.item3": "Product consulting, hypothesis testing and backlog management",

    "services.4.title": "Architecture and integration",
    "services.4.item1": "Design of target architecture for high-load microservice platforms",
    "services.4.item2": "Integration consulting (API design, data queues, streaming)",
    "services.4.item3": "Compliance control of changes against security requirements",

    "services.5.title": "CFT banking system implementation",
    "services.5.item1": "Full-cycle consulting for migrating to CFT-Bank / CFT-Retail platforms",
    "services.5.item2": "CFT deployment in a 2MCA DBI architecture meeting Class-1 security zone requirements",
    "services.5.item3": "Audit, analysis and optimization of database performance (Oracle, PostgreSQL)",

    "services.6.title": "Process automation and DevOps",
    "services.6.item1": "Audit, design and configuration of CI/CD pipelines (GitLab, Jenkins)",
    "services.6.item2": "Infrastructure as Code adoption (IaC: Ansible, Vault)",
    "services.6.item3": "Containerization (Docker, Kubernetes) and server cost optimization",

    "industries.eyebrow": "Where we excel",
    "industries.title": "Industry expertise",

    "industries.1.title": "Fintech and banking",
    "industries.1.text": "Deep expertise in designing interbank settlement systems, remote banking platforms (RBS), payment modules (SBP instant payments, digital ruble) and launching modern payment instruments.",

    "industries.2.title": "GovTech platforms and digitalization",
    "industries.2.text": "Hands-on experience in methodological support of projects on the GosTech / GosCloud platform, as well as designing complex information systems for ministries and government agencies.",

    "industries.3.title": "International consulting",
    "industries.3.text": "Methodological support for international integration projects, including opening foreign branches and subsidiary banks (including in the PRC).",

    "contact.eyebrow": "Get in touch",
    "contact.title": "Request an IT audit and consulting",
    "contact.text": "Leave a request — an expert will contact you within one business day, review your task and propose an action plan.",
    "contact.emailLabel": "Email for requests",
    "contact.siteLabel": "Website",
    "contact.qrCaption": "Point your camera to open the website",

    "form.name": "Name",
    "form.namePh": "How should we address you",
    "form.company": "Company",
    "form.companyPh": "Organization name",
    "form.optional": "(optional)",
    "form.email": "E-mail",
    "form.phone": "Phone",
    "form.phonePh": "+1 (___) ___-____",
    "form.message": "Your task",
    "form.messagePh": "Describe your task",
    "form.submit": "Send request",
    "form.note": "By clicking the button, you agree to the personal data processing policy",
    "form.success": "Request sent! We will contact you shortly.",

    "footer.tagline": "Designing the digital future of business",
    "footer.rights": "All rights reserved.",

    "_meta.title": "ProMakers — Expert IT Consulting and Digital Transformation",
    "_meta.description": "Full-range IT consulting: AI transformation, technology substitution, architecture, DevOps, CFT banking systems."
  },

  zh: {
    "nav.services": "服务",
    "nav.industries": "专业能力",
    "nav.contact": "联系我们",
    "nav.cta": "获取咨询",

    "hero.badge": "IT 咨询 · 研发 · 基础设施",
    "hero.title": "专业的 IT 咨询与数字化转型",
    "hero.subtitle": "我们提供全方位的咨询服务：从对现有流程的深入审计，到复杂微服务架构的设计以及高可用基础设施的搭建。",
    "hero.cta": "获取咨询",
    "hero.cta2": "我们的服务",

    "stats.1.label": "专职领域专家",
    "stats.2.label": "行业累计经验（年）",
    "stats.3.label": "端到端承接任意规模的项目",

    "services.eyebrow": "我们的业务",
    "services.title": "我们的咨询服务",

    "services.1.title": "AI 业务转型",
    "services.1.item1": "流程人工智能与生成式模型集成准备度审计",
    "services.1.item2": "设计与部署 AI 智能体、大语言模型（LLM）及智能助手，实现运营自动化",
    "services.1.item3": "基于预测分析优化客户服务与内部系统",

    "services.2.title": "全面技术栈替代",
    "services.2.item1": "IT 格局技术审计与无缝迁移战略制定",
    "services.2.item2": "系统迁移至自主技术栈（Astra Linux、RED OS）",
    "services.2.item3": "数据库从第三方平台（Oracle、MS SQL）迁移至 Postgres Pro",

    "services.3.title": "战略咨询",
    "services.3.item1": "审计、瓶颈识别与业务流程优化（BPMN、UML）",
    "services.3.item2": "数字战略制定、项目评估与投资规划",
    "services.3.item3": "产品咨询、假设验证与需求池（Backlog）管理",

    "services.4.title": "架构与集成",
    "services.4.item1": "高负载微服务平台目标架构设计",
    "services.4.item2": "集成咨询（API 设计、数据队列、流式处理）",
    "services.4.item3": "变更合规性审查，确保安全要求符合性",

    "services.5.title": "CFT 银行系统实施与优化",
    "services.5.item1": "迁移至 ЦФТ-Банк / ЦФТ-Ритейл 平台的全周期咨询",
    "services.5.item2": "按 2MCA DBI 架构部署 ЦФТ，满足关键信息基础设施安全区要求",
    "services.5.item3": "数据库性能审计、分析与优化（Oracle、PostgreSQL）",

    "services.6.title": "流程自动化与 DevOps",
    "services.6.item1": "CI/CD 流水线审计、设计与配置（GitLab、Jenkins）",
    "services.6.item2": "“基础设施即代码”落地（IaC：Ansible、Vault）",
    "services.6.item3": "容器化（Docker、Kubernetes）与服务器成本优化",

    "industries.eyebrow": "我们的优势领域",
    "industries.title": "行业专业能力",

    "industries.1.title": "金融科技与银行业",
    "industries.1.text": "在银行间结算系统、远程银行服务系统（ДБО）、支付模块（СБП 快速支付系统、数字卢布）设计以及现代支付工具上线方面拥有深厚经验。",

    "industries.2.title": "政务平台与数字化",
    "industries.2.text": "在 ГосТех / ГосОблако 平台上为项目提供方法论支持的实践经验，以及为各部委和政府部门设计复杂信息系统的经验。",

    "industries.3.title": "国际咨询",
    "industries.3.text": "为国际集成项目提供方法论支持，包括协助开设海外分行及子银行（包括在中国）。",

    "contact.eyebrow": "联系我们",
    "contact.title": "预约 IT 审计与咨询",
    "contact.text": "提交需求后，专家将在一个工作日内与您联系，对任务进行初步分析并提出行动方案。",
    "contact.emailLabel": "需求邮箱",
    "contact.siteLabel": "网站",
    "contact.qrCaption": "扫描二维码访问网站",

    "form.name": "姓名",
    "form.namePh": "如何称呼您",
    "form.company": "公司",
    "form.companyPh": "组织名称",
    "form.optional": "(选填)",
    "form.email": "电子邮箱",
    "form.phone": "电话",
    "form.phonePh": "+86 ___ ____ ____",
    "form.message": "您的需求",
    "form.messagePh": "请描述您的需求",
    "form.submit": "提交需求",
    "form.note": "点击按钮即表示您同意个人信息处理政策",
    "form.success": "需求已提交！我们将尽快与您联系。",

    "footer.tagline": "为企业设计数字未来",
    "footer.rights": "版权所有。",

    "_meta.title": "ProMakers — 专业的 IT 咨询与数字化转型",
    "_meta.description": "全方位 IT 咨询服务：AI 转型、技术栈替代、架构设计、DevOps、CFT 银行系统。"
  }
};

/* ---------- Language switching ---------- */

const I18N_STORAGE_KEY = "promakers-lang";
const I18N_SUPPORTED = ["ru", "en", "zh"];

function i18nDetect() {
  const saved = localStorage.getItem(I18N_STORAGE_KEY);
  if (saved && I18N_SUPPORTED.includes(saved)) return saved;
  const nav = (navigator.language || "ru").slice(0, 2).toLowerCase();
  return I18N_SUPPORTED.includes(nav) ? nav : "ru";
}

function i18nApply(lang) {
  if (!I18N_SUPPORTED.includes(lang)) lang = "ru";
  const dict = I18N[lang];

  document.documentElement.lang = lang;
  document.title = dict["_meta.title"];
  const metaDesc = document.getElementById("meta-description");
  if (metaDesc) metaDesc.setAttribute("content", dict["_meta.description"]);

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.getAttribute("data-i18n");
    if (dict[key] !== undefined) el.textContent = dict[key];
  });

  document.querySelectorAll("[data-i18n-ph]").forEach((el) => {
    const key = el.getAttribute("data-i18n-ph");
    if (dict[key] !== undefined) el.setAttribute("placeholder", dict[key]);
  });

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.classList.toggle("is-active", btn.dataset.lang === lang);
  });

  localStorage.setItem(I18N_STORAGE_KEY, lang);
  document.dispatchEvent(new CustomEvent("langchange", { detail: { lang } }));
}

document.addEventListener("DOMContentLoaded", () => {
  i18nApply(i18nDetect());

  document.querySelectorAll(".lang-switch__btn").forEach((btn) => {
    btn.addEventListener("click", () => i18nApply(btn.dataset.lang));
  });
});
