import React from 'react';
import type { CVData } from '../types';
import { Plus, Trash2 } from 'lucide-react';

interface CVFormProps {
  data: CVData;
  onChange: (data: CVData) => void;
}

export const CVForm: React.FC<CVFormProps> = ({ data, onChange }) => {
  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    onChange({
      ...data,
      personalInfo: {
        ...data.personalInfo,
        [e.target.name]: e.target.value,
      },
    });
  };

  const addExperience = () => {
    onChange({
      ...data,
      experience: [
        ...data.experience,
        { id: crypto.randomUUID(), company: '', role: '', startDate: '', endDate: '', description: '' },
      ],
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      experience: data.experience.map((exp) => (exp.id === id ? { ...exp, [field]: value } : exp)),
    });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter((exp) => exp.id !== id),
    });
  };

  // Education handlers... (similar to Experience)
  const addEducation = () => {
     onChange({
      ...data,
      education: [
        ...data.education,
        { id: crypto.randomUUID(), school: '', degree: '', startDate: '', endDate: '' },
      ],
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    onChange({
      ...data,
      education: data.education.map((edu) => (edu.id === id ? { ...edu, [field]: value } : edu)),
    });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter((edu) => edu.id !== id),
    });
  };


  return (
    <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm">
      <section>
        <h2 className="text-xl font-bold mb-4">Personal Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={data.personalInfo.fullName}
            onChange={handlePersonalInfoChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={data.personalInfo.title}
            onChange={handlePersonalInfoChange}
            className="border p-2 rounded"
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={data.personalInfo.email}
            onChange={handlePersonalInfoChange}
            className="border p-2 rounded"
          />
           <input
            type="text"
            name="phone"
            placeholder="Phone"
            value={data.personalInfo.phone}
            onChange={handlePersonalInfoChange}
            className="border p-2 rounded"
          />
          <input
            type="text"
            name="address"
            placeholder="Address"
            value={data.personalInfo.address}
            onChange={handlePersonalInfoChange}
            className="border p-2 rounded md:col-span-2"
          />
        </div>

        <h3 className="text-md font-semibold mt-4 mb-2 text-gray-600">Social Profiles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
             <input
              type="text"
              name="linkedin"
              placeholder="LinkedIn Label"
              value={data.personalInfo.linkedin || ''}
              onChange={handlePersonalInfoChange}
              className="border p-2 rounded"
            />
             <input
              type="text"
              name="linkedinUrl"
              placeholder="LinkedIn URL"
              value={data.personalInfo.linkedinUrl || ''}
              onChange={handlePersonalInfoChange}
              className="border p-2 rounded"
            />
          </div>
          <div className="flex flex-col gap-2">
            <input
              type="text"
              name="github"
              placeholder="GitHub Label"
              value={data.personalInfo.github || ''}
              onChange={handlePersonalInfoChange}
              className="border p-2 rounded"
            />
             <input
              type="text"
              name="githubUrl"
              placeholder="GitHub URL"
              value={data.personalInfo.githubUrl || ''}
              onChange={handlePersonalInfoChange}
              className="border p-2 rounded"
            />
          </div>
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Experience</h2>
          <button onClick={addExperience} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
            <Plus size={20} /> Add
          </button>
        </div>
        <div className="space-y-4">
          {data.experience.map((exp) => (
            <div key={exp.id} className="border p-4 rounded relative bg-gray-50">
              <button
                onClick={() => removeExperience(exp.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <input
                  type="text"
                  placeholder="Company"
                  value={exp.company}
                  onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={exp.role}
                  onChange={(e) => updateExperience(exp.id, 'role', e.target.value)}
                  className="border p-2 rounded"
                />
                <input
                  type="text"
                  placeholder="Start Date"
                  value={exp.startDate}
                  onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                  className="border p-2 rounded"
                />
                 <input
                  type="text"
                  placeholder="End Date"
                  value={exp.endDate}
                  onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                  className="border p-2 rounded"
                />
                <textarea
                  placeholder="Description"
                  value={exp.description}
                  onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                  className="border p-2 rounded md:col-span-2"
                  rows={2}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Education</h2>
          <button onClick={addEducation} className="flex items-center gap-1 text-blue-600 hover:text-blue-700">
            <Plus size={20} /> Add
          </button>
        </div>
         <div className="space-y-4">
          {data.education.map((edu) => (
             <div key={edu.id} className="border p-4 rounded relative bg-gray-50">
               <button
                onClick={() => removeEducation(edu.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700"
              >
                <Trash2 size={18} />
              </button>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                 <input
                  type="text"
                  placeholder="School"
                  value={edu.school}
                  onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
                  className="border p-2 rounded"
                />
                 <input
                  type="text"
                  placeholder="Degree"
                  value={edu.degree}
                  onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
                  className="border p-2 rounded"
                />
                  <input
                  type="text"
                  placeholder="Start Date"
                  value={edu.startDate}
                  onChange={(e) => updateEducation(edu.id, 'startDate', e.target.value)}
                  className="border p-2 rounded"
                />
                 <input
                  type="text"
                  placeholder="End Date"
                  value={edu.endDate}
                  onChange={(e) => updateEducation(edu.id, 'endDate', e.target.value)}
                  className="border p-2 rounded"
                />
               </div>
             </div>
          ))}
         </div>
      </section>
    </div>
  );
};
