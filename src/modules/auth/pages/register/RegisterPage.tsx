import { useState } from "react";
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
// import { useAuth } from "@/lib/auth-context"
import { Eye, EyeOff, IdCard, Lock, Mail, Phone, User } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { Field } from "../../components/Field";
import { useForm } from "react-hook-form";
import {
  registerSchema,
  type RegisterForm,
} from "../../interfaces/register-schema.interface";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRegister } from "../../hooks/useRegister";
import { toast } from "sonner";
// import { GoogleLogin } from "@react-oauth/google";
// import axios from "axios";
import { GoogleAuthButton } from "../../components/GoogleAuthButton";

export default function RegisterPage() {
  // const [name, setName] = useState("");
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  // const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState("");
  //   const { register } = useAuth()
  //   const router = useRouter()
  const { mutateAsync } = useRegister();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    // getValues,
    formState: { errors, isSubmitting },
  } = useForm<RegisterForm>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterForm) => {
    try {
      await mutateAsync(data);
      toast.success("Registro exitoso");
      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error inesperado");
      }
    }
  };

  const inputError = "border-red-500 focus:ring-2 focus:ring-red-500";

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 flex items-center justify-center py-12 px-4 animate-fade-in">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-2">
              Únete a <span className="text-blue-900">NutriPoint</span>
            </h1>
            <p className="text-muted-foreground">
              Crea tu cuenta y comienza tu transformación
            </p>
          </div>

          <Card className="border-border/50 shadow-lg">
            <CardHeader>
              <CardTitle>Crear Cuenta</CardTitle>
              <CardDescription>
                Completa el formulario para registrarte
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <Field
                  label="Nombres"
                  icon={<User size={16} />}
                  error={errors.nombres?.message}
                >
                  <Input
                    type="text"
                    placeholder="Juan"
                    {...register("nombres", {
                      required: true,
                    })}
                    className={`pl-10 ${errors.nombres ? inputError : "focus:ring-2 focus:ring-accent"}`}
                    // className="pl-10 transition-smooth focus:ring-2 focus:ring-accent"
                  />
                </Field>

                <Field
                  label="Apellidos"
                  icon={<User size={16} />}
                  error={errors.apellidos?.message}
                >
                  <Input
                    type="text"
                    placeholder="Pérez"
                    {...register("apellidos", {
                      required: true,
                    })}
                    className={`pl-10 ${errors.apellidos ? inputError : "focus:ring-2 focus:ring-accent"}`}
                    // className="pl-10 transition-smooth focus:ring-2 focus:ring-accent"
                  />
                </Field>

                <Field
                  label="Correo Electrónico"
                  icon={<Mail size={16} />}
                  error={errors.email?.message}
                >
                  <Input
                    type="email"
                    placeholder="ejemplo@gmail.com"
                    {...register("email", {
                      required: true,
                    })}
                    className={`pl-10 ${errors.email ? inputError : "focus:ring-2 focus:ring-accent"}`}
                    // className="pl-10 transition-smooth focus:ring-2 focus:ring-accent"
                  />
                </Field>

                <Field
                  label="Teléfono"
                  icon={<Phone size={16} />}
                  error={errors.telefono?.message}
                >
                  <Input
                    type="text"
                    maxLength={9}
                    placeholder="987654321"
                    {...register("telefono", {
                      required: true,
                    })}
                    className={`pl-10 ${errors.telefono ? inputError : "focus:ring-2 focus:ring-accent"}`}
                    // className="pl-10 transition-smooth focus:ring-2 focus:ring-accent"
                  />
                </Field>

                <Field
                  label="DNI"
                  icon={<IdCard size={16} />}
                  error={errors.dni?.message}
                >
                  <Input
                    type="text"
                    maxLength={8}
                    placeholder="99887766"
                    {...register("dni", {
                      required: true,
                    })}
                    className={`pl-10 ${errors.dni ? inputError : "focus:ring-2 focus:ring-accent"}`}
                    // className="pl-10 transition-smooth focus:ring-2 focus:ring-accent"
                  />
                </Field>

                <div className="space-y-2">
                  <Label htmlFor="password">Contraseña</Label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      {...register("password", {
                        required: true,
                      })}
                      // value={password}
                      // onChange={(e) => setPassword(e.target.value)}
                      className={`pl-10 ${errors.password ? inputError : "focus:ring-2 focus:ring-accent"}`}

                      // className="pl-10 pr-10 transition-smooth focus:ring-2 focus:ring-accent"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-smooth"
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="text-sm text-red-500">
                      {errors.password.message}
                    </p>
                  )}
                  {/* <p className="text-xs text-muted-foreground">
                    Mínimo 6 caracteres
                  </p> */}
                </div>

                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    required
                    className="rounded border-border mt-1"
                  />
                  <label className="text-sm text-slate-700">
                    Acepto los{" "}
                    <Link
                      to="/terms"
                      className="text-[#2d4c8f] link-underline-smooth"
                    >
                      términos y condiciones
                    </Link>{" "}
                    y la{" "}
                    <Link
                      to="/privacy"
                      className="text-[#2d4c8f] link-underline-smooth"
                    >
                      política de privacidad
                    </Link>
                  </label>
                </div>

                <Button
                  type="submit"
                  size="lg"
                  className="w-full bg-blue-900 hover:bg-[#2d4c8f] transition-smooth"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
                </Button>

                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-card px-2 text-muted-foreground">
                      O regístrate con
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <GoogleAuthButton mode="register"></GoogleAuthButton>
                  {/* <GoogleLogin
                    onSuccess={async (credentialResponse) => {
                      try {
                        const token = credentialResponse.credential;

                        // const values = getValues(); // ← react-hook-form

                        const res = await axios.post(
                          "http://localhost:8082/api/auth/google-register",
                          {
                            token,
                            // dni: values.dni,
                            // telefono: values.telefono,
                          },
                        );

                        localStorage.setItem("jwt", res.data.token);

                        toast.success("Registro con Google exitoso");
                        navigate("/");
                      } catch (err: any) {
                        toast.error(
                          err?.response?.data?.message ||
                            "Error Google Register",
                        );
                      }
                    }}
                    onError={() => toast.error("Google register falló")}
                  /> */}

                  {/* <Button
                    type="button"
                    variant="outline"
                    className="transition-smooth hover:bg-accent bg-transparent"
                    disabled
                  >
                    <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
                      <path
                        fill="currentColor"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="currentColor"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="currentColor"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Google
                  </Button> */}
                  <Button
                    type="button"
                    variant="outline"
                    className="transition-smooth hover:bg-accent bg-transparent"
                    disabled
                  >
                    <svg
                      className="mr-2 h-4 w-4"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                    </svg>
                    Facebook
                  </Button>
                </div>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">
                  ¿Ya tienes una cuenta?{" "}
                </span>
                <Link
                  to="/auth/login"
                  className="text-blue-900 font-semibold link-underline-smooth"
                >
                  Inicia sesión aquí
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
