"use client";

import { useActionState } from "react";
import { register } from "@/app/actions/auth";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function RegisterPage() {
  const [state, action, pending] = useActionState(register, undefined);

  return (
    <div className="flex h-screen w-full items-center justify-center bg-surface-container-lowest">
      <Card className="w-full max-w-sm rounded-lg border-outline-variant/50 shadow-sm">
        <CardHeader className="text-center">
          <CardTitle className="text-primary text-2xl font-bold tracking-tight">
            AcademIA
          </CardTitle>
          <CardDescription>Crea una nueva cuenta</CardDescription>
        </CardHeader>
        <form action={action}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre completo</Label>
              <Input id="name" name="name" placeholder="Juan Pérez" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Correo electrónico</Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="ejemplo@ucv.edu.pe"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input id="password" name="password" type="password" required />
            </div>
            {state?.error && (
              <p className="text-sm text-red-500 text-center">{state.error}</p>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              disabled={pending}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              {pending ? "Registrando..." : "Registrarse"}
            </Button>
            <div className="text-sm text-center text-on-surface-variant">
              ¿Ya tienes cuenta?{" "}
              <Link href="/login" className="text-secondary hover:underline">
                Inicia sesión
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
