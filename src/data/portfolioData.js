const BASE_URL = import.meta.env.BASE_URL || './';
export const getAssetPath = (path) => {
  if (!path) return '';
  if (path.startsWith('http')) return path;
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  return BASE_URL.endsWith('/') ? `${BASE_URL}${cleanPath}` : `${BASE_URL}/${cleanPath}`;
};

export const PERSONAL_INFO = {
  name: "Rounak Pathak",
  title: "Data Analyst | Machine Learning Engineer | AI Developer",
  location: "Pune, Maharashtra, India",
  taglines: [
    "Machine Learning Engineer",
    "AI Developer & Data Analyst",
    "Full-Stack Web Developer (React + FastAPI & Django)",
    "B.Tech Computer Engineering (CGPA 8.7)"
  ],
  bio: "Motivated and detail-oriented Computer Science & Engineering student at Bharati Vidyapeeth College of Engineering Pune (CGPA: 8.7), specializing in data analysis, machine learning, and AI development. Skilled in building predictive models, developing intelligent applications (FastAPI, React, Django), and delivering actionable data insights.",
  email: "rounakpathak9080@gmail.com",
  phone: "+91 8789355439",
  github: "https://github.com/rounak-98",
  linkedin: "https://www.linkedin.com/in/rounak-pathak-765a25274",
  resumePath: getAssetPath("Rounak_Pathak_Resume.pdf"),
  avatar: getAssetPath("rounak.jpeg"),
  languages: ["English (Professional)", "Hindi (Fluent)", "Marathi (Fluent)"],
  stats: {
    certificates: 19,
    projects: 6,
    skills: 25,
    cgpa: "8.7"
  }
};

export const EXPERIENCE = [
  {
    role: "AI Developer Intern",
    company: "Infosys Springboard Internship 7.0 (Virtual)",
    period: "Ongoing",
    status: "Virtual Internship",
    type: "Internship",
    demo: "https://food-redistribution-ai.vercel.app/",
    details: "Developing the Food Bridge AI platform for Waste Reduction and Surplus Inventory Management. Building demand forecasting, inventory management, and intelligent donor-recipient matching modules using Python, FastAPI, React, Pandas, NumPy, Scikit-learn, MySQL, and Streamlit."
  },
  {
    role: "Freelance Full-Stack Developer",
    company: "Arus Homes Developers",
    period: "Client Project",
    status: "Freelance",
    type: "Freelance",
    demo: "#",
    details: "Engineered the Aurus Homes ERP Enterprise System using Next.js 14, TypeScript, React, Tailwind CSS, Google Gemini AI API, Recharts, and jsPDF. Built role-based executive dashboards for sales ledgers, site procurement, accounts, and automated PDF booking agreements."
  }
];

export const EDUCATION = [
  {
    degree: "B.Tech in Computer Engineering",
    institution: "Bharati Vidyapeeth College of Engineering, Pune",
    period: "2023 - 2027",
    status: "Current CGPA: 8.7 / 10",
    details: "Specializing in Data Analysis, Machine Learning, Deep Learning, Applied AI, and Software Engineering."
  },
  {
    degree: "12th Standard (Science, CHSE)",
    institution: "Saint Francis School",
    period: "2021 - 2023",
    status: "Score: 80.4%",
    details: "Focus on Physics, Chemistry, Mathematics, and Computer Science."
  },
  {
    degree: "10th Standard (High School)",
    institution: "Saint Francis School",
    period: "2021",
    status: "Score: 93.0%",
    details: "Academic distinction with excellence in Mathematics & Science."
  }
];

