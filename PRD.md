# PRD.md — AcademIA

## Participante

Nombre: Alejandrina Huaylla Quispe  
GitHub: https://github.com/ahuayllaq  
Correo: ahuayllaq@ucvvirtual.edu.pe

## Nombre del proyecto

AcademIA

## Descripción

AcademIA es una aplicación web para gestionar tareas académicas de estudiantes de maestría. Permitirá registrar cursos, crear tareas, asignar prioridades, fechas de vencimiento y estados de avance.

## Tecnologías

- Next.js 15
- TypeScript
- Tailwind CSS
- shadcn/ui
- Supabase
- GitHub
- Vercel

## Funcionalidades principales

1. Registro e inicio de sesión con correo y contraseña.
2. Gestión de cursos.
3. Gestión de tareas académicas.
4. Filtros por curso, prioridad y estado.
5. Tablero con métricas básicas.

## Tablas principales

- profiles
- courses
- tasks

## Seguridad

Cada usuario solo debe ver y modificar sus propios cursos y tareas mediante Row Level Security en Supabase.