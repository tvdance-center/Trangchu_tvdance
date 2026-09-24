# TV DANCE WEBSITE — PROJECT MEMORY

## 1. Project Identity

* `tv-dance-website` là **website marketing công khai độc lập** của Trung tâm Vũ đạo **TV Dance Center** (Hải Phòng).
* Đây là website tĩnh (static prerendered) phục vụ quảng bá thương hiệu, giới thiệu các khóa học nhảy, phong cách đào tạo và cung cấp thông tin liên hệ.
* **KHÔNG PHẢI**:
  * Ứng dụng CRM
  * Cổng thông tin học viên (student portal)
  * Bảng điều khiển quản trị (dashboard)
  * Cổng thanh toán học phí (payment system)
  * Hệ thống điểm danh / quản lý lịch dạy (attendance system)
  * Phần mềm vận hành nội bộ

---

## 2. Project Path

* **Website**:
  ```text
  C:\Users\Admin\Downloads\BUIL APP\CRM TVDance\tv-dance-website
  ```
* **Visual Reference Only**:
  ```text
  C:\Users\Admin\Downloads\BUIL APP\CRM TVDance\crm-app
  ```
  *(Thư mục `crm-app` là READ-ONLY, tuyệt đối không chỉnh sửa hay import bất kỳ file nào).*

---

## 3. Purpose

* Định vị thương hiệu TV Dance Center là trung tâm đào tạo vũ đạo chuyên nghiệp, hiện đại, uy tín tại Hải Phòng với 3 cơ sở hoạt động.
* Truyền tải thông điệp thương hiệu: *"Nhảy mạnh hơn. Sống rực hơn."* và *"Nơi nhịp điệu trở thành bản lĩnh."*
* Hướng dẫn học viên mới tìm kiếm lớp học phù hợp, liên hệ tư vấn qua các kênh liên lạc trực tiếp (Hotline, Zalo, Facebook, Email) hoặc truy cập hệ thống quản trị CRM qua liên kết ngoài.

---

## 4. Architecture

* **Framework**: Next.js 16.3.6 (App Router, Turbopack).
* **Runtime**: React 19.2.8 / Node.js.
* **Styling**: Tailwind CSS 3.4.17 kết hợp CSS Custom Properties (`app/globals.css`).
* **Language**: TypeScript 5.9.2 (strict mode).
* **Rendering**: Prerendered Static Content (tất cả các route `/`, `/_not-found`, `/icon.svg`, `/robots.txt` đều được sinh tĩnh lúc build).
* **Components Architecture**: Tách module theo section rõ ràng:
  * `components/Header.tsx`: Client Component (quản lý scroll state & mobile menu drawer).
  * `components/Hero.tsx`: Client Component (quản lý scroll parallax via `requestAnimationFrame`).
  * `components/ClassesSection.tsx`: Server Component.
  * `components/StylesSection.tsx`: Server Component.
  * `components/CompetitionsSection.tsx`: Server Component.
  * `components/NewsSection.tsx`: Server Component.
  * `components/ContactSection.tsx`: Server Component.
  * `components/Footer.tsx`: Server Component.
  * `lib/site-data.ts`: Single source of truth cho static data (nav items, classes, styles, news, CRM URL).

---

## 5. Relationship With CRM

* Website TV Dance hoàn toàn **độc lập** với hệ thống CRM `crm-app`.
* **CÁC NGUYÊN TẮC BẮT BUỘC**:
  * KHÔNG import code, component, type hay logic từ `crm-app`.
  * KHÔNG ghi hay chỉnh sửa bất kỳ file nào trong `crm-app`.
  * KHÔNG dùng chung cơ sở dữ liệu, state, hay runtime với CRM.
  * KHÔNG nhúng form đăng nhập, đăng ký hay dashboard của CRM vào website.
* **Tương tác duy nhất được phép**:
  * Nút liên kết ngoài (external link) trỏ đến `https://crm.tvdance.online/` với thuộc tính an toàn `target="_blank"` và `rel="noopener noreferrer"`.

---

## 6. Protected Contracts

* **External CRM URL**:
  ```text
  https://crm.tvdance.online/
  ```
  *(Được khai báo tại `lib/site-data.ts` qua biến hằng `CRM_URL`).*
