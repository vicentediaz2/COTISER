type SectionIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  tone?: "light" | "blue";
};

export function SectionIntro({
  eyebrow,
  title,
  description,
  tone = "light",
}: SectionIntroProps) {
  const eyebrowClass = tone === "blue" ? "text-blue-100" : "text-blue-700";
  const titleClass = tone === "blue" ? "text-white" : "text-slate-950";
  const descriptionClass = tone === "blue" ? "text-blue-50" : "text-slate-600";

  return (
    <div className="max-w-3xl">
      <p className={`text-sm font-semibold uppercase ${eyebrowClass}`}>
        {eyebrow}
      </p>
      <h2 className={`mt-4 text-3xl font-semibold sm:text-4xl ${titleClass}`}>
        {title}
      </h2>
      <p className={`mt-4 text-lg leading-8 ${descriptionClass}`}>
        {description}
      </p>
    </div>
  );
}
