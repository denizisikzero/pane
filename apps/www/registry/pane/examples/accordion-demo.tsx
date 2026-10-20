import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionDemo() {
  return (
    <Accordion
      type="single"
      collapsible
      defaultValue="package"
      className="w-96 max-w-full"
    >
      <AccordionItem value="package">
        <AccordionTrigger>Is Pane an npm package?</AccordionTrigger>
        <AccordionContent>
          No. The shadcn CLI copies each component into your project, so you own
          the code and can change it.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="browsers">
        <AccordionTrigger>Which browsers get the full effect?</AccordionTrigger>
        <AccordionContent>
          Chromium browsers get edge refraction. Everyone else gets blur, tint
          and the pointer highlight.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="theming">
        <AccordionTrigger>Can I change how the glass looks?</AccordionTrigger>
        <AccordionContent>
          Yes. Tint, blur, borders and highlights are CSS variables in your
          globals.css.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
