import Image from "next/image";
import { ArrowUpRight } from "@/components/Icons";
import { SectionHeading } from "@/components/SectionHeading";
import { newsItems } from "@/lib/site-data";

export function NewsSection() {
  return (
    <section id="tin-tuc" className="section news-section">
      <div className="shell">
        <SectionHeading
          number="04"
          eyebrow="Tin tức"
          title="Câu Chuyện Phòng Tập"
          titleStyle={{ fontSize: "clamp(1.55rem, 3.6vw, 3.5rem)" }}
          copy="Những câu chuyện nhỏ từ phòng tập, phong cách và cộng đồng yêu nhảy."
        />

        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article className={`news-card news-card-${index + 1} reveal`} key={item.title}>
              <div className="news-image">
                <Image src={item.image} alt={item.alt} fill sizes="(max-width: 767px) 100vw, 33vw" />
                <span>{item.category}</span>
              </div>
              <div className="news-meta">
                <time dateTime={item.date.split(".").reverse().join("-")}>{item.date}</time>
                <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Ảnh: {item.source}</a>
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <a className="news-link" href="#lien-he">
                Trao đổi cùng TV Dance <ArrowUpRight />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
