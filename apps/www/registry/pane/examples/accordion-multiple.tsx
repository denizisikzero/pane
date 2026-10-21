import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function AccordionMultiple() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["shipping", "returns"]}
      className="w-96 max-w-full"
    >
      <AccordionItem value="shipping">
        <AccordionTrigger>Shipping</AccordionTrigger>
        <AccordionContent>
          Orders ship within two business days.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="returns">
        <AccordionTrigger>Returns</AccordionTrigger>
        <AccordionContent>
          Send anything back within 30 days, free of charge.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="warranty">
        <AccordionTrigger>Warranty</AccordionTrigger>
        <AccordionContent>
          Every device is covered for one year.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