* **Anchor Navigation IDs**:
  * `#trang-chu`: Đầu trang / Hero
  * `#lop-hoc`: Phần Lớp học
  * `#phong-cach`: Phần Phong cách
  * `#giai-dau`: Phần Giải Đấu
  * `#tin-tuc`: Phần Tin tức
  * `#lien-he`: Phần Liên hệ
* **Hotline & Kênh Liên Hệ**:
  * Hotline: `0979 953 539` (`tel:0979953539`)
  * Zalo: `0979 953 539` (`https://zalo.me/0979953539`)
  * Facebook: `TV Dance Center` (`https://www.facebook.com/tvdance.center`)
  * Email: `dancebabyvn@gmail.com` (`mailto:dancebabyvn@gmail.com`)
* **Hệ Thống 3 Cơ Sở**:
  * Cơ sở 1: Tầng 10 - 4D Hồ Sen
  * Cơ sở 2: Nhà thi đấu quận Kiến An
  * Cơ sở 3: NVH An Lạc, 16A An Lạc, Sở Dầu

---

## 7. Current Design Direction

* Định hướng thị giác: **Dark, Editorial, Dance-focused Portfolio**.
* **Đặc trưng thiết kế**:
  * Hình ảnh nhiếp ảnh vũ đạo khổ lớn, giàu tính nghệ thuật, tương phản cao.
  * Typography condensed ngoại cỡ (Bebas Neue / Roboto) kết hợp Inter hiện đại.
  * Bố cục lưới bất đối xứng (asymmetric editorial grid 5/7 và 4/8).
  * Hiệu ứng ảnh chuyển từ desaturated sang saturated khi tương tác chuột.
  * Tối giản, thanh lịch, tinh tế; **KHÔNG BIẾN THÀNH SAAS DASHBOARD**.

---

## 8. Current Brand Color System

Ngôn ngữ màu thương hiệu chính thức: **BLACK + RED + WHITE** (đồng bộ với giao diện Public của CRM tại `crm-app/src/components/public`).

| Nhóm màu | Mã màu | Công dụng & Vị trí áp dụng |
| :--- | :--- | :--- |
| **Primary Brand Red** | `#E10600` | CTA chính (`.button-primary`), Marquee, active underline nav, live dot, số section meta, hover link |
| **Primary Hover Red** | `#c90500` | Trạng thái hover của nút CTA đỏ chính (`.button-primary:hover`) |
| **Secondary / Glow Red** | `#FF1A14` | Điểm kết thúc gradient tiêu đề Hero, quầng sáng `.contact-orb`, viền top Contact |
| **Main Background** | `#0A0A0A` | Nền trang chính (`body`, `.hero`, `.classes-section`, `.competitions-section`, `.contact-section`) |
| **Deep Background** | `#050505` | Nền các section tối sâu (`.styles-section`, `.news-section`, `.site-footer`) |
| **Surface** | `#111111` | Thẻ lớp học (`.class-card`), nút phụ (`.button-ghost`), toggle mobile, khung logo |
| **Surface Hover** | `#171717` / `#1A1A1A` | Trạng thái hover thẻ lớp học, thẻ `.class-more`, hover nút phụ `.button-ghost` |
| **Primary Text** | `#FFFFFF` | Tiêu đề chính, headline, nhãn nút bấm chính |
| **Muted Text** | `#9A9A9A` | Mô tả phụ, thông tin bản quyền, nhãn meta, text phụ |
| **Border System** | `rgba(255, 255, 255, 0.10–0.20)` | Viền mảnh hairline chuẩn; hover chuyển sang `#E10600` opacity |

*(Lưu ý: Không dùng dải màu xanh blue dashboard nội bộ của CRM làm reference cho public website).*

---

## 9. Typography

* **Display Font**: Roboto / Bebas Neue fallback (hoa in đậm, condensed, dùng cho Hero và các Section Headings).
* **Body / UI Font**: Inter (dùng cho Navigation, nội dung mô tả, nhãn meta, nút bấm).
* **Thang kích thước**:
  * Hero Title: `clamp(2.8rem, 6vw, 5.5rem)`
  * Section Headings: `clamp(2.2rem, 4.5vw, 4.5rem)`
  * News Heading ("Câu Chuyện Phòng Tập"): `clamp(1.55rem, 3.6vw, 3.5rem)`
  * Body Copy: `0.86rem–1.08rem`, line-height `1.6–1.75`

---

## 10. Main Website Sections

