import { ArrowUpRight, Facebook, Mail, Phone } from "@/components/Icons";

const contacts = [
  { label: "Điện thoại", value: "0979 953 539", href: "tel:0979953539", icon: Phone },
  { label: "Zalo", value: "0979 953 539", href: "https://zalo.me/0979953539", icon: Phone, external: true },
  { label: "Facebook / Messenger", value: "TV Dance Center", href: "https://www.facebook.com/tvdance.center", icon: Facebook, external: true },
  { label: "Email", value: "dancebabyvn@gmail.com", href: "mailto:dancebabyvn@gmail.com", icon: Mail },
] as const;

export function ContactSection() {
  return (
    <section id="lien-he" className="contact-section">
      <div className="contact-orb" aria-hidden="true" />
      <div className="shell contact-layout">
        <div className="contact-title reveal">
          <span>05 · Liên hệ</span>
          <h2>Sẵn sàng<br /><em>chuyển động?</em></h2>
          <p>Cho TV Dance biết phong cách bạn quan tâm. Chúng mình sẽ hỗ trợ bạn chọn điểm bắt đầu phù hợp.</p>
        </div>

        <div className="contact-list reveal">
          {contacts.map(({ label, value, href, icon: Icon, ...contact }) => (
            <a
              key={label}
              href={href}
              target={"external" in contact && contact.external ? "_blank" : undefined}
              rel={"external" in contact && contact.external ? "noopener noreferrer" : undefined}
            >
              <span className="contact-icon"><Icon /></span>
              <span><small>{label}</small><strong>{value}</strong></span>
              <ArrowUpRight />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
