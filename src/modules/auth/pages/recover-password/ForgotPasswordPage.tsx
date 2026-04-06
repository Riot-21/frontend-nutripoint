import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Mail } from "lucide-react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useForgotPassword } from "../../hooks/useForgotPassword";
import { forgotSchema, type ForgotForm } from "../../interfaces/auth-schema.interface";


export default function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useForgotPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotForm>({
    resolver: zodResolver(forgotSchema),
  });

  const onSubmit = async (data: ForgotForm) => {
    try{
      const message = await mutateAsync(data);
      toast.success(message);
      sessionStorage.setItem("recoveryEmail", data.email);
      navigate("/auth/reset-password", { replace: true});
    }catch(error){
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error inesperado");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <Card className="border-border/50 shadow-lg">
          <CardHeader>
            <CardTitle>Recuperar contraseña</CardTitle>
            <CardDescription>
              Ingresa tu correo para enviarte un código de recuperación
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-2">
                <Label>Correo Electrónico</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="email"
                    placeholder="tucorreo@ejemplo.com"
                    {...register("email")}
                    className="pl-10"
                  />
                </div>
                {errors.email && (
                  <p className="text-red-500 text-sm">
                    {errors.email.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                className="w-full bg-blue-900 hover:bg-[#2d4c8f]"
                disabled={isPending}
              >
                {isPending ? "Enviando..." : "Enviar código"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
