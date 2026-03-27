import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { ThemeContext } from "./ThemeContextInternal";

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const root = document.documentElement;

    // Force dark theme globally
    root.setAttribute("data-theme", "dark");
    localStorage.setItem("theme", "dark");
    setTheme("dark");

    // Update meta theme-color for mobile browsers
    const metaThemeColor = document.querySelector('meta[name="theme-color"]');
    if (metaThemeColor) {
      metaThemeColor.setAttribute(
        "content",
        theme === "dark" ? "#0f172a" : "#ffffff",
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    // No-op: app stays permanently dark
  };

  const value = {
    theme,
    toggleTheme,
    isDark: true,
    isLight: false,
  };

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
