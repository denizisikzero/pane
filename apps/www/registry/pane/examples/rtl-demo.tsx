import { Direction } from "radix-ui";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Progress } from "@/components/ui/progress";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";

export default function RtlDemo() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>الإعدادات</CardTitle>
            <CardDescription>غيّر شكل حسابك وطريقة عمله.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="rtl-name" className="font-medium text-sm">
                الاسم
              </label>
              <Input id="rtl-name" placeholder="اكتب اسمك" />
            </div>
            <div className="flex items-center justify-between gap-6">
              <label htmlFor="rtl-updates" className="font-medium text-sm">
                التحديثات التلقائية
              </label>
              <Switch id="rtl-updates" defaultChecked />
            </div>
            <div className="flex flex-col gap-3">
              <span className="font-medium text-sm">مستوى الصوت</span>
              <Slider defaultValue={[30]} aria-label="مستوى الصوت" />
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">رفع الصور</span>
                <span className="text-muted-foreground tabular-nums">72%</span>
              </div>
              <Progress value={72} aria-label="رفع الصور" />
            </div>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="prominent" className="flex-1">
              حفظ
            </Button>
            <Button variant="ghost" className="flex-1">
              إلغاء
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Direction.Provider>
  );
}
