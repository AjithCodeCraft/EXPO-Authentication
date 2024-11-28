import { Slot, useRouter, useSegments } from "expo-router";
import { useEffect } from "react";
import { AuthContextProvider, useAuth } from "../context/authContext";
import { MenuProvider } from 'react-native-popup-menu';

const MainLayout = () => {
    const { isAuthenticated } = useAuth();
    const segments = useSegments() as string[]; // Explicitly defining the type as string[]
    const router = useRouter();

    useEffect(() => {
        if (typeof isAuthenticated === 'undefined') return;

        // Check if we are inside the (app) folder routes
        const inApp = segments[0] === "(app)";

        if (isAuthenticated && !inApp) {
            // Redirect to home if authenticated but not in (app) routes
            router.replace("/home");
        } else if (isAuthenticated === false) {
            // Redirect to signin if not authenticated
            router.replace("/signin");
        }
    }, [isAuthenticated]);

    return <Slot />;
};

export default function RootLayout() {
    return (
        <MenuProvider>
        <AuthContextProvider>
            <MainLayout />
        </AuthContextProvider>
        </MenuProvider>
    );
}
