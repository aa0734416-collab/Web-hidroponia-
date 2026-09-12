import React, { useState } from 'react';
import { 
  BookOpen, 
  Layers, 
  FlaskConical, 
  Calculator, 
  Check, 
  HelpCircle,
  AlertTriangle,
  Flame,
  Droplets,
  Wind
} from 'lucide-react';

export const KnowledgeSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'sistemas' | 'quimica' | 'calculadora' | 'beneficios'>('sistemas');

  // Calculator State
  const [tankLiters, setTankLiters] = useState<number>(100);
  const [selectedCrop, setSelectedCrop] = useState<'lechuga' | 'acelga' | 'tomate' | 'albahaca'>('lechuga');

  // Multipliers per 100L
  const cropFormulas = {
    lechuga: {
      name: 'Lechuga Crespa / Romana',
      phTarget: '5.8 - 6.2',
      ecTarget: '1.4 - 1.8 mS/cm',
      calcio: 100, // g Nitrato de Calcio
      potasioNitrato: 55, // g Nitrato de Potasio
      fosfato: 20, // g Fosfato Monopotásico
      magnesio: 45, // g Sulfato de Magnesio
      hierro: 3.5, // g Quelato Fe (EDDHA / EDTA)
      micros: 2.0, // g Micronutrientes
    },
    acelga: {
      name: 'Acelga Verde y Amarilla',
      phTarget: '6.0 - 6.5',
      ecTarget: '1.6 - 2.0 mS/cm',
      calcio: 110,
      potasioNitrato: 65,
      fosfato: 25,
      magnesio: 50,
      hierro: 4.0,
      micros: 2.5,
    },
    tomate: {
      name: 'Tomate Cherry Hidropónico',
      phTarget: '5.8 - 6.3',
      ecTarget: '2.0 - 2.6 mS/cm',
      calcio: 140,
      potasioNitrato: 85,
      fosfato: 35,
      magnesio: 65,
      hierro: 5.0,
      micros: 3.0,
    },
    albahaca: {
      name: 'Albahaca Genovesa',
      phTarget: '5.5 - 6.0',
      ecTarget: '1.2 - 1.6 mS/cm',
      calcio: 80,
      potasioNitrato: 45,
      fosfato: 18,
      magnesio: 38,
      hierro: 3.0,
      micros: 1.8,
    },
  };

  const currentFormula = cropFormulas[selectedCrop];
  const ratio = tankLiters / 100;

  return (
    <section id="info" className="py-12 sm:py-16 bg-white border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-semibold mb-2">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Guía Integral de Aprendizaje Científico</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight font-['Outfit']">
            Fundamentos de Hidroponía Sostenible en La Bocana
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-2">
            Metodologías técnicas, balance químico del agua y herramientas de dosificación para los estudiantes y docentes de la Unidad Educativa Paquisha.
          </p>
        </div>

        {/* Tab Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex flex-wrap p-1.5 rounded-2xl bg-stone-100 border border-stone-200 gap-1">
            <button
              id="tab-sistemas"
              onClick={() => setActiveTab('sistemas')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'sistemas'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Layers className="w-4 h-4 text-emerald-600" />
              <span>Sistemas en Paquisha</span>
            </button>

            <button
              id="tab-quimica"
              onClick={() => setActiveTab('quimica')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'quimica'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <FlaskConical className="w-4 h-4 text-emerald-600" />
              <span>Química: pH y Nutrientes</span>
            </button>

            <button
              id="tab-calculadora"
              onClick={() => setActiveTab('calculadora')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'calculadora'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Calculator className="w-4 h-4 text-emerald-600" />
              <span>Calculadora de Sales</span>
            </button>

            <button
              id="tab-beneficios"
              onClick={() => setActiveTab('beneficios')}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition ${
                activeTab === 'beneficios'
                  ? 'bg-white text-emerald-800 shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Droplets className="w-4 h-4 text-emerald-600" />
              <span>Sostenibilidad en Piñas</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Sistemas Hidropónicos */}
        {activeTab === 'sistemas' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 animate-in fade-in duration-200">
            
            {/* NFT Card */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 flex flex-col justify-between hover:border-emerald-300 transition">
              <div>
                <div className="w-10 h-10 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold mb-4">
                  NFT
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-['Outfit']">Técnica de Película Nutritiva (NFT)</h3>
                <p className="text-xs text-emerald-700 font-semibold mb-3">Módulo principal del invernadero escolar</p>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Construido con tubos sanitarios de PVC de 3 pulgadas con perforaciones cada 20 cm. Una lámina delgada de agua circula de forma constante bañando la punta de las raíces.
                </p>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Pendiente requerida:</strong> 1.5% a 2% para evitar encharcamientos.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Caudal ideal:</strong> 1.5 a 2.0 litros por minuto por tubo.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Cultivos idóneos:</strong> Lechuga crespa, acelga, espinaca.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-medium">
                ⚡ Impulsado por electrobomba sumergible solar de 12V.
              </div>
            </div>

            {/* Raiz Flotante Card */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 flex flex-col justify-between hover:border-emerald-300 transition">
              <div>
                <div className="w-10 h-10 rounded-xl bg-blue-100 flex items-center justify-center text-blue-700 font-bold mb-4">
                  DWC
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-['Outfit']">Raíz Flotante (Floating Raft)</h3>
                <p className="text-xs text-blue-700 font-semibold mb-3">Estanques de bajo costo para semilleros</p>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Las plántulas se sostienen en planchas de poliestireno expandido (plumafón) flotando sobre un lecho de solución nutritiva oxigenada con compresores de burbujas.
                </p>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Profundidad de estanque:</strong> 15 a 20 cm forrado con polietileno UV.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Oxigenación:</strong> Difusor de aire continuo para evitar asfixia de raíz.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Cultivos idóneos:</strong> Albahaca, apio, menta y plántulas de transición.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-medium">
                🌱 Facilidad de replicación en casas de estudiantes de La Bocana.
              </div>
            </div>

            {/* Sustratos Inertes Locales Card */}
            <div className="rounded-2xl border border-stone-200 bg-stone-50/50 p-6 flex flex-col justify-between hover:border-emerald-300 transition">
              <div>
                <div className="w-10 h-10 rounded-xl bg-amber-100 flex items-center justify-center text-amber-800 font-bold mb-4">
                  SUST
                </div>
                <h3 className="text-lg font-bold text-stone-900 font-['Outfit']">Sustratos Inertes Ecológicos</h3>
                <p className="text-xs text-amber-700 font-semibold mb-3">Reutilización de subproductos de El Oro</p>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  Aprovechamos recursos locales de Piñas y la provincia para dar soporte físico al cultivo en mangas o macetas sin alterar la composición química de la solución.
                </p>
                <ul className="space-y-2 text-xs text-stone-600">
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Cascarilla de arroz carbonizada:</strong> Porosa, estéril y rica en silicio.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Fibra de coco lavada:</strong> Excelente retención de humedad y aire.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-600 mt-0.5 shrink-0" />
                    <span><strong>Piedra pómez volcánica (cascajo fino):</strong> Drenaje superior.</span>
                  </li>
                </ul>
              </div>
              <div className="mt-5 pt-3 border-t border-stone-200 text-[11px] text-stone-500 font-medium">
                🌾 Economía circular y reciclaje agrícola en la parroquia.
              </div>
            </div>

          </div>
        )}

        {/* Tab 2: Química del Agua y Nutrientes */}
        {activeTab === 'quimica' && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              
              {/* Card pH */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2 rounded-xl bg-emerald-100 text-emerald-800">
                    <FlaskConical className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Control de Potencial Hidrógeno (pH)</h3>
                    <p className="text-xs text-emerald-700 font-semibold">Rango Crítico: 5.5 a 6.5</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  El pH mide la acidez o alcalinidad de la solución. Si el pH sube de 6.5 (común en aguas duras de vertiente), el <strong>Hierro, Manganeso, Fósforo y Calcio</strong> se insolubilizan y precipitan, provocando clorosis severa en las hojas.
                </p>

                {/* pH Scale Bar */}
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-[11px] font-semibold text-stone-600">
                    <span>pH 4.0 (Muy Ácido)</span>
                    <span className="text-emerald-700 font-bold bg-emerald-100 px-2 py-0.5 rounded-sm">5.5 - 6.5 ÓPTIMO</span>
                    <span>pH 8.5 (Alcalino)</span>
                  </div>
                  <div className="h-4 w-full rounded-full bg-gradient-to-r from-red-400 via-amber-300 via-emerald-500 to-blue-500 relative flex items-center justify-center">
                    <div className="w-16 h-6 border-2 border-stone-900 rounded-md bg-white/20 backdrop-blur-xs shadow-xs"></div>
                  </div>
                  <p className="text-[11px] text-stone-500 text-center">
                    En La Bocana ajustamos el agua usando ácido cítrico orgánico diluido en proporción 1:10.
                  </p>
                </div>
              </div>

              {/* Card EC */}
              <div className="p-6 rounded-2xl border border-stone-200 bg-stone-50/50">
                <div className="flex items-center gap-3 mb-3">
                  <span className="p-2 rounded-xl bg-blue-100 text-blue-800">
                    <Flame className="w-5 h-5" />
                  </span>
                  <div>
                    <h3 className="text-base font-bold text-stone-900">Electroconductividad (EC / TDS)</h3>
                    <p className="text-xs text-blue-700 font-semibold">Rango Escolar: 1.2 a 2.0 mS/cm (600 - 1000 PPM)</p>
                  </div>
                </div>
                <p className="text-xs text-stone-600 leading-relaxed mb-4">
                  La conductividad eléctrica indica la concentración total de sales minerales disueltas en el agua. Permite saber si el cultivo tiene suficiente comida o si el agua se está saturando por evaporación solar.
                </p>
                <div className="space-y-2 bg-white p-3.5 rounded-xl border border-stone-200 text-xs">
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-medium">Semilleros y primeros 10 días:</span>
                    <span className="font-bold text-emerald-700">0.8 - 1.2 mS/cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-medium">Lechugas en pleno crecimiento:</span>
                    <span className="font-bold text-emerald-700">1.4 - 1.8 mS/cm</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-stone-600 font-medium">Días muy calurosos en Piñas:</span>
                    <span className="font-bold text-amber-700">Bajar EC (añadir agua limpia)</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Solución A y B Explanation */}
            <div className="p-5 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs text-amber-950 flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
              <div>
                <p className="font-bold text-sm text-amber-900 mb-1">
                  Regla de Oro en la UE Paquisha: ¿Por qué NUNCA mezclar concentradas la Solución A y Solución B?
                </p>
                <p className="leading-relaxed">
                  La <strong>Solución A</strong> contiene Calcio (Nitrato de Calcio) y la <strong>Solución B</strong> contiene Sulfatos y Fosfatos (Sulfato de Magnesio y Fosfato Monopotásico). Si se mezclan concentradas en el mismo frasco, reaccionan químicamente formando <em>Sulfato de Calcio (Yeso)</em> y <em>Fosfato de Calcio</em> insolubles, anulando por completo los nutrientes. Se deben disolver una por una en el tanque con abundante agua.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: Calculadora Hidropónica Escolar */}
        {activeTab === 'calculadora' && (
          <div className="bg-stone-50/80 rounded-2xl border border-stone-200 p-6 sm:p-8 animate-in fade-in duration-200">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Inputs */}
              <div className="lg:col-span-5 space-y-5">
                <div>
                  <h3 className="text-lg font-bold text-stone-900 font-['Outfit']">
                    Calculadora de Dosificación Mineral
                  </h3>
                  <p className="text-xs text-stone-500 mt-1">
                    Selecciona el volumen del reservorio de agua y la hortaliza para conocer los gramos exactos de sales de grado hidropónico.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Volumen de Agua en el Tanque (Litros)
                  </label>
                  <div className="flex items-center gap-3">
                    <input
                      type="range"
                      min="10"
                      max="500"
                      step="10"
                      value={tankLiters}
                      onChange={(e) => setTankLiters(Number(e.target.value))}
                      className="w-full accent-emerald-600"
                    />
                    <span className="w-20 px-3 py-1.5 rounded-lg bg-white border border-stone-300 font-bold text-emerald-800 text-sm text-center">
                      {tankLiters} L
                    </span>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                    Tipo de Cultivo Escolar
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {(Object.keys(cropFormulas) as Array<keyof typeof cropFormulas>).map((cropKey) => (
                      <button
                        key={cropKey}
                        onClick={() => setSelectedCrop(cropKey)}
                        className={`p-2.5 rounded-xl text-left border text-xs transition ${
                          selectedCrop === cropKey
                            ? 'bg-emerald-600 text-white border-emerald-600 font-bold shadow-xs'
                            : 'bg-white text-stone-700 border-stone-200 hover:border-emerald-300'
                        }`}
                      >
                        {cropFormulas[cropKey].name}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="p-3 bg-emerald-50/70 rounded-xl border border-emerald-200 text-xs text-emerald-900 space-y-1">
                  <p><strong>Rango de pH sugerido:</strong> {currentFormula.phTarget}</p>
                  <p><strong>Conductividad objetivo:</strong> {currentFormula.ecTarget}</p>
                </div>
              </div>

              {/* Results */}
              <div className="lg:col-span-7 bg-white rounded-2xl border border-stone-200 p-5 shadow-xs">
                <div className="flex items-center justify-between pb-3 border-b border-stone-100 mb-4">
                  <div>
                    <h4 className="font-bold text-sm text-stone-900">
                      Receta para {tankLiters} Litros ({currentFormula.name})
                    </h4>
                    <p className="text-[11px] text-stone-500">Pesar con balanza digital escolar de precisión</p>
                  </div>
                  <span className="px-2 py-0.5 text-xs font-bold bg-stone-100 text-stone-700 rounded-md">
                    Fórmula La Molina / Paquisha
                  </span>
                </div>

                <div className="space-y-4">
                  {/* Solution A */}
                  <div className="p-3 rounded-xl bg-emerald-50/50 border border-emerald-100">
                    <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2">
                      🌿 COMPONENTE A (Nitrato de Calcio + Hierro)
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between bg-white p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-600">Nitrato de Calcio:</span>
                        <span className="font-black text-emerald-900">{(currentFormula.calcio * ratio).toFixed(1)} g</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-600">Quelato de Hierro (EDDHA):</span>
                        <span className="font-black text-emerald-900">{(currentFormula.hierro * ratio).toFixed(1)} g</span>
                      </div>
                    </div>
                  </div>

                  {/* Solution B */}
                  <div className="p-3 rounded-xl bg-blue-50/50 border border-blue-100">
                    <span className="text-xs font-bold text-blue-800 uppercase tracking-wider block mb-2">
                      💧 COMPONENTE B (Fósforo, Potasio, Magnesio y Micronutrientes)
                    </span>
                    <div className="grid grid-cols-2 gap-3 text-xs">
                      <div className="flex justify-between bg-white p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-600">Nitrato de Potasio:</span>
                        <span className="font-black text-blue-900">{(currentFormula.potasioNitrato * ratio).toFixed(1)} g</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-600">Fosfato Monopotásico:</span>
                        <span className="font-black text-blue-900">{(currentFormula.fosfato * ratio).toFixed(1)} g</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-600">Sulfato de Magnesio:</span>
                        <span className="font-black text-blue-900">{(currentFormula.magnesio * ratio).toFixed(1)} g</span>
                      </div>
                      <div className="flex justify-between bg-white p-2 rounded-lg border border-stone-100">
                        <span className="text-stone-600">Micronutrientes (B, Zn, Cu, Mo):</span>
                        <span className="font-black text-blue-900">{(currentFormula.micros * ratio).toFixed(1)} g</span>
                      </div>
                    </div>
                  </div>

                  <p className="text-[11px] text-stone-500 italic">
                    Procedimiento: Disolver la Solución A completamente en un balde con agua antes de verterla al tanque principal. Esperar 10 minutos de recirculación y verter la Solución B ya disuelta. Verificar finalmente el pH y la EC.
                  </p>
                </div>
              </div>

            </div>
          </div>
        )}

        {/* Tab 4: Beneficios y Sostenibilidad en Piñas */}
        {activeTab === 'beneficios' && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 animate-in fade-in duration-200">
            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                1
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Cuidado de Cuencas Hídricas</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                En La Bocana, el agua que no se consume en la transpiración regresa al tanque. Cero lixiviación de fertilizantes hacia el río Piñas ni napas freáticas.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                2
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Cero Agroquímicos Tóxicos</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Al cultivarse en invernadero escolar con mallas anti-áfidos y biopreparados orgánicos, las cosechas son 100% seguras para el comedor de los estudiantes.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                3
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Energía Limpia Fotovoltaica</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                La recirculación hídrica no depende de combustibles fósiles; un panel solar de 150W con controlador inteligente alimenta la bomba durante todo el día.
              </p>
            </div>

            <div className="p-5 rounded-2xl border border-stone-200 bg-stone-50/50">
              <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold mb-3">
                4
              </div>
              <h4 className="font-bold text-stone-900 text-sm mb-1">Educación STEAM Práctica</h4>
              <p className="text-xs text-stone-600 leading-relaxed">
                Los jóvenes de Paquisha aplican matemáticas en volumetría, física en bombeo y presiones, química en sales iónicas y biología en fotosíntesis.
              </p>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
