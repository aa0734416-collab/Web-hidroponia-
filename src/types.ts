export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'estudiante' | 'docente' | 'directivo' | 'padre_familia' | 'comunidad';
  grade?: string;
  institution: string;
  joinedDate: string;
}

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  youtubeUrl: string;
  youtubeId: string;
  category: 'Sistemas NFT' | 'Raíz Flotante' | 'Nutrición y pH' | 'Proyecto Paquisha' | 'Automatización';
  author: string;
  addedAt: string;
  views?: number;
}

export interface SurveyOption {
  id: string;
  text: string;
  votes: number;
}

export interface Survey {
  id: string;
  title: string;
  description: string;
  targetAudience: 'Estudiantes' | 'Docentes' | 'Comunidad General' | 'Todos';
  options: SurveyOption[];
  totalVotes: number;
  createdAt: string;
  createdBy: string;
  userVotedOptionId?: string;
  status: 'activa' | 'cerrada';
}

export interface DriveResource {
  id: string;
  title: string;
  description: string;
  driveUrl: string;
  type: 'docs' | 'sheets' | 'slides' | 'folder' | 'pdf';
  category: 'Guías de Aprendizaje' | 'Bitácoras y Registros' | 'Proyectos Escolares' | 'Normativas y Planes';
  author: string;
  updatedAt: string;
  fileSize?: string;
}

export interface HydroponicLog {
  id: string;
  date: string;
  time: string;
  system: 'NFT Tubos PVC' | 'Raíz Flotante' | 'Sustratos Inertes' | 'Semillero Sustrato Inerte';
  ph: number;
  ec: number; // mS/cm
  waterTemp: number; // °C
  ambientTemp: number; // °C
  author: string;
  status: 'Óptimo' | 'Alerta pH' | 'Alerta EC' | 'Mantenimiento' | 'Requiere Mantenimiento';
  notes: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content?: string;
  text: string;
  timestamp: string;
  thinking?: boolean;
  modelUsed?: string;
}
