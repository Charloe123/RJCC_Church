import { useEffect, useState } from "react";
import { WifiOff, Wifi } from "lucide-react";
import { Badge } from "./ui/badge";

export function OfflineIndicator() {
  const [isOnline, setIsOnline] = useState(true);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);

    setIsOnline(navigator.onLine);

    window.addEventListener("online", handleOnline);
    window.addEventListener("offline", handleOffline);

    return () => {
      window.removeEventListener("online", handleOnline);
      window.removeEventListener("offline", handleOffline);
    };
  }, []);

  if (isOnline) {
    return null;
  }

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <Badge
        variant="destructive"
        className="flex items-center gap-2 px-4 py-2 shadow-lg"
      >
        <WifiOff className="w-4 h-4" />
        <span>Offline Mode - Data will sync when connected</span>
      </Badge>
    </div>
  );
}
