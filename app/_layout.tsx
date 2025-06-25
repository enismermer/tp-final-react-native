import AsyncStorage from "@react-native-async-storage/async-storage";
import { Stack, usePathname, useRouter } from "expo-router";
import { useEffect, useState } from "react";

export default function RootLayout() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkToken = async () => {
      const token = await AsyncStorage.getItem('token');
      if (!token && pathname !== '/login') {
        router.replace('/login');
      }
      setIsLoading(false);
    };
    checkToken();
  }, [pathname]);

  if (isLoading) return null;

  return <Stack />;
}
