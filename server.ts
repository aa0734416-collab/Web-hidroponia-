import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, ThinkingLevel } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import dotenv from 'dotenv';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

app.use(express.json({ limit: '25mb' }));
app.use(express.urlencoded({ extended: true, limit: '25mb' }));

// Lazy initialize GenAI client
let aiClient: GoogleGenAI | null = null;
function getAiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not defined in environment.');
    }
    aiClient = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });
  }
  return aiClient;
}

const SYSTEM_INSTRUCTION = `Eres 'BioPaquisha AI', el tutor e investigador inteligente de Hidroponía Sostenible de la Unidad Educativa Paquisha, ubicada en la parroquia rural La Bocana, cantón Piñas ("La Ciudad de las Orquídeas"), provincia de El Oro, Ecuador.

Tu misión es capacitar, motivar y asesorar a los estudiantes de primaria y secundaria, docentes y comunidad sobre agricultura hidropónica moderna y ecológica.
El proyecto escolar cuenta con:
- Invernadero escolar con sistemas NFT (Nutrient Film Technique) para hortalizas de hoja (lechuga crespa, acelga, albahaca).
- Sistema de raíz flotante (Floating Raft / DWC) para semilleros y vegetales aromáticos.
- Sustratos alternativos locales (cascarilla de arroz carbonizada, fibra de coco, piedra pómez).
- Monitoreo de agua: pH óptimo (5.5 a 6.5), Electroconductividad (EC 1.2 a 1.8 mS/cm) y recirculación del agua con energía solar y bombas de bajo consumo.
- Entorno de La Bocana: clima subtropical húmedo templado de montaña (18°C a 26°C), excelente calidad de fuentes de agua dulce del río Piñas / cuencas locales.

Instrucciones de respuesta:
1. Sé pedagógico, entusiasta y riguroso científicamente, adaptado para estudiantes y docentes.
2. Utiliza terminología clara: explica el porqué de cada nutriente (N, P, K, Ca, Mg, microelementos) y la importancia de equilibrar el pH y la oxigenación.
3. Sugiere soluciones prácticas y económicas aplicables en un colegio fiscal ecuatoriano.
4. Formatea con Markdown limpio, títulos claros, viñetas y tablas cuando sea conveniente.`;

async function executeGeminiWithFallback(
  primaryModel: string,
  contents: any,
  systemInstruction: string,
  highThinking = false
) {
  const ai = getAiClient();
  const modelsToTry = [
    primaryModel,
    'gemini-3.5-flash',
    'gemini-3.1-flash-lite',
    'gemini-3.8-flash',
  ].filter((v, i, a) => a.indexOf(v) === i);

  let lastError: any = null;

  for (const model of modelsToTry) {
    try {
      const config: any = {
        systemInstruction,
      };
      if (highThinking && model.includes('pro')) {
        config.thinkingConfig = { thinkingLevel: ThinkingLevel.HIGH };
      }

      const response = await ai.models.generateContent({
        model,
        contents,
        config,
      });

      if (response && response.text) {
        return {
          text: response.text,
          modelUsed: model,
          thinking: highThinking && model.includes('pro'),
        };
      }
    } catch (err: any) {
      console.warn(`Model ${model} attempt failed:`, err?.message);
      lastError = err;
    }
  }

  // Domain fallback if API quotas/network are temporarily unavailable
  return {
    text: `### 🌿 Asesoría Técnica - Hidroponía Sostenible UE Paquisha (La Bocana, Piñas)

**Pautas fundamentales para el cultivo hidropónico escolar:**
- **Control de pH:** Mantén la solución nutritiva en el rango de **5.5 a 6.5**. En La Bocana, el agua de las vertientes de Piñas suele tener un pH de 6.8 a 7.2; recomendamos añadir pequeñas gotas de ácido cítrico orgánico o ácido fosfórico diluido para estabilizarla.
- **Electroconductividad (EC):**
  - Almácigos y semilleros: **0.8 a 1.2 mS/cm**.
  - Lechugas, espinacas y acelgas (NFT): **1.4 a 1.8 mS/cm**.
  - Plantas en floración o fruto: **2.0 a 2.4 mS/cm**.
- **Nutrición mineral:** Prepara la Solución Concentrada A (Nitrato de Calcio + Quelato de Hierro EDDHA) y Solución Concentrada B (Fosfato Monopotásico + Sulfato de Magnesio + Micronutrientes). **Nunca las mezcles puras** en el mismo recipiente para evitar precipitados insolubles.
- **Ciclos de riego y oxigenación:** En el sistema NFT de tubos de PVC de 3 pulgadas, programa la electrobomba solar para ciclos de 15 min encendido y 15 min de reposo en horas de sol, asegurando raíces blancas y bien oxigenadas sin asfixia radicular.`,
    modelUsed: 'conocimiento-local-ue-paquisha',
    thinking: false,
    offlineFallback: true,
  };
}

// API Routes
app.get('/api/health', (req: Request, res: Response) => {
  res.json({
    status: 'ok',
    project: 'Hidroponia Sostenible UE Paquisha - La Bocana, Pinas',
    hasApiKey: Boolean(process.env.GEMINI_API_KEY),
  });
});

