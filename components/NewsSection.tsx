import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { SectionHeading } from "@/components/SectionHeading";
import { cmsImageUrl, getPublishedPosts } from "@/lib/cms/server";

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

export async function NewsSection() {
  const newsItems = await getPublishedPosts("news", 3);
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
            <article className={`news-card news-card-${index + 1} reveal`} key={item.id}>
              <div className="news-image">
                <Image src={cmsImageUrl(item.cover_image)} alt={item.cover_image_alt || item.title} fill sizes="(max-width: 767px) 100vw, 33vw" />
                <span>{item.category}</span>
              </div>
              <div className="news-meta">
                <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
                {item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Ảnh: {item.source}</a>}
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <Link className="news-link" href={`/tin-tuc/${item.slug}`}>Đọc tiếp <ArrowUpRight /></Link>
            </article>
          ))}
        </div>
        <Link className="cms-section-more" href="/tin-tuc">Xem tất cả tin tức <ArrowUpRight /></Link>
      </div>
    </section>
  );
}
