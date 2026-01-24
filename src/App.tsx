import { useState, useRef, useEffect } from 'react';
import { useReactToPrint } from 'react-to-print';
import { Download, FileText } from 'lucide-react';
import { CVForm } from './components/CVForm';
import { CVPreview } from './components/CVPreview';
import type { CVData } from './types';

import { initialData } from './data/initialData';

function App() {
  const [isAutoSave, setIsAutoSave] = useState(() => {
    const saved = localStorage.getItem('cv_auto_save');
    return saved !== 'false';
  });

  const [data, setData] = useState<CVData>(() => {
    const autoSave = localStorage.getItem('cv_auto_save') !== 'false';
    if (autoSave) {
      const savedData = localStorage.getItem('cv_data');
      if (savedData) {
        try {
          return JSON.parse(savedData);
        } catch (e) {
          console.error("Failed to parse saved CV data", e);
        }
      }
    }
    return initialData;
  });

  const componentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    localStorage.setItem('cv_auto_save', String(isAutoSave));
    if (isAutoSave) {
      localStorage.setItem('cv_data', JSON.stringify(data));
    } else {
      localStorage.removeItem('cv_data');
    }
  }, [data, isAutoSave]);

  const handlePrint = useReactToPrint({
    contentRef: componentRef,
    documentTitle: `${data.personalInfo.fullName.replace(/\s+/g, '_')}_CV`,
  });

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navbar */}
      <nav className="bg-white shadow-sm p-4 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
           <div className="flex items-center gap-2 font-bold text-xl text-gray-800">
             <FileText className="text-blue-600" />
             <span>CV Creator</span>
           </div>
           
           <div className="flex items-center gap-4">
              <label className="flex items-center cursor-pointer gap-2 select-none text-gray-700 font-medium text-sm">
                <span>Auto-save</span>
                <div className="relative">
                  <input 
                    type="checkbox" 
                    className="sr-only peer"
                    checked={isAutoSave}
                    onChange={(e) => setIsAutoSave(e.target.checked)}
                  />
                  <div className="w-9 h-5 bg-gray-300 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
                </div>
              </label>

              <button
                onClick={() => handlePrint()}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
              >
                <Download size={18} /> Download PDF
              </button>
           </div>
        </div>
      </nav>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 md:p-8 flex flex-col lg:flex-row gap-8">
        {/* Editor Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 no-print h-fit">
           <h2 className="text-lg font-semibold text-gray-700">Editor</h2>
           <CVForm data={data} onChange={setData} />
        </div>

        {/* Preview Section */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4">
           <h2 className="text-lg font-semibold text-gray-700">Preview</h2>
           <div className="border rounded-lg overflow-hidden bg-gray-200 p-4 md:p-8 overflow-x-auto shadow-inner">
             {/* Scale down slightly on small screens if needed, or allow scroll */}
              <div className="min-w-fit transform origin-top mx-auto">
                 <CVPreview ref={componentRef} data={data} />
              </div>
           </div>
        </div>
      </main>
    </div>
  );
}

export default App;