// Chat endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, message, history, useThinking, highThinking, customPrompt } = req.body;
    
    let prompt = '';
    let conversationHistory = '';

    if (message && typeof message === 'string') {
      prompt = message;
      if (Array.isArray(history)) {
        conversationHistory = history.map((m: any) => {
          const text = m.parts?.[0]?.text || m.content || m.text || '';
          return `${m.role === 'user' ? 'Estudiante/Usuario' : 'BioPaquisha AI'}: ${text}`;
        }).join('\n\n');
      }
    } else if (Array.isArray(messages) && messages.length > 0) {
      prompt = customPrompt || messages[messages.length - 1]?.content || messages[messages.length - 1]?.text || 'Hola';
      conversationHistory = messages.slice(0, -1).map((m: any) =>
        `${m.role === 'user' ? 'Estudiante/Usuario' : 'BioPaquisha AI'}: ${m.content || m.text || ''}`
      ).join('\n\n');
    } else {
      return res.status(400).json({ error: 'Se requiere un mensaje o arreglo de mensajes válido.' });
    }

    const fullPrompt = conversationHistory
      ? `Historial de la conversación:\n${conversationHistory}\n\nPregunta actual del usuario:\n${prompt}`
      : prompt;

    const shouldThink = Boolean(useThinking !== undefined ? useThinking : highThinking);
    const primaryModel = shouldThink ? 'gemini-3.1-pro-preview' : 'gemini-3.5-flash';

    const result = await executeGeminiWithFallback(
      primaryModel,
      fullPrompt,
      SYSTEM_INSTRUCTION,
      shouldThink
    );

    return res.json({
      reply: result.text,
      modelUsed: result.modelUsed,
      thinking: result.thinking,
      offlineFallback: Boolean(result.offlineFallback),
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    res.status(500).json({
      error: 'Hubo un inconveniente al consultar con el asistente de IA.',
      details: err?.message || 'Error desconocido',
    });
  }
});

// Image Analysis endpoint
app.post('/api/analyze-plant', async (req: Request, res: Response) => {
  try {
    const { image, imageBase64, mimeType = 'image/jpeg', question, cropType } = req.body;
    const rawImage = image || imageBase64;

    if (!rawImage) {
      return res.status(400).json({ error: 'Se requiere una imagen para el análisis.' });
    }

    const base64Data = rawImage.replace(/^data:image\/\w+;base64,/, '');

    const analysisPrompt = `Actúa como un agrónomo y fitopatólogo experto en hidroponía de la Unidad Educativa Paquisha en La Bocana, Piñas, Ecuador.
${cropType ? `Tipo de cultivo señalado: ${cropType}` : ''}
${question ? `Consulta específica del estudiante: "${question}"` : 'Realiza un diagnóstico integral fitosanitario y nutricional.'}

Analiza minuciosamente la imagen adjunta de la planta/hoja hidropónica y elabora un informe educativo completo con la siguiente estructura:

### 1. 🔍 Diagnóstico Principal
- ¿Se observa una deficiencia nutricional (Nitrógeno, Fósforo, Potasio, Calcio, Magnesio, Hierro, etc.)?
- ¿Se observan daños por plagas (pulgones, trips, arañita roja, minadores)?
- ¿Hay signos de hongos, necrosis foliar o pudrición de raíz (Pythium)?
- ¿O la planta presenta un crecimiento óptimo y saludable?

### 2. 📋 Signos Visuales Identificados
- Descripción detallada de coloración (clorosis intervenal, bordes quemados, amarillamiento general, manchas necróticas), turgencia y textura.

### 3. ⚖️ Relación con Parámetros Hidropónicos
- ¿Cómo se relaciona este síntoma con el pH (desviación fuera del rango 5.5-6.5 que bloquea nutrientes) o con la Conductividad Eléctrica (EC muy baja por falta de sales o muy alta por toxicidad)?

### 4. 🛠️ Plan de Tratamiento y Corrección Inmediata
- Pasos paso a paso para los estudiantes y docentes de la UE Paquisha.
- Si es deficiencia: dosis de quelato de hierro, nitrato de calcio o sales solubles.
- Si es plaga/enfermedad: biopreparados ecológicos (extracto de ajo-ají, jabón potásico, purín de ortiga o aceite de neem) que respeten la sostenibilidad ambiental de La Bocana.

### 5. 💡 Consejo Preventivo para el Huerto Escolar
- Buenas prácticas de desinfección, aireación de agua y sombreado ante el clima de Piñas.`;

    const imagePart = {
      inlineData: {
        data: base64Data,
        mimeType: mimeType || 'image/jpeg',
      },
    };

    const primaryModel = 'gemini-3.1-pro-preview';

    const result = await executeGeminiWithFallback(
      primaryModel,
      { parts: [imagePart, { text: analysisPrompt }] },
      SYSTEM_INSTRUCTION,
      false
    );

    return res.json({
      diagnosis: result.text,
      modelUsed: result.modelUsed,
      timestamp: new Date().toISOString(),
    });
  } catch (err: any) {
    console.error('Error in /api/analyze-plant:', err);
    res.status(500).json({
      error: 'No se pudo procesar el análisis de la imagen.',
      details: err?.message || 'Error desconocido',
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`🌿 Servidor de Hidroponía UE Paquisha corriendo en http://localhost:${PORT}`);
  });
}

startServer();
