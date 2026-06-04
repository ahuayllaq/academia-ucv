"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import { Plus, Edit, Trash2, AlertCircle } from "lucide-react";
import { createCourse, updateCourse, deleteCourse } from "@/app/actions/courses";

interface Course {
  id: string;
  name: string;
  code: string | null;
  color: string | null;
  created_at?: string | null;
}

interface CoursesListProps {
  initialCourses: Course[];
}

const PRESET_COLORS = [
  "#1F4E79", // Azul Académico
  "#2EC4B6", // Verde Menta
  "#F59E0B", // Ámbar/Naranja
  "#EF4444", // Rojo/Alta prioridad
  "#10B981", // Verde Esmeralda
  "#8B5CF6", // Púrpura
  "#EC4899"  // Rosa
];

export function CoursesList({ initialCourses }: CoursesListProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Modal states
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  // Form states
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [color, setColor] = useState(PRESET_COLORS[0]);
  const [error, setError] = useState<string | null>(null);

  // Open modals handlers
  const handleOpenAdd = () => {
    setName("");
    setCode("");
    setColor(PRESET_COLORS[0]);
    setError(null);
    setIsAddOpen(true);
  };

  const handleOpenEdit = (course: Course) => {
    setSelectedCourse(course);
    setName(course.name);
    setCode(course.code || "");
    setColor(course.color || PRESET_COLORS[0]);
    setError(null);
    setIsEditOpen(true);
  };

  const handleOpenDelete = (course: Course) => {
    setSelectedCourse(course);
    setError(null);
    setIsDeleteOpen(true);
  };

  // Submit Actions
  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError("El nombre del curso es obligatorio.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const res = await createCourse(name, code, color);
      if (res.error) {
        setError(res.error);
      } else {
        setIsAddOpen(false);
        router.refresh();
      }
    });
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedCourse) return;
    if (!name.trim()) {
      setError("El nombre del curso es obligatorio.");
      return;
    }
    setError(null);

    startTransition(async () => {
      const res = await updateCourse(selectedCourse.id, name, code, color);
      if (res.error) {
        setError(res.error);
      } else {
        setIsEditOpen(false);
        router.refresh();
      }
    });
  };

  const handleDeleteSubmit = async () => {
    if (!selectedCourse) return;
    setError(null);

    startTransition(async () => {
      const res = await deleteCourse(selectedCourse.id);
      if (res.error) {
        setError(res.error);
      } else {
        setIsDeleteOpen(false);
        router.refresh();
      }
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-on-surface">Cursos</h2>
          <p className="text-on-surface-variant">Administra tus cursos de maestría.</p>
        </div>
        <Button 
          onClick={handleOpenAdd}
          className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium shadow-sm transition-all"
        >
          <Plus className="mr-2 h-4 w-4" /> Nuevo Curso
        </Button>
      </div>

      {initialCourses.length === 0 ? (
        <Card className="rounded-lg shadow-sm border-outline-variant/50 p-8 text-center bg-surface">
          <CardContent className="flex flex-col items-center justify-center space-y-4 pt-6">
            <div className="rounded-full bg-primary/10 p-3 text-primary">
              <Plus className="h-8 w-8" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-xl text-on-surface">No hay cursos registrados</CardTitle>
              <p className="text-sm text-on-surface-variant max-w-sm mx-auto">
                Registra tus materias para poder organizar tus tareas y hacer un seguimiento de tu progreso académico.
              </p>
            </div>
            <Button 
              onClick={handleOpenAdd} 
              variant="outline" 
              className="mt-4 border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              Crear mi primer curso
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {initialCourses.map((course) => (
            <Card 
              key={course.id} 
              className="rounded-lg shadow-sm border-outline-variant/50 overflow-hidden bg-surface hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div>
                <div 
                  className="h-2 w-full transition-all" 
                  style={{ backgroundColor: course.color || "#1F4E79" }} 
                />
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg text-on-surface line-clamp-2">{course.name}</CardTitle>
                </CardHeader>
                <CardContent className="pb-3">
                  <p className="text-sm font-medium text-on-surface-variant bg-surface-container-low px-2.5 py-1 rounded inline-block">
                    Código: {course.code || "N/A"}
                  </p>
                </CardContent>
              </div>
              <CardFooter className="pt-2 border-t border-outline-variant/30 flex gap-2 justify-end">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleOpenEdit(course)}
                  className="text-secondary hover:bg-secondary/10 flex items-center gap-1.5"
                >
                  <Edit className="h-3.5 w-3.5" /> Editar
                </Button>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => handleOpenDelete(course)}
                  className="text-red-500 hover:text-red-600 hover:bg-red-500/10 flex items-center gap-1.5"
                >
                  <Trash2 className="h-3.5 w-3.5" /> Eliminar
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}

      {/* CREATE DIALOG */}
      <Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
        <DialogContent className="sm:max-w-[425px] bg-surface rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">Nuevo Curso</DialogTitle>
            <DialogDescription className="sr-only">Crea un nuevo curso completando los campos.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAddSubmit}>
            <div className="grid gap-4 py-4">
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="add-name" className="text-on-surface font-medium">Nombre del Curso *</Label>
                <Input 
                  id="add-name" 
                  placeholder="Ej. Inteligencia Artificial" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="add-code" className="text-on-surface font-medium">Código del Curso</Label>
                <Input 
                  id="add-code" 
                  placeholder="Ej. IA-102" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  className="border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-on-surface font-medium">Color Distintivo</Label>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="w-7 h-7 rounded-full transition-all border-2 flex items-center justify-center shrink-0 cursor-pointer"
                      style={{ 
                        backgroundColor: c,
                        borderColor: color === c ? "var(--color-primary, #6200EE)" : "transparent"
                      }}
                      onClick={() => setColor(c)}
                      disabled={isPending}
                      title={c}
                    />
                  ))}
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-8 p-0 border border-outline-variant/50 rounded cursor-pointer"
                    disabled={isPending}
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#1F4E79"
                    className="h-8 text-xs border-outline-variant/50 w-24"
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="pt-4 border-t border-outline-variant/30">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsAddOpen(false)} 
                className="border-primary text-primary hover:bg-primary/10"
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={isPending}
              >
                {isPending ? "Creando..." : "Crear Curso"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* EDIT DIALOG */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent className="sm:max-w-[425px] bg-surface rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-primary text-xl">Editar Curso</DialogTitle>
            <DialogDescription className="sr-only">Edita el curso actual.</DialogDescription>
          </DialogHeader>
          <form onSubmit={handleEditSubmit}>
            <div className="grid gap-4 py-4">
              {error && (
                <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  <span>{error}</span>
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="edit-name" className="text-on-surface font-medium">Nombre del Curso *</Label>
                <Input 
                  id="edit-name" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  className="border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-code" className="text-on-surface font-medium">Código del Curso</Label>
                <Input 
                  id="edit-code" 
                  value={code} 
                  onChange={(e) => setCode(e.target.value)} 
                  className="border-outline-variant/50 focus:border-primary focus:ring-1 focus:ring-primary"
                  disabled={isPending}
                />
              </div>
              <div className="space-y-2">
                <Label className="text-on-surface font-medium">Color Distintivo</Label>
                <div className="flex flex-wrap gap-2.5 pt-1">
                  {PRESET_COLORS.map((c) => (
                    <button
                      key={c}
                      type="button"
                      className="w-7 h-7 rounded-full transition-all border-2 flex items-center justify-center shrink-0 cursor-pointer"
                      style={{ 
                        backgroundColor: c,
                        borderColor: color === c ? "var(--color-primary, #6200EE)" : "transparent"
                      }}
                      onClick={() => setColor(c)}
                      disabled={isPending}
                      title={c}
                    />
                  ))}
                </div>
                <div className="pt-2 flex items-center gap-2">
                  <Input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-10 h-8 p-0 border border-outline-variant/50 rounded cursor-pointer"
                    disabled={isPending}
                  />
                  <Input
                    type="text"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    placeholder="#1F4E79"
                    className="h-8 text-xs border-outline-variant/50 w-24"
                    disabled={isPending}
                  />
                </div>
              </div>
            </div>
            <DialogFooter className="pt-4 border-t border-outline-variant/30">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => setIsEditOpen(false)} 
                className="border-primary text-primary hover:bg-primary/10"
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button 
                type="submit" 
                className="bg-primary hover:bg-primary/90 text-primary-foreground font-medium"
                disabled={isPending}
              >
                {isPending ? "Guardando..." : "Guardar Cambios"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DELETE CONFIRM DIALOG */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent className="sm:max-w-[400px] bg-surface rounded-lg">
          <DialogHeader>
            <DialogTitle className="text-red-500 text-xl flex items-center gap-2">
              <AlertCircle className="h-5 w-5 shrink-0" />
              ¿Eliminar Curso?
            </DialogTitle>
            <DialogDescription>
              Esta acción no se puede deshacer. Las tareas asociadas a este curso no se eliminarán, pero ya no estarán vinculadas a ningún curso.
            </DialogDescription>
          </DialogHeader>
          {error && (
            <div className="flex items-center gap-2 text-red-500 text-sm bg-red-500/10 p-3 rounded-lg border border-red-500/20 my-2">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}
          <DialogFooter className="pt-4 border-t border-outline-variant/30 flex gap-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setIsDeleteOpen(false)} 
              className="border-primary text-primary hover:bg-primary/10 flex-1"
              disabled={isPending}
            >
              Cancelar
            </Button>
            <Button 
              type="button" 
              onClick={handleDeleteSubmit}
              className="bg-red-500 hover:bg-red-600 text-white font-medium flex-1"
              disabled={isPending}
            >
              {isPending ? "Eliminando..." : "Eliminar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
