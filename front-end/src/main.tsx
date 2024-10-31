import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ThemeProvider } from "@/components/theme/theme-provider.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import "./index.css";
import App from "./pages/App.tsx";
import ItemDetails from "./pages/ItemDetails.tsx";
import ItemDetailsNotFound from "./pages/ItemDetailsNotFound.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 20000,
        },
    },
});

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
    },
    {
        path: "/:id",
        element: <ItemDetails />,
        errorElement: <ItemDetailsNotFound />,
    },
]);

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
                <RouterProvider router={router} />
            </ThemeProvider>
        </QueryClientProvider>
    </StrictMode>
);
