import { Button } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { type FC, useEffect, useState } from "react";
import { TbMoonFilled, TbSunHigh } from "../icons/icons";

interface Props {
  color: string;
}

/**
 * @param color -> Color en RGB o HEX para el btn
 */
export const SwitchTheme: FC<Props> = ({ color }) => {
  const { theme, setTheme } = useTheme();
  const [isActiveTheme, setIsActiveTheme] = useState(false);

  const [isDark, setIsDark] = useState(false);
  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  useEffect(() => {
    setIsActiveTheme(localStorage.getItem("isActiveTheme") !== "false");
  }, []);

  const handleChange = () => {

    if (isDark && localStorage.getItem("theme") === "dark") {
      setTheme("light");
      setIsActiveTheme(false);
      localStorage.setItem("isActiveTheme", "false");
    } else {
      setTheme("dark");
      setIsActiveTheme(true);
      localStorage.setItem("isActiveTheme", "true");
    }
  };

  return (
    <Button
      size="sm"
      onClick={handleChange}
      isIconOnly
      disableAnimation
      style={{ backgroundColor: `${color}` }}
    >
      {isActiveTheme ? (
        <TbSunHigh size={25} color="white" />
      ) : (
        <TbMoonFilled size={25} color="white" />
      )}
    </Button>
  );
};
