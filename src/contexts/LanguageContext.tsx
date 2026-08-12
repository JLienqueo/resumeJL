import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// --- 1. Definir los tipos de datos ---
interface Contact {
  location: string;
  phone: string;
  email: string;
}

interface TechnicalProfile {
  operations: string[];
  network: string[];
  development: string[];
}

interface Language {
  name: string;
  level: string;
}

interface Experience {
  company: string;
  position: string;
  period: string;
  description: string[];
}

interface Certification {
  name: string;
  issuer: string;
  year: string;
  icon?: string;
}

// Estructura actualizada para skills con nivel
interface SkillItem {
  name: string;
  level: number;
}

interface KeyKnowledge {
  category: string;
  skills: SkillItem[];
}

interface TranslationData {
  name: string;
  title: string;
  subtitle: string;
  studies?: string;
  education?: string;
  institution?: string;
  certifications?: Certification[];
  summary: string;
  contact: Contact;
  technicalProfile: TechnicalProfile;
  languages: Language[];
  softSkills: string[];
  experience: Experience[];
  keyKnowledge: KeyKnowledge[];
}

interface Translations {
  es: TranslationData;
  en: TranslationData;
}

// --- 2. Definir los datos ---
const translations: Translations = {
  es: {
  name: "Juan Lienqueo",
  title: '"Conectar el uso tecnológico"',
  subtitle: "Ingeniero en Informática",
  education: "Ingeniero en Informática",
  institution: "Instituto Profesional de Providencia IPP",
  summary: "Hola, soy un Ingeniero Informático con gran experiencia, principalmente en el sector salud. Mi enfoque combina soporte TI, redes y desarrollo frontend, con fuerte orientación al servicio al cliente, mejora continua, automatización, experiencia de usuario y seguridad de la información.",
  certifications: [
    {
      name: "Tecnología en Seguridad Informática",
      issuer: "Instituto de Seguridad Digital",
      year: "2026",
      icon: "🛡️"
    }
  ],
  contact: {
    location: "Santiago, Chile",
    phone: "+56 9 73725900",
    email: "juan.lienqueo@outlook.com"
  },
  technicalProfile: {
    operations: ["MS Office", "Lansweeper", "MS Intune", "Citrix", "Active Directory", "Windows/Linux", "ITIL"],
    network: ["M365/O365", "Google Workspace", "CUCM/SIP", "VPN/WiFi", "Phishing", "Backups"],
    development: ["React", "JavaScript", "TypeScript", "HTML/CSS", "PHP", "SQL Server", "Python"]
  },
  languages: [
    { name: "Español", level: "Nativo" },
    { name: "Inglés", level: "B1-Intermedio" },
    { name: "Portugués", level: "Básico" }
  ],
  softSkills: [
    "Solución de análisis de causa raíz",
    "Soporte presencial y remoto",
    "Documentación técnica y procedimientos",
    "Continuidad del servicio y enfoque al cliente"
  ],
  keyKnowledge: [
    // ← AQUÍ VAN LAS CATEGORÍAS EN ESPAÑOL
    {
      category: "PLATAFORMAS & SISTEMAS",
      skills: [
        { name: "Microsoft 365", level: 5 },
        { name: "SharePoint", level: 4 },
        { name: "Windows Server", level: 4 },
        { name: "Linux", level: 4 },
        { name: "Active Directory", level: 5 }
      ]
    },
    {
      category: "REDES & SEGURIDAD",
      skills: [
        { name: "TCP/IP", level: 4 },
        { name: "DHCP", level: 4 },
        { name: "VPN", level: 4 },
        { name: "Ciberseguridad", level: 4 },
        { name: "Backup & Recovery", level: 5 },
        { name: "Migración de Datos", level: 4 }
      ]
    },
    {
      category: "ITSM & GESTIÓN",
      skills: [
        { name: "ITIL", level: 4 },
        { name: "ServiceNow", level: 4 },
        { name: "Jira", level: 4 },
        { name: "Remedy On Demand", level: 4 }
      ]
    },
    {
      category: "DATOS & BUSINESS INTELLIGENCE",
      skills: [
        { name: "Power BI", level: 4 },
        { name: "DAX", level: 3 },
        { name: "Power Query", level: 3 },
        { name: "SQL", level: 4 },
        { name: "PostgreSQL", level: 4 },
        { name: "Modelado de Datos", level: 4 }
      ]
    },
    {
      category: "APIs & DESARROLLO",
      skills: [
        { name: "C#", level: 3 },
        { name: "Python", level: 3 },
        { name: "PHP", level: 4 },
        { name: "JavaScript", level: 4 },
        { name: "React", level: 4 },
        { name: "REST API", level: 3 },
        { name: "JSON", level: 3 }
      ]
    },
    {
      category: "CONTROL DE VERSIONES",
      skills: [
        { name: "GitHub", level: 3 },
        { name: "GitLab", level: 3 }
      ]
    }
  ],
    experience: [
      // --- EXPERIENCIAS FREELANCE ---
      {
        company: "Freelance",
        position: "Desarrollador Web Freelance",
        period: "Actual",
        description: [
          "Desarrollo de sitios web",
          "Integración con alojamiento y despliegue",
          "Diseño de interfaces responsivas"
        ]
      },
      {
        company: "Freelance / Contract",
        position: "Soporte TI Freelance",
        period: "2023",
        description: [
          "Soporte y mantenimiento de equipos y redes",
          "Consultoría en infraestructura TI para PYMES",
          "Implementación de soluciones de respaldo y seguridad"
        ]
      },
      // --- EXPERIENCIAS DE EMPRESAS ---
      {
        company: "Sistemas Expertos e Ingeniería de Software Ltda.",
        position: "Desarrollador PHP",
        period: "2025 - 2026",
        description: [
          "Participación en desarrollo y mantenimiento del sistema REP",
          "Mejoras en frontend (UI) y backend con PHP",
          "Optimización de lógica de negocio y procesamiento de datos"
        ]
      },
      {
        company: "Bupa Chile S.A.",
        position: "Especialista en Gestión y Servicios de TI",
        period: "2024 - 2025",
        description: [
          "Documentación de procesos",
          "Gestión y optimización de inventario",
          "Seguimiento en políticas de seguridad SCIS en Windows 10",
          "Reportes de resultados de inventario"
        ]
      },
      {
        company: "Sky Systems Inc, by Deel",
        position: "Local IT Senior",
        period: "2022 - 2023",
        description: [
          "Encargado de la resolución de incidentes y requerimientos de soporte avanzado, garantizando la continuidad operativa",
          "Soporte especializado para salas de auditorio y sistemas de videoconferencia, asegurando el correcto funcionamiento en reuniones críticas",
          "Responsable del ciclo de renovación de hardware, equipos móviles y servicios BAM, optimizando los recursos tecnológicos"
        ]
      },
      {
        company: "Focus On Services",
        position: "Especialista en Tecnologías de la Información",
        period: "2016 - 2022",
        description: [
          "Soporte a +300 usuarios y gestión de hardware",
          "Control de sala de servidores y red inalámbrica"
        ]
      },
      {
        company: "Unisys",
        position: "Ingeniero de Clientes II",
        period: "2011 - 2016",
        description: [
          "Soporte TI para Novartis Chile",
          "Gestión de Active Directory y Cisco IPT",
          "Gestión de MS Server 2008 y Active Directory",
          "Documentación de procedimientos y configuración de hardware"
        ]
      }
    ]
  },
  en: {
    name: "Juan Lienqueo",
    title: '"Bridging Technology Uses"',
    subtitle: "Computer Engineer",
    education: "Computer Engineering",
    institution: "Instituto Profesional de Providencia IPP",
    summary: "Hello, I'm an experienced Computer Engineer with a strong background, primarily in the healthcare sector. My expertise combines IT support, networking, and frontend development, with a strong focus on customer service, continuous improvement, automation, user experience, and information security.",
    certifications: [
      {
        name: "Cybersecurity Technology Specialist",
        issuer: "Digital Security Institute",
        year: "2026",
        icon: "🛡️"
      }
    ],
    contact: {
      location: "Santiago, Chile",
      phone: "+56 9 73725900",
      email: "juan.lienqueo@outlook.com"
    },
    technicalProfile: {
      operations: ["MS Office", "Lansweeper", "MS Intune", "Citrix", "Active Directory", "Windows/Linux", "ITIL"],
      network: ["M365/O365", "Google Workspace", "CUCM/SIP", "VPN/WiFi", "Phishing", "Backups"],
      development: ["React", "JavaScript", "TypeScript", "HTML/CSS", "PHP", "SQL Server", "Python"]
    },
    languages: [
      { name: "Spanish", level: "Native" },
      { name: "English", level: "B1-Intermediate" },
      { name: "Portuguese", level: "Basic" }
    ],
    softSkills: [
      "Root cause analysis and problem solving",
      "Onsite and remote support",
      "Technical documentation and procedures",
      "Service continuity and customer focus"
    ],
    keyKnowledge: [
      {
        category: "PLATFORMS & SYSTEMS",
        skills: [
          { name: "Microsoft 365", level: 5 },
          { name: "SharePoint", level: 4 },
          { name: "Windows Server", level: 4 },
          { name: "Linux", level: 4 },
          { name: "Active Directory", level: 5 }
        ]
      },
      {
        category: "NETWORKING & SECURITY",
        skills: [
          { name: "TCP/IP", level: 4 },
          { name: "DHCP", level: 4 },
          { name: "VPN", level: 4 },
          { name: "Cybersecurity", level: 4 },
          { name: "Backup & Recovery", level: 5 },
          { name: "Data Migration", level: 4 }
        ]
      },
      {
        category: "ITSM & MANAGEMENT",
        skills: [
          { name: "ITIL", level: 4 },
          { name: "ServiceNow", level: 4 },
          { name: "Jira", level: 4 },
          { name: "Remedy On Demand", level: 4 }
        ]
      },
      {
        category: "DATA & BUSINESS INTELLIGENCE",
        skills: [
          { name: "Power BI", level: 4 },
          { name: "DAX", level: 3 },
          { name: "Power Query", level: 3 },
          { name: "SQL", level: 4 },
          { name: "PostgreSQL", level: 4 },
          { name: "Data Modeling", level: 4 }
        ]
      },
      {
        category: "APIs & DEVELOPMENT",
        skills: [
          { name: "C#", level: 3 },
          { name: "Python", level: 3 },
          { name: "PHP", level: 4 },
          { name: "JavaScript", level: 4 },
          { name: "React", level: 4 },
          { name: "REST API", level: 3 },
          { name: "JSON", level: 3 }
        ]
      },
      {
        category: "VERSION CONTROL",
        skills: [
          { name: "GitHub", level: 3 },
          { name: "GitLab", level: 3 }
        ]
      }
    ],
    experience: [
      // --- FREELANCE EXPERIENCES ---
      {
        company: "Freelance",
        position: "Freelance Web Developer",
        period: "Present",
        description: [
          "Website development",
          "Hosting integration and deployment",
          "Responsive interface design"
        ]
      },
      {
        company: "Freelance / Contractor",
        position: "Freelance IT Support Specialist",
        period: "2023",
        description: [
          "Equipment and network support and maintenance",
          "IT infrastructure consulting for SMEs",
          "Implementation of backup and security solutions"
        ]
      },
      // --- COMPANY EXPERIENCES ---
      {
        company: "Sistemas Expertos e Ingeniería de Software Ltda.",
        position: "PHP Developer",
        period: "2025 - 2026",
        description: [
          "Participation in the development and maintenance of the REP system",
          "Frontend (UI) and backend improvements using PHP",
          "Optimization of business logic and data processing"
        ]
      },
      {
        company: "Bupa Chile S.A.",
        position: "IT Management & Services Specialist",
        period: "2024 - 2025",
        description: [
          "Process documentation",
          "Inventory management and optimization",
          "Monitoring SCIS security policies on Windows 10",
          "Inventory results reporting"
        ]
      },
      {
        company: "Sky Systems Inc, by Deel",
        position: "Senior Local IT Specialist",
        period: "2022 - 2023",
        description: [
          "Responsible for resolving advanced support incidents and requirements, ensuring operational continuity",
          "Specialized support for auditorium rooms and video conferencing systems, ensuring proper functionality in critical meetings",
          "Responsible for hardware refresh cycles, mobile devices, and BAM services, optimizing technological resources"
        ]
      },
      {
        company: "Focus On Services",
        position: "IT Services Specialist",
        period: "2016 - 2022",
        description: [
          "Support for +300 users and hardware management",
          "Server room and wireless network control"
        ]
      },
      {
        company: "Unisys",
        position: "Client Engineer II",
        period: "2011 - 2016",
        description: [
          "IT support for Novartis Chile",
          "Active Directory and Cisco IPT management",
          "MS Server 2008 and Active Directory management",
          "Procedure documentation and hardware configuration"
        ]
      }
    ]
  }
};

// --- 3. Definir el tipo del contexto ---
interface LanguageContextType {
  language: string;
  setLanguage: React.Dispatch<React.SetStateAction<string>>;
  toggleLanguage: () => void;
  data: TranslationData;
}

// --- 4. Crear el contexto ---
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// --- 5. Proveedor del contexto ---
interface LanguageProviderProps {
  children: ReactNode;
}

export function LanguageProvider({ children }: LanguageProviderProps) {
  const [language, setLanguage] = useState<string>(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'es';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
  }, [language]);

  const toggleLanguage = () => {
    setLanguage(prev => prev === 'es' ? 'en' : 'es');
  };

  const data = translations[language as keyof Translations] || translations.es;

  const value: LanguageContextType = {
    language,
    setLanguage,
    toggleLanguage,
    data
  };

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
}

// --- 6. Hook personalizado ---
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage debe ser usado dentro de un LanguageProvider');
  }
  return context;
}

export default LanguageContext;