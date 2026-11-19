# TACT Solution — Web Sitesi

Fuar standı tasarım & uygulama firması TACT Solution için statik tanıtım sitesi.
Bağımlılık yok; `index.html` dosyasını tarayıcıda açmanız yeterli.

## Dil desteği (EN / TR)
- Orijinal dil **İngilizce**dir; İngilizce metinler doğrudan `index.html` içindedir.
- Türkçe çeviriler `assets/js/i18n.js` içinde, `data-i18n` anahtarlarıyla eşleşir.
- Dinamik içerik (projeler, süreç adımları, yorumlar) `main.js` içinde `{ en, tr }` alanlarıyla tutulur.
- Sağ üstteki EN/TR düğmesiyle dil değişir, seçim tarayıcıda saklanır. `?lang=tr` / `?lang=en` ile doğrudan link verilebilir.
- Yeni metin eklerken: HTML'e İngilizcesini `data-i18n="anahtar"` ile yazın, Türkçesini `i18n.js` içine aynı anahtarla ekleyin.

## Yapı
- `index.html` — tüm sayfa bölümleri
- `assets/css/style.css` — stiller (marka rengi `--yellow: #F1C400`)
- `assets/js/main.js` — içerik verileri (şehirler, ölçüler, projeler, yorumlar, süreç adımları), slider, filtre, modal, formlar
- `assets/img/logo-ink.svg`, `logo-white.svg`, `favicon.svg` — TACT Fair logosundan uyarlanan TACT Solution logosu

## Güncellenmesi gerekenler
- `main.js` içindeki (her iki dilde) `PORTFOLIO`, `FEATURED` ve `TESTIMONIALS` örnek içeriktir; gerçek proje ve müşteri yorumlarıyla değiştirin.
- E-posta adresi `info@tactsolution.com` varsayılandır (`index.html` ve `main.js` içindeki (her iki dilde) `TO`).
- Formlar şu an kullanıcının e-posta uygulamasını açar (mailto). Gerçek form gönderimi için bir backend / form servisi bağlayın.
- Proje görselleri şimdilik çizim (SVG) — gerçek stant fotoğraflarıyla değiştirilebilir.
