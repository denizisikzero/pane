import { Direction } from "radix-ui";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="w-96 max-w-full">
        <Accordion type="single" collapsible defaultValue="package">
          <AccordionItem value="package">
            <AccordionTrigger>هل Pane حزمة npm؟</AccordionTrigger>
            <AccordionContent>
              لا. ينسخ shadcn CLI كل مكوّن إلى مشروعك، فتملك الكود وتستطيع
              تعديله.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="theming">
            <AccordionTrigger>هل يمكنني تغيير شكل الزجاج؟</AccordionTrigger>
            <AccordionContent>
              نعم. اللون والضبابية والحدود والإضاءة متغيرات CSS في ملف
              globals.css.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </Direction.Provider>
  );
}