1. **Header**: Fixed sticky header, backdrop-blur 18px khi cuộn, brand logo, desktop nav, nút CRM bo tròn, nút hamburger drawer cho mobile.
2. **Hero Section**: Ảnh nền vũ đạo studio, scrim chuyển sắc từ `#0A0A0A`, parallax scroll nhẹ qua `requestAnimationFrame`, headline gradient đỏ 2 tone, 3 cơ sở, 2 nút CTA (Khám phá lớp học / Liên hệ tư vấn), scroll cue.
3. **Marquee**: Dải băng chạy chữ vô tận, nền đỏ `#E10600`, chữ trắng hoa in đậm, hiển thị 4 phong cách nhảy chính.
4. **Classes Section (`#lop-hoc` - Section 01)**: Lưới 12 cột bất đối xứng gồm 4 thẻ lớp học chính + thẻ call-out `.class-more` dẫn về liên hệ.
5. **Styles Section (`#phong-cach` - Section 02)**: Layout 2 cột gồm ảnh studio sticky bên trái và danh sách 4 phong cách tương tác có vạch màu bên phải.
6. **Competitions Section (`#giai-dau` - Section 03)**: Feature card biểu diễn & thi đấu khổ lớn + hộp quote tinh thần TV Dance nền `#111111` loang `#171717`.
7. **News Section (`#tin-tuc` - Section 04)**: 3 bài viết câu chuyện phòng tập, layout 3 cột responsive, tiêu đề *"Câu Chuyện Phòng Tập"*.
8. **Contact Section (`#lien-he` - Section 05)**: Quầng sáng đỏ `.contact-orb` nền `#0A0A0A`, 4 kênh liên hệ nhanh (Phone, Zalo, Facebook, Email).
9. **Footer**: Logo, slogan, điều hướng phụ, thông tin liên hệ, copyright và link cuộn lên đầu trang, nền `#050505`.

---

## 11. Navigation

Các nhãn điều hướng chính thức bắt buộc bảo vệ:
* `Trang chủ` (`#trang-chu`)
* `Lớp học` (`#lop-hoc`)
* `Phong cách` (`#phong-cach`)
* `Giải Đấu` (`#giai-dau`)
* `Tin tức` (`#tin-tuc`)
* `CRM` (External link)

*(Trong menu mobile, các mục được đánh số thứ tự từ `01` đến `06`).*

---

## 12. Current Dance Classes / Styles

* **4 Lớp học chính (`classes` trong `lib/site-data.ts`)**:
  1. `Street Dance` — Tag: *"Năng lượng / Bản lĩnh"*
  2. `Hip-hop` — Tag: *"Nền tảng / Tự do"*
  3. `K-pop` — Tag: *"Trình diễn / Đồng đội"*
  4. `Latin` — Tag: *"Kết nối / Cuốn hút"*
* **4 Phong cách đào tạo (`styles` trong `lib/site-data.ts`)**:
  1. `01 Urban`: Hip-hop · Popping · Choreography (`color: "#E10600"`)
  2. `02 Stage`: Contemporary · Jazz · Múa đương đại (`color: "#FF1A14"`)
  3. `03 Pop`: K-pop · Dance cover · Performance (`color: "rgba(255, 255, 255, 0.7)"`)
  4. `04 Social`: Latin · Couple dance · Foundation (`color: "#9A9A9A"`)

---

## 13. Image & Attribution Policy

* **Nguồn ảnh và lưu trữ**:
  * Tài sản hình ảnh của TV Dance và bên thứ ba được tải về lưu trữ cục bộ tại `public/images/site/` để tránh rủi ro hết hạn token CDN và phụ thuộc mạng ngoài.
  * Ngoại lệ bảo lưu: Ảnh lớp học `Street Dance` được tải trực tiếp từ Pexels (`https://images.pexels.com/photos/32143268/...`).
* **Nghiêm cấm**: Tuyệt đối không dùng ảnh stock chưa có bản quyền hoặc có watermark từ iStock, Getty Images, Shutterstock.
* **Chính sách Attribution**: Mọi hình ảnh nội dung phải giữ nguyên:
  * `alt`: Mô tả tiếng Việt rõ ràng, có ngữ cảnh thực tế cho trợ năng.
  * `source` & `sourceUrl`: Nguồn ảnh và link gốc để đảm bảo tính minh bạch bản quyền.
  * Ảnh thuộc TV Dance Center gắn `Ảnh: TV Dance Center` dẫn link fanpage `https://www.facebook.com/tvdance.center`.
  * Không tùy tiện xóa hoặc bịa đặt tên tác giả khi không truy xuất được (ghi rõ nền tảng nguồn như `Pexels`, `Amazon`).

