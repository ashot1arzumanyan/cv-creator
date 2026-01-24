import { forwardRef } from 'react';
import type { CVData, Experience } from '../types';
import { Linkedin, Github } from 'lucide-react';

interface CVPreviewProps {
  data: CVData;
}

export const CVPreview = forwardRef<HTMLDivElement, CVPreviewProps>(({ data }, ref) => {
  // Split experience items: First 4 on page 1, rest on page 2.
  const page1Experience = data.experience.slice(0, 4);
  const page2Experience = data.experience.slice(4);

  const renderExperienceItem = (exp: Experience, isLast: boolean) => (
    <div key={exp.id}>
      <div className="flex items-start gap-[10px]">
        {/* Logo Placeholder */}
        <div className="shrink-0 w-6 h-6 rounded-full bg-white flex items-center justify-center overflow-hidden">
            {exp.company === 'WebFoundation' ? (
                <div className="w-full h-full bg-blue-500 text-white text-[10px] flex items-center justify-center font-bold">W</div>
            ) : exp.company === 'Moneylion' ? (
                <div className="w-full h-full bg-green-500 text-white text-[10px] flex items-center justify-center font-bold">M</div>
            ) : exp.company === 'Hilearn' ? (
                <div className="w-full h-full bg-yellow-500 text-white text-[10px] flex items-center justify-center font-bold">H</div>
            ) : exp.company === 'AugmentAr' ? (
                 <div className="w-full h-full bg-blue-100 text-blue-800 text-[10px] flex items-center justify-center font-bold scale-75 border border-blue-200">A</div>
            ) : (
                <div className="w-full h-full bg-gray-700 text-white text-[10px] flex items-center justify-center font-bold">F</div>
            )}
        </div>

        <div className="flex-1">
            <div className="font-['Helvetica'] font-bold text-[12px] leading-[14px] text-[#1B1B1B] mb-1">
              {exp.company}
            </div>
            <div className="flex justify-between items-center mb-1">
                <div className="font-['Helvetica'] font-normal text-[10px] leading-[11px] text-[#1B1B1B]">
                   {exp.role} {exp.type && `| ${exp.type}`}
                </div>
                <div className="font-['Helvetica'] font-normal text-[10px] leading-[11px] text-[#A7A7A7] text-right">
                  {exp.startDate} - {exp.endDate}
                </div>
            </div>
            <div className="font-['Helvetica'] font-normal text-[9.5px] leading-[130%] text-[#1B1B1B]/80 whitespace-pre-wrap">
                {exp.description}
            </div>
        </div>
      </div>
      {!isLast && (
          <div className="h-[1px] bg-[#CFCFCF] mt-4 ml-[34px]"></div>
      )}
    </div>
  );

  return (
    <div ref={ref} className="print-container">
      {/* PAGE 1 */}
      <div
        className="print-page relative bg-[#F7F7F7] overflow-hidden font-['Helvetica',_Arial,_sans-serif] mb-5 w-[595px] h-[842px]"
      >
        {/* Top Header */}
        <div
            className="absolute w-[595px] h-[80px] left-0 top-0 z-10"
            style={{
                background: 'radial-gradient(185.52% 256.65% at 16.19% 104.6%, #000000 23.59%, #277782 100%)'
            }}
        >
            <div className="absolute left-6 top-4 text-white font-bold text-2xl leading-7">
            {data.personalInfo.fullName}
            </div>
            <div className="absolute left-6 top-12 text-white font-normal text-sm leading-4 opacity-80">
            {data.personalInfo.title}
            </div>
        </div>

        {/* Right Sidebar Background */}
        <div className="absolute w-[227px] h-[762px] left-[368px] top-20 bg-[#F2F2F2]" />

        {/* Main Content (Left Column) - Page 1 */}
        <div className="absolute top-[94px] left-4 w-[330px]">
            <div className="text-[#278277] font-bold text-[11px] leading-[13px] mb-3 pl-2">
            Work Experience
            </div>

            <div className="flex flex-col gap-4 pl-2">
            {page1Experience.map((exp, index) => renderExperienceItem(exp, index === page1Experience.length - 1))}
            </div>
        </div>

        {/* Right Sidebar Content */}
        <div className="absolute w-[179px] left-[392px] top-[104px] flex flex-col gap-6">
            {/* Contacts */}
            <div className="flex flex-col gap-2">
                <div className="text-[#278277] font-bold text-[11px] leading-[13px]">Contacts</div>
                
                {/* LinkedIn & Github First - as per design */}
                <div className="flex flex-col gap-3">
                    {data.personalInfo.linkedin && (
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#24292E] rounded-full flex items-center justify-center">
                                <Linkedin size={14} color="white" fill="white" />
                            </div>
                            <a href={data.personalInfo.linkedinUrl || data.personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-[10px] underline text-[#1B1B1B]">{data.personalInfo.linkedin}</a>
                        </div>
                    )}
                    {data.personalInfo.github && (
                        <div className="flex items-center gap-2">
                            <div className="w-6 h-6 bg-[#24292E] rounded-full flex items-center justify-center">
                                <Github size={14} color="white" fill="white" />
                            </div>
                            <a href={data.personalInfo.githubUrl || data.personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-[10px] underline text-[#1B1B1B]">{data.personalInfo.github}</a>
                        </div>
                    )}
                </div>

                {/* Location, Phone, Email */}
                <div className="flex flex-col gap-3 mt-1">
                    <div>
                        <div className="text-[10px] text-[#A7A7A7] mb-[2px]">Location</div>
                        <div className="text-[10px] text-[#1B1B1B]">{data.personalInfo.address}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-[#A7A7A7] mb-[2px]">Phone number</div>
                        <div className="text-[10px] text-[#1B1B1B]">{data.personalInfo.phone}</div>
                    </div>
                    <div>
                        <div className="text-[10px] text-[#A7A7A7] mb-[2px]">Email</div>
                        <div className="text-[10px] text-[#1B1B1B] break-all">{data.personalInfo.email}</div>
                    </div>
                </div>
            </div>

            {/* Education */}
            <div className="flex flex-col gap-2">
                <div className="text-[#278277] font-bold text-[11px] leading-[13px]">Education</div>
                <div className="flex flex-col gap-1">
                    {data.education.map(edu => (
                        <div key={edu.id} className="flex flex-col gap-1">
                            <div className="text-[10px] font-bold text-[#1B1B1B]">{edu.school}</div>
                            <div className="text-[10px] font-normal text-[#1B1B1B]">{edu.degree}</div>
                            <div className="text-[10px] text-[#A7A7A7]">{edu.startDate} - {edu.endDate}</div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Languages */}
            <div className="flex flex-col gap-2">
            <div className="text-[#278277] font-bold text-[11px] leading-[13px]">Languages</div>
            <div className="flex flex-col gap-2">
                {data.languages.map(lang => (
                    <div key={lang.id} className="text-[10px] text-[#1B1B1B] font-bold">
                        {lang.name} <span className="text-[#1B1B1B] font-bold">({lang.level})</span>
                    </div>
                ))}
            </div>
            </div>

            {/* Skills */}
            <div className="flex flex-col gap-2">
            <div className="text-[#278277] font-bold text-[11px] leading-[13px]">Skills</div>
            <div className="text-[10px] text-[#000000] font-bold leading-[170%]">
                {data.skills.map((skill, i) => (
                    <span key={i}>{skill} <br/></span>
                ))}
            </div>
            </div>

        </div>
        
        {/* Footer / Page Number */}
        <div className="absolute top-[810px] w-full h-8 bg-[#F6F6F6]/40 flex items-center justify-center">
            <span className="text-[7.5px] text-black/30">Page 1</span>
        </div>
      </div>
      
      {/* PAGE 2 */}
      {page2Experience.length > 0 && (
         <div
            className="print-page relative bg-[#F7F7F7] overflow-hidden font-['Helvetica',_Arial,_sans-serif] w-[595px] h-[842px]"
         >
             <div className="absolute top-[50px] left-4 w-[330px]">
                <div className="flex flex-col gap-4 pl-2">
                {/* No separator needed at start of page 2 typically, unless carrying over */}
                {page2Experience.map((exp, index) => renderExperienceItem(exp, index === page2Experience.length - 1))}
                </div>
             </div>
             
             {/* Footer / Page Number */}
            <div className="absolute top-[810px] w-full h-8 bg-[#F6F6F6]/40 flex items-center justify-center">
                <span className="text-[7.5px] text-black/30">Page 2</span>
            </div>
         </div>
      )}

    </div>
  );
});

CVPreview.displayName = 'CVPreview';
