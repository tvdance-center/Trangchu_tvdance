import Image from "next/image";
import { ArrowUpRight } from "@/components/Icons";
import { SectionHeading } from "@/components/SectionHeading";

export function CompetitionsSection() {
  return (
    <section id="giai-dau" className="section competitions-section">
      <div className="shell">
        <SectionHeading
          number="03"
          eyebrow="Giải Đấu"
          title="Làm chủ sân khấu"
          copy="Biến kỷ luật trong phòng tập thành năng lượng bùng nổ trước khán giả."
        />

        <div className="competition-layout">
          <div className="competition-feature reveal">
            <Image
              src="/images/site/competition-performance.jpg"
              alt="Các học viên TV Dance biểu diễn bài thi đấu Dancesport Latin đầy điêu luyện tại Summer TV Cup"
              fill
              sizes="(max-width: 767px) 100vw, 65vw"
            />
            <div className="competition-number">01</div>
            <div className="competition-copy">
              <span>Biểu diễn & thi đấu</span>
              <h3>Luyện tập.<br />Trình diễn.<br /><em>Bứt phá.</em></h3>
              <p>Không gian để đội nhóm thử thách giới hạn, trau dồi tinh thần sân khấu và lưu lại những khoảnh khắc đáng nhớ.</p>
              <a className="button button-primary" href="#lien-he">
                Hỏi về hoạt động <ArrowUpRight />
              </a>
            </div>
            <a className="image-source" href="https://www.facebook.com/tvdance.center" target="_blank" rel="noopener noreferrer">
              Ảnh: TV Dance Center
            </a>
          </div>

          <aside className="competition-note reveal">
            <span className="note-label">Tinh thần TV Dance</span>
            <p className="note-quote">“Tập hết mình. Lên sân khấu với nhau. Trưởng thành sau mỗi nhịp.”</p>
            <div className="note-stats">
              <div><strong>Đồng đội</strong><span>Cùng nhau tiến bộ</span></div>
              <div><strong>Kỹ thuật</strong><span>Chỉn chu từng chi tiết</span></div>
              <div><strong>Năng lượng</strong><span>Cháy hết mình</span></div>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
