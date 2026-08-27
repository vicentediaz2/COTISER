type SectionIntroProps = {
  title: string;
  description: string;
  tone?: "light" | "sky" | "blue";
};

export function SectionIntro({
  title,
  description,
  tone = "light",
}: SectionIntroProps) {
  const isColoredBackground =  tone === "blue";
  const titleClass = isColoredBackground ? "text-white" : "text-black";
  const descriptionClass = isColoredBackground ? "text-white/90" : "text-black";

  return (
    <div className="max-w-3xl">
      <h2 className={`text-3xl font-bold text-blue-700 sm:text-4xl ${titleClass}`}>
        {title}
      </h2>
      <p className={`mt-4 text-lg font-semibold leading-8 ${descriptionClass}`}>
        {description}
      </p>
    </div>
  );
}
