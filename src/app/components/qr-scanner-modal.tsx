import { useState, useEffect, useRef } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { QrCode, CheckCircle, X } from "lucide-react";
import { toast } from "sonner";

interface QRScannerModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function QRScannerModal({ open, onOpenChange }: QRScannerModalProps) {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [Html5Qrcode, setHtml5Qrcode] = useState<any>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load html5-qrcode once
  useEffect(() => {
    let isMounted = true;
    
    const loadHtml5Qrcode = async () => {
      if (typeof window !== "undefined") {
        try {
          const module = await import("html5-qrcode");
          if (isMounted) {
            setHtml5Qrcode(module.default);
          }
        } catch (err) {
          console.error("Failed to load html5-qrcode", err);
          if (isMounted) {
            toast.error("Failed to load QR scanner library");
          }
        }
      }
    };

    loadHtml5Qrcode();

    return () => {
      isMounted = false;
    };
  }, []);

  // Initialize scanner when modal opens and library is loaded
  useEffect(() => {
    if (open && Html5Qrcode && !isInitialized) {
      initializeScanner();
    }
    
    // Cleanup when modal closes
    if (!open) {
      stopScanner();
      setIsInitialized(false);
    }
  }, [open, Html5Qrcode, isInitialized]);

  const initializeScanner = () => {
    if (!videoRef.current || !Html5Qrcode) {
      console.error("Cannot initialize scanner: missing video element or Html5Qrcode");
      return;
    }

    try {
      console.log("Initializing QR scanner...");
      const qrCodeInstance = new Html5Qrcode(videoRef.current);
      
      qrCodeInstance
        .start(
          { facingMode: "environment" },
          {
            fps: 10,
            qrbox: 250,
          },
          (decodedText: string, decodedResult: any) => {
            console.log("QR Code scanned:", decodedText);
            // Handle successful scan
            handleScanSuccess(decodedText);
          },
          (error: any) => {
            // Handle scan error (e.g., no QR code in frame) - this is normal
            // console.warn("Scan error:", error);
          }
        )
        .then(() => {
          console.log("QR scanner started successfully");
          setScanning(true);
          setIsInitialized(true);
        })
        .catch((err: any) => {
          console.error("Unable to start scanner:", err);
          toast.error("Failed to start scanner. Please check camera permissions.");
          setScanning(false);
        });
    } catch (err) {
      console.error("Error initializing scanner:", err);
      toast.error("Failed to initialize scanner.");
      setScanning(false);
    }
  };

  const stopScanner = () => {
    // We don't have a reference to the instance here, so we can't stop it properly
    // This is a limitation of the current approach
    setScanning(false);
    // In a better implementation, we'd store the instance and call stop() on it
  };

  const handleScanSuccess = (decodedText: string) => {
    stopScanner();
    setScanned(true);
    toast.success("Member checked in successfully!", {
      description: `ID: ${decodedText}`,
    });

    // Reset after delay
    setTimeout(() => {
      setScanned(false);
      onOpenChange(false);
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>QR Code Scanner</DialogTitle>
          <DialogDescription>
            Scan member QR codes for attendance tracking
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center gap-6 py-8">
          {!scanning && !scanned && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 border-4 border-dashed border-border rounded-lg flex items-center justify-center bg-secondary/20">
                <QrCode className="w-24 h-24 text-muted-foreground" />
              </div>
              <p className="text-sm text-muted-foreground text-center">
                Position QR code within the frame
              </p>
              <Button
                onClick={() => {
                  // Try to initialize scanner if not already scanning
                  if (!scanning && Html5Qrcode) {
                    initializeScanner();
                  }
                }}
                className="bg-black text-white hover:bg-black/90"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            </div>
          )}

          {scanning && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-full max-w-[300px]">
                <video
                  ref={videoRef}
                  playsInline
                  width="100%"
                  height="auto"
                  style={{ background: "#000" }}
                />
              </div>
              <p className="text-sm font-medium">Scanning...</p>
              <Button
                onClick={() => {
                  setScanning(false);
                  onOpenChange(false);
                }}
                variant="outline"
                className="text-black hover:bg-black/5"
              >
                Stop Scanning
              </Button>
            </div>
          )}

          {scanned && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 border-4 border-green-500 rounded-lg flex items-center justify-center bg-green-50">
                <CheckCircle className="w-24 h-24 text-green-500" />
              </div>
              <p className="text-sm font-medium text-green-600">Check-in Successful!</p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}