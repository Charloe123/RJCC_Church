import { RouterProvider } from "react-router";
import { ThemeProvider } from "next-themes";
import { router } from "./routes";
import { Toaster } from "./components/ui/sonner";
import { MobileInit } from "./components/mobile-init";

export default function App() {
  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <MobileInit />
      <RouterProvider router={router} />
      <Toaster />
    </ThemeProvider>
  );
}
