import { useEffect } from "react";
import { useLocalStorage } from "usehooks-ts";
import { Switch } from "./switch";

export function ThemeSwitcher() {
  const [theme, setTheme] = useLocalStorage("theme", "light");
  const isLight = theme === "light";

  useEffect(() => {
    document.body.classList.remove("light", "dark");
    document.body.classList.add(isLight ? "light" : "dark");
  }, [isLight, theme]);

  return (
    <div className="text-xs h-full flex items-center justify-center gap-2">
      <Switch
        checked={isLight}
        onCheckedChange={(newIsLight) => {
          setTheme(newIsLight ? "light" : "dark");
        }}
      ></Switch>
    </div>
  );
}