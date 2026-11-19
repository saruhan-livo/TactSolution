/* TACT Solution — site scripts */
(() => {
  "use strict";

  const I18N = window.TACT_I18N;
  const LANGS = ["en", "tr"];
  let lang = "en";
  const T = (v) => (v && typeof v === "object" && "en" in v ? v[lang] ?? v.en : v); // pick bilingual value
  const ui = () => I18N.ui[lang];

  /* ---------------- Data (en = original, tr = Turkish) ---------------- */
  // [value, English label, Turkish label]
  const CITIES = [
    ["izmir", "İzmir", "İzmir"], ["istanbul", "Istanbul", "İstanbul"], ["ankara", "Ankara", "Ankara"],
    ["antalya", "Antalya", "Antalya"], ["bursa", "Bursa", "Bursa"], ["manisa", "Manisa", "Manisa"],
    ["aydin", "Aydın", "Aydın"], ["denizli", "Denizli", "Denizli"], ["konya", "Konya", "Konya"],
    ["gaziantep", "Gaziantep", "Gaziantep"], ["adana", "Adana", "Adana"], ["kocaeli", "Kocaeli", "Kocaeli"],
    ["eskisehir", "Eskişehir", "Eskişehir"], ["mugla", "Muğla", "Muğla"], ["kayseri", "Kayseri", "Kayseri"],
    ["samsun", "Samsun", "Samsun"], ["trabzon", "Trabzon", "Trabzon"], ["dubai", "Dubai", "Dubai"],
    ["frankfurt", "Frankfurt", "Frankfurt"], ["cologne", "Cologne", "Köln"], ["dusseldorf", "Düsseldorf", "Düsseldorf"],
    ["munich", "Munich", "Münih"], ["paris", "Paris", "Paris"], ["barcelona", "Barcelona", "Barselona"],
    ["milan", "Milan", "Milano"], ["london", "London", "Londra"], ["amsterdam", "Amsterdam", "Amsterdam"],
    ["lasvegas", "Las Vegas", "Las Vegas"],
  ];
  const cityName = (v) => { const c = CITIES.find((x) => x[0] === v); return c ? (lang === "tr" ? c[2] : c[1]) : v; };
  const SIZES = ["3x3", "3x6", "3x9", "6x6", "6x9", "6x12", "9x9", "9x12", "12x12", "12x15", "15x15"];

  const TAGS = {
    island: { en: "Island Stand", tr: "Ada Stant" },
    corner: { en: "Corner Stand", tr: "Köşe Stant" },
    modular: { en: "Modular Stand", tr: "Modüler Stant" },
    inline: { en: "Inline Stand", tr: "Sıra Stant" },
  };
  const SHOWS = {
    agri: { en: "Manisa Agriculture & Livestock Fair", tr: "Manisa Tarım ve Hayvancılık Fuarı" },
    izbook: { en: "İzmir Book Fair", tr: "İzmir Kitap Fuarı" },
    mesir: { en: "Manisa Mesir Trade Fair", tr: "Manisa Mesir Ticaret Fuarı" },
    gitfest: { en: "GitFest İzmir Caravan Fair", tr: "GitFest İzmir Karavan Fuarı" },
    aybook: { en: "Aydın Book Fair", tr: "Aydın Kitap Fuarı" },
    tech: { en: "Technology Summit", tr: "Teknoloji Zirvesi" },
    energy: { en: "Energy Expo", tr: "Enerji Fuarı" },
    health: { en: "Health Expo", tr: "Sağlık Fuarı" },
    furniture: { en: "Furniture Fair", tr: "Mobilya Fuarı" },
    textile: { en: "Textile Fair", tr: "Tekstil Fuarı" },
  };

  // Sample content — replace with real projects.
  const FEATURED = [
    { tag: "island", type: "island", color: "#F1C400", label: { en: "Agri Tech", tr: "Tarım Teknolojileri" }, name: { en: "Farm Machinery Maker — 9x9", tr: "Tarım Makineleri Üreticisi — 9x9" }, show: "agri" },
    { tag: "corner", type: "corner", color: "#1A1A1A", label: { en: "Publisher", tr: "Yayınevi" }, name: { en: "Publishing House — 6x6", tr: "Yayınevi Standı — 6x6" }, show: "izbook" },
    { tag: "modular", type: "inline", color: "#2F6B4F", label: { en: "Food", tr: "Gıda" }, name: { en: "Local Food Brand — 3x6", tr: "Yöresel Gıda Markası — 3x6" }, show: "mesir" },
    { tag: "island", type: "island", color: "#C0392B", label: { en: "Caravan", tr: "Karavan" }, name: { en: "Caravan Manufacturer — 12x12", tr: "Karavan Üreticisi — 12x12" }, show: "gitfest" },
    { tag: "inline", type: "inline", color: "#2D4D8C", label: { en: "Education", tr: "Eğitim" }, name: { en: "Education Institution — 3x3", tr: "Eğitim Kurumu — 3x3" }, show: "aybook" },
  ];

  const PORTFOLIO = [
    { size: "9x9", type: "island", color: "#F1C400", label: "Agro", client: { en: "Farm Equipment Company", tr: "Tarım Ekipmanları Firması" }, show: "agri", city: "manisa" },
    { size: "6x6", type: "corner", color: "#1A1A1A", label: { en: "Books", tr: "Kitap" }, client: { en: "Publishing Group", tr: "Yayın Grubu" }, show: "izbook", city: "izmir" },
    { size: "3x6", type: "inline", color: "#2F6B4F", label: { en: "Organic", tr: "Organik" }, client: { en: "Organic Food Brand", tr: "Organik Gıda Markası" }, show: "mesir", city: "manisa" },
    { size: "12x12", type: "island", color: "#C0392B", label: "Outdoor", client: { en: "Caravan & Camping Brand", tr: "Karavan & Kamp Markası" }, show: "gitfest", city: "izmir" },
    { size: "6x9", type: "corner", color: "#7A3E9D", label: "Tech", client: { en: "Software Company", tr: "Yazılım Şirketi" }, show: "tech", city: "istanbul" },
    { size: "3x3", type: "inline", color: "#2D4D8C", label: { en: "School", tr: "Okul" }, client: { en: "Private School", tr: "Özel Eğitim Kurumu" }, show: "aybook", city: "aydin" },
    { size: "6x12", type: "island", color: "#E67E22", label: { en: "Energy", tr: "Enerji" }, client: { en: "Solar Energy Company", tr: "Güneş Enerjisi Firması" }, show: "energy", city: "ankara" },
    { size: "9x12", type: "island", color: "#0E8C8C", label: { en: "Medical", tr: "Medikal" }, client: { en: "Medical Device Maker", tr: "Medikal Cihaz Üreticisi" }, show: "health", city: "antalya" },
    { size: "3x9", type: "inline", color: "#444444", label: { en: "Furniture", tr: "Mobilya" }, client: { en: "Furniture Brand", tr: "Mobilya Markası" }, show: "furniture", city: "bursa" },
    { size: "6x6", type: "corner", color: "#B8860B", label: { en: "Textile", tr: "Tekstil" }, client: { en: "Textile Manufacturer", tr: "Tekstil Üreticisi" }, show: "textile", city: "denizli" },
  ];

  // Sample testimonials — replace with real client reviews.
  const TESTIMONIALS = [
    { title: { en: "Farm Machinery Company @ Manisa Agriculture Fair", tr: "Tarım Makineleri Firması @ Manisa Tarım Fuarı" }, date: "2026 · 02",
      text: { en: "They were with us at every step from design to installation. The stand was ready before the show and there were no surprises on site.", tr: "Tasarımdan kuruluma her adımda yanımızdaydılar. Stant fuardan önce hazırdı, sahada hiçbir sürprizle karşılaşmadık." },
      who: { en: "Marketing Manager", tr: "Pazarlama Müdürü" } },
    { title: { en: "Publisher @ İzmir Book Fair", tr: "Yayınevi @ İzmir Kitap Fuarı" }, date: "2026 · 04",
      text: { en: "Thanks to our project manager, everything was handled with a single phone call. Visitors loved our stand.", tr: "Proje yöneticimiz sayesinde tek bir telefonla her şeyi çözdük. Ziyaretçilerden standımız için çok güzel geri dönüşler aldık." },
      who: { en: "Corporate Communications Team", tr: "Kurumsal İletişim Ekibi" } },
    { title: { en: "Caravan Brand @ GitFest", tr: "Karavan Markası @ GitFest" }, date: "2026 · 05",
      text: { en: "Our 12x12 island stand was one of the most talked-about spaces at the show — and not a single lira was added to the quoted price.", tr: "12x12 ada standımız fuarın en çok konuşulan alanlarından biri oldu. Teklif ettikleri fiyatın üzerine tek kuruş eklenmedi." },
      who: { en: "General Manager", tr: "Genel Müdür" } },
    { title: { en: "Food Brand @ Mesir Trade Fair", tr: "Gıda Markası @ Mesir Ticaret Fuarı" }, date: "2026 · 03",
      text: { en: "They gave a small stand the same care as a big one. We had the 3D design within a few days.", tr: "Küçük bir stant için bile aynı özeni gösterdiler. 3D tasarım birkaç gün içinde elimizdeydi." },
      who: { en: "Business Owner", tr: "Firma Sahibi" } },
    { title: { en: "School @ Aydın Book Fair", tr: "Eğitim Kurumu @ Aydın Kitap Fuarı" }, date: "2026 · 06",
      text: { en: "We use our modular stand at several fairs, and they manage storage and shipping too. Completely hassle-free.", tr: "Modüler standımızı birden fazla fuarda kullanıyoruz; depolama ve nakliyeyi de onlar yönetiyor. Çok rahatız." },
      who: { en: "PR Officer", tr: "Halkla İlişkiler Sorumlusu" } },
  ];

  const FAIRS = [
    [{ en: "Manisa Agriculture Fair", tr: "Manisa Tarım Fuarı" }, { en: "Agriculture", tr: "Tarım" }],
    [{ en: "Aydın Agriculture Fair", tr: "Aydın Tarım Fuarı" }, { en: "Agriculture", tr: "Tarım" }],
    [{ en: "İzmir Book Fair", tr: "İzmir Kitap Fuarı" }, { en: "Books", tr: "Kitap" }],
    [{ en: "Manisa Book Fair", tr: "Manisa Kitap Fuarı" }, { en: "Books", tr: "Kitap" }],
    [{ en: "Aydın Book Fair", tr: "Aydın Kitap Fuarı" }, { en: "Books", tr: "Kitap" }],
    [{ en: "Mesir Trade Fair", tr: "Mesir Ticaret Fuarı" }, { en: "Trade", tr: "Ticaret" }],
    ["GitFest İzmir", { en: "Caravan", tr: "Karavan" }],
    ["GitFest Aydın", { en: "Caravan", tr: "Karavan" }],
    ["TeknoTarım", { en: "Agriculture", tr: "Tarım" }],
  ];

  const STEPS = [
    { t: { en: "Discovery", tr: "Keşif" }, d: { en: "First, we hear your goals in a discovery call — brand awareness, a product launch, demos, customer engagement or anything else.", tr: "Önce bir keşif görüşmesinde hedeflerinizi dinliyoruz — marka bilinirliği, ürün lansmanı, demo, müşteri etkileşimi ya da başka bir şey." }, i: '<circle cx="28" cy="28" r="16"/><path d="m40 40 12 12"/><path d="M22 28h12M28 22v12"/>' },
    { t: { en: "Design", tr: "Tasarım" }, d: { en: "Based on your goals, space and budget, we prepare a 3D design and an all-inclusive quote within 4 business days.", tr: "Hedeflerinize, alanınıza ve bütçenize göre standınızın 3D tasarımını ve her şey dahil teklifini 4 iş günü içinde hazırlıyoruz." }, i: '<path d="M32 6 56 20v24L32 58 8 44V20z"/><path d="M8 20l24 14 24-14M32 34v24"/>' },
    { t: { en: "Graphics Production", tr: "Grafik Üretim" }, d: { en: "We prepare print-ready files from the approved design and produce high-resolution graphics in our own facility.", tr: "Onaylanan tasarıma göre baskı dosyalarını hazırlıyor, yüksek çözünürlüklü grafikleri kendi tesisimizde üretiyoruz." }, i: '<rect x="8" y="10" width="48" height="36" rx="3"/><path d="m8 38 14-12 10 8 8-6 16 12"/><circle cx="42" cy="20" r="4"/><path d="M22 54h20"/>' },
    { t: { en: "Pre-Show Trial Build", tr: "Ön Kurulum Testi" }, d: { en: "We fully assemble your stand at our workshop, test graphics, flooring and lighting, and share photos and videos with you.", tr: "Standınızı atölyemizde birebir kuruyor; grafik, zemin ve aydınlatmayı test edip fotoğraf ve videolarla sizinle paylaşıyoruz." }, i: '<path d="M8 54V24l24-14 24 14v30"/><path d="M20 54V34h24v20"/><path d="m26 44 5 5 9-10"/>' },
    { t: { en: "Project Management", tr: "Proje Yönetimi" }, d: { en: "Your dedicated project manager handles timelines, suppliers and communication with the show organiser — all in one place.", tr: "Size özel proje yöneticiniz zaman planını, tedarikçileri ve fuar organizasyonu ile iletişimi tek elden yönetir." }, i: '<rect x="10" y="10" width="44" height="44" rx="4"/><path d="M10 22h44M20 6v8M44 6v8"/><path d="m20 36 6 6 12-12"/>' },
    { t: { en: "Shipping & Installation", tr: "Nakliye & Kurulum" }, d: { en: "We ship your stand to the venue, install it, then dismantle and store it after the show. You just focus on your visitors.", tr: "Standınızı fuar alanına taşıyor, kuruyor ve fuar sonrası söküp depoluyoruz. Siz sadece ziyaretçilerinize odaklanın." }, i: '<path d="M4 16h34v26H4zM38 26h12l8 8v8H38z"/><circle cx="16" cy="46" r="5"/><circle cx="48" cy="46" r="5"/>' },
  ];

  /* ---------------- Helpers ---------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const up = (s) => s.toLocaleUpperCase(lang === "tr" ? "tr-TR" : "en-US");

  function shade(hex, amt) {
    const n = parseInt(hex.slice(1), 16);
    const f = (v) => Math.max(0, Math.min(255, Math.round(v + (amt > 0 ? (255 - v) * amt : v * amt))));
    const r = f(n >> 16), g = f((n >> 8) & 255), b = f(n & 255);
    return "#" + ((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1);
  }
  const isLight = (hex) => {
    const n = parseInt(hex.slice(1), 16);
    return (0.299 * (n >> 16) + 0.587 * ((n >> 8) & 255) + 0.114 * (n & 255)) > 150;
  };

  /* Isometric booth illustration (SVG) */
  function boothSVG({ type = "inline", color = "#F1C400", label = "" }) {
    const c = color, cD = shade(c, -0.25), cL = shade(c, 0.85), txt = isLight(c) ? "#1A1A1A" : "#fff";
    const L = esc(up(T(label)));
    const floor = `<polygon points="60,210 200,140 340,210 200,280" fill="#D9D9D3"/><polygon points="75,210 200,148 325,210 200,272" fill="${cL}" opacity=".9"/>`;
    const shadow = `<ellipse cx="200" cy="232" rx="150" ry="40" fill="#000" opacity=".06"/>`;
    const lights = (pts) => pts.map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3" fill="#fff8c4"/><polygon points="${x - 2},${y} ${x + 2},${y} ${x + 16},${y + 50} ${x - 16},${y + 50}" fill="#fff8c4" opacity=".18"/>`).join("");
    const person = (x, y, col) => `<g transform="translate(${x} ${y})"><ellipse cx="0" cy="0" rx="7" ry="3" fill="#000" opacity=".12"/><rect x="-4" y="-26" width="8" height="26" rx="3" fill="${col}"/><circle cx="0" cy="-31" r="5" fill="#C9A27E"/></g>`;
    const counter = (x, y) => `<g transform="translate(${x} ${y})"><polygon points="0,0 36,-18 36,8 0,26" fill="${c}"/><polygon points="36,-18 56,-8 56,18 36,8" fill="${cD}"/><polygon points="0,0 20,10 56,-8 36,-18" fill="#fff"/><polygon points="0,0 20,10 20,36 0,26" fill="${shade(c, -0.1)}"/></g>`;

    if (type === "island") {
      return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
        ${shadow}${floor}
        <polygon points="182,150 218,132 218,216 182,234" fill="${c}"/>
        <polygon points="218,132 248,147 248,231 218,216" fill="${cD}"/>
        <polygon points="182,150 212,165 248,147 218,132" fill="${shade(c, 0.3)}"/>
        <polygon points="182,150 212,165 212,249 182,234" fill="${shade(c, -0.1)}"/>
        <line x1="200" y1="0" x2="200" y2="40" stroke="#999" stroke-width="1"/>
        <polygon points="110,58 200,22 290,58 200,94" fill="none" stroke="${c}" stroke-width="16" stroke-linejoin="round"/>
        <polygon points="110,58 200,94 290,58 290,70 200,106 110,70" fill="${cD}"/>
        <text transform="matrix(1 0.4 0 1 128 76)" font-family="Outfit,Arial" font-weight="700" font-size="13" fill="${txt}">${L}</text>
        ${counter(100, 210)}${counter(250, 222)}
        <polygon points="260,170 300,190 300,196 260,176" fill="#fff"/><rect x="278" y="182" width="3" height="28" fill="#666"/>
        ${person(150, 246, "#333")}${person(300, 238, cD)}${person(240, 262, "#556")}
      </svg>`;
    }
    const corner = type === "corner";
    return `<svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      ${shadow}${floor}
      <polygon points="60,210 200,140 200,40 60,110" fill="${c}"/>
      <polygon points="74,203 186,147 186,92 74,148" fill="${shade(c, -0.12)}"/>
      <text transform="matrix(1 -0.5 0 1 84 168)" font-family="Outfit,Arial" font-weight="800" font-size="22" fill="${txt}" opacity=".95">${L}</text>
      <polygon points="200,140 ${corner ? "300,190 300,90" : "340,210 340,110"} 200,40" fill="#F5F5F2"/>
      <polygon points="214,138 ${corner ? "286,174 286,112" : "326,194 326,128"} 214,76" fill="${cL}"/>
      <circle cx="${corner ? 250 : 270}" cy="${corner ? 125 : 135}" r="18" fill="${c}"/>
      <polygon points="60,110 200,40 200,22 60,92" fill="${cD}"/>
      <polygon points="200,40 ${corner ? "300,90 300,72" : "340,110 340,92"} 200,22" fill="${c}"/>
      <text transform="matrix(1 -0.5 0 1 80 100)" font-family="Outfit,Arial" font-weight="700" font-size="11" fill="${isLight(cD) ? "#1A1A1A" : "#fff"}">TACT SOLUTION</text>
      ${lights([[100, 92], [150, 67], [240, 62], [290, 87]])}
      ${counter(200, 214)}
      <rect x="120" y="176" width="16" height="40" fill="#fff" stroke="#ddd"/><rect x="116" y="170" width="24" height="8" fill="${c}"/>
      ${person(180, 258, "#333")}${person(270, 250, cD)}
    </svg>`;
  }

  /* ---------------- Static text translation ---------------- */
  // English originals are captured from the HTML once, so index.html stays the single English source.
  const EN = {};
  $$("[data-i18n]").forEach((el) => { if (!(el.dataset.i18n in EN)) EN[el.dataset.i18n] = el.innerHTML; });
  $$("[data-i18n-attr]").forEach((el) => el.dataset.i18nAttr.split(";").forEach((pair) => {
    const [attr, key] = pair.split(":");
    if (!(key in EN)) EN[key] = el.getAttribute(attr);
  }));
  const tr = (key) => (lang === "en" ? EN[key] : I18N[lang][key] ?? EN[key]);

  function applyStatic() {
    $$("[data-i18n]").forEach((el) => {
      const v = tr(el.dataset.i18n);
      if (v == null) return;
      if (el.tagName === "TITLE" || el.tagName === "OPTION") el.textContent = v.replace(/&amp;/g, "&");
      else el.innerHTML = v;
    });
    $$("[data-i18n-attr]").forEach((el) => el.dataset.i18nAttr.split(";").forEach((pair) => {
      const [attr, key] = pair.split(":");
      const v = tr(key);
      if (v != null) el.setAttribute(attr, v);
    }));
  }

  /* ---------------- Dynamic render ---------------- */
  const opt = (v, t = v) => `<option value="${esc(v)}">${esc(t)}</option>`;
  function fillSelect(el, items) {
    const keep = el.value;
    [...el.options].slice(1).forEach((o) => o.remove());
    el.insertAdjacentHTML("beforeend", items);
    el.value = keep;
  }
  function renderSelects() {
    const sizes = SIZES.map((s) => opt(s, `${s} m`)).join("");
    const cities = CITIES.map((c) => opt(c[0], cityName(c[0]))).join("");
    fillSelect($("#finder-size"), sizes);
    fillSelect($("#finder-city"), cities);
    $$("[data-size-select]").forEach((el) => fillSelect(el, sizes));
    $$("[data-city-select]").forEach((el) => fillSelect(el, cities));
    $("#nav-sizes").innerHTML = ["3x3", "3x6", "6x6", "6x9", "9x9"].map((s) => `<li><a href="#portfolio" data-size="${s}">${esc(ui().sizeStand(s))}</a></li>`).join("");
    $("#footer-sizes").innerHTML = ["3x6", "3x9", "6x6", "6x9", "9x9", "12x12"].map((s) => `<li><a href="#portfolio" data-size="${s}">${esc(ui().sizeRent(s))}</a></li>`).join("");
  }

  function renderFeatured() {
    $("#featured-track").innerHTML = FEATURED.map((f) => `
      <article class="feat-card card-hover">
        <div class="booth-visual"><span class="tag">${esc(T(TAGS[f.tag]))}</span>${boothSVG(f)}</div>
        <p class="meta-top">${esc(T(SHOWS[f.show]))}</p>
        <h3>${esc(T(f.name))}</h3>
        <p class="meta-sub">${esc(T(TAGS[f.tag]))} · ${esc(ui().turnkey)}</p>
      </article>`).join("");
  }

  let pfFilter = {};
  function renderPortfolio(filter = pfFilter) {
    pfFilter = filter;
    let items = PORTFOLIO.filter((p) => (!filter.size || p.size === filter.size) && (!filter.city || p.city === filter.city));
    const note = $("#filter-note");
    if (filter.size || filter.city) {
      const parts = esc([filter.city && cityName(filter.city), filter.size && `${filter.size} m`].filter(Boolean).join(" · "));
      note.hidden = false;
      note.innerHTML = items.length
        ? `<span>${ui().showing(parts, items.length)}</span><button type="button" data-clear>${esc(ui().clear)}</button>`
        : `<span>${ui().none(parts)}</span><button type="button" data-clear>${esc(ui().showAll)}</button>`;
      if (!items.length) items = PORTFOLIO;
    } else note.hidden = true;
    $("#portfolio-track").innerHTML = items.map((p) => `
      <article class="pf-card card-hover">
        <div class="booth-visual">${boothSVG(p)}</div>
        <div class="pf-info">
          <span class="pf-size">${esc(p.size.toUpperCase())} M</span>
          <h3>${esc(T(p.client))}</h3>
          <div class="pf-meta">
            <div><small>${esc(ui().fair)}</small><span>${esc(T(SHOWS[p.show]))}</span></div>
            <div><small>${esc(ui().location)}</small><span>${esc(cityName(p.city))}</span></div>
          </div>
        </div>
      </article>`).join("");
    $("#portfolio-track").scrollLeft = 0;
    updateSliders();
  }

  function renderTestimonials() {
    $("#testi-track").innerHTML = TESTIMONIALS.map((t) => `
      <article class="testi">
        <div class="stars" aria-label="${esc(ui().stars)}">★★★★★</div>
        <h4>${esc(T(t.title))}</h4>
        <time>${esc(t.date)}</time>
        <p>“${esc(T(t.text))}”</p>
        <span class="who">${esc(T(t.who))}</span>
      </article>`).join("");
  }

  function renderMarquee() {
    const chips = FAIRS.map(([n, k]) => `<div class="brand-chip"><strong>${esc(T(n))}</strong><span>${esc(T(k))}</span></div>`).join("");
    $("#marquee-track").innerHTML = chips + chips;
  }

  /* ---------------- Sliders ---------------- */
  function updateSliders() {
    $$("[data-slider]").forEach((s) => {
      const t = $(".slider-track", s);
      $(".prev", s).disabled = t.scrollLeft <= 4;
      $(".next", s).disabled = t.scrollLeft + t.clientWidth >= t.scrollWidth - 4;
    });
  }
  $$("[data-slider]").forEach((s) => {
    const t = $(".slider-track", s);
    const step = () => (t.firstElementChild ? t.firstElementChild.getBoundingClientRect().width + 24 : t.clientWidth);
    $(".prev", s).addEventListener("click", () => t.scrollBy({ left: -step() }));
    $(".next", s).addEventListener("click", () => t.scrollBy({ left: step() }));
    t.addEventListener("scroll", updateSliders, { passive: true });
  });
  window.addEventListener("resize", updateSliders);

  /* ---------------- Process tabs ---------------- */
  const tabs = $("#steps-tabs");
  let stepIdx = 0, stepTimer;
  function renderTabs() {
    tabs.innerHTML = STEPS.map((s, i) => `<button class="step-tab" role="tab" aria-selected="${i === stepIdx}" data-i="${i}"><small>0${i + 1}</small>${esc(T(s.t))}</button>`).join("");
  }
  function showStep(i, animate = true) {
    stepIdx = i;
    const s = STEPS[i], n = String(i + 1).padStart(2, "0");
    $$(".step-tab", tabs).forEach((b, j) => b.setAttribute("aria-selected", j === i));
    $("#step-num").textContent = n;
    $("#step-of").textContent = ui().stepOf(n);
    $("#step-title").textContent = up(T(s.t));
    $("#step-text").textContent = T(s.d);
    $("#step-visual").innerHTML = `<svg viewBox="0 0 64 64">${s.i}</svg>`;
    if (animate) { const p = $("#step-panel"); p.classList.remove("anim"); void p.offsetWidth; p.classList.add("anim"); }
  }
  tabs.addEventListener("click", (e) => {
    const b = e.target.closest(".step-tab");
    if (!b) return;
    showStep(+b.dataset.i);
    restartAuto();
  });
  function restartAuto() {
    clearInterval(stepTimer);
    stepTimer = setInterval(() => showStep((stepIdx + 1) % STEPS.length), 6000);
  }

  /* ---------------- Language switching ---------------- */
  function setLang(l, save = true) {
    lang = LANGS.includes(l) ? l : "en";
    document.documentElement.lang = lang;
    if (save) { try { localStorage.setItem("tact-lang", lang); } catch (e) {} }
    $$(".lang-switch button").forEach((b) => b.setAttribute("aria-pressed", b.dataset.lang === lang));
    applyStatic();
    renderSelects();
    renderFeatured();
    renderPortfolio();
    renderTestimonials();
    renderMarquee();
    renderTabs();
    showStep(stepIdx, false);
    $$(".form-status").forEach((el) => (el.textContent = ""));
    const url = new URL(location.href);
    if (url.searchParams.has("lang")) { url.searchParams.set("lang", lang); history.replaceState(null, "", url); }
    document.documentElement.classList.remove("i18n-pending");
  }
  $$(".lang-switch button").forEach((b) => b.addEventListener("click", () => setLang(b.dataset.lang)));

  /* ---------------- Finder ---------------- */
  $("#finder").addEventListener("submit", (e) => {
    e.preventDefault();
    const city = $("#finder-city").value, size = $("#finder-size").value;
    renderPortfolio({ city, size });
    $$("[data-size-select]").forEach((s) => (s.value = size));
    $$("[data-city-select]").forEach((s) => (s.value = city));
    $("#portfolio").scrollIntoView({ behavior: "smooth" });
  });
  document.addEventListener("click", (e) => {
    const a = e.target.closest("a[data-size]");
    if (a) renderPortfolio({ size: a.dataset.size });
    if (e.target.closest("[data-clear]")) renderPortfolio({});
  });

  /* ---------------- Modal ---------------- */
  const modal = $("#modal");
  let lastFocus;
  const openModal = () => { lastFocus = document.activeElement; modal.classList.add("open"); modal.setAttribute("aria-hidden", "false"); setTimeout(() => $("input", modal).focus(), 50); };
  const closeModal = () => { modal.classList.remove("open"); modal.setAttribute("aria-hidden", "true"); lastFocus && lastFocus.focus(); };
  $$("[data-open-modal]").forEach((b) => b.addEventListener("click", openModal));
  $$("[data-close-modal]").forEach((b) => b.addEventListener("click", closeModal));
  document.addEventListener("keydown", (e) => { if (e.key === "Escape" && modal.classList.contains("open")) closeModal(); });

  /* ---------------- Forms (mailto fallback; connect to a backend later) ---------------- */
  const TO = "info@tactsolution.com";
  $$("[data-lead-form]").forEach((f) => f.addEventListener("submit", (e) => {
    e.preventDefault();
    const d = Object.fromEntries(new FormData(f));
    if (d.city) d.city = cityName(d.city);
    if (d.source) { const o = f.querySelector(`[name=source] option[value="${d.source}"]`); if (o) d.source = o.textContent; }
    const L = ui().labels;
    const body = Object.entries(d).filter(([, v]) => v).map(([k, v]) => `${L[k] || k}: ${v}`).join("\n");
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent(ui().subject + " — " + (d.company || ""))}&body=${encodeURIComponent(body)}`;
    $(".form-status", f).textContent = ui().sent;
    f.reset();
  }));

  /* ---------------- Header / nav ---------------- */
  const header = $(".site-header");
  const onScroll = () => header.classList.toggle("scrolled", window.scrollY > 30);
  onScroll(); window.addEventListener("scroll", onScroll, { passive: true });

  const burger = $(".burger"), nav = $("#main-nav");
  burger.addEventListener("click", () => {
    const open = burger.getAttribute("aria-expanded") !== "true";
    burger.setAttribute("aria-expanded", open);
    nav.classList.toggle("open", open);
    header.classList.add("scrolled");
  });
  nav.addEventListener("click", (e) => {
    const a = e.target.closest("a");
    if (!a) return;
    const li = a.parentElement;
    if (window.innerWidth <= 1024 && li.classList.contains("has-sub") && !li.classList.contains("expanded")) {
      e.preventDefault(); li.classList.add("expanded"); return;
    }
    burger.setAttribute("aria-expanded", "false"); nav.classList.remove("open");
  });

  /* ---------------- Reveal on scroll ---------------- */
  const io = new IntersectionObserver((entries) => entries.forEach((en) => {
    if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); }
  }), { threshold: 0.12 });
  $$(".reveal").forEach((el) => io.observe(el));

  /* ---------------- Init ---------------- */
  $("#year").textContent = new Date().getFullYear();
  const q = new URLSearchParams(location.search).get("lang");
  let saved = null; try { saved = localStorage.getItem("tact-lang"); } catch (e) {}
  setLang(q || saved || "en", !!q);
  restartAuto();
})();
