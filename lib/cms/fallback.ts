import { newsItems } from '@/lib/site-data'
import { PublicCmsPost } from './types'

const FALLBACK_NEWS_SLUGS = [
  'mot-buoi-tap-tot-bat-dau-tu-viec-dam-thu',
  'chon-lop-theo-am-nhac-ban-thuc-su-yeu',
  'san-khau-la-noi-nang-luong-duoc-se-chia',
]

export const fallbackNews: PublicCmsPost[] = newsItems.map((item, index) => ({
  id: `fallback-news-${index + 1}`,
  type: 'news',
  title: item.title,
  slug: FALLBACK_NEWS_SLUGS[index],
  category: item.category,
  excerpt: item.excerpt,
  content: { version: 1, blocks: [{ id: `fallback-news-${index + 1}-paragraph`, type: 'paragraph', text: item.excerpt }] },
  cover_image: item.image,
  cover_image_alt: item.alt,
  featured: index === 0,
  seo_title: null,
  seo_description: item.excerpt,
  published_at: item.date.split('.').reverse().join('-') + 'T00:00:00+07:00',
  event_date: null,
  end_date: null,
  location: null,
  competition_status: null,
  source: item.source,
  sourceUrl: item.sourceUrl,
  isFallback: true,
}))

export const fallbackCompetitions: PublicCmsPost[] = [
  {
    id: 'fallback-competition-1',
    type: 'competition',
    title: 'Biểu diễn & thi đấu cùng TV Dance',
    slug: 'bieu-dien-va-thi-dau-cung-tv-dance',
    category: 'Hoạt động sân khấu',
    excerpt: 'Không gian để đội nhóm thử thách giới hạn, trau dồi tinh thần sân khấu và lưu lại những khoảnh khắc đáng nhớ.',
    content: {
      version: 1,
      blocks: [
        { id: 'fallback-competition-heading', type: 'heading', level: 2, text: 'Luyện tập. Trình diễn. Bứt phá.' },
        { id: 'fallback-competition-paragraph', type: 'paragraph', text: 'Biến kỷ luật trong phòng tập thành năng lượng bùng nổ trước khán giả. Cùng đồng đội hoàn thiện kỹ thuật và trưởng thành sau mỗi nhịp.' },
      ],
    },
    cover_image: '/images/site/competition-performance.jpg',
    cover_image_alt: 'Các học viên TV Dance biểu diễn bài thi đấu Dancesport Latin tại Summer TV Cup',
    featured: true,
    seo_title: null,
    seo_description: 'Hoạt động biểu diễn và thi đấu của TV Dance Center.',
    published_at: '2026-08-20T00:00:00+07:00',
    event_date: '2026-08-20T00:00:00+07:00',
    end_date: null,
    location: 'TV Dance Center',
    competition_status: 'completed',
    source: 'TV Dance Center',
    sourceUrl: 'https://www.facebook.com/tvdance.center',
    isFallback: true,
  },
]
