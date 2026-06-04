import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Task, DUMMY_COURSES } from "@/lib/dummy-data";

interface TaskDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  task: Task | null;
}

export function TaskDetailModal({ isOpen, onClose, task }: TaskDetailModalProps) {
  const isEditing = !!task;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) onClose();
    }}>
      <DialogContent className="sm:max-w-[425px] bg-surface rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-primary text-xl">
            {isEditing ? "Editar Tarea" : "Nueva Tarea"}
          </DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="title" className="text-on-surface">Título</Label>
            <Input
              id="title"
              defaultValue={task?.title ?? ""}
              placeholder="Ejemplo: Revisar lectura del curso"
              className="col-span-3 border-outline-variant/50"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-on-surface">Descripción</Label>
            <Input
              id="description"
              defaultValue={task?.description ?? ""}
              placeholder="Describe brevemente la tarea"
              className="col-span-3 border-outline-variant/50"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="priority" className="text-on-surface">Prioridad</Label>
              <Select defaultValue={task?.priority ?? "media"}>
                <SelectTrigger className="w-full border-outline-variant/50">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="alta">Alta</SelectItem>
                  <SelectItem value="media">Media</SelectItem>
                  <SelectItem value="baja">Baja</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status" className="text-on-surface">Estado</Label>
              <Select defaultValue={task?.status ?? "pendiente"}>
                <SelectTrigger className="w-full border-outline-variant/50">
                  <SelectValue placeholder="Seleccionar" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pendiente">Pendiente</SelectItem>
                  <SelectItem value="en_progreso">En progreso</SelectItem>
                  <SelectItem value="completada">Completada</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="course" className="text-on-surface">Curso</Label>
            <Select defaultValue={task?.courseId ?? DUMMY_COURSES[0]?.id}>
              <SelectTrigger className="w-full border-outline-variant/50">
                <SelectValue placeholder="Seleccionar curso" />
              </SelectTrigger>
              <SelectContent>
                {DUMMY_COURSES.map(course => (
                  <SelectItem key={course.id} value={course.id}>
                    {course.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="dueDate" className="text-on-surface">Fecha de vencimiento</Label>
            <Input
              id="dueDate"
              type="date"
              defaultValue={task?.dueDate ?? ""}
              className="border-outline-variant/50"
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            className="border-primary text-primary hover:bg-primary/10"
          >
            Cancelar
          </Button>

          <Button
            onClick={onClose}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            {isEditing ? "Guardar Cambios" : "Crear Tarea"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}