---

## 14. Owner-Approved Decisions

1. **Brand Identity Transition**: Owner đã phê duyệt loại bỏ hoàn toàn hệ màu Neon Pink / Magenta / Purple / Rainbow cũ; chuyển sang hệ màu Black + Red + White theo CRM Public.
2. **Primary Brand Red `#E10600`**: Được chọn làm màu chủ đạo của thương hiệu TV Dance Center.
3. **Logo & Favicon Vector Scope**: Owner đã **phê duyệt trực tiếp** việc chỉnh sửa màu trong `public/logo.svg` và `app/icon.svg` sang `#E10600`, `#FF1A14`, `#111111` và `#0A0A0A`. Đây là quyết định đã chốt, không coi là unauthorized scope expansion.
4. **Tiêu đề Tin tức rút gọn**: Phê duyệt tiêu đề rút gọn *"Câu Chuyện Phòng Tập"* cho Section 04 với kích thước chữ `clamp(1.55rem, 3.6vw, 3.5rem)`.
5. **Thay thế bộ ảnh photoshoot Pavel Danilyuk**: Phê duyệt thay thế toàn bộ ảnh photoshoot mẫu trùng lặp bằng bộ 9 tài sản hình ảnh thực tế lưu trữ cục bộ tại `public/images/site/`.
6. **Bảo tồn ảnh Street Dance**: Giữ nguyên 100% ảnh Street Dance (`Nimit N / Pexels - 32143268`). Không thay đổi.
7. **CSS Object-Position cho ảnh dọc**: Phê duyệt thêm `.news-card-1 .news-image img { object-position: center 75%; }` để hiển thị trọn vẹn nhóm học viên trong ảnh dọc 3:4.

---

## 15. Completed Major Changes

* **Task: Thay bộ ảnh Website TV Dance theo Owner-provided assets (Hoàn thành 2026-09-24)**:
  * Tải và lưu trữ 9 hình ảnh cục bộ tại `public/images/site/` (`hero-tv-dance.jpg`, `class-hip-hop.jpg`, `class-kpop.jpg`, `class-latin.jpg`, `style-signature.jpg`, `competition-performance.jpg`, `news-dare-to-try.jpg`, `news-music-you-love.jpg`, `news-stage-energy.jpg`).
  * Loại bỏ hoàn toàn sự trùng lặp photoshoot của Pavel Danilyuk.
  * Giữ nguyên ảnh Street Dance (`Nimit N / Pexels`).
  * Cập nhật `components/Hero.tsx`, `components/StylesSection.tsx`, `components/CompetitionsSection.tsx`, `lib/site-data.ts`.
  * Tinh chỉnh CSS `object-position: center 75%` cho ảnh dọc tin tức Dám thử trong `app/globals.css`.
  * Đã qua Quality Gates: `npm run lint` (PASS), `npm run typecheck` (PASS), `npm run build` (PASS).

* **Task: Đồng bộ hệ màu Website TV Dance theo CRM Public (Hoàn thành 2026-09-24)**:
  * `tv-dance-website/tailwind.config.ts`: Cập nhật bảng màu `ink`, `paper`, `muted`, `brand` và remap `neon`.
  * `tv-dance-website/app/globals.css`: Cập nhật biến `:root`, body background, Hero headline, CTA buttons, Marquee, card overlays, contact orb, footer và mobile drawer.
  * `tv-dance-website/lib/site-data.ts`: Cập nhật màu nhấn cho 4 phong cách trong `styles`.
  * `tv-dance-website/app/layout.tsx`: Cập nhật `viewport.themeColor` sang `#0A0A0A`.
  * `tv-dance-website/public/logo.svg`: Đổi màu nét V sang `#E10600`, chấm tròn sang `#FF1A14`, nền `#111111`.
  * `tv-dance-website/app/icon.svg`: Đổi màu nét V sang `#E10600`, chấm tròn sang `#FF1A14`, nền `#0A0A0A`.
  * `tv-dance-website/DESIGN.md`: Cập nhật bảng token màu tài liệu thiết kế.
  * Đã qua Quality Gates: `npm run lint` (PASS), `npm run typecheck` (PASS), `npm run build` (PASS).

---

## 16. Protected Behavior

