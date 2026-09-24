import Image from "next/image";
import { ArrowUpRight } from "@/components/Icons";
import { styles } from "@/lib/site-data";

export function StylesSection() {
  return (
    <section id="phong-cach" className="section styles-section">
      <div className="styles-photo reveal">
        <Image
          src="/images/site/style-signature.jpg"
          alt="Đội ngũ huấn luyện viên và học viên TV Dance chụp ảnh kỷ niệm tại Summer TV Cup"
          fill
          sizes="(max-width: 767px) 100vw, 42vw"
        />
        <a href="https://www.facebook.com/tvdance.center" target="_blank" rel="noopener noreferrer">
          Ảnh: TV Dance Center
        </a>
      </div>

      <div className="shell styles-layout">
        <div className="styles-intro">
          <div className="section-meta">
            <span>02</span>
            <span>Phong cách</span>
          </div>
          <h2>Tìm<br /><em>dấu ấn riêng</em></h2>
          <p>Mỗi phong cách là một ngôn ngữ. TV Dance giúp bạn nắm nền tảng để rồi nói ngôn ngữ ấy theo cách của riêng mình.</p>
          <a className="text-link" href="#lien-he">
            Nhờ tư vấn phong cách <ArrowUpRight />
          </a>
        </div>

        <div className="style-list">
          {styles.map((style) => (
            <div className="style-row reveal" key={style.index} style={{ "--style-color": style.color } as React.CSSProperties}>
              <span>{style.index}</span>
              <div>
                <h3>{style.name}</h3>
                <p>{style.detail}</p>
              </div>
              <ArrowUpRight />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
