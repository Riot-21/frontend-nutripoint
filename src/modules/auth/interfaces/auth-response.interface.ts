export type Role = "USER" | "ADMIN" | "SUPER_ADMIN";

export interface AuthResponse {
  token: string;
  user: UserResponse
}

export interface UserResponse {
    idUsuario: number;
    nombres:   string;
    apellidos: string;
    dni?:       string;
    email:     string;
    telefono?:  string;
    roles:     Role[];
}