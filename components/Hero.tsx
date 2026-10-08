"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import { ArrowDown, ArrowUpRight } from "@/components/Icons";

export function Hero() {
  const visualRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (visualRef.current && window.scrollY < window.innerHeight * 1.25) {
          visualRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.1}px, 0) scale(1.04)`;
        }
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  return (
    <section id="trang-chu" className="hero" aria-labelledby="hero-title">
      <div ref={visualRef} className="hero-visual" aria-hidden="true">
        <Image
          src="/images/site/hero-tv-dance.jpg"
          alt="Các vũ công nhí TV Dance biểu diễn bùng nổ trên sân khấu Summer TV Cup"
          fill
          preload
          sizes="100vw"
          className="hero-image"
        />
      </div>
      <div className="hero-scrim" />
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-content shell">
        <div className="hero-kicker hero-enter">
          <span className="live-dot" />
          TV Dance Center
        </div>
        <h1 id="hero-title" className="hero-title hero-enter">
          Trung tâm Dạy Nhảy
          <span>Tại Hải Phòng</span>
        </h1>
        <div className="hero-branches hero-enter">
          <p>📍 Cơ sở 1: Tầng 10 - 4D Hồ Sen</p>
          <p>📍 Cơ sở 2: Nhà thi đấu quận Kiến An</p>
          <p>📍 Cơ sở 3: NVH An Lạc, 16A An Lạc, Sở Dầu</p>
          <p>📍 Cơ sở 4: Bể Bơi, Cung VHLD Việt Tiệp, Số 53 Lạch Tray, P. Gia Viên</p>
        </div>
        <div className="hero-bottom hero-enter">
          <p>
            Không chỉ học động tác. Bạn tìm thấy nhịp điệu, bản lĩnh và cộng đồng để tự tin kể câu chuyện của riêng mình.
          </p>
          <div className="hero-actions">
            <a className="button button-primary" href="#lop-hoc">
              Khám phá lớp học <ArrowDown />
            </a>
            <a className="button button-ghost" href="#lien-he">
              Liên hệ tư vấn <ArrowUpRight />
            </a>
          </div>
        </div>
      </div>

      <a className="scroll-cue" href="#lop-hoc" aria-label="Cuộn xuống phần lớp học">
        Cuộn xuống <ArrowDown />
      </a>
      <a
        className="photo-credit"
        href="https://www.facebook.com/tvdance.center"
        target="_blank"
        rel="noopener noreferrer"
      >
        Ảnh: TV Dance Center
      </a>
    </section>
  );
}
