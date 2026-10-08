"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { ArrowUpRight } from "@/components/Icons";
import { CRM_URL, navItems } from "@/lib/site-data";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`site-header ${scrolled || open ? "is-scrolled" : ""}`}>
      <div className="header-inner">
        <a className="brand" href={pathname === "/" ? "#trang-chu" : "/#trang-chu"} aria-label="TV Dance Center — về trang chủ">
          <Image src="/logo.svg" width={184} height={52} loading="eager" alt="TV Dance Center" />
        </a>

        <nav className="desktop-nav" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a key={item.href} href={pathname === "/" ? item.href : `/${item.href}`}>
              {item.label}
            </a>
          ))}
        </nav>

        <a className="crm-button desktop-crm" href={CRM_URL} target="_blank" rel="noopener noreferrer">
          CRM <ArrowUpRight />
        </a>

        <button
          className={`menu-toggle ${open ? "is-open" : ""}`}
          type="button"
          aria-label={open ? "Đóng menu" : "Mở menu"}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((value) => !value)}
        >
          <span />
          <span />
        </button>
      </div>

      <div id="mobile-menu" className={`mobile-menu ${open ? "is-open" : ""}`} aria-hidden={!open}>
        <nav aria-label="Điều hướng di động">
          {navItems.map((item, index) => (
            <a key={item.href} href={pathname === "/" ? item.href : `/${item.href}`} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>
              {item.label}
            </a>
          ))}
          <a className="mobile-crm" href={CRM_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            <span>06</span>
            CRM <ArrowUpRight />
          </a>
        </nav>
        <p>Nhảy mạnh hơn. Sống rực hơn.</p>
      </div>
    </header>
  );
}
