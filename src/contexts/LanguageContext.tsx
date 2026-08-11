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
    summary: "Hola, soy un Ingeniero Informático con gran experiencia, principalmente en el sector salud.  Mi enfoque combina soporte TI, redes y desarrollo frontend, con fuerte orientación al servicio al cliente, mejora continua, automatización, experiencia de usuario y seguridad de la información.",
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
    ],experience: [
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
      "Administración y configuración de SIP Trunk, CUCM y equipos de telecomunicaciones, asegurando la disponibilidad del servicio telefónico",
      "Gestión integral de la librería de respaldos, incluyendo políticas de retención y recuperación ante desastres",
      "Soporte especializado para salas de auditorio y sistemas de videoconferencia, asegurando el correcto funcionamiento en reuniones críticas",
      "Responsable del ciclo de renovación de hardware, equipos móviles y servicios BAM, optimizando los recursos tecnológicos"
    ]
  },
  {
    company: "Infosys Chile",
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