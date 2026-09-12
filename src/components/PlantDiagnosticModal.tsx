import React, { useState, useRef } from 'react';
import { SAMPLE_PLANT_CASES } from '../data/initialData';
import { UserProfile } from '../types';
import { 
  Camera, 
  UploadCloud, 
  Sparkles, 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  RefreshCw, 
  HelpCircle,
  FileSearch,
  ExternalLink,
  ChevronRight
} from 'lucide-react';

interface PlantDiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
  onOpenChatWithQuery?: (query: string) => void;
}

export const PlantDiagnosticModal: React.FC<PlantDiagnosticModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onOpenChatWithQuery,
}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedMime, setSelectedMime] = useState<string>('image/jpeg');
  const [cropType, setCropType] = useState<string>('Lechuga Crespa');
  const [currentPh, setCurrentPh] = useState<string>('6.0');
  const [currentEc, setCurrentEc] = useState<string>('1.6');
  const [question, setQuestion] = useState<string>('');
  
  const [isAnalyzing, setIsAnalyzing] = useState<boolean>(false);
  const [diagnosticResult, setDiagnosticResult] = useState<string | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setSelectedImage(result);
      setSelectedMime(file.type || 'image/jpeg');
      setDiagnosticResult(null);
      setErrorMsg(null);
    };
    reader.readAsDataURL(file);
  };

  const handleSelectSample = (sample: typeof SAMPLE_PLANT_CASES[0]) => {
    // Fetch image or convert to base64 or pass data
    setSelectedImage(sample.imageUrl);
    setSelectedMime('image/jpeg');
    setCropType(sample.crop);
    setQuestion(`Analizar este caso de ${sample.title} en el huerto de Paquisha.`);
    setDiagnosticResult(null);
    setErrorMsg(null);
  };

  const handleAnalyze = async () => {
    if (!selectedImage) {
      setErrorMsg('Por favor selecciona una foto de la planta o un caso de ejemplo.');
      return;
    }

    setIsAnalyzing(true);
    setErrorMsg(null);
    setDiagnosticResult(null);

    try {
      let base64Data = '';
      let mimeType = selectedMime;

      if (selectedImage.startsWith('data:')) {
        const parts = selectedImage.split(',');
        base64Data = parts[1];
        const match = parts[0].match(/:(.*?);/);
        if (match) mimeType = match[1];
      } else {
        // If external URL sample, convert via proxy or canvas or fetch
        try {
          const res = await fetch(selectedImage);
          const blob = await res.blob();
          const buffer = await blob.arrayBuffer();
          const bytes = new Uint8Array(buffer);
          let binary = '';
          for (let i = 0; i < bytes.byteLength; i++) {
            binary += String.fromCharCode(bytes[i]);
          }
          base64Data = btoa(binary);
          mimeType = blob.type || 'image/jpeg';
        } catch (e) {
          // If CORS prevents direct client conversion, pass sample marker
          base64Data = 'sample-case';
        }
      }

      const response = await fetch('/api/analyze-plant', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          imageBase64: base64Data,
          mimeType,
          cropType,
          currentPh,
          currentEc,
          question: question.trim() || 'Evalúa la salud foliar y radicular de esta hortaliza.',
        }),
      });

      if (!response.ok) {
        throw new Error('Error al procesar la imagen con Gemini');
      }

      const data = await response.json();
      setDiagnosticResult(data.diagnostic);
    } catch (err: any) {
      console.error(err);
      setErrorMsg('No se pudo completar el análisis visual. Verifica tu conexión o intenta con otra imagen.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div id="plant-diagnostic-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-stone-900/70 backdrop-blur-xs p-4 animate-in fade-in">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-stone-200 overflow-hidden max-h-[90vh] flex flex-col">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 text-white px-6 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white ring-1 ring-white/20">
              <Camera className="w-5 h-5 text-emerald-300" />
            </div>
            <div>
              <h3 className="font-extrabold text-base font-['Outfit']">
                Diagnóstico Fitosanitario con Visión Artificial
              </h3>
              <p className="text-xs text-emerald-100/80">
                Modelo Multimodal Gemini 3.1 Pro · Huerto Escolar UE Paquisha
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-200 hover:text-white hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
            
            {/* Image Selection Area (Col 5) */}
            <div className="lg:col-span-5 space-y-4">
              <div className="relative">
                {selectedImage ? (
                  <div className="relative rounded-2xl overflow-hidden border border-stone-300 bg-stone-900 aspect-4/3 group">
                    <img
                      src={selectedImage}
                      alt="Cultivo a diagnosticar"
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => {
                        setSelectedImage(null);
                        setDiagnosticResult(null);
                      }}
                      className="absolute top-2 right-2 p-1.5 rounded-full bg-black/70 text-white hover:bg-black transition"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    <div className="absolute bottom-2 left-2 right-2 px-2.5 py-1 rounded-lg bg-black/70 text-white text-[11px] truncate">
                      {cropType}
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-stone-300 rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-500 hover:bg-emerald-50/40 transition aspect-4/3 flex flex-col items-center justify-center"
                  >
                    <UploadCloud className="w-10 h-10 text-emerald-600 mb-2" />
                    <p className="text-xs font-bold text-stone-800">
                      Subir foto de hoja o planta
                    </p>
                    <p className="text-[11px] text-stone-500 mt-1">
                      Haz clic o arrastra una imagen (JPG, PNG)
                    </p>
                    <span className="mt-3 px-3 py-1 rounded-lg bg-stone-100 text-stone-700 text-[11px] font-semibold">
                      Seleccionar archivo
                    </span>
                  </div>
                )}
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  accept="image/*"
                  className="hidden"
                />
              </div>

              {/* Sample Cases Buttons */}
              <div>
                <p className="text-xs font-bold text-stone-600 uppercase tracking-wider mb-2">
                  O prueba con muestras del huerto:
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {SAMPLE_PLANT_CASES.map((sample) => (
                    <button
                      key={sample.id}
                      onClick={() => handleSelectSample(sample)}
                      className="p-1.5 rounded-xl border border-stone-200 hover:border-emerald-400 bg-stone-50 text-left transition group overflow-hidden"
                    >
                      <img
                        src={sample.imageUrl}
                        alt={sample.title}
                        className="w-full h-14 object-cover rounded-lg mb-1"
                      />
                      <p className="text-[10px] font-bold text-stone-800 truncate">{sample.title}</p>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Inputs & Parameters (Col 7) */}
            <div className="lg:col-span-7 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">Cultivo</label>
                  <select
                    value={cropType}
                    onChange={(e) => setCropType(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden bg-white"
                  >
                    <option value="Lechuga Crespa">Lechuga Crespa</option>
                    <option value="Lechuga Romana">Lechuga Romana</option>
                    <option value="Acelga">Acelga Verde</option>
                    <option value="Albahaca">Albahaca</option>
                    <option value="Tomate Cherry">Tomate Cherry</option>
                    <option value="Apio">Apio</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">pH del Tanque</label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentPh}
                    onChange={(e) => setCurrentPh(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    placeholder="6.0"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">EC (mS/cm)</label>
                  <input
                    type="number"
                    step="0.1"
                    value={currentEc}
                    onChange={(e) => setCurrentEc(e.target.value)}
                    className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                    placeholder="1.6"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  Pregunta o Síntomas Notados por el Estudiante
                </label>
                <textarea
                  rows={3}
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  placeholder="Ej. Las hojas nuevas tienen un color amarillo pálido pero las nervaduras siguen verdes. Las raíces están sanas y el sistema es NFT."
                  className="w-full px-3 py-2 text-xs border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden"
                ></textarea>
              </div>

              {errorMsg && (
                <div className="p-3 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              <button
                id="execute-plant-analysis-btn"
                onClick={handleAnalyze}
                disabled={isAnalyzing || !selectedImage}
                className="w-full py-3 px-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition disabled:opacity-50 shadow-md shadow-emerald-600/20"
              >
                {isAnalyzing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Gemini 3.1 Pro está analizando la clorofila y tejido foliar...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Generar Diagnóstico Científico con IA</span>
                  </>
                )}
              </button>
            </div>

          </div>

          {/* Results Area */}
          {diagnosticResult && (
            <div className="mt-4 p-5 rounded-2xl bg-emerald-50/60 border border-emerald-200 text-stone-800 text-xs sm:text-sm leading-relaxed space-y-3 animate-in fade-in duration-300">
              <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span className="font-bold text-stone-900 font-['Outfit']">
                    Informe de Diagnóstico Fitosanitario - UE Paquisha
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-emerald-100 text-emerald-800">
                  Resuelto con Gemini Pro
                </span>
              </div>

              <div className="whitespace-pre-wrap space-y-2 text-stone-700">
                {diagnosticResult.split('\n\n').map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>

              {onOpenChatWithQuery && (
                <div className="pt-2 flex justify-end">
                  <button
                    onClick={() => {
                      onClose();
                      onOpenChatWithQuery(`Continuar análisis sobre el diagnóstico de ${cropType}`);
                    }}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800 underline"
                  >
                    <span>Hacer preguntas de seguimiento a BioPaquisha AI</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          )}

        </div>

      </div>
    </div>
  );
};
