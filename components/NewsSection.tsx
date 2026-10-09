import Link from "next/link";
import { CmsImage } from "@/components/cms/CmsImage";
import { ArrowUpRight } from "@/components/Icons";
import { SectionHeading } from "@/components/SectionHeading";
import { getHomepagePosts } from "@/lib/cms/server";
import { PublicCmsPost } from "@/lib/cms/types";

const classKindLabels = {
  recruitment: "Tuyển sinh",
  opening: "Khai giảng",
  activity: "Hoạt động lớp",
  gallery: "Hình ảnh",
  video: "Video",
} as const;

function badge(post: PublicCmsPost) {
  if (post.type === "class") return post.class_content_kind ? classKindLabels[post.class_content_kind] : "Lớp học";
  return post.category || "Tin tức";
}

function href(post: PublicCmsPost) {
  return post.type === "class" && post.class_slug
    ? `/lop-hoc/${post.class_slug}/${post.slug}`
    : `/tin-tuc/${post.slug}`;
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" }).format(new Date(value));
}

export async function NewsSection() {
  const newsItems = await getHomepagePosts(3);
  return (
    <section id="tin-tuc" className="section news-section">
      <div className="shell">
        <SectionHeading
          number="04"
          eyebrow="Tin tức & lớp học"
          title="TVDANCE NEW"
          titleStyle={{ fontSize: "clamp(1.55rem, 3.6vw, 3.5rem)" }}
          copy="Tin tuyển sinh, khai giảng và những câu chuyện mới nhất từ cộng đồng TV Dance."
        />

        <div className="news-grid">
          {newsItems.map((item, index) => (
            <article className={`news-card news-card-${index + 1} reveal`} key={item.id}>
              <div className="news-image">
                <CmsImage sourceType={item.cover_source_type} storagePath={item.cover_image} externalUrl={item.cover_external_url} alt={item.cover_image_alt || item.title} sizes="(max-width: 767px) 100vw, 33vw" />
                <span>{badge(item)}</span>
              </div>
              <div className="news-meta">
                <time dateTime={item.published_at}>{formatDate(item.published_at)}</time>
                {item.sourceUrl && <a href={item.sourceUrl} target="_blank" rel="noopener noreferrer">Ảnh: {item.source}</a>}
              </div>
              <h3>{item.title}</h3>
              <p>{item.excerpt}</p>
              <Link className="news-link" href={href(item)}>Đọc tiếp <ArrowUpRight /></Link>
            </article>
          ))}
        </div>
        <Link className="cms-section-more" href="/tin-tuc">Xem tất cả tin tức <ArrowUpRight /></Link>
      </div>
    </section>
  );
}
