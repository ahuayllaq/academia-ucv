import { Sidebar } from "@/components/Sidebar";
import { Topbar } from "@/components/Topbar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Clock, CalendarDays } from "lucide-react";
import { DUMMY_TASKS } from "@/lib/dummy-data";

export default function RootPage() {
  const pendingTasks = DUMMY_TASKS.filter(
    (t) => t.status === "pendiente" || t.status === "en_progreso"
  ).length;
  const completedTasks = DUMMY_TASKS.filter(
    (t) => t.status === "completada"
  ).length;
  const nextDueDate =
    DUMMY_TASKS.filter((t) => t.status !== "completada").sort((a, b) =>
      a.dueDate.localeCompare(b.dueDate)
    )[0]?.dueDate || "Ninguna";

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Topbar />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          <div className="mx-auto max-w-[1440px] space-y-6">
            <div>
              <h2 className="text-2xl font-bold tracking-tight text-on-surface">
                Dashboard
              </h2>
              <p className="text-on-surface-variant">
                Resumen de tus actividades académicas.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <Card className="rounded-lg shadow-sm border-outline-variant/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-on-surface-variant">
                    Tareas Pendientes
                  </CardTitle>
                  <Clock className="h-4 w-4 text-priority-medium" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-on-surface">
                    {pendingTasks}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-lg shadow-sm border-outline-variant/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-on-surface-variant">
                    Tareas Completadas
                  </CardTitle>
                  <CheckCircle2 className="h-4 w-4 text-priority-low" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-on-surface">
                    {completedTasks}
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-lg shadow-sm border-outline-variant/50">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-on-surface-variant">
                    Próximo Vencimiento
                  </CardTitle>
                  <CalendarDays className="h-4 w-4 text-primary" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-on-surface">
                    {nextDueDate}
                  </div>
                </CardContent>
              </Card>
            </div>

            <h3 className="text-xl font-semibold mt-8 text-on-surface">
              Actividad Reciente
            </h3>
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {DUMMY_TASKS.slice(0, 3).map((task) => (
                <Card
                  key={task.id}
                  className="rounded-lg shadow-sm border-outline-variant/50"
                >
                  <CardHeader>
                    <CardTitle className="text-md text-on-surface">
                      {task.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-on-surface-variant truncate">
                      {task.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
