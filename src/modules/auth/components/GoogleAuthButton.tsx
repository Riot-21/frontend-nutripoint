import { useNavigate } from "react-router";
import { useGoogleAuth } from "../hooks/useGoogleAuth";
import { GoogleLogin, type CredentialResponse } from "@react-oauth/google";
import { toast } from "sonner";

type Props = {
  mode: "login" | "register";
};

export const GoogleAuthButton = ({ mode }: Props) => {
  const navigate = useNavigate();
  const mutation = useGoogleAuth(mode);

  const handleSuccess = async (credentialResponse: CredentialResponse) => {
    try {
      if (!credentialResponse.credential) {
        throw new Error("Token Google inválido");
      }

      await mutation.mutateAsync(credentialResponse.credential);

      toast.success(
        mode === "login"
          ? "Login con Google exitoso"
          : "Registro con Google exitoso",
      );

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Error inesperado");
      }
    }
  };

  return (
    <GoogleLogin
      onSuccess={handleSuccess}
      onError={() => toast.error("Google auth falló")}
    />
  );
};
