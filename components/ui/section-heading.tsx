type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  text?: string;
  align?: "left" | "center";
};

export default function SectionHeading({
  eyebrow,
  title,
  text,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={align === "center" ? "text-center" : ""}>
      <div
        className={
          align === "center"
            ? "mx-auto flex w-fit flex-col items-center"
            : "flex max-w-fit flex-col"
        }
      >
        <p className="section-eyebrow">{eyebrow}</p>
        <span className="section-divider mt-3" />
        <span className="section-glow mt-2" />
      </div>
      <h2 className="section-title mt-4">{title}</h2>
      {text ? (
        <p
          className={`section-text mt-5 ${
            align === "center" ? "mx-auto max-w-2xl" : "max-w-2xl"
          }`}
        >
          {text}
        </p>
      ) : null}
    </div>
  );
}
