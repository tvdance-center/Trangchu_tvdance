type SectionHeadingProps = {
  number: string;
  eyebrow: string;
  title: string;
  copy?: string;
  titleStyle?: React.CSSProperties;
};

export function SectionHeading({ number, eyebrow, title, copy, titleStyle }: SectionHeadingProps) {
  return (
    <div className="section-heading reveal">
      <div className="section-meta">
        <span>{number}</span>
        <span>{eyebrow}</span>
      </div>
      <div>
        <h2 style={titleStyle}>{title}</h2>
        {copy ? <p>{copy}</p> : null}
      </div>
    </div>
  );
}
