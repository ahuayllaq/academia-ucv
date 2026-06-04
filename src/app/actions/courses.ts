"use server";

import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";

export async function getCourses() {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching courses:", error);
    return { data: null, error: error.message };
  }
  return { data, error: null };
}

export async function createCourse(name: string, code: string, color: string) {
  const supabase = await createClient();

  const { data: { user }, error: userError } = await supabase.auth.getUser();
  if (userError || !user) {
    return { error: "No autorizado." };
  }

  const { data, error } = await supabase
    .from("courses")
    .insert({
      user_id: user.id,
      name,
      code: code || null,
      color: color || "#1F4E79"
    })
    .select()
    .single();

  if (error) {
    console.error("Error creating course:", error);
    return { error: error.message };
  }

  revalidatePath("/courses");
  revalidatePath("/");
  return { data, error: null };
}

export async function updateCourse(id: string, name: string, code: string, color: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("courses")
    .update({
      name,
      code: code || null,
      color: color || "#1F4E79"
    })
    .eq("id", id);

  if (error) {
    console.error("Error updating course:", error);
    return { error: error.message };
  }

  revalidatePath("/courses");
  revalidatePath("/");
  return { error: null };
}

export async function deleteCourse(id: string) {
  const supabase = await createClient();

  const { error } = await supabase
    .from("courses")
    .delete()
    .eq("id", id);

  if (error) {
    console.error("Error deleting course:", error);
    return { error: error.message };
  }

  revalidatePath("/courses");
  revalidatePath("/tasks");
  revalidatePath("/");
  return { error: null };
}
