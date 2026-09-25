"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowLeft, ArrowRight } from "@/components/Icons";
import { teachers } from "@/lib/teachers";

export function TeachersSection() {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const scrollNext = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;
    const maxScroll = container.scrollWidth - container.clientWidth;
    if (container.scrollLeft >= maxScroll - 20) {
      container.scrollTo({ left: 0, behavior: "smooth" });
    } else {
      const card = container.querySelector(".teacher-card");
      const cardWidth = card ? card.getBoundingClientRect().width + 24 : 320;
      container.scrollBy({ left: cardWidth, behavior: "smooth" });
    }
  }, []);

  const scrollPrev = useCallback(() => {
    const container = carouselRef.current;
    if (!container) return;
    if (container.scrollLeft <= 20) {
      const maxScroll = container.scrollWidth - container.clientWidth;
      container.scrollTo({ left: maxScroll, behavior: "smooth" });
    } else {
      const card = container.querySelector(".teacher-card");
      const cardWidth = card ? card.getBoundingClientRect().width + 24 : 320;
      container.scrollBy({ left: -cardWidth, behavior: "smooth" });
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mediaQuery.matches) return;

    const interval = setInterval(() => {
      if (isHovered || isFocused || document.hidden) return;
      scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [isHovered, isFocused, scrollNext]);

  return (
    <section id="doi-ngu" className="section teachers-section" aria-labelledby="teachers-title">
      <div className="shell">
        <div className="teachers-header">
          <div className="teachers-heading">
            <div className="section-meta">
              <span>Đội ngũ</span>
              <span>Giảng dạy</span>
            </div>
            <h2 id="teachers-title">Đội Ngũ Huấn Luyện Viên</h2>
            <p>Những người truyền lửa đam mê, kỷ luật và định hình phong cách tại TV Dance Center.</p>
          </div>
          <div className="teachers-controls" aria-label="Điều khiển danh sách giáo viên">
            <button
              type="button"
              className="carousel-button"
              onClick={scrollPrev}
              aria-label="Giáo viên trước"
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              className="carousel-button"
              onClick={scrollNext}
              aria-label="Giáo viên tiếp theo"
            >
              <ArrowRight />
            </button>
          </div>
        </div>

        <div
          ref={carouselRef}
          className="teachers-carousel"
          tabIndex={0}
          role="region"
          aria-label="Danh sách huấn luyện viên TV Dance"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
        >
          <div className="teachers-track">
            {teachers.map((teacher) => (
              <article key={teacher.name} className="teacher-card">
                <div className="teacher-image-wrap">
                  <Image
                    src={teacher.image}
                    alt={teacher.alt}
                    fill
                    sizes="(max-width: 640px) 80vw, (max-width: 1024px) 33vw, 25vw"
                    className="teacher-image"
                    style={{ objectPosition: teacher.objectPosition || "center 20%" }}
                  />
                </div>
                <div className="teacher-info">
                  <h3 className="teacher-name">{teacher.name}</h3>
                  <p className="teacher-role">{teacher.role}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
