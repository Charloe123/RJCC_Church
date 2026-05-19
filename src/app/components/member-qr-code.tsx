import { QRCodeSVG } from "qrcode.react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { User } from "lucide-react";

interface MemberQRCodeProps {
  memberId: string;
  memberName: string;
  size?: number;
}

export function MemberQRCode({ memberId, memberName, size = 200 }: MemberQRCodeProps) {
  const qrData = JSON.stringify({
    type: "member_checkin",
    memberId,
    memberName,
    timestamp: new Date().toISOString(),
  });

  return (
    <Card className="w-fit">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-base">
          <User className="w-5 h-5" />
          {memberName}
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <div className="bg-white p-4 rounded-lg">
          <QRCodeSVG
            value={qrData}
            size={size}
            level="H"
            includeMargin
          />
        </div>
        <p className="text-xs text-muted-foreground text-center">
          Member ID: {memberId}
        </p>
      </CardContent>
    </Card>
  );
}
