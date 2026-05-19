import { useState } from "react";
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

  const handleScan = () => {
    setScanning(true);

    // Simulate scanning
    setTimeout(() => {
      setScanning(false);
      setScanned(true);
      toast.success("Member checked in successfully!", {
        description: "John Adeyemi - Sunday Service",
      });

      setTimeout(() => {
        setScanned(false);
        onOpenChange(false);
      }, 2000);
    }, 1500);
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
                onClick={handleScan}
                className="bg-black text-white hover:bg-black/90"
              >
                <QrCode className="w-4 h-4 mr-2" />
                Start Scanning
              </Button>
            </div>
          )}

          {scanning && (
            <div className="flex flex-col items-center gap-4">
              <div className="w-48 h-48 border-4 border-black rounded-lg flex items-center justify-center bg-secondary/20 animate-pulse">
                <QrCode className="w-24 h-24 text-black" />
              </div>
              <p className="text-sm font-medium">Scanning...</p>
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
