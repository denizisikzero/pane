import { ImageIcon, MusicIcon, VideoIcon } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function TabsWithIcons() {
  return (
    <Tabs defaultValue="photos" className="items-center">
      <TabsList>
        <TabsTrigger value="photos">
          <ImageIcon /> Photos
        </TabsTrigger>
        <TabsTrigger value="music">
          <MusicIcon /> Music
        </TabsTrigger>
        <TabsTrigger value="videos">
          <VideoIcon /> Videos
        </TabsTrigger>
      </TabsList>
    </Tabs>
  );
}
