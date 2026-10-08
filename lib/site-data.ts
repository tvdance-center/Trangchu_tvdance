export const CRM_URL = "https://crm.tvdance.online/";

export const navItems = [
  { label: "Trang chủ", href: "#trang-chu" },
  { label: "Lớp học", href: "#lop-hoc" },
  { label: "Phong cách", href: "#phong-cach" },
  { label: "Giải Đấu", href: "#giai-dau" },
  { label: "Tin tức", href: "#tin-tuc" },
] as const;

export const classes = [
  {
    name: "Street Dance",
    slug: "street-dance",
    tag: "Năng lượng / Bản lĩnh",
    description: "Từ nền tảng groove đến freestyle, xây chất riêng bằng nhịp điệu đường phố.",
    image: "https://images.pexels.com/photos/32143268/pexels-photo-32143268.jpeg?auto=compress&cs=tinysrgb&w=1800",
    alt: "Nhóm vũ công biểu diễn street dance ngoài trời tại Hà Nội",
    accent: "pink",
    source: "Nimit N / Pexels",
    sourceUrl: "https://www.pexels.com/photo/street-dance-performance-in-hanoi-vietnam-32143268/",
  },
  {
    name: "Hip-hop",
    slug: "hip-hop",
    tag: "Nền tảng / Tự do",
    description: "Học nền tảng, musicality và cách kể câu chuyện của bạn qua từng tổ hợp chuyển động.",
    image: "/images/site/class-hip-hop.jpg",
    alt: "Đội nhảy thiếu nhi chụp ảnh kỷ niệm cùng cúp vinh danh sau màn trình diễn",
    accent: "blue",
    source: "Amazon",
    sourceUrl: "https://m.media-amazon.com/images/I/71KuNYRfs2L._AC_SL1500_.jpg",
  },
  {
    name: "K-pop",
    slug: "k-pop",
    tag: "Trình diễn / Đồng đội",
    description: "Chinh phục choreography, biểu cảm sân khấu và năng lượng đồng đội đúng tinh thần idol.",
    image: "/images/site/class-kpop.jpg",
    alt: "Nhóm nhảy biểu diễn vũ đạo K-pop đồng đều trong trang phục năng động",
    accent: "coral",
    source: "Pexels",
    sourceUrl: "https://www.pexels.com/photo/32434252/",
  },
  {
    name: "Latin",
    slug: "latin",
    tag: "Kết nối / Cuốn hút",
    description: "Cảm nhận nhịp, kết nối bạn nhảy và giải phóng cơ thể với tinh thần Latin rực lửa.",
    image: "/images/site/class-latin.jpg",
    alt: "Cặp đôi vũ công khiêu vũ Latin đầy cảm xúc dưới ánh đèn sân khấu",
    accent: "yellow",
    source: "Pexels",
    sourceUrl: "https://www.pexels.com/photo/14699848/",
  },
] as const;

export const styles = [
  { index: "01", name: "Urban", detail: "Hip-hop · Popping · Choreography", color: "#E10600" },
  { index: "02", name: "Stage", detail: "Contemporary · Jazz · Múa đương đại", color: "#FF1A14" },
  { index: "03", name: "Pop", detail: "K-pop · Dance cover · Performance", color: "rgba(255, 255, 255, 0.7)" },
  { index: "04", name: "Social", detail: "Latin · Couple dance · Foundation", color: "#9A9A9A" },
] as const;

export const newsItems = [
  {
    date: "18.09.2026",
    category: "Câu chuyện studio",
    title: "Một buổi tập tốt bắt đầu từ việc dám thử",
    excerpt: "Không cần chờ đến khi tự tin mới bắt đầu. Mỗi lớp học là một không gian để thử, sai và tiến bộ theo nhịp riêng.",
    image: "/images/site/Lop hoc.jpg",
    alt: "Các học viên chăm chú luyện tập vũ đạo theo đội hình trong phòng tập TV Dance Center",
    source: "TV Dance Center",
    sourceUrl: "https://www.facebook.com/tvdance.center",
  },
  {
    date: "06.09.2026",
    category: "Phong cách",
    title: "Chọn lớp theo âm nhạc bạn thực sự yêu",
    excerpt: "Street, K-pop, Latin hay Freestyle — phong cách phù hợp nhất thường bắt đầu từ thứ âm nhạc khiến bạn muốn chuyển động.",
    image: "/images/site/news-music-you-love.jpg",
    alt: "Bản đồ thông tin các trung tâm và địa điểm học nhảy tại Hải Phòng",
    source: "TV Dance Center",
    sourceUrl: "https://www.facebook.com/tvdance.center",
  },
  {
    date: "25.08.2026",
    category: "Cộng đồng",
    title: "Sân khấu là nơi năng lượng được sẻ chia",
    excerpt: "Từ phòng tập ra sân khấu, tinh thần đồng đội biến từng phần trình diễn thành một ký ức đáng nhớ.",
    image: "/images/site/news-stage-energy.jpg",
    alt: "Đội nhảy thiếu nhi TV Dance biểu diễn vũ đạo sôi động trên sân khấu Summer TV Cup",
    source: "TV Dance Center",
    sourceUrl: "https://www.facebook.com/tvdance.center",
  },
] as const;
