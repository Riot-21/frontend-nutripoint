import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { useResetPassword } from "../../hooks/useResetPassword";
import { resetSchema, type ResetForm } from "../../interfaces/auth-schema.interface";

export default function ResetPasswordPage() {
  const navigate = useNavigate();
  const { mutateAsync, isPending } = useResetPassword();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });


  const onSubmit = async (data: ResetForm) => {
    const email = sessionStorage.getItem("recoveryEmail");
    if (!email) {
      toast.error("Correo no encontrado");
      navigate("/auth/login");
      return;
    }
    try{
      const message = await mutateAsync({
        email,
        ...data
      });
      toast.success(message);
      sessionStorage.removeItem("recoveryEmail");
      navigate("/auth/login", { replace: true});
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
            <CardTitle>Restablecer contraseña</CardTitle>
            <CardDescription>
              Ingresa el código recibido y tu nueva contraseña
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <Input placeholder="Código de 6 dígitos" {...register("code")} />
              {errors.code && (
                <p className="text-red-500 text-sm">
                  {errors.code.message}
                </p>
              )}
              <Input
                type="password"
                placeholder="Nueva contraseña"
                {...register("newPassword")}
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm">
                  {errors.newPassword.message}
                </p>
              )}

              <Button
                type="submit"
                className="w-full bg-blue-900 hover:bg-[#2d4c8f]"
                disabled={isPending}
              >
                {isPending ? "Actualizando..." : "Actualizar contraseña"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
