"use client";

const basePath = "/Educational Institute Management System Project";

export const educationalInstituteProject = {
  slug: "educational-institute-management-system",
  storeLinks: {
    appStore: "#gallery",
    googlePlay: "#features",
  },
  brandAssets: {
    logo: `${basePath}/Institute management application/school.png`,
    hero: `${basePath}/Institute management application/Screenshot_٢٠٢٦٠٥١١_٠٠٠٧٣٩.jpg`,
  },
  screenshots: [
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-13-58.png`,
      key: "dashboard-overview",
      title: {
        en: "Management dashboard",
        ar: "لوحة تحكم الإدارة",
      },
      description: {
        en: "A central dashboard gives the institute a clear view of students, teachers, finances, attendance, and daily operations.",
        ar: "لوحة مركزية تمنح إدارة المعهد رؤية واضحة للطلاب والمدرسين والمالية والحضور والعمليات اليومية.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-15-35.png`,
      key: "students",
      title: {
        en: "Student records",
        ar: "إدارة بيانات الطلاب",
      },
      description: {
        en: "Student profiles can be organized with class, section, parent, academic, and payment information.",
        ar: "يمكن تنظيم ملفات الطلاب وربطها بالصف والشعبة وولي الأمر والبيانات الأكاديمية والمالية.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-17-42.png`,
      key: "teachers-classes",
      title: {
        en: "Teachers and classes",
        ar: "المدرسون والصفوف",
      },
      description: {
        en: "The system connects teachers, subjects, classes, and sections inside one structured administration flow.",
        ar: "يربط النظام المدرسين والمواد والصفوف والشعب ضمن مسار إداري منظم واحد.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-18-11.png`,
      key: "attendance",
      title: {
        en: "Attendance tracking",
        ar: "متابعة الحضور",
      },
      description: {
        en: "Daily attendance can be recorded individually or in groups, with absence and lateness follow-up.",
        ar: "يدعم تسجيل الحضور اليومي بشكل فردي أو جماعي مع متابعة الغياب والتأخر.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-19-04.png`,
      key: "payments",
      title: {
        en: "Payments and balances",
        ar: "الدفعات والأرصدة",
      },
      description: {
        en: "Installments, discounts, expenses, paid amounts, and remaining balances are handled from one finance area.",
        ar: "تدار الأقساط والخصومات والمصاريف والمبالغ المدفوعة والأرصدة المتبقية من قسم مالي واحد.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-20-53.png`,
      key: "reports",
      title: {
        en: "Reports and decisions",
        ar: "التقارير واتخاذ القرار",
      },
      description: {
        en: "Academic, monthly, and financial reports help the administration monitor performance and make decisions.",
        ar: "تساعد التقارير الأكاديمية والشهرية والمالية الإدارة على متابعة الأداء واتخاذ القرارات.",
      },
    },
    {
      src: `${basePath}/Institute management application/Screenshot_٢٠٢٦٠٥١١_٠٠٠٢٢٠.jpg`,
      key: "institute-app",
      title: {
        en: "Institute mobile app",
        ar: "تطبيق إدارة المعهد",
      },
      description: {
        en: "The management experience is ready to connect with mobile workflows for daily institute operations.",
        ar: "تجربة الإدارة جاهزة للربط مع تطبيق موبايل لمتابعة العمليات اليومية للمعهد.",
      },
    },
    {
      src: `${basePath}/Student parents application/Screenshot 2026-05-12 174623.png`,
      key: "parent-app",
      title: {
        en: "Parent follow-up app",
        ar: "تطبيق متابعة ولي الأمر",
      },
      description: {
        en: "Parents can follow attendance, academic performance, notifications, and payment status for their children.",
        ar: "يستطيع ولي الأمر متابعة حضور وأداء وإشعارات ومدفوعات أبنائه.",
      },
    },
    {
      src: `${basePath}/Student parents application/Screenshot 2026-05-12 175150.png`,
      key: "notifications",
      title: {
        en: "Instant notifications",
        ar: "الإشعارات الفورية",
      },
      description: {
        en: "Firebase notifications support fast communication for absence, lateness, updates, and important alerts.",
        ar: "تدعم إشعارات Firebase التواصل السريع حول الغياب والتأخر والتحديثات والتنبيهات المهمة.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-19-37.png`,
      key: "dashboard-finance-details",
      title: {
        en: "Financial details",
        ar: "تفاصيل مالية",
      },
      description: {
        en: "Additional dashboard screens support deeper review of payments, balances, and financial activity.",
        ar: "تعرض شاشات لوحة التحكم تفاصيل إضافية للدفعات والأرصدة والحركة المالية.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-22-27.png`,
      key: "dashboard-academic-details",
      title: {
        en: "Academic details",
        ar: "تفاصيل أكاديمية",
      },
      description: {
        en: "Academic screens help administrators and teachers monitor student progress and institute records.",
        ar: "تساعد الشاشات الأكاديمية الإدارة والمدرسين على متابعة تقدم الطلاب وسجلات المعهد.",
      },
    },
    {
      src: `${basePath}/Dashboard/image_2026-05-11_23-24-24.png`,
      key: "dashboard-reports-details",
      title: {
        en: "Detailed reports",
        ar: "تقارير تفصيلية",
      },
      description: {
        en: "Detailed reporting views provide structured insight into operational, academic, and financial data.",
        ar: "توفر شاشات التقارير التفصيلية رؤية منظمة للبيانات التشغيلية والأكاديمية والمالية.",
      },
    },
    {
      src: `${basePath}/Institute management application/Screenshot_٢٠٢٦٠٥١١_٠٠٠٢٥٠.jpg`,
      key: "institute-app-students",
      title: {
        en: "Institute app students",
        ar: "طلاب تطبيق الإدارة",
      },
      description: {
        en: "The institute app keeps core student and class workflows accessible from mobile.",
        ar: "يبقي تطبيق الإدارة عمليات الطلاب والصفوف الأساسية متاحة من الموبايل.",
      },
    },
    {
      src: `${basePath}/Institute management application/Screenshot_٢٠٢٦٠٥١١_٠٠٠٦٤٣.jpg`,
      key: "institute-app-classes",
      title: {
        en: "Institute app classes",
        ar: "صفوف تطبيق الإدارة",
      },
      description: {
        en: "Mobile screens support class and section follow-up for institute staff.",
        ar: "تدعم شاشات الموبايل متابعة الصفوف والشعب لموظفي المعهد.",
      },
    },
    {
      src: `${basePath}/Institute management application/Screenshot_٢٠٢٦٠٥١١_٠٠٠٧٢٥.jpg`,
      key: "institute-app-attendance",
      title: {
        en: "Institute app attendance",
        ar: "حضور تطبيق الإدارة",
      },
      description: {
        en: "Attendance workflows are available from the mobile management experience.",
        ar: "تتوفر عمليات الحضور ضمن تجربة الإدارة على الموبايل.",
      },
    },
    {
      src: `${basePath}/Institute management application/Screenshot_٢٠٢٦٠٥١١_٠٠٠٧٣٩.jpg`,
      key: "institute-app-follow-up",
      title: {
        en: "Institute app follow-up",
        ar: "متابعة تطبيق الإدارة",
      },
      description: {
        en: "Staff can continue daily institute follow-up through practical mobile screens.",
        ar: "يمكن للموظفين متابعة عمل المعهد اليومي عبر شاشات موبايل عملية.",
      },
    },
    {
      src: `${basePath}/Student parents application/Screenshot 2026-05-12 174633.png`,
      key: "parent-app-overview",
      title: {
        en: "Parent app overview",
        ar: "نظرة عامة لولي الأمر",
      },
      description: {
        en: "Parents get a focused view of student status, updates, and important information.",
        ar: "يحصل ولي الأمر على عرض واضح لحالة الطالب والتحديثات والمعلومات المهمة.",
      },
    },
    {
      src: `${basePath}/Student parents application/Screenshot 2026-05-12 174641.png`,
      key: "parent-app-academic",
      title: {
        en: "Parent app academic",
        ar: "المتابعة الأكاديمية لولي الأمر",
      },
      description: {
        en: "Academic follow-up screens help parents track student learning and progress.",
        ar: "تساعد شاشات المتابعة الأكاديمية ولي الأمر على متابعة تعلم الطالب وتقدمه.",
      },
    },
    {
      src: `${basePath}/Student parents application/Screenshot 2026-05-12 174705.png`,
      key: "parent-app-attendance",
      title: {
        en: "Parent app attendance",
        ar: "حضور تطبيق ولي الأمر",
      },
      description: {
        en: "Attendance information is presented clearly for parent follow-up.",
        ar: "تعرض بيانات الحضور بوضوح لمتابعة ولي الأمر.",
      },
    },
    {
      src: `${basePath}/Student parents application/Screenshot 2026-05-12 175041.png`,
      key: "parent-app-payments",
      title: {
        en: "Parent app payments",
        ar: "مدفوعات تطبيق ولي الأمر",
      },
      description: {
        en: "Payment and balance screens help parents understand financial status.",
        ar: "تساعد شاشات الدفعات والأرصدة ولي الأمر على معرفة الحالة المالية.",
      },
    },
    {
      src: `${basePath}/Student parents application/Screenshot 2026-05-12 175440.png`,
      key: "parent-app-details",
      title: {
        en: "Parent app details",
        ar: "تفاصيل تطبيق ولي الأمر",
      },
      description: {
        en: "Additional parent-facing screens complete the follow-up experience.",
        ar: "تكمل الشاشات الإضافية تجربة المتابعة الخاصة بولي الأمر.",
      },
    },
  ],
  content: {
    en: {
      navLabel: "Projects",
      sectionTitle: "Featured Projects",
      sectionSubtitle: "A focused look at products we designed and shipped.",
      cardEyebrow: "Education Management Platform",
      cardTitle: "Educational Institute Management System",
      cardDescription:
        "A complete digital platform for managing students, teachers, classes, attendance, grades, payments, expenses, notifications, and reports with role-based access.",
      cardStats: [
        "Students, parents, teachers, classes, and subjects",
        "Attendance, grades, assessments, and notifications",
        "Payments, expenses, balances, and reports",
      ],
      cardCta: "Open project page",
      cardSecondary: "View gallery",
      detailEyebrow: "Case Study",
      detailTitle: "Educational Institute Management System",
      detailSubtitle:
        "A centralized institute management system that replaces paper, Excel files, and manual parent communication with secure APIs, role-based access, and connected web or mobile experiences.",
      overviewTitle: "Project overview",
      overviewParagraphs: [
        "The project is a modern management system for educational institutes and schools. It organizes daily administrative work such as student registration, attendance, payments, grades, reports, and notifications inside one central platform.",
      ],
      challengeTitle: "What the project solves",
      challengePoints: [
        "Reduces scattered administrative work across papers, Excel files, and manual messages.",
        "Centralizes student, parent, teacher, class, section, and subject data.",
        "Speeds up attendance follow-up with individual or group registration and parent alerts.",
        "Improves academic tracking through assessments, exams, homework, grades, and automatic percentages.",
        "Gives the administration financial visibility over installments, payments, discounts, expenses, and remaining balances.",
      ],
      featuresTitle: "Core capabilities",
      features: [
        {
          title: "Student and parent management",
          description:
            "Every student can be linked to a parent, class, section, academic profile, and financial record.",
        },
        {
          title: "Teachers, classes, and subjects",
          description:
            "The system organizes teachers, classrooms, sections, and subjects, including subject ownership by responsible teachers.",
        },
        {
          title: "Attendance and alerts",
          description:
            "Attendance can be recorded daily, individually or in bulk, with automatic notifications for absence or lateness.",
        },
        {
          title: "Academic evaluation",
          description:
            "Assessments, exams, homework, marks, percentages, and grade summaries help teachers and administrators track performance.",
        },
        {
          title: "Financial management",
          description:
            "Installments, payments, discounts, expenses, remaining balances, revenue, spending, and net balance are handled in one place.",
        },
        {
          title: "Reports and secure access",
          description:
            "Monthly, financial, and academic reports are supported alongside authentication, roles, permissions, and Firebase notifications.",
        },
      ],
      galleryTitle: "System gallery",
      gallerySubtitle:
        "Screens captured from the dashboard, institute management app, and parent follow-up app.",
      storesTitle: "Operational impact",
      storesSubtitle:
        "The system gives the institute one organized place to manage academic, administrative, financial, and parent communication workflows.",
      appStoreLabel: "View gallery",
      googlePlayLabel: "Core features",
      backHome: "Back to home",
      visitStore: "Open section",
    },
    ar: {
      navLabel: "المشاريع",
      sectionTitle: "مشاريعنا المميزة",
      sectionSubtitle: "نظرة مركزة على المنتجات التي صممناها ونفذناها.",
      cardEyebrow: "نظام إدارة تعليمية",
      cardTitle: "نظام إدارة معهد تعليمي",
      cardDescription:
        "نظام رقمي متكامل لإدارة الطلاب، المدرسين، الصفوف، الحضور، العلامات، الدفعات، المصاريف، الإشعارات، والتقارير مع صلاحيات مختلفة لكل مستخدم.",
      cardStats: [
        "الطلاب وأولياء الأمور والمدرسون والصفوف والمواد",
        "الحضور والعلامات والتقييمات والإشعارات",
        "الدفعات والمصاريف والأرصدة والتقارير",
      ],
      cardCta: "افتح صفحة المشروع",
      cardSecondary: "مشاهدة المعرض",
      detailEyebrow: "عرض مشروع",
      detailTitle: "نظام إدارة معهد تعليمي",
      detailSubtitle:
        "نظام مركزي لإدارة المعاهد يحوّل العمل الورقي وملفات Excel والتواصل اليدوي مع أولياء الأمور إلى منصة آمنة قابلة للربط مع تطبيق ويب أو موبايل.",
      overviewTitle: "نظرة عامة على المشروع",
      overviewParagraphs: [
        "المشروع هو نظام حديث لإدارة المعاهد والمدارس، ينظم العمليات اليومية مثل تسجيل الطلاب، متابعة الحضور، إدارة الدفعات، تسجيل العلامات، استخراج التقارير، وإرسال الإشعارات ضمن منصة مركزية واحدة.",
      ],
      challengeTitle: "ما الذي يحله المشروع",
      challengePoints: [
        "يقلل التشتت الإداري بين الأوراق وملفات Excel والرسائل اليدوية.",
        "يجمع بيانات الطلاب وأولياء الأمور والمدرسين والصفوف والشعب والمواد في مكان واحد.",
        "يسرّع متابعة الحضور من خلال التسجيل الفردي أو الجماعي وإشعار ولي الأمر عند الغياب أو التأخر.",
        "يحسن متابعة الأداء الأكاديمي عبر التقييمات والاختبارات والواجبات والعلامات وحساب النسب تلقائيًا.",
        "يوفر رؤية مالية واضحة للإدارة حول الأقساط والدفعات والخصومات والمصاريف والرصيد المتبقي.",
      ],
      featuresTitle: "القدرات الأساسية",
      features: [
        {
          title: "إدارة الطلاب وأولياء الأمور",
          description:
            "يمكن ربط كل طالب بولي أمره وصفه وشعبته وبياناته الأكاديمية والمالية ضمن ملف واحد منظم.",
        },
        {
          title: "المدرسون والصفوف والمواد",
          description:
            "ينظم النظام المدرسين والصفوف والشعب والمواد الدراسية، مع ربط كل مادة بالمدرس المسؤول عنها.",
        },
        {
          title: "الحضور والتنبيهات",
          description:
            "يدعم تسجيل الحضور اليومي بشكل فردي أو جماعي، مع إرسال إشعارات تلقائية عند الغياب أو التأخر.",
        },
        {
          title: "التقييم الأكاديمي",
          description:
            "يدير التقييمات والاختبارات والواجبات والعلامات والنسب والتقديرات لمتابعة أداء الطلاب بدقة.",
        },
        {
          title: "الإدارة المالية",
          description:
            "يدير الأقساط والدفعات والخصومات والمصاريف والرصيد المتبقي والإيرادات والمصاريف وصافي الرصيد.",
        },
        {
          title: "التقارير والصلاحيات",
          description:
            "يدعم تقارير شهرية ومالية وأكاديمية مع توثيق آمن وصلاحيات متعددة وإشعارات فورية باستخدام Firebase.",
        },
      ],
      galleryTitle: "معرض النظام",
      gallerySubtitle:
        "لقطات من لوحة التحكم وتطبيق إدارة المعهد وتطبيق متابعة أولياء الأمور.",
      storesTitle: "الأثر التشغيلي",
      storesSubtitle:
        "يوفر النظام للمعهد مساحة موحدة لتنظيم العمل الأكاديمي والإداري والمالي والتواصل مع أولياء الأمور.",
      appStoreLabel: "مشاهدة المعرض",
      googlePlayLabel: "القدرات الأساسية",
      backHome: "العودة للرئيسية",
      visitStore: "فتح القسم",
    },
  },
} as const;

export const getEducationalInstituteContent = (language: string) =>
  language.startsWith("ar")
    ? educationalInstituteProject.content.ar
    : educationalInstituteProject.content.en;
