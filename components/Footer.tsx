import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "@/components/Icons";
import { CRM_URL, navItems } from "@/lib/site-data";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-main">
        <div className="footer-brand">
          <Image src="/logo.svg" alt="TV Dance Center" width={184} height={52} />
          <p>Nhảy mạnh hơn.<br />Sống rực hơn.</p>
        </div>
        <nav aria-label="Điều hướng cuối trang">
          {navItems.map((item) => <Link key={item.href} href={`/${item.href}`}>{item.label}</Link>)}
          <a href={CRM_URL} target="_blank" rel="noopener noreferrer">CRM <ArrowUpRight /></a>
        </nav>
        <div className="footer-contact">
          <a href="tel:0979953539">0979 953 539</a>
          <a href="mailto:dancebabyvn@gmail.com">dancebabyvn@gmail.com</a>
          <a href="https://www.facebook.com/tvdance.center" target="_blank" rel="noopener noreferrer">Facebook <ArrowUpRight /></a>
        </div>
      </div>
      <div className="shell footer-bottom">
        <span>© {new Date().getFullYear()} TV Dance Center</span>
        <span>Website giới thiệu</span>
        <Link href="/#trang-chu">Lên đầu trang ↑</Link>
      </div>
    </footer>
  );
}
