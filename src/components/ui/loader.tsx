import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

interface LoaderProps {
  /** The size of the loader in pixels */
  size?: "sm" | "md" | "lg";
  /** Whether to show the loader in fullscreen mode */
  fullscreen?: boolean;
  /** Optional text to display below the loader */
  text?: string;
  /** Additional className to apply to the loader container */
  className?: string;
  /** The color variant of the loader */
  variant?: "default" | "primary" | "white";
}

export function Loader({
  size = "md",
  fullscreen = false,
  text,
  className,
  variant = "default",
}: LoaderProps) {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
  };

  const variantClasses = {
    default: "text-muted-foreground",
    primary: "text-primary",
    white: "text-white",
  };

  const Container = fullscreen ? "div" : "span";

  return (
    <Container
      className={cn(
        "flex flex-col items-center justify-center gap-3",
        fullscreen && "fixed inset-0 bg-background/80 backdrop-blur-sm z-50",
        className,
      )}
      role="status"
    >
      <div className="relative">
        {/* Background spinner */}
        <div
          className={cn(
            "animate-[spin_3s_linear_infinite] opacity-20",
            sizeClasses[size],
          )}
        >
          <div
            className={cn(
              "w-full h-full rounded-full border-[2.5px] border-current",
              variantClasses[variant],
            )}
          />
        </div>

        {/* Foreground spinner */}
        <Loader2
          className={cn(
            "animate-spin absolute top-0 left-0",
            sizeClasses[size],
            variantClasses[variant],
          )}
        />
      </div>

      {text && (
        <p className={cn("text-sm animate-pulse", variantClasses[variant])}>
          {text}
        </p>
      )}
    </Container>
  );
}
