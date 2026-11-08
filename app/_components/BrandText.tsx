const brandPattern = /(cotiser)/gi;

export function BrandText({ text }: { text: string }) {
  const parts = text.split(brandPattern);

  return (
    <>
      {parts.map((part, index) =>
        index % 2 === 1 ? (
          <span key={index} className="font-black">
            COTISER
          </span>
        ) : (
          <span key={index}>{part}</span>
        )
      )}
    </>
  );
}
