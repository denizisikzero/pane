import { Direction } from "radix-ui";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="grid w-96 max-w-full gap-4">
        <Alert>
          <AlertTitle>تم حفظ تغييراتك</AlertTitle>
          <AlertDescription>
            يمكن لكل أعضاء المشروع رؤيتها الآن.
          </AlertDescription>
        </Alert>
        <Alert variant="destructive">
          <AlertTitle>تعذّرت معالجة الدفع</AlertTitle>
          <AlertDescription>
            تحقق من بيانات بطاقتك وحاول مرة أخرى.
          </AlertDescription>
        </Alert>
      </div>
    </Direction.Provider>
  );
}
