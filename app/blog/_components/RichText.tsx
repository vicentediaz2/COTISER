import { BrandText } from "@/app/_components/BrandText";

type RichTextProps = {
  text: string;
};

const boldPattern = /\*\*([^*]+)\*\*/g;

export function RichText({ text }: RichTextProps) {
  const parts = text.split(boldPattern);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <strong key={index} className="font-bold text-slate-950">
            {part}
          </strong>
        ) : (
          <BrandText key={index} text={part} />
        )
      )}
    </>
  );
}
