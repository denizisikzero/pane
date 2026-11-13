import { Direction } from "radix-ui";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsRtl() {
  return (
    <Direction.Provider dir="rtl">
      <div dir="rtl" lang="ar" className="w-full max-w-sm">
        <Tabs defaultValue="music" className="items-center">
          <TabsList>
            <TabsTrigger value="music">الموسيقى</TabsTrigger>
            <TabsTrigger value="photos">الصور</TabsTrigger>
            <TabsTrigger value="files">الملفات</TabsTrigger>
          </TabsList>
          <TabsContent value="music" className="text-muted-foreground text-sm">
            مكتبتك، متزامنة على كل أجهزتك.
          </TabsContent>
          <TabsContent value="photos" className="text-muted-foreground text-sm">
            كل صورة، مرتبة تلقائيًا.
          </TabsContent>
          <TabsContent value="files" className="text-muted-foreground text-sm">
            مستندات لا تعترض طريقك.
          </TabsContent>
        </Tabs>
      </div>
    </Direction.Provider>
  );
}
