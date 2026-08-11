import React, { useState, useEffect } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { QRCodeSVG } from 'qrcode.react';
import { 
  FaLinkedin, 
  FaGraduationCap, 
  FaAward, 
  FaBriefcase,
  FaExternalLinkAlt,
  FaCalendarAlt,
  FaUniversity
} from 'react-icons/fa';
import { 
  IoLocationOutline, 
  IoCallOutline, 
  IoMailOutline,
  IoLanguageOutline 
} from 'react-icons/io5';
import fotoPerfil from '../assets/juan_lienqueo.jpg';
import fondoSantiago from '../assets/santiago_costanera.jpg';

const Header = () => {
  const { data, language, toggleLanguage } = useLanguage();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentTime, setCurrentTime] = useState('');

  // Especialidades con traducción
  const specialties = [
    { 
      title: { es: 'Asistente TI', en: 'IT Assistant' },
      description: { es: 'Soporte usuarios, Soporte B2B', en: 'User support, B2B Support' }
    },
    { 
      title: { es: 'Contractor', en: 'Contractor' },
      description: { es: 'FreeLance, Consultor TI', en: 'Freelance, IT Consultant' }
    },
    { 
      title: { es: 'Analista de sistemas', en: 'Systems Analyst' },
      description: { es: 'Programador Frontend', en: 'Frontend Developer' }
    },
  ];

  // Función para abrir Calendly
  const openCalendly = () => {
    window.open('https://calendly.com/juan-lienqueo/30min?back=1', '_blank');
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % specialties.length);
    }, 3000);

    const updateTime = () => {
      const now = new Date();
      const hours = now.getHours().toString().padStart(2, '0');
      const minutes = now.getMinutes().toString().padStart(2, '0');
      setCurrentTime(`${hours}:${minutes}`);
    };
    updateTime();
    const timeInterval = setInterval(updateTime, 60000);

    return () => {
      clearInterval(interval);
      clearInterval(timeInterval);
    };
  }, [specialties.length]);

  return (
    <header 
      className="relative overflow-hidden shadow-lg mb-6 rounded-b-2xl print:shadow-none print:rounded-none print:mb-0 print:overflow-visible"
      style={{
        backgroundImage: `url(${fondoSantiago})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundBlendMode: 'overlay',
      }}
    >
      <div className="absolute inset-0 bg-black/60 print:bg-black/70"></div>
      
      {/* Botón de idioma flotante */}
      <button 
        onClick={toggleLanguage}
        className="fixed top-4 right-4 z-50 print:hidden bg-orange-600 hover:bg-orange-700 text-white font-semibold text-sm px-4 py-2 rounded-full shadow-lg transition-all flex items-center gap-2 cursor-pointer"
      >
        <IoLanguageOutline className="w-4 h-4" />
        <span>{language === 'es' ? 'EN' : 'ES'}</span>
      </button>
      
      <div className="relative max-w-7xl mx-auto px-4 py-6 z-10 print:max-w-full print:px-4 print:py-3">
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-3 print:gap-3 print:flex-row print:items-center">
          
          {/* Columna Izquierda */}
          <div className="flex-1 flex flex-col justify-between pt-4 lg:pt-0 lg:pr-3 print:pt-0 print:pr-3">
            
            {/* Header de Info Principal */}
            <div className="flex flex-col md:flex-row items-center gap-4 print:gap-3 print:flex-row print:items-center">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 md:w-40 md:h-40 rounded-full shadow-2xl overflow-hidden border-4 border-white/30 print:w-28 print:h-28 print:border-2 print:shadow-md">
                  <img
                    src={fotoPerfil}
                    alt="Foto de perfil"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left print:text-left">
                <h1 className="text-3xl md:text-3xl font-semibold text-white drop-shadow-lg print:text-2xl print:drop-shadow-none">
                  {data.name}
                </h1>
                <div className="mt-3 space-y-1.5 print:mt-2 print:space-y-1">
                  <div className="flex flex-wrap gap-2 justify-center md:justify-start print:gap-1.5">
                    <span className="text-white/80 text-sm font-medium bg-white/10 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1 flex items-center gap-1.5 print:text-[10px] print:bg-white/20 print:border-white/20 print:px-2 print:py-0.5">
                      <FaGraduationCap className="w-4 h-4 print:w-2.5 print:h-2.5" />
                      {data.education}
                    </span>
                    <span className="text-white/60 text-sm bg-white/5 backdrop-blur-sm border border-white/5 rounded-full px-3 py-1 flex items-center gap-1.5 print:text-[10px] print:bg-white/10 print:border-white/10 print:px-2 print:py-0.5">
                      <FaUniversity className="w-3.5 h-3.5 print:w-2.5 print:h-2.5" />
                      {data.institution}
                    </span>
                  </div>
                  
                  {data.certifications && data.certifications.length > 0 && (
                    <div className="flex flex-wrap gap-2 justify-center md:justify-start print:gap-1">
                      {data.certifications.map((cert, index) => (
                        <span
                          key={index}
                          className="text-yellow-200/90 text-xs font-medium bg-yellow-500/20 backdrop-blur-sm border border-yellow-400/30 rounded-full px-2.5 py-0.5 flex items-center gap-1 print:text-[8px] print:bg-yellow-500/30 print:border-yellow-400/40 print:px-1.5 print:py-0.5"
                        >
                          <FaAward className="w-3 h-3 print:w-2 print:h-2" />
                          {cert.name}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
                <h2 className="text-xl md:text-1xl italic text-blue-300/90 drop-shadow-lg mt-1 print:text-lg print:drop-shadow-none">
                  {data.title}
                </h2>
              </div>
            </div>

            {/* Carrusel - Con traducción */}
            <div className="mt-5 pt-3 border-t border-white/15 print:mt-3 print:pt-2 print:border-white/20">
              <div className="text-sm font-sans text-white/80 text-center md:text-left uppercase tracking-wider flex items-center justify-center md:justify-start gap-1.5 print:text-[10px] print:justify-start">
                {language === 'es' ? 'Especialidades' : 'Specialties'}
              </div>
              
              <div className="relative overflow-hidden max-w-md mx-auto md:mx-0 print:hidden">
                <div className="block">
                  <div 
                    className="flex transition-transform duration-500 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {specialties.map((spec, index) => (
                      <div key={index} className="min-w-full px-1">
                        <div className="bg-black/30 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/10 shadow-sm">
                          <div className="text-center md:text-left">
                            <p className="text-sm font-sans text-white">
                              {language === 'es' ? spec.title.es : spec.title.en}
                            </p>
                            <p className="text-xs text-gray-300 mt-0.5">
                              {language === 'es' ? spec.description.es : spec.description.en}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="hidden print:block">
                <div className="flex flex-wrap gap-2 mt-1">
                  {specialties.map((spec, index) => (
                    <div key={index} className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg px-3 py-1.5 flex-1 min-w-[100px]">
                      <p className="text-[10px] font-sans text-white">
                        {language === 'es' ? spec.title.es : spec.title.en}
                      </p>
                      <p className="text-[9px] text-gray-300">
                        {language === 'es' ? spec.description.es : spec.description.en}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="flex justify-center md:justify-start gap-1.5 mt-2 print:hidden">
                {specialties.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      currentSlide === index 
                        ? 'w-5 bg-white' 
                        : 'w-1.5 bg-white/30 hover:bg-white/50'
                    }`}
                    aria-label={`Ir a slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>

          </div>

          {/* Columna Derecha: Teléfono Mockup */}
          <div className="flex-shrink-0 flex items-center justify-center print:flex-shrink print:items-center print:justify-center">
            <div className="relative border-gray-900 bg-gray-900 border-[8px] rounded-[38px] h-[420px] w-[210px] shadow-2xl ring-1 ring-white/20 print:border-[4px] print:rounded-[28px] print:h-[280px] print:w-[150px] print:shadow-none print:ring-0">
              
              {/* Notch */}
              <div className="w-[60px] h-[14px] bg-gray-900 top-0 rounded-b-[10px] left-1/2 -translate-x-1/2 absolute z-20 flex items-center justify-center print:w-[35px] print:h-[8px] print:rounded-b-[5px]">
                <div className="w-2 h-2 bg-black rounded-full border border-gray-800 print:w-1.5 print:h-1.5"></div>
              </div>

              {/* Contenido Pantalla */}
              <div 
                className="rounded-[28px] overflow-hidden w-full h-full relative flex flex-col justify-between p-3 print:rounded-[18px] print:p-2"
                style={{
                  backgroundImage: `url('https://picsum.photos/400/800')`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                }}
              >
                <div className="absolute inset-0 bg-black/30 print:bg-black/40"></div>

                {/* Barra de estado con hora */}
                <div className="relative z-10 flex justify-between items-center text-white px-2 pt-1 print:px-1 print:pt-0.5">
                  <span className="text-[12px] font-medium tracking-tight print:text-[8px]">{currentTime}</span>
                  <div className="flex gap-1.5 items-center opacity-80 print:gap-0.5">
                    <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor" className="print:w-2 print:h-2"><path d="M2 22h20V2z"/></svg>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="print:w-2.5 print:h-2.5"><path d="M15.67 4H14V2h-4v2H8.33C7.6 4 7 4.6 7 5.33v15.33C7 21.4 7.6 22 8.33 22h7.33c.74 0 1.34-.6 1.34-1.33V5.33C17 4.6 16.4 4 15.67 4z"/></svg>
                  </div>
                </div>

                {/* Contenido Central: QR (solo impresión) + Calendly (solo web) */}
                <div className="relative z-10 flex flex-col items-center my-auto print:my-1">
                  
                  {/* QR Code - SOLO VISIBLE EN IMPRESIÓN */}
                  <div className="hidden print:flex print:flex-col print:items-center">
                    <div className="bg-white/90 backdrop-blur-md p-2.5 rounded-xl shadow-lg border border-white/40 print:p-2 print:rounded-lg print:shadow-none">
                      <QRCodeSVG 
                        value="https://resume-jl.vercel.app/" 
                        size={100}
                        bgColor="transparent"
                        fgColor="#000000"
                        level="H"
                        includeMargin={true}
                        className="print:w-[70px] print:h-[70px]"
                      />
                    </div>
                    <span className="text-[8px] text-white/80 mt-1.5 font-medium tracking-wide bg-black/40 px-2 py-0.5 rounded-full border border-white/10 print:text-[6px] print:mt-0.5 print:px-1.5 print:py-0.5">
                      {language === 'es' ? 'Ir a la Web' : 'Go to Web'}
                    </span>
                    <div className="flex items-center gap-1.5 mt-1.5 print:flex">
                      <FaUniversity className="text-white/60 text-[10px] print:text-[7px]" />
                      <span className="text-[7px] text-white/50 print:text-[5px]">
                        {language === 'es' ? 'Instituto Profesional de Providencia' : 'Professional Institute of Providence'}
                      </span>
                    </div>
                  </div>
                  
                  {/* Calendly - SOLO VISIBLE EN WEB CON TEXTO DINÁMICO */}
                  <div className="flex flex-col items-center print:hidden">
                    <button
                      onClick={openCalendly}
                      className="relative overflow-hidden text-white text-[11px] font-sans px-6 py-3.5 rounded-full transition-all duration-300 flex items-center gap-3 shadow-lg hover:shadow-2xl transform hover:scale-110 active:scale-95 border-2 border-yellow-400/50 group"
                      style={{
                        background: 'linear-gradient(135deg, #1a1a2e, #2d2d44)',
                      }}
                    >
                      {/* EFECTO AURORA GOLD */}
                      <span className="absolute inset-0 w-full h-full">
                        <span 
                          className="absolute top-[-50%] left-[-50%] w-[200%] h-[200%]"
                          style={{
                            background: 'conic-gradient(from 0deg, transparent, rgba(255,215,0,0.15), rgba(255,200,0,0.3), rgba(255,215,0,0.15), transparent)',
                            animation: 'aurora-gold-spin 4s linear infinite',
                          }}
                        />
                        <span 
                          className="absolute inset-0 w-full h-full"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(255,215,0,0.1), transparent 70%)',
                            animation: 'aurora-gold-pulse 2s ease-in-out infinite',
                          }}
                        />
                        <span 
                          className="absolute inset-0 w-full h-full"
                          style={{
                            background: 'radial-gradient(circle at 30% 40%, rgba(255,215,0,0.08), transparent 50%), radial-gradient(circle at 70% 60%, rgba(255,200,0,0.08), transparent 50%)',
                            animation: 'aurora-gold-float 3s ease-in-out infinite alternate',
                          }}
                        />
                      </span>
                      
                      {/* EFECTO HOVER */}
                      <span className="absolute inset-0 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                        <span 
                          className="absolute inset-0 w-full h-full"
                          style={{
                            background: 'radial-gradient(circle at center, rgba(255,215,0,0.3), rgba(255,200,0,0.1), transparent 70%)',
                            animation: 'aurora-gold-hover 1s ease-in-out infinite alternate',
                          }}
                        />
                        <span 
                          className="absolute top-[-100%] left-[-100%] w-[300%] h-[300%]"
                          style={{
                            background: 'conic-gradient(from 0deg, transparent, rgba(255,215,0,0.2), rgba(255,180,0,0.4), rgba(255,215,0,0.2), transparent)',
                            animation: 'aurora-gold-hover-spin 0.8s linear infinite',
                          }}
                        />
                      </span>
                      
                      {/* Borde brillante en hover */}
                      <span className="absolute inset-[-2px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span 
                          className="absolute inset-[-2px] rounded-full"
                          style={{
                            background: 'conic-gradient(from 0deg, transparent, #FFD700, #FFA500, #FFD700, transparent)',
                            animation: 'aurora-gold-border 1s linear infinite',
                          }}
                        />
                      </span>
                      
                      <FaCalendarAlt className="w-4 h-4 relative z-10 text-yellow-400" />
                      <span className="relative z-10">
                        {language === 'es' ? 'Agenda 30 min gratis' : 'Schedule 30 min free'}
                      </span>
                      
                      <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-yellow-400 rounded-full animate-ping opacity-75 group-hover:opacity-100 group-hover:scale-150 transition-all duration-300"></span>
                    </button>
                    <span className="text-[8px] text-white/60 mt-2 font-medium flex items-center gap-1.5">
                      <span className="inline-block w-2 h-2 bg-yellow-400 rounded-full animate-pulse"></span>
                      {language === 'es' ? 'Sin costo · 30 minutos' : 'Free · 30 minutes'}
                    </span>
                  </div>
                  
                </div>

                {/* Contacto al pie */}
                <div className="relative z-10 space-y-1.5 w-full print:space-y-0.5">
                  <div className="flex items-center gap-2 text-[9.5px] text-white/90 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 border border-white/10 print:text-[8.5px] print:gap-0.5 print:px-1.5 print:py-0.5 print:bg-black/50">
                    <IoLocationOutline className="w-3 h-3 text-[#ff8938] shrink-0 print:w-2 print:h-2" />
                    <span className="truncate">{data.contact.location}</span>
                  </div>
                  
                <div className="flex items-center gap-2 text-[9.5px] text-white/90 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 border border-white/10 hover:bg-black/60 transition-colors print:text-[8.5px] print:gap-0.5 print:px-1.5 print:py-0.5 print:bg-black/50">
                  <IoCallOutline className="w-3 h-3 text-[#ff8938] shrink-0 print:w-2 print:h-2" />
                  <a 
                    href={`https://wa.me/${data.contact.phone.replace(/\s/g, '').replace('+', '')}`} 
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-[#ff8938] transition-colors truncate print:hover:text-white"
                  >
                    {data.contact.phone}
                  </a>  
                </div>
                  
                  <div className="flex items-center gap-2 text-[9.5px] text-white/90 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 border border-white/10 hover:bg-black/60 transition-colors print:text-[7.5px] print:gap-0.5 print:px-1.5 print:py-0.5 print:bg-black/50">
                    <IoMailOutline className="w-3 h-3 text-[#ff8938] shrink-0 print:w-2 print:h-2" />
                    <a href={`mailto:${data.contact.email}`} className="hover:text-[#ff8938] transition-colors truncate print:hover:text-white">
                      {data.contact.email}
                    </a>
                  </div>
                  
                  <div className="flex items-center gap-2 text-[9.5px] text-white/90 bg-black/40 backdrop-blur-sm rounded-md px-2 py-1 border border-white/10 hover:bg-black/60 transition-colors print:text-[8.5px] print:gap-0.5 print:px-1.5 print:py-0.5 print:bg-black/50">
                    <FaLinkedin className="w-3 h-3 text-[#ff8938] shrink-0 print:w-2 print:h-2" />
                    <a href="https://www.linkedin.com/in/juan-lienqueo-ba070319b/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ff8938] transition-colors flex items-center gap-0.5 truncate print:hover:text-white">
                      LinkedIn
                      <FaExternalLinkAlt className="w-2 h-2 opacity-60 print:w-1.5 print:h-1.5" />
                    </a>
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes aurora-gold-spin {
          0% { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.2); }
          100% { transform: rotate(360deg) scale(1); }
        }
        @keyframes aurora-gold-pulse {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes aurora-gold-float {
          0% { transform: translate(0, 0) scale(1); opacity: 0.4; }
          100% { transform: translate(10%, -10%) scale(1.2); opacity: 0.8; }
        }
        @keyframes aurora-gold-hover {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 0.9; transform: scale(1.2); }
        }
        @keyframes aurora-gold-hover-spin {
          0% { transform: rotate(0deg) scale(0.8); }
          100% { transform: rotate(360deg) scale(1.3); }
        }
        @keyframes aurora-gold-border {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </header>
  );
};

export default Header;