type AudienceStripProps = {
  audiences: string[];
};

export function AudienceStrip({ audiences }: AudienceStripProps) {
  return (
    <section className="border-b border-blue-100 bg-white px-6 py-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-3 sm:justify-between">
        <p className="text-sm font-semibold uppercase text-blue-700">
          Ideal para
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {audiences.map((audience) => (
            <span
              key={audience}
              className="rounded-lg border border-blue-100 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-800"
            >
              {audience}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
