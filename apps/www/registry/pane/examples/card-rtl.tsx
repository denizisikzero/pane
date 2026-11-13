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

export default function CardRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="w-full max-w-sm">
        <Card>
          <CardHeader>
            <CardTitle>الترقية إلى Pro</CardTitle>
            <CardDescription>
              افتح كل المكونات ومحرك الزجاج الكامل.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground text-sm">
              يُدفع سنويًا. يمكنك الإلغاء في أي وقت من إعدادات حسابك.
            </p>
          </CardContent>
          <CardFooter className="gap-2">
            <Button variant="prominent" className="flex-1">
              ترقية
            </Button>
            <Button variant="ghost" className="flex-1">
              ليس الآن
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Direction.Provider>
  );
}
