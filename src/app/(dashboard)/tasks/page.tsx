"use client";

import { useState } from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Plus, Edit } from "lucide-react";
import { DUMMY_TASKS, DUMMY_COURSES, Task } from "@/lib/dummy-data";
import { TaskDetailModal } from "@/components/TaskDetailModal";

export default function TasksPage() {
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'alta': return 'bg-[#EF4444] text-white hover:bg-[#EF4444]/80';
      case 'media': return 'bg-[#F59E0B] text-white hover:bg-[#F59E0B]/80';
      case 'baja': return 'bg-[#10B981] text-white hover:bg-[#10B981]/80';
      default: return 'bg-gray-500 text-white';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pendiente': return 'Pendiente';
      case 'en_progreso': return 'En Progreso';
      case 'completada': return 'Completada';
      default: return status;
    }
  };

  const handleEdit = (task: Task) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Tareas</h2>
          <p className="text-on-surface-variant">Gestiona tus responsabilidades académicas.</p>
        </div>
        <Button
          className="bg-primary hover:bg-primary/90 text-primary-foreground"
          onClick={() => {
            alert("Botón Nueva Tarea funcionando");
            setSelectedTask(null);
            setIsModalOpen(true);
          }}
        >
          <Plus className="mr-2 h-4 w-4" /> Nueva Tarea
        </Button>
      </div>

      <div className="rounded-lg border border-outline-variant/50 bg-surface shadow-sm overflow-hidden">
        <Table>
          <TableHeader className="bg-surface-container-low">
            <TableRow>
              <TableHead className="text-on-surface font-semibold">Título</TableHead>
              <TableHead className="text-on-surface font-semibold">Curso</TableHead>
              <TableHead className="text-on-surface font-semibold">Prioridad</TableHead>
              <TableHead className="text-on-surface font-semibold">Estado</TableHead>
              <TableHead className="text-on-surface font-semibold">Vencimiento</TableHead>
              <TableHead className="text-right text-on-surface font-semibold">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {DUMMY_TASKS.map((task) => (
              <TableRow key={task.id} className="hover:bg-surface-container-lowest">
                <TableCell className="font-medium text-on-surface">{task.title}</TableCell>
                <TableCell className="text-on-surface-variant">
                  {DUMMY_COURSES.find(c => c.id === task.courseId)?.code}
                </TableCell>
                <TableCell>
                  <Badge className={getPriorityColor(task.priority)} variant="outline">
                    {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell className="text-on-surface-variant">
                  {getStatusLabel(task.status)}
                </TableCell>
                <TableCell className="text-on-surface-variant">{task.dueDate}</TableCell>
                <TableCell className="text-right">
                  <Button variant="ghost" size="icon" onClick={() => handleEdit(task)}>
                    <Edit className="h-4 w-4 text-secondary" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <TaskDetailModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        task={selectedTask}
      />
    </div>
  );
}