export const SKILLS_CATEGORIES = [
  {
    id: "genai-llm",
    title: "Generative AI, LLMs & Prompting",
    icon: "Sparkles",
    color: "from-cyan-500 to-indigo-600",
    skills: [
      { name: "Prompt Engineering & OpenAI GPT Models", level: 94, tag: "Master", project: "Food Bridge AI & Portfolio Chatbot" },
      { name: "RAG & Knowledge Retrieval Systems", level: 88, tag: "Advanced", project: "AI Chatbot & Knowledge Base" },
      { name: "LangChain & LlamaIndex Concepts", level: 85, tag: "Advanced", project: "AI Portfolio Assistant" },
      { name: "Transformers & HuggingFace Models", level: 84, tag: "Advanced", project: "NLP Text Generation" },
      { name: "AI Agent Orchestration & System Prompts", level: 90, tag: "Expert", project: "Antigravity Agentic Workflows" }
    ]
  },
  {
    id: "ml-ai-nlp",
    title: "Machine Learning & Deep Learning",
    icon: "Brain",
    color: "from-purple-500 to-indigo-600",
    skills: [
      { name: "Machine Learning (Supervised/Unsupervised)", level: 92, tag: "Expert", project: "Movie Recommendation & EDA Suite" },
      { name: "ML Algorithms (Random Forest, XGBoost, SVM, KNN)", level: 90, tag: "Expert", project: "Demand Forecasting & Analytics" },
      { name: "Deep Learning (TensorFlow, PyTorch, Keras)", level: 85, tag: "Advanced", project: "Neural Network Classification" },
      { name: "NLP Techniques (NER, TF-IDF, POS Tagging)", level: 88, tag: "Advanced", project: "Movie Recommendation Engine" },
      { name: "Computer Vision & OpenCV", level: 82, tag: "Proficient", project: "Visual Processing Systems" }
    ]
  },
  {
    id: "web-frameworks",
    title: "Full-Stack Frameworks & Web Dev",
    icon: "Code2",
    color: "from-blue-500 to-cyan-600",
    skills: [
      { name: "FastAPI & Asynchronous REST APIs", level: 90, tag: "Expert", project: "Food Bridge AI Backend" },
      { name: "Django & Flask", level: 88, tag: "Advanced", project: "BizzApp & Recommendation API" },
      { name: "React.js & Tailwind CSS v4", level: 92, tag: "Expert", project: "Food Bridge AI & Arus Homes" },
      { name: "JavaScript (ES6+) & HTML5/CSS3", level: 90, tag: "Expert", project: "Arus Homes Real Estate App" },
      { name: "Streamlit & Gradio AI Dashboards", level: 92, tag: "Expert", project: "AI-Powered EDA Analytics Suite" }
    ]
  },
  {
    id: "data-bi-viz",
    title: "Data Analytics, BI & Databases",
    icon: "Database",
    color: "from-emerald-500 to-teal-600",
    skills: [
      { name: "Python (Pandas, NumPy, Scikit-Learn)", level: 95, tag: "Master", project: "EDA Data Science Suite" },
      { name: "SQL & MySQL Relational Schema", level: 88, tag: "Advanced", project: "BizzApp, Library & School Systems" },
      { name: "Matplotlib & Seaborn Visualization", level: 90, tag: "Expert", project: "EDA Data Analytics Profiling" },
      { name: "Power BI & Tableau Dashboarding", level: 85, tag: "Advanced", project: "Business Intelligence Reports" },
      { name: "Data Cleaning & Feature Engineering", level: 90, tag: "Expert", project: "Infosys Food Waste Analytics" }
    ]
  },
  {
    id: "tools-ides",
    title: "Tools, DevOps & Cloud Deployment",
    icon: "Wrench",
    color: "from-amber-500 to-orange-600",
    skills: [
      { name: "Git & GitHub Version Control", level: 92, tag: "Expert", project: "All Software Repositories" },
      { name: "Vercel & Render Cloud Deployment", level: 90, tag: "Expert", project: "Food Bridge AI & BizzApp" },
      { name: "VS Code, PyCharm, Jupyter Notebook", level: 95, tag: "Master", project: "Development IDEs" },
      { name: "Agile & Scrum Methodologies", level: 85, tag: "Advanced", project: "Infosys Internship Workflow" },
      { name: "Robotic Process Automation (RPA)", level: 78, tag: "Intermediate", project: "Automation Scripts" }
    ]
  }
];

