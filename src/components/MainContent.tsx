import { useLanguage } from '../contexts/LanguageContext';
import { useState } from 'react';

export default function MainContent() {
  const { data, language } = useLanguage();
  const [selectedExp, setSelectedExp] = useState<{ type: 'company' | 'freelance', index: number }>({ type: 'company', index: 0 });

  // Separar experiencias por tipo
  const companyExperience = data.experience.filter(exp => 
    !exp.company.toLowerCase().includes('freelance') && 
    !exp.company.toLowerCase().includes('contractor') &&
    !exp.company.toLowerCase().includes('independiente')
  );
  
  const freelanceExperience = data.experience.filter(exp => 
    exp.company.toLowerCase().includes('freelance') || 
    exp.company.toLowerCase().includes('contractor') ||
    exp.company.toLowerCase().includes('independiente')
  );

  // Función para seleccionar experiencia y abrir popover
  const selectExperience = (type: 'company' | 'freelance', index: number) => {
    setSelectedExp({ type, index });
    const popoverId = `popover_${type}_${index}`;
    
    setTimeout(() => {
      const popover = document.getElementById(popoverId) as HTMLDivElement;
      if (popover) {
        popover.showPopover();
      }
    }, 50);
  };

  // Función para obtener los skills relacionados según la empresa
  const getRelatedSkills = (companyName: string) => {
    const skillMapping: { [key: string]: string[] } = {
      'Sistemas Expertos': ['APIs & DESARROLLO', 'DATOS & BUSINESS INTELLIGENCE'],
      'Bupa Chile': ['ITSM & GESTIÓN', 'PLATAFORMAS & SISTEMAS'],
      'Sky Systems': ['REDES & SEGURIDAD', 'PLATAFORMAS & SISTEMAS'],
      'Infosys': ['PLATAFORMAS & SISTEMAS', 'REDES & SEGURIDAD'],
      'Unisys': ['PLATAFORMAS & SISTEMAS', 'REDES & SEGURIDAD'],
      'Independiente': ['APIs & DESARROLLO', 'DATOS & BUSINESS INTELLIGENCE', 'CONTROL DE VERSIONES'],
      'Freelance': ['APIs & DESARROLLO', 'DATOS & BUSINESS INTELLIGENCE', 'CONTROL DE VERSIONES'],
      'Contractor': ['APIs & DESARROLLO', 'DATOS & BUSINESS INTELLIGENCE', 'CONTROL DE VERSIONES'],
    };

    let matchedCategories: string[] = [];
    for (const [key, categories] of Object.entries(skillMapping)) {
      if (companyName.toLowerCase().includes(key.toLowerCase())) {
        matchedCategories = categories;
        break;
      }
    }
    
    if (matchedCategories.length === 0) {
      return data.keyKnowledge || [];
    }
    
    return data.keyKnowledge?.filter(category => 
      matchedCategories.includes(category.category)
    ) || [];
  };

  // Componente de estrella SVG
  const StarIcon = ({ filled }: { filled: boolean }) => (
    <svg 
      className="w-3 h-3 md:w-3.5 md:h-3.5 print:w-2.5 print:h-2.5"
      viewBox="0 0 24 24"
      fill={filled ? '#eab308' : '#d1d5db'}
      stroke={filled ? '#eab308' : '#d1d5db'}
      strokeWidth="0.5"
      style={{
        WebkitPrintColorAdjust: 'exact',
        printColorAdjust: 'exact',
        colorAdjust: 'exact',
      }}
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );

  return (
    <div className="p-4 max-w-7xl mx-auto bg-white print:p-6 print:max-w-full print:bg-white flex flex-col min-h-screen font-sans">
      
      {/* ============================================ */}
      {/* RESUMEN */}
      {/* ============================================ */}
      <div className="border-b border-gray-200 pb-2 mb-2 print:pb-1 print:mb-1">
        <p className="text-sm md:text-base text-gray-700 leading-relaxed print:text-[10px] print:leading-snug font-sans">
          {data.summary}
        </p>
      </div>

      {/* ============================================ */}
      {/* CONOCIMIENTOS CLAVES */}
      {/* ============================================ */}
      <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-600 mb-1.5 print:text-[10px] print:mb-1 font-sans">
        {language === 'es' ? 'Conocimientos Claves' : 'Key Knowledge'}
      </h3>
      <div className="border-b border-gray-100 pb-2 mb-2 print:pb-1 print:mb-1">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-2 print:gap-1.5">
          {data.keyKnowledge && data.keyKnowledge.map((category, idx) => {
            const categoryLevel = Math.round(
              category.skills.reduce((acc, skill) => acc + skill.level, 0) / category.skills.length
            );
            
            return (
              <div key={idx} className="bg-gray-50 rounded-lg p-2 border border-gray-200 print:bg-white print:border-gray-200">
                <div className="flex items-center justify-between">
                  <h4 className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-600 print:text-[9px] font-sans">
                    {category.category}
                  </h4>
                  <span className="text-[9px] md:text-[10px] text-gray-400 font-medium print:text-[8px]">
                    {categoryLevel}/5
                  </span>
                </div>
                
                {/* Estrellas SVG - visibles en PDF */}
                <div className="flex items-center gap-0.5 mb-1 print:mb-0.5">
                  {[...Array(5)].map((_, index) => {
                    const starValue = index + 1;
                    const isChecked = starValue <= categoryLevel;
                    return <StarIcon key={index} filled={isChecked} />;
                  })}
                </div>
                
                {/* Skills */}
                <div className="flex flex-wrap gap-1 print:gap-0.5">
                  {category.skills.map((skill, skillIdx) => (
                    <span 
                      key={skillIdx} 
                      className="text-[10px] md:text-xs text-gray-700 bg-white border border-gray-200 px-1.5 py-0.5 rounded print:text-[9px] print:px-1 print:py-0.5 print:bg-gray-50 font-sans"
                    >
                      {skill.name}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ============================================ */}
      {/* EXPERIENCIA LABORAL - CON TIMELINE */}
      {/* ============================================ */}
      <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-600 mb-1.5 text-center print:text-[10px] print:mb-1 font-sans">
        {language === 'es' ? 'Experiencia Laboral' : 'Work Experience'}
      </h3>
      <div className="border-b border-gray-100 pb-2 mb-2 print:pb-1 print:mb-1">
        <div className="flex flex-col md:flex-row gap-2 print:gap-1.5">
          {/* Empresas - Con Timeline */}
          <div className="flex-1 bg-gray-50 rounded-lg p-2 border border-gray-200 print:bg-white print:border-gray-200">
            <h4 className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-600 mb-1.5 text-center print:text-[9px] print:mb-1 font-sans">
              {language === 'es' ? 'Empresas' : 'Corporate'}
            </h4>
            <div className="space-y-1 print:space-y-0.5">
              {companyExperience.map((exp, index) => (
                <div
                  key={`company-${index}`}
                  onClick={() => selectExperience('company', index)}
                  className="flex items-start gap-2 p-1.5 rounded cursor-pointer hover:bg-blue-50 border border-transparent hover:border-gray-200 print:p-1 print:border print:border-gray-200"
                >
                  {/* Timeline vertical */}
                  <div className="flex flex-col items-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-blue-500 print:w-1.5 print:h-1.5"></div>
                    {index < companyExperience.length - 1 && (
                      <div className="w-0.5 h-4 bg-blue-400 print:h-3"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1 flex-wrap print:gap-0.5">
                      <span className="text-[10px] md:text-xs font-medium text-blue-600 print:text-[9px] font-sans">{exp.period}</span>
                      <span className="text-xs md:text-sm font-medium truncate text-gray-800 print:text-[10px] font-sans">{exp.company}</span>
                    </div>
                    <p className="text-[10px] md:text-xs text-gray-600 truncate print:text-[9px] font-sans">{exp.position}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Separador vertical */}
          <div className="flex items-center justify-center print:py-0.5">
            <div className="flex flex-col items-center">
              <div className="w-px h-8 bg-gray-300 print:h-6"></div>
              <span className="text-[9px] md:text-[10px] font-bold text-gray-400 bg-gray-50 px-1.5 py-0.5 rounded print:text-[8px] print:bg-gray-100 font-sans">
                {language === 'es' ? 'Y' : '&'}
              </span>
              <div className="w-px h-8 bg-gray-300 print:h-6"></div>
            </div>
          </div>

          {/* Freelance - Independiente */}
          <div className="flex-1 bg-gray-50 rounded-lg p-2 border border-gray-200 print:bg-white print:border-gray-200">
            <h4 className="text-[10px] md:text-xs font-medium uppercase tracking-wider text-gray-600 mb-1.5 text-center print:text-[9px] print:mb-1 font-sans">
              {language === 'es' ? 'Independiente' : 'Independent'}
            </h4>
            <div className="space-y-1 print:space-y-0.5">
              {freelanceExperience.map((exp, index) => (
                <div
                  key={`freelance-${index}`}
                  onClick={() => selectExperience('freelance', index)}
                  className="p-1.5 rounded cursor-pointer hover:bg-orange-50 border border-transparent hover:border-gray-200 print:p-1 print:border print:border-gray-200"
                >
                  <div className="flex flex-col">
                    <span className="text-[10px] md:text-xs font-medium text-orange-600 print:text-[9px] font-sans">{exp.period}</span>
                    <span className="text-xs md:text-sm font-medium text-gray-800 print:text-[10px] font-sans">{exp.company}</span>
                    <span className="text-[10px] md:text-xs text-gray-600 print:text-[9px] font-sans">{exp.position}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* LOGROS - Horizontal */}
      {/* ============================================ */}
      <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-600 mb-1 print:text-[10px] print:mb-0.5 font-sans">
        {language === 'es' ? 'Logros' : 'Achievements'}
      </h3>
      <div className="border-b border-gray-100 pb-1.5 mb-1.5 print:pb-1 print:mb-1">
        <div className="flex flex-wrap gap-1.5 print:gap-1">
          <span className="text-[10px] md:text-xs font-medium bg-green-50 text-gray-700 border border-gray-200 rounded-full px-2.5 py-0.5 print:text-[9px] print:px-2 print:py-0.5 font-sans">
            {language === 'es' ? 'Automatización 60%' : 'Automation 60%'}
          </span>
          <span className="text-[10px] md:text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 rounded-full px-2.5 py-0.5 print:text-[9px] print:px-2 print:py-0.5 font-sans">
            {language === 'es' ? 'Optimización +40%' : 'Optimization +40%'}
          </span>
          <span className="text-[10px] md:text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 rounded-full px-2.5 py-0.5 print:text-[9px] print:px-2 print:py-0.5 font-sans">
            {language === 'es' ? 'Seguridad 300+' : 'Security 300+'}
          </span>
          <span className="text-[10px] md:text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200 rounded-full px-2.5 py-0.5 print:text-[9px] print:px-2 print:py-0.5 font-sans">
            {language === 'es' ? 'Innovación React+UX' : 'Innovation React+UX'}
          </span>
        </div>
      </div>

      {/* ============================================ */}
      {/* IDIOMAS + SOFT SKILLS */}
      {/* ============================================ */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 print:gap-1">
        {/* IDIOMAS */}
        <div>
          <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-600 mb-0.5 print:text-[10px] print:mb-0.5 font-sans">
            {language === 'es' ? 'Idiomas' : 'Languages'}
          </h3>
          <div className="flex flex-wrap gap-1.5 print:gap-1">
            {data.languages.map((lang, index) => (
              <span key={index} className="text-[10px] md:text-xs text-gray-700 print:text-[9px] font-sans">
                <span className="font-medium">{lang.name}</span> <span className="text-gray-300">·</span> <span className="font-medium text-gray-500">{lang.level}</span>
              </span>
            ))}
          </div>
        </div>

        {/* SOFT SKILLS */}
        <div>
          <h3 className="text-xs md:text-sm font-semibold uppercase tracking-wider text-orange-600 mb-0.5 print:text-[10px] print:mb-0.5 font-sans">
            {language === 'es' ? 'Habilidades' : 'Skills'}
          </h3>
          <div className="flex flex-wrap gap-1 print:gap-0.5">
            {data.softSkills.map((skill, index) => (
              <span key={index} className="text-[10px] md:text-xs text-gray-600 bg-gray-100 px-1.5 py-0.5 rounded print:text-[9px] print:px-1 print:py-0.5 font-sans">
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ============================================ */}
      {/* POPOVER MODAL */}
      {/* ============================================ */}
      {data.experience.map((exp, expIndex) => {
        const isFreelance = exp.company.toLowerCase().includes('freelance') || 
                           exp.company.toLowerCase().includes('contractor') ||
                           exp.company.toLowerCase().includes('independiente');
        const type = isFreelance ? 'freelance' : 'company';
        const typeIndex = isFreelance 
          ? freelanceExperience.findIndex(e => e.company === exp.company && e.period === exp.period)
          : companyExperience.findIndex(e => e.company === exp.company && e.period === exp.period);
        
        if (typeIndex === -1) return null;
        
        const popoverId = `popover_${type}_${typeIndex}`;
        const relatedSkills = getRelatedSkills(exp.company);
        
        return (
          <div 
            key={popoverId} 
            id={popoverId} 
            popover="auto"
            className="popover-modal"
          >
            <div className="popover-box">
              <div className="hover-3d group">
                <div className={`card w-full max-w-md shadow-xl border text-white ${
                  isFreelance 
                    ? 'bg-gradient-to-br from-orange-600 to-orange-800 border-orange-300' 
                    : 'bg-gradient-to-br from-blue-600 to-blue-800 border-blue-400'
                }`}>
                  <div className="card-body p-5 print:p-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <div className="badge text-[10px] md:text-xs font-medium bg-white/20 text-white border border-white/30 px-2 py-0.5 font-sans">
                          {exp.period}
                        </div>
                        <h3 className="text-base md:text-lg font-bold mt-1.5 text-white font-sans">{exp.company}</h3>
                        <p className={`text-xs md:text-sm font-medium font-sans ${
                          isFreelance ? 'text-orange-200' : 'text-blue-200'
                        }`}>
                          {exp.position}
                        </p>
                      </div>
                    </div>

                    <div className="border-t border-white/20 my-1.5"></div>

                    <div className="space-y-1">
                      <h4 className={`text-[9px] md:text-[10px] font-medium uppercase tracking-wider font-sans ${
                        isFreelance ? 'text-orange-200' : 'text-blue-200'
                      }`}>
                        {language === 'es' ? 'Responsabilidades' : 'Responsibilities'}
                      </h4>
                      <ul className="space-y-0.5">
                        {exp.description.map((desc, idx) => (
                          <li key={idx} className="flex items-start gap-1.5 text-[10px] md:text-xs leading-relaxed text-white/95 font-sans">
                            <span className={`text-xs leading-none ${
                              isFreelance ? 'text-orange-300' : 'text-blue-400'
                            }`}>•</span>
                            <span>{desc}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Conocimientos clave relacionados */}
                    {relatedSkills.length > 0 && (
                      <div className="mt-2">
                        <h4 className="text-[8px] md:text-[9px] font-medium uppercase tracking-wider text-white/70 mb-1 font-sans">
                          {language === 'es' ? 'Skills relacionados' : 'Related Skills'}
                        </h4>
                        <div className="flex flex-wrap gap-1">
                          {relatedSkills.map((category, idx) => (
                            <span
                              key={idx}
                              className="badge text-[8px] md:text-[9px] bg-white/10 text-white/90 border border-white/20 font-sans"
                            >
                              {category.category}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                
                <div></div><div></div><div></div><div></div>
                <div></div><div></div><div></div><div></div>
              </div>
            </div>
            
            <div className="modal-backdrop">
              <button popoverTarget={popoverId} popoverTargetAction="hide" className="w-full h-full cursor-pointer" />
            </div>
          </div>
        );
      })}
    </div>
  );
}