Các task trong tương lai bắt buộc phải bảo tồn các hành vi sau:
* Cuộn mượt (smooth anchor scrolling) với `scroll-padding-top: var(--header-height)`.
* Hiệu ứng parallax scroll nhẹ của ảnh Hero thông qua `requestAnimationFrame`.
* Trạng thái hover của thẻ lớp học (zoom ảnh nhẹ và tăng độ bão hòa màu).
* Đóng/mở mobile drawer khóa cuộn trang (`body.style.overflow = "hidden"`).
* Liên kết mở ngoài an toàn (`target="_blank" rel="noopener noreferrer"`).
* Khả năng tiếp cận (Accessibility):
  * Tương phản văn bản WCAG AA trên nền đen.
  * `:focus-visible` viền đỏ `#E10600` rõ ràng.
  * Thuộc tính `aria-expanded`, `aria-controls` cho mobile menu toggle.
  * Tôn trọng `prefers-reduced-motion` (tắt animation, parallax và smooth scroll khi người dùng bật chế độ này).

---

## 17. Files / Areas With Special Rules

* `tv-dance-website/app/globals.css`: Tập tin CSS toàn cục duy nhất. Chứa định nghĩa `:root`, custom button classes, grid rules và responsive styles.
* `tv-dance-website/lib/site-data.ts`: Tập tin dữ liệu tĩnh duy nhất. Tuyệt đối không sửa text/link nếu không có yêu cầu rõ ràng.
* `tv-dance-website/public/logo.svg` & `tv-dance-website/app/icon.svg`: Asset thương hiệu vector. Không tự ý redesign cấu trúc SVG.
* `crm-app/**`: **FORBIDDEN ZONE** — Hard read-only, tuyệt đối không chỉnh sửa bất kỳ ký tự nào.

---

## 18. Quality Gates

Trước khi bàn giao bất kỳ task code nào, bắt buộc thực thi trực tiếp tại thư mục `tv-dance-website`:
```bash
npm run lint
npm run typecheck
npm run build
```
*Chỉ được báo PASS khi cả 3 lệnh chạy thành công với exit code 0.*

---

## 19. Known Limitations / Remaining Findings

* **Google Fonts CDN Link**: Font Roboto và Inter hiện đang được nhúng qua thẻ `<link>` Google Fonts trong `app/layout.tsx`. Đây là chủ đích hiện tại (INTENTIONAL / WORKING). Nếu tương lai muốn tối ưu hiệu năng hoặc self-host có thể xem xét chuyển sang `next/font/google`.
* **Static Export Config**: `next.config.ts` hiện đang để trống. Next.js tự động tối ưu static prerender (5/5 static routes) mà không cần `output: 'export'`. Nếu cần export file HTML tĩnh thuần túy ra thư mục `out/`, cần trao đổi với Owner trước.

---

## 20. Agent Working Protocol

Thứ tự ưu tiên nguồn sự thật (Source of Truth Hierarchy):
```text
CURRENT SOURCE CODE
>
RULES.md
>
CLAUDE.md
>
WEBTVDANCE-MEMORY.md
>
DESIGN.md / tài liệu cũ
>
suy đoán cá nhân
```

Nguyên tắc làm việc của Agent:
1. **Read Before Code**: Đọc kỹ `RULES.md`, `QA-Audit.md`, `CLAUDE.md`, `WEBTVDANCE-MEMORY.md` trước khi code.
2. **Scope Lock**: Chỉ sửa đúng file được giao trong task scope. Không "tiện tay" refactor, không tự sửa ngoài scope.
3. **Stop and Report**: Nếu phát hiện scope cần mở rộng hoặc mâu thuẫn giữa tài liệu và source -> DỪNG VÀ BÁO CÁO (STOP AND REPORT).
4. **Evidence-based Verification**: Chỉ báo cáo PASS khi lệnh kiểm tra đã thực sự chạy và có kết quả exit code 0.

---

## 21. Last Verified State

* **Thời điểm xác minh**: 2026-09-24.
* **Trạng thái Working Tree**: Sạch, code đồng bộ màu Black + Red + White hoàn tất.
* **Bằng chứng Quality Gates thực tế**:
  * `npm run lint`: Exit code 0 (PASS).
  * `npm run typecheck`: Exit code 0 (PASS).
  * `npm run build`: Exit code 0 (PASS) — Turbopack biên dịch thành công 5/5 static pages.
