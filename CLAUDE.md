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

## BADİ Mimarisi

Hizmetler üç sütundan oluşur:

| Sütun | Kapsam |
| --- | --- |
| **Administration** | Operasyon |
| **Development** | Pazarlama / Büyüme |
| **Infrastructure** | Teknoloji / Altyapı |

- Bölüm başlığı her yerde **"BADİ Mimarisi"**. "B-D-İ" veya "A-D-İ" gibi kısaltma kullanılmaz.
- Sütunların baş harfleri marka adını birebir karşılamaz. Harfleri sütunlarla eşleştirme. "B = …, A = …" gibi açılım yazma.

## Tasarım

- Referans: Linear, Ramp, Stripe, Vercel seviyesinde sadelik ve motion kalitesi.
- Koyu tema ağırlıklı. Tek güçlü vurgu rengi: `accent` = elektrik yeşili `#2EF08A` (onaylandı). İkinci bir vurgu rengi eklenmez.
- Vurgu azla kullanılır (CTA, kritik rakam, aktif durum).
- Font: Geist (sans) ve Geist Mono (rakam, etiket, kod). Rakam sütunlarında `tabular-nums`.
- Token'lar `tailwind.config.ts` içinde. Sabit hex kodu komponente yazılmaz; token kullanılır.
  - Arka plan: `canvas` → `surface` → `surface-raised` → `surface-overlay`
  - Çizgi: `line`, `line-strong`
  - Metin: `fg`, `fg-muted`, `fg-subtle`
  - Vurgu: `accent` (50–950), `accent-foreground`
  - Veri durumu: `positive`, `negative`, `warning`
- Motion: kısa (0.2–0.6 sn), `easeOutExpo`. Süs değil, yön gösterir. `prefers-reduced-motion` her zaman desteklenir (`MotionProvider`).

## Teknik kurallar

- Next.js (App Router) + TypeScript `strict`. `any` yok.
- Komponentler küçük ve tekrar kullanılabilir. Bir dosya, bir sorumluluk.
- Varsayılan Server Component. `"use client"` sadece etkileşim veya animasyon gereken yaprak komponentte.
- Tüm görseller `next/image` ile. `<img>` kullanılmaz.
- Tüm animasyonlar Framer Motion ile. Ortak ayarlar `lib/motion.ts`'de.
- Kodda İngilizce (isimler, yorumlar, commit mesajları). Sitede kullanıcıya görünen içerik Türkçe.
- Erişilebilirlik: anlamlı HTML, `aria-*` etiketleri Türkçe, klavye ile gezinme, görünür focus.

## Klasör yapısı

```
app/          Route'lar, layout, global CSS
components/
  brand/      Logo ve marka öğeleri
  layout/     Header, Footer, navigasyon
  motion/     Framer Motion sarmalayıcıları
  sections/   Sayfa bölümleri (Hero, Hizmetler...)
  ui/         Temel yapı taşları (Container, Button...)
lib/          Site ayarları, yardımcılar, motion preset'leri
  content/    Sayfa bölümlerinin metinleri ve rakamları (Türkçe)
public/       Statik dosyalar
```

## Komutlar

```bash
npm run dev        # geliştirme sunucusu
npm run build      # production build
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```
