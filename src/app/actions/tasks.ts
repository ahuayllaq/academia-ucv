"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getTasks() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("tasks")
    .select("*")
    .order("due_date", { ascending: true, nullsFirst: false });

  if (error) {
    console.error("Error fetching tasks:", error);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

export async function createTask(data: {
  title: string;
  description?: string;
  course_id?: string | null;
  priority?: "baja" | "media" | "alta";
  due_date?: string | null;
  status?: "pendiente" | "en_progreso" | "completada";
}) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: "No autorizado." };
  }

  const { data: task, error } = await supabase
    .from("tasks")
    .insert({
      user_id: user.id,
      title: data.title,
      description: data.description || null,
      course_id: data.course_id || null,
      priority: data.priority || "media",
      due_date: data.due_date || null,
      status: data.status || "pendiente",
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating task:", error);
    return { error: error.message };
  }

  revalidatePath("/tasks");
  revalidatePath("/");
  return { data: task, error: null };
}

export async function updateTask(
  id: string,
  data: {
    title: string;
    description?: string;
    course_id?: string | null;
    priority?: "baja" | "media" | "alta";
    due_date?: string | null;
    status?: "pendiente" | "en_progreso" | "completada";
  }
) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .update({
      title: data.title,
      description: data.description || null,
      course_id: data.course_id || null,
      priority: data.priority || "media",
      due_date: data.due_date || null,
      status: data.status || "pendiente",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating task:", error);
    return { error: error.message };
  }

  revalidatePath("/tasks");
  revalidatePath("/");
  return { error: null };
}

export async function deleteTask(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("tasks")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting task:", error);
    return { error: error.message };
  }

  revalidatePath("/tasks");
  revalidatePath("/");
  return { error: null };
}
