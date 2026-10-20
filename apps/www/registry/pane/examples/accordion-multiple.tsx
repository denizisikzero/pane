import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const sections = [
  {
    value: "shipping",
    title: "Shipping",
    body: "Orders ship within two business days.",
  },
  {
    value: "returns",
    title: "Returns",
    body: "Send anything back within 30 days, free of charge.",
  },
  {
    value: "warranty",
    title: "Warranty",
    body: "Every device is covered for one year.",
  },
];

export default function AccordionMultiple() {
  return (
    <Accordion
      type="multiple"
      defaultValue={["shipping", "returns"]}
      className="w-96 max-w-full"
    >
      {sections.map((section) => (
        <AccordionItem key={section.value} value={section.value}>
          <AccordionTrigger>{section.title}</AccordionTrigger>
          <AccordionContent>{section.body}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