export const PROJECTS = [
  {
    id: "food-bridge-ai",
    title: "Food Bridge AI - Redistribution Platform",
    category: "Full Stack & Web",
    type: "experience",
    client: "Infosys Springboard Internship 7.0",
    featured: true,
    github: "https://github.com/rounak-98",
    demo: "https://food-redistribution-ai.vercel.app/",
    summary: "A smart full-stack AI platform built during Infosys Springboard Internship 7.0 connecting surplus food donors with local NGOs.",
    description: "Built using React.js, FastAPI (Python), MySQL, and Tailwind CSS. Features real-time donor listings with geo-tagging, automated claim notifications, demand forecasting algorithms, and NGO pickup dispatching. Deployed live on Vercel.",
    tags: ["React", "FastAPI", "Python", "REST API", "MySQL", "Tailwind CSS", "Vercel"],
    highlights: [
      "FastAPI asynchronous backend for instant claim logging & surplus matching",
      "Interactive React donor & NGO claim dashboard with real-time alerts",
      "Real-time food waste analytics tracking total meals saved & carbon footprint reduced"
    ],
    gradient: "from-emerald-500/20 to-teal-500/20",
    border: "border-emerald-500/30"
  },
  {
    id: "arus-homes",
    title: "Aurus Homes ERP - Real Estate & Construction System",
    category: "Full Stack & Web",
    type: "experience",
    client: "Arus Homes Developers (Freelance)",
    featured: true,
    github: "https://github.com/rounak-98",
    demo: "#",
    summary: "Full-scale Enterprise Resource Planning (ERP) platform engineered for Arus Homes Developers to automate sales ledgers, construction procurement, and financial analytics.",
    description: "Engineered a full-scale Next.js 14 ERP system for Arus Homes Developers. Integrated Google Gemini AI for predictive cash flow forecasting, Recharts for executive sales dashboards, jsPDF for automated PDF booking agreements, and JWT role-based access control.",
    tags: ["Next.js 14", "TypeScript", "React", "Tailwind CSS", "Gemini AI API", "Recharts", "jsPDF", "MySQL"],
    highlights: [
      "Role-based executive dashboards (Sales, Procurement, Accounts, Site Manager, Admin) with JWT authentication",
      "Automated PDF booking agreement & payment receipt generator powered by jsPDF",
      "Google Gemini AI integration for real estate financial forecasting & construction cost analytics"
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30"
  },
  {
    id: "eda-analysis",
    title: "AI-Powered EDA & Data Analytics Suite",
    category: "AI & Data Science",
    featured: true,
    github: "https://github.com/rounak-98",
    demo: "#",
    summary: "Comprehensive AI-assisted Exploratory Data Analysis repository utilizing Python data science stack, machine learning models, and automated visual dashboards.",
    description: "An advanced data science platform performing automated statistical profiling, feature correlation analysis, outlier detection, and AI-assisted data insights. Generates interactive Seaborn/Plotly visual charts and Streamlit summary reports.",
    tags: ["Python", "Pandas", "NumPy", "Scikit-Learn", "Seaborn/Matplotlib", "Streamlit", "Power BI"],
    highlights: [
      "AI-driven automated feature distribution & correlation profiling",
      "Outlier detection and missing data imputation algorithms",
      "Interactive Streamlit & Power BI data insight dashboards"
    ],
    gradient: "from-purple-500/20 to-indigo-500/20",
    border: "border-purple-500/30"
  },
  {
    id: "bizzapp",
    title: "BizzApp - Business Management & Ops Platform",
    category: "Full Stack & Web",
    featured: true,
    github: "https://github.com/rounak-98",
    demo: "https://bizzapp.onrender.com",
    summary: "Enterprise operations platform built with Django backend for SMBs to streamline inventory, invoicing, sales metrics, and staff roles.",
    description: "BizzApp utilizes Django's robust MVC architecture and relational database management to provide small/medium businesses with an all-in-one operations hub. Includes automated PDF invoice generation, real-time stock alerts, and role-based permissions.",
    tags: ["Django", "Python", "JavaScript", "MySQL", "HTML5/CSS3", "Bootstrap/Tailwind"],
    highlights: [
      "Django ORM and relational database schema for fast inventory tracking",
      "Automated PDF invoice generator & sales analytics dashboard",
      "Role-based authentication & admin permission controls"
    ],
    gradient: "from-cyan-500/20 to-blue-500/20",
    border: "border-cyan-500/30"
  },
  {
    id: "movie-recommendation",
    title: "Movie Recommendation Engine",
    category: "AI & Data Science",
    featured: true,
    github: "https://github.com/rounak-98",
    demo: "#",
    summary: "Intelligent recommendation engine using TF-IDF vectorization and Cosine Similarity to recommend movies based on user preferences.",
    description: "Combines content-based filtering algorithms and Python data science stack to calculate metadata similarity scores and recommend top-matching films.",
    tags: ["Python", "Scikit-Learn", "Flask", "MySQL", "Pandas", "TF-IDF"],
    highlights: [
      "TF-IDF vectorizer & Cosine Similarity score engine",
      "Dynamic search interface with film poster metadata",
      "Flask REST API serving real-time movie recommendations"
    ],
    gradient: "from-pink-500/20 to-rose-500/20",
    border: "border-pink-500/30"
  },
  {
    id: "school-management",
    title: "School Management System",
    category: "Full Stack & Web",
    featured: true,
    github: "https://github.com/rounak-98",
    demo: "#",
    summary: "Full-stack educational management portal for managing student records, attendance, grades, and teacher rosters.",
    description: "Designed for high data security and usability, allowing school administrators to manage class enrollments, compute grade point averages, and print student progress reports.",
    tags: ["Django / Python", "MySQL", "JavaScript", "HTML/CSS"],
    highlights: [
      "Centralized student directory with search & filter logic",
      "Automated grade calculation & attendance tracking",
      "Relational database schema optimized for academic records"
    ],
    gradient: "from-amber-500/20 to-orange-500/20",
    border: "border-amber-500/30"
  },
  {
    id: "library-management",
    title: "Library Management System",
    category: "Full Stack & Web",
    featured: false,
    github: "https://github.com/rounak-98",
    demo: "https://library-management-6-4y0b.onrender.com/",
    summary: "Digital catalog and inventory tracker managing book checkouts, returns, overdue fine calculations, and member logs.",
    description: "Streamlines library operations with book ISBN lookups, due date tracking, automated fine calculations, and stock availability management.",
    tags: ["Python / C++", "MySQL", "Data Structures", "SQL"],
    highlights: [
      "Instant issue and return checkouts with status tracking",
      "Overdue alert logs & fine computation algorithm",
      "Multi-field search filter by Title, Author, or Category"
    ],
    gradient: "from-blue-500/20 to-cyan-500/20",
    border: "border-blue-500/30"
  }
];

export const CERTIFICATES = [
  {
    id: 1,
    title: "Introduction to Machine Learning",
    issuer: "NPTEL / IIT Kharagpur",
    category: "NPTEL & Academics",
    file: getAssetPath("CERTIFICATES/Introduction to Machine Learning NPTEL.pdf"),
    tags: ["Machine Learning", "Supervised Learning", "Classification", "Algorithms"],
    date: "2024",
    highlight: "Elite / Academic Certification"
  },
  {
    id: 2,
    title: "Data Base Management System",
    issuer: "NPTEL / IIT",
    category: "NPTEL & Academics",
    file: getAssetPath("CERTIFICATES/Data Base Management System NPTEL.pdf"),
    tags: ["DBMS", "SQL", "Relational Algebra", "Database Architecture"],
    date: "2024",
    highlight: "Core Computer Science Certification"
  },
  {
    id: 3,
    title: "OpenAI GPT-3 for Developers",
    issuer: "OpenAI Developer Hub",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/OpenAI Generative Pre-trained Transformer 3 (GPT-3) for developers.pdf"),
    tags: ["GPT-3", "OpenAI API", "Prompt Tuning", "LLM Apps"],
    date: "2024",
    highlight: "Advanced LLM Development"
  },
  {
    id: 4,
    title: "Introduction to OpenAI GPT Models",
    issuer: "AI Academy",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Introduction to OpenAI GPT Models.pdf"),
    tags: ["GPT Models", "Transformers", "Generative AI"],
    date: "2024",
    highlight: "Generative AI Foundations"
  },
  {
    id: 5,
    title: "Principles of Generative AI Certification",
    issuer: "Generative AI Institute",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Principles of Generative AI Certification.pdf"),
    tags: ["GenAI", "Architecture", "Ethics", "Diffusion Models"],
    date: "2024",
    highlight: "Certified Principles"
  },
  {
    id: 6,
    title: "Prompt Engineering",
    issuer: "Prompt Engineering Org",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Prompt Engineering.pdf"),
    tags: ["Prompt Design", "Zero-Shot/Few-Shot", "System Rules"],
    date: "2024",
    highlight: "Prompt Design Mastery"
  },
  {
    id: 7,
    title: "Generative AI Unleashing",
    issuer: "Tech Academy",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Generative AI Unleashing.pdf"),
    tags: ["Generative Models", "AI Innovation", "Workflows"],
    date: "2024",
    highlight: "AI Capabilities Specialist"
  },
  {
    id: 8,
    title: "Generative Models for Developers",
    issuer: "Developer Institute",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Generative models for developers.pdf"),
    tags: ["Generative Models", "PyTorch", "APIs"],
    date: "2024",
    highlight: "Developer Applications"
  },
  {
    id: 9,
    title: "Deep Learning for Developers",
    issuer: "Deep Learning Labs",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Deep Learning for Developers.pdf"),
    tags: ["Deep Learning", "CNNs", "RNNs", "Model Training"],
    date: "2024",
    highlight: "Deep Neural Networks"
  },
  {
    id: 10,
    title: "Introduction to Deep Learning",
    issuer: "AI Research Academy",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Introduction to Deep Learning.pdf"),
    tags: ["Deep Learning", "Backpropagation", "Optimizers"],
    date: "2024",
    highlight: "Foundational Neural Networks"
  },
  {
    id: 11,
    title: "Computer Vision 101",
    issuer: "Vision Tech Institute",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Computer Vision 101.pdf"),
    tags: ["Computer Vision", "OpenCV", "Image Processing"],
    date: "2024",
    highlight: "Visual Intelligence"
  },
  {
    id: 12,
    title: "Introduction to Natural Language Processing",
    issuer: "NLP Research Hub",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Introduction to Natural Language Processing.pdf"),
    tags: ["NLP", "Text Mining", "Sentiment Analysis", "Transformers"],
    date: "2024",
    highlight: "Text & Language Modeling"
  },
  {
    id: 13,
    title: "Artificial Intelligence Primer Certification",
    issuer: "AI Global Alliance",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Artificial Intelligence Primer Certification.pdf"),
    tags: ["AI Fundamentals", "Knowledge Representation"],
    date: "2024",
    highlight: "Certified AI Primer"
  },
  {
    id: 14,
    title: "Artificial Intelligence",
    issuer: "Tech Certification Body",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Artificial Intelligence.pdf"),
    tags: ["Artificial Intelligence", "Search & Logic"],
    date: "2024",
    highlight: "Comprehensive AI Concepts"
  },
  {
    id: 15,
    title: "Introduction to Artificial Intelligence",
    issuer: "Global Tech Academy",
    category: "AI & GenAI",
    file: getAssetPath("CERTIFICATES/Introduction to Artificial Intelligence.pdf"),
    tags: ["AI Core", "Heuristics", "Expert Systems"],
    date: "2024",
    highlight: "AI Core Foundations"
  },
  {
    id: 16,
    title: "Introduction to Data Science",
    issuer: "Data Science Institute",
    category: "Data Science & ML",
    file: getAssetPath("CERTIFICATES/Introduction to Data Science.pdf"),
    tags: ["Data Science", "Python", "Data Wrangling", "Visualization"],
    date: "2024",
    highlight: "Data Analytics Specialist"
  },
  {
    id: 17,
    title: "Agile Scrum in Practice",
    issuer: "Agile Alliance",
    category: "Software Engineering",
    file: getAssetPath("CERTIFICATES/Agile Scrum in Practice.pdf"),
    tags: ["Agile", "Scrum", "Sprint Planning", "Software Lifecycle"],
    date: "2024",
    highlight: "Agile Methodology Professional"
  },
  {
    id: 18,
    title: "Introduction to Robotic Process Automation",
    issuer: "RPA Automation Hub",
    category: "Software Engineering",
    file: getAssetPath("CERTIFICATES/Introduction to Robotic Process Automation.pdf"),
    tags: ["RPA", "Process Automation", "Workflows"],
    date: "2024",
    highlight: "Automation Engineering"
  },
  {
    id: 19,
    title: "Software Development Certification",
    issuer: "Naresh i Technologies",
    category: "Software Engineering",
    file: getAssetPath("CERTIFICATES/Naresh it certificate.pdf"),
    tags: ["Full Stack Development", "Programming", "Databases"],
    date: "2024",
    highlight: "Full-Stack Industry Training"
  }
];
