export type Priority = 'baja' | 'media' | 'alta';
export type Status = 'pendiente' | 'en_progreso' | 'completada';

export interface Course {
  id: string;
  name: string;
  code: string;
  color: string;
}

export interface Task {
  id: string;
  courseId: string;
  title: string;
  description: string;
  priority: Priority;
  dueDate: string;
  status: Status;
}

export const DUMMY_COURSES: Course[] = [
  { id: '1', name: 'Metodología de la Investigación', code: 'INV-101', color: '#1F4E79' },
  { id: '2', name: 'Seminario de Tesis I', code: 'TES-201', color: '#2EC4B6' },
  { id: '3', name: 'Estadística Aplicada', code: 'EST-301', color: '#F59E0B' },
];

export const DUMMY_TASKS: Task[] = [
  {
    id: '1',
    courseId: '1',
    title: 'Revisión de literatura',
    description: 'Buscar y resumir 10 artículos recientes sobre el tema.',
    priority: 'alta',
    dueDate: '2026-06-10',
    status: 'en_progreso',
  },
  {
    id: '2',
    courseId: '2',
    title: 'Borrador del Capítulo 1',
    description: 'Redactar la introducción y el planteamiento del problema.',
    priority: 'media',
    dueDate: '2026-06-15',
    status: 'pendiente',
  },
  {
    id: '3',
    courseId: '3',
    title: 'Análisis descriptivo de la muestra',
    description: 'Generar tablas y gráficos básicos en SPSS.',
    priority: 'alta',
    dueDate: '2026-06-08',
    status: 'pendiente',
  },
  {
    id: '4',
    courseId: '1',
    title: 'Definir variables de estudio',
    description: 'Tabla de operacionalización de variables.',
    priority: 'baja',
    dueDate: '2026-06-05',
    status: 'completada',
  },
];
