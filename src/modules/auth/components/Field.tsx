import { Label } from "@/components/ui/label";

interface FieldProps {
  label: string;
  icon: React.ReactNode;
  error?: string;
  children: React.ReactNode;
}

export const Field = ({ label, icon, error, children }: FieldProps) => {
  return (
    <div className="space-y-2">
      <Label>{label}</Label>

      <div className="relative">
        <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
          {icon}
        </div>
        {children}
      </div>

      {error && <p className="text-sm text-red-500">{error}</p>}
    </div>
  );
};
