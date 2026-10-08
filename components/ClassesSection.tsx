import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { SectionHeading } from "@/components/SectionHeading";
import { classes } from "@/lib/site-data";

export function ClassesSection() {
  return (
    <section id="lop-hoc" className="section classes-section">
      <div className="shell">
        <SectionHeading
          number="01"
          eyebrow="Lớp học"
          title="Tìm kiếm lớp học theo phong cách của bạn"
          copy="Từ những bước đầu tiên đến khi làm chủ sân khấu — chọn năng lượng khiến bạn muốn chuyển động."
        />

        <div className="class-grid">
          {classes.map((item, index) => (
            <article className={`class-card class-card-${index + 1} accent-${item.accent} reveal`} key={item.name}>
              <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) 100vw, 50vw" className="class-image" />
              <div className="class-overlay" />
              <div className="class-topline">
                <span>0{index + 1}</span>
                <span>{item.tag}</span>
              </div>
              <div className="class-copy">
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <Link href={`/lop-hoc/${item.slug}`} aria-label={`Tìm hiểu lớp ${item.name}`}>
                  Tìm hiểu lớp <ArrowUpRight />
                </Link>
              </div>
              <a className="image-source" href={item.sourceUrl} target="_blank" rel="noopener noreferrer">
                {item.source}
              </a>
            </article>
          ))}
          <a className="class-more reveal" href="#lien-he">
            <span>+ Nhiều phong cách khác</span>
            <strong>Tìm lớp hợp với bạn</strong>
            <ArrowUpRight />
          </a>
        </div>
      </div>
    </section>
  );
}
