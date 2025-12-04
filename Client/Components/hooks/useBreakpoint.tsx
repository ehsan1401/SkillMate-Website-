import { useEffect, useState } from "react";

type Breakpoint = "base" | "sm" | "md" | "lg" | "xl" | "2xl";

export function useBreakpoint(): Breakpoint {
  const [bp, setBp] = useState<Breakpoint>("base");

  useEffect(() => {
    const queries = {
      sm: window.matchMedia("(min-width: 640px)"),
      md: window.matchMedia("(min-width: 768px)"),
      lg: window.matchMedia("(min-width: 1024px)"),
      xl: window.matchMedia("(min-width: 1280px)"),
      x2l: window.matchMedia("(min-width: 1536px)")
    };

    const update = () => {
      if (queries.x2l.matches) setBp("2xl");
      else if (queries.xl.matches) setBp("xl");
      else if (queries.lg.matches) setBp("lg");
      else if (queries.md.matches) setBp("md");
      else if (queries.sm.matches) setBp("sm");
      else setBp("base");
    };

    Object.values(queries).forEach(q => q.addEventListener("change", update));
    update();

    return () => {
      Object.values(queries).forEach(q =>
        q.removeEventListener("change", update)
      );
    };
  }, []);

  return bp;
}
