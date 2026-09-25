@AGENTS.md

# BADİ — Kurumsal Web Sitesi

## Marka

- **BADİ**: dijital ticaret hızlandırıcı (E-Commerce Accelerator).
- Türkiye pazarına adapte edilmiş global model.

## Ton

- Kurumsal ama samimi. Net. Rakam odaklı.
- Soyut iddia yok, somut sonuç var.
- Kısa cümle. Tek cümlede tek fikir.
- Her iddia bir rakam, süre veya örnekle desteklenir.
  - ✗ "Satışlarınızı uçuruyoruz."
  - ✓ "[süre] içinde dönüşüm oranı %[x]'ten %[y]'ye." (yalnızca doğrulanmış verilerle)
- Rakamlar Türkçe biçimde: `%24`, `1.250.000 ₺`, `2,4x`. Kodda `Intl.NumberFormat("tr-TR")` kullan.
- Uydurma rakam, müşteri adı veya referans yazma. Veri yoksa placeholder bırak.
- Placeholder rakamlar kodda `// PLACEHOLDER` yorumuyla işaretlenir. Yayından önce doğrulanmış veriyle değiştirilir.
- Müşteri onayı bekleyen taslak metinler `// DRAFT` yorumuyla işaretlenir.
- Vaka çalışmaları tek kaynaktan gelir: `lib/content/cases.ts`. Grafik serileri kart rakamlarından türetilir.
- Tüm CTA'lar `/iletisim` formuna gider. Link `contactHref(topic)` ile kurulur; `?kaynak=` formda "Konu" olarak görünür.
- Form gönderimi şimdilik yalnızca `console.log` yapar (`lib/submitContact.ts`). Backend entegrasyonu bekliyor. Yayından önce KVKK aydınlatma metni eklenmeli.
- Ekip kartları (`lib/content/about.ts`) PLACEHOLDER. Fotoğraf eklenince `next/image` ile gösterilir.
- Dashboard demo verisi `lib/content/dashboard-demo.ts` ve `dashboard-app.ts`'de. Toplamlar, ROAS/CPA ve oranlar hesapla türetilir; elle rakam yazılmaz.

## BADİ Mimarisi

Hizmetler üç sütundan oluşur. Onaylı alt hizmet metinleri `lib/content/home.ts` içindeki `pillars`'ta.

| Sütun | Kapsam |
| --- | --- |
| **Administration** | Ticari Yönetim & Operasyon |
| **Development** | Pazarlama & Büyüme |
| **Infrastructure** | Teknoloji & Altyapı |

- Bölüm başlığı her yerde **"BADİ Mimarisi"**. "B-D-İ" veya "A-D-İ" gibi kısaltma kullanılmaz.
- Sütunların baş harfleri marka adını birebir karşılamaz. Harfleri sütunlarla eşleştirme. "B = …, A = …" gibi açılım yazma.

## Tasarım

- Referans: Linear, Ramp, Stripe, Vercel seviyesinde sadelik ve motion kalitesi.
- Koyu tema ağırlıklı. Tek güçlü vurgu rengi: `accent` = elektrik yeşili `#2EF08A` (onaylandı). İkinci bir vurgu rengi eklenmez.
- Vurgu azla kullanılır (CTA, kritik rakam, aktif durum).
- Sütun tonları `lib/pillarTheme.ts`'de: Administration `accent-300`, Development `accent`, Infrastructure `accent-500`. Ton, aynı vurgunun basamağıdır; yeni renk değildir.
- Sütun ikon setleri çerçeveyle ayrılır: Administration kare, Development daire, Infrastructure altıgen (`ServiceIcon`).
- Font: Geist (sans) ve Geist Mono (rakam, etiket, kod). Rakam sütunlarında `tabular-nums`.
- Renk token'ları `lib/tokens.ts` içinde; `tailwind.config.ts` oradan okur. Sabit hex kodu komponente yazılmaz; token kullanılır (paylaşım görselleri de `colors`'u import eder).
  - Arka plan: `canvas` → `surface` → `surface-raised` → `surface-overlay`
  - Çizgi: `line`, `line-strong`
  - Metin: `fg`, `fg-muted`, `fg-subtle` (hepsi her arka planda ≥4,5:1 kontrast; `fg-subtle`'ı opaklıkla soldurma)
  - Vurgu: `accent` (50–950), `accent-foreground`
  - Veri durumu: `positive`, `negative`, `warning`
- Motion: kısa (0.2–0.6 sn), `easeOutExpo`. Süs değil, yön gösterir. `prefers-reduced-motion` her zaman desteklenir (`MotionProvider`).
- Hero başlığı ve giriş metni (LCP öğesi) animasyonsuz, görünür render edilir. Giriş animasyonu JS yüklenene kadar metni gizler ve mobil LCP'yi bozar.

## Teknik kurallar

- Next.js (App Router) + TypeScript `strict`. `any` yok.
- Komponentler küçük ve tekrar kullanılabilir. Bir dosya, bir sorumluluk.
- Her sayfa bölümü `Section` + `SectionHeader` ile kurulur. Başlık ile içerik arası `mt-12 sm:mt-16`.
- Varsayılan Server Component. `"use client"` sadece etkileşim veya animasyon gereken yaprak komponentte.
- Tüm görseller `next/image` ile. `<img>` kullanılmaz.
- Tüm animasyonlar Framer Motion ile. Ortak ayarlar `lib/motion.ts`'de.
  - `motion.*` değil `m.*` kullanılır. Özellikler `LazyMotion` ile hidrasyondan sonra yüklenir (`MotionProvider`, `strict`).
  - Hover gibi basit durumlar CSS geçişiyle yapılabilir; böylece komponent server'da kalır.
- `"use client"` dosyasından sabit veya fonksiyon export edip server komponentte kullanma; server'a değer değil client referansı gider. Paylaşılan sabitler `lib/`'de durur.
- SEO: her sayfa `pageMetadata()` (`lib/seo.ts`) ile title, description, canonical ve Open Graph alır. Paylaşım görseli route'un `opengraph-image.tsx`'i (`lib/og.tsx`). Yapısal veri `lib/schema.ts` + `JsonLd`.
- Site adresi `NEXT_PUBLIC_SITE_URL`'den gelir (bkz. `.env.example`). Yayından önce gerçek alan adı girilmeli.
- Kodda İngilizce (isimler, yorumlar, commit mesajları). Sitede kullanıcıya görünen içerik Türkçe.
- Erişilebilirlik: anlamlı HTML, `aria-*` etiketleri Türkçe, klavye ile gezinme, görünür focus.

## Klasör yapısı

```
app/          Route'lar, layout, global CSS (`/hizmetler/[pillar]`, `/nasil-calisiyoruz`, `/sonuclar/[slug]`, `/dashboard`, `/hakkimizda`, `/iletisim`)
components/
  brand/      Logo ve marka öğeleri
  charts/     Kod tabanlı grafikler (LineChart, BarChart)
  layout/     Header, Footer, navigasyon
  motion/     Framer Motion sarmalayıcıları
  seo/        JSON-LD çıktısı
  sections/   Sayfa bölümleri (Hero, Hizmetler...)
  ui/         Temel yapı taşları (Container, Button...)
lib/          Site ayarları, yardımcılar, motion preset'leri
  content/    Sayfa bölümlerinin metinleri ve rakamları (Türkçe)
assets/fonts/ Paylaşım görselleri için Geist TTF (SIL OFL, `OFL.txt`)
public/       Statik dosyalar
```

## Komutlar

```bash
npm run dev        # geliştirme sunucusu
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```
