# BADİ Web

BADİ dijital ticaret hızlandırıcı kurumsal web sitesi.

Next.js (App Router) · TypeScript · Tailwind CSS · Framer Motion

Proje kuralları ve marka rehberi: [CLAUDE.md](./CLAUDE.md)

## Yerelde inceleme

Gerekenler: [Node.js](https://nodejs.org) 20.9 veya üstü (22 LTS önerilir) ve Git.

```bash
git clone https://github.com/nurullahhpr/BAD-.git
cd BAD-
git checkout claude/badi-website-scaffold-yowakj
npm ci
npm run build
npm start
```

Tarayıcıda açın: <http://localhost:3000>

- `npm run build` + `npm start` sitenin yayındaki halini verir. İnceleme için bunu kullanın.
- `npm run dev` geliştirme içindir. Daha yavaştır, köşede Next.js göstergesi çıkar.
- Telefonda denemek için: bilgisayar ve telefon aynı Wi-Fi'da olsun. `npm start` çıktısındaki `Network:` adresini telefonda açın.

### Kontrol listesi

| Adres | Ne görülür |
| --- | --- |
| `/` | Ana sayfa |
| `/hizmetler/administration`, `/development`, `/infrastructure` | Hizmet sayfaları |
| `/nasil-calisiyoruz` | 90 günlük program |
| `/sonuclar`, `/sonuclar/musteri-a` | Vaka çalışmaları |
| `/dashboard` | Etkileşimli panel |
| `/hakkimizda` | Hikaye, ilkeler, ekip |
| `/iletisim` | Teklif formu |
| `/sitemap.xml`, `/robots.txt` | Arama motoru dosyaları |
| `/opengraph-image` | Paylaşım görseli (her sayfanın kendi görseli var) |

- Form şimdilik bir yere göndermez. Gönderilen bilgiyi görmek için tarayıcıda F12 → Console.
- Canonical adresler ve site haritası `http://localhost:3000` gösterir. Alan adı alınınca `NEXT_PUBLIC_SITE_URL` ile değişir (bkz. `.env.example`).
- Hız ölçümü: Chrome'da gizli pencere → F12 → Lighthouse → Mobile.

## Komutlar

```bash
npm run dev        # geliştirme sunucusu
npm run build      # production build
npm start          # build'i çalıştırır (localhost:3000)
npm run lint       # ESLint
npm run typecheck  # tsc --noEmit
```
