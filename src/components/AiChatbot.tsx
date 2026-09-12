import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, UserProfile } from '../types';
import { 
  Sparkles, 
  Send, 
  X, 
  Bot, 
  User, 
  Lightbulb, 
  BrainCircuit, 
  Maximize2, 
  Minimize2,
  RefreshCw,
  Copy,
  Check
} from 'lucide-react';

interface AiChatbotProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserProfile | null;
}

export const AiChatbot: React.FC<AiChatbotProps> = ({ isOpen, onClose, currentUser }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'msg-welcome',
      role: 'model',
      text: '¡Hola! Soy **BioPaquisha AI**, el tutor de hidroponía sostenible de la **Unidad Educativa Paquisha** en La Bocana, Piñas.\n\nPuedo ayudarte a balancear el pH y la conductividad (EC), diseñar módulos NFT o raíz flotante, formular sales concentradas o diagnosticar anomalías en las plantas. ¿En qué trabajamos hoy en el huerto escolar?',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    },
  ]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [useThinking, setUseThinking] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedQuestions = [
    '¿Cómo corregir un pH de 7.2 en el agua de La Bocana?',
    '¿Cuáles son las proporciones para 100L de solución hidropónica?',
    '¿Qué pendiente y caudal requiere un sistema NFT en tubos de 3 pulgadas?',
    '¿Cómo oxigenar las raíces en piscinas de plumafón?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  if (!isOpen) return null;

  const handleSendMessage = async (textToSend?: string) => {
    const messageContent = (textToSend || inputText).trim();
    if (!messageContent || isLoading) return;

    const userMessage: ChatMessage = {
      id: `msg-user-${Date.now()}`,
      role: 'user',
      text: messageContent,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMessage]);
    if (!textToSend) setInputText('');
    setIsLoading(true);

    try {
      // Build history payload for multi-turn chat
      const historyPayload = messages.map((m) => ({
        role: m.role,
        parts: [{ text: m.text }],
      }));

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageContent,
          history: historyPayload,
          useThinking,
          userName: currentUser?.name || 'Estudiante UE Paquisha',
          userRole: currentUser?.role || 'estudiante',
        }),
      });

      if (!res.ok) {
        throw new Error('Error al conectar con BioPaquisha AI');
      }

      const data = await res.json();
      const botMessage: ChatMessage = {
        id: `msg-model-${Date.now()}`,
        role: 'model',
        text: data.reply || 'No se obtuvo respuesta del tutor.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err: any) {
      console.error(err);
      const errorMessage: ChatMessage = {
        id: `msg-error-${Date.now()}`,
        role: 'model',
        text: '⚠️ Ocurrió una pequeña intermitencia temporal con el servicio de IA. Sin embargo, para la UE Paquisha recuerda: mantener siempre el pH entre 5.5 y 6.5, y la conductividad (EC) entre 1.4 y 1.8 mS/cm para lechugas crespas.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div
      id="ai-chatbot-window"
      className={`fixed z-50 transition-all duration-300 flex flex-col bg-white shadow-2xl border border-stone-200 overflow-hidden ${
        isExpanded
          ? 'inset-4 sm:inset-10 rounded-3xl'
          : 'bottom-4 right-4 sm:bottom-6 sm:right-6 w-full sm:w-[440px] h-[580px] rounded-2xl'
      }`}
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-700 via-emerald-800 to-teal-900 px-4 py-3.5 text-white flex items-center justify-between shrink-0 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center text-white ring-1 ring-white/20">
            <Sparkles className="w-5 h-5 text-emerald-300" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h3 className="font-extrabold text-sm tracking-tight font-['Outfit']">BioPaquisha AI</h3>
              <span className="px-1.5 py-0.2 rounded text-[10px] font-semibold bg-emerald-400/20 text-emerald-200 border border-emerald-400/30">
                Gemini 3.1
              </span>
            </div>
            <p className="text-[11px] text-emerald-100/80">Tutor de Hidroponía Escolar · La Bocana</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          {/* Thinking Mode Toggle */}
          <button
            onClick={() => setUseThinking(!useThinking)}
            title={useThinking ? 'Razonamiento Profundo Activado (Thinking High)' : 'Modo Rápido'}
            className={`p-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition ${
              useThinking
                ? 'bg-emerald-500/30 text-emerald-200 ring-1 ring-emerald-400/50'
                : 'text-stone-300 hover:bg-white/10'
            }`}
          >
            <BrainCircuit className="w-4 h-4 text-emerald-300" />
            <span className="hidden sm:inline text-[10px]">Pensamiento</span>
          </button>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 rounded-lg text-emerald-100 hover:bg-white/10 transition"
          >
            {isExpanded ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>

          <button
            id="close-ai-chat-btn"
            onClick={onClose}
            className="p-1.5 rounded-lg text-emerald-100 hover:bg-white/10 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Message History Thread */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-stone-50/50">
        {messages.map((msg) => {
          const isUser = msg.role === 'user';
          return (
            <div
              key={msg.id}
              className={`flex gap-3 ${isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!isUser && (
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold shadow-xs">
                  <Bot className="w-4 h-4 text-emerald-200" />
                </div>
              )}

              <div
                className={`relative max-w-[85%] rounded-2xl px-4 py-3 text-xs sm:text-sm leading-relaxed ${
                  isUser
                    ? 'bg-emerald-600 text-white shadow-xs rounded-br-xs'
                    : 'bg-white text-stone-800 border border-stone-200 shadow-2xs rounded-bl-xs'
                }`}
              >
                {/* Text render with basic formatting */}
                <div className="whitespace-pre-wrap space-y-1">
                  {msg.text.split('\n\n').map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}
                </div>

                <div className="mt-2 flex items-center justify-between text-[10px] opacity-70 gap-2">
                  <span>{msg.timestamp}</span>
                  {!isUser && (
                    <button
                      onClick={() => copyToClipboard(msg.id, msg.text)}
                      className="hover:opacity-100 transition inline-flex items-center gap-0.5"
                    >
                      {copiedId === msg.id ? (
                        <>
                          <Check className="w-3 h-3 text-emerald-600" />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3 h-3" />
                          <span>Copiar</span>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>

              {isUser && (
                <div className="w-8 h-8 rounded-full bg-stone-800 text-white flex items-center justify-center shrink-0 mt-0.5 text-xs font-bold">
                  <User className="w-4 h-4 text-stone-300" />
                </div>
              )}
            </div>
          );
        })}

        {/* Loading Indicator */}
        {isLoading && (
          <div className="flex gap-3 justify-start">
            <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-xs">
              <Bot className="w-4 h-4 text-emerald-200 animate-spin" />
            </div>
            <div className="bg-white border border-stone-200 rounded-2xl rounded-bl-xs px-4 py-3 text-xs text-stone-600 flex items-center gap-2 shadow-2xs">
              <RefreshCw className="w-3.5 h-3.5 animate-spin text-emerald-600" />
              <span>
                {useThinking
                  ? 'BioPaquisha AI está analizando con razonamiento profundo...'
                  : 'Consultando conocimientos hidropónicos...'}
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions Pills */}
      {messages.length < 3 && (
        <div className="px-4 py-2 bg-stone-100/80 border-t border-stone-200/70 overflow-x-auto flex gap-1.5 no-scrollbar shrink-0">
          {suggestedQuestions.map((q, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(q)}
              className="px-2.5 py-1 rounded-full bg-white border border-stone-200 text-stone-700 hover:border-emerald-400 hover:text-emerald-800 text-[11px] font-medium whitespace-nowrap transition"
            >
              {q}
            </button>
          ))}
        </div>
      )}

      {/* Input Box */}
      <div className="p-3 bg-white border-t border-stone-200 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSendMessage();
          }}
          className="flex items-center gap-2"
        >
          <input
            type="text"
            placeholder="Pregunta sobre pH, nutrientes, tubos PVC o plagas..."
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            disabled={isLoading}
            className="flex-1 px-3.5 py-2 text-xs sm:text-sm bg-stone-50 border border-stone-300 rounded-xl focus:ring-2 focus:ring-emerald-500 focus:outline-hidden disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isLoading}
            className="p-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white disabled:opacity-40 transition shadow-xs shrink-0"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
        <div className="mt-1.5 flex items-center justify-between text-[10px] text-stone-400 px-1">
          <span>Unidad Educativa Paquisha · La Bocana, Piñas</span>
          <span>Modelo Gemini 3.1 con Thinking Mode</span>
        </div>
      </div>
    </div>
  );
};
