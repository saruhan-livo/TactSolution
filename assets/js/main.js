/* TACT Solution — site scripts */
(() => {
  "use strict";

  /* ---------------- Data ---------------- */
  const CITIES = [
    "İzmir", "İstanbul", "Ankara", "Antalya", "Bursa", "Manisa", "Aydın", "Denizli",
    "Konya", "Gaziantep", "Adana", "Kocaeli", "Eskişehir", "Muğla", "Kayseri", "Samsun",
    "Trabzon", "Diyarbakır", "Dubai", "Frankfurt", "Köln", "Düsseldorf", "Münih",
    "Paris", "Barselona", "Milano", "Londra", "Amsterdam", "Las Vegas"
  ];
  const SIZES = ["3x3", "3x6", "3x9", "6x6", "6x9", "6x12", "9x9", "9x12", "12x12", "12x15", "15x15"];

  const FEATURED = [
    { tag: "Ada Stant", type: "island", color: "#F1C400", label: "Tarım Teknolojileri", name: "Tarım Makineleri Üreticisi — 9x9", show: "Manisa Tarım ve Hayvancılık Fuarı" },
    { tag: "Köşe Stant", type: "corner", color: "#1A1A1A", label: "Yayınevi", name: "Yayınevi Standı — 6x6", show: "İzmir Kitap Fuarı" },
    { tag: "Modüler Stant", type: "inline", color: "#2F6B4F", label: "Gıda", name: "Yöresel Gıda Markası — 3x6", show: "Manisa Mesir Ticaret Fuarı" },
    { tag: "Ada Stant", type: "island", color: "#C0392B", label: "Karavan", name: "Karavan Üreticisi — 12x12", show: "İzmir Karavan Fuarı (GitFest)" },
    { tag: "Sıra Stant", type: "inline", color: "#2D4D8C", label: "Eğitim", name: "Eğitim Kurumu — 3x3", show: "Aydın Kitap Fuarı" },
  ];

  const PORTFOLIO = [
    { size: "9x9", type: "island", color: "#F1C400", label: "Agro", client: "Tarım Ekipmanları Firması", show: "Manisa Tarım Fuarı", city: "Manisa" },
    { size: "6x6", type: "corner", color: "#1A1A1A", label: "Kitap", client: "Yayın Grubu", show: "İzmir Kitap Fuarı", city: "İzmir" },
    { size: "3x6", type: "inline", color: "#2F6B4F", label: "Organik", client: "Organik Gıda Markası", show: "Mesir Ticaret Fuarı", city: "Manisa" },
    { size: "12x12", type: "island", color: "#C0392B", label: "Outdoor", client: "Karavan & Kamp Markası", show: "GitFest Karavan Fuarı", city: "İzmir" },
    { size: "6x9", type: "corner", color: "#7A3E9D", label: "Tech", client: "Yazılım Şirketi", show: "Teknoloji Zirvesi", city: "İstanbul" },
    { size: "3x3", type: "inline", color: "#2D4D8C", label: "Okul", client: "Özel Eğitim Kurumu", show: "Aydın Kitap Fuarı", city: "Aydın" },
    { size: "6x12", type: "island", color: "#E67E22", label: "Enerji", client: "Güneş Enerjisi Firması", show: "Enerji Fuarı", city: "Ankara" },
    { size: "9x12", type: "island", color: "#0E8C8C", label: "Medikal", client: "Medikal Cihaz Üreticisi", show: "Sağlık Fuarı", city: "Antalya" },
    { size: "3x9", type: "inline", color: "#444444", label: "Mobilya", client: "Mobilya Markası", show: "Mobilya Fuarı", city: "Bursa" },
    { size: "6x6", type: "corner", color: "#B8860B", label: "Tekstil", client: "Tekstil Üreticisi", show: "Tekstil Fuarı", city: "Denizli" },
  ];

  // Örnek yorumlar — gerçek müşteri yorumlarıyla değiştirin.
  const TESTIMONIALS = [
    { title: "Tarım Makineleri Firması @ Manisa Tarım Fuarı", date: "2026 · 02", text: "Tasarımdan kuruluma her adımda yanımızdaydılar. Stant fuardan önce hazırdı, sahada hiçbir sürprizle karşılaşmadık.", who: "Pazarlama Müdürü" },
    { title: "Yayınevi @ İzmir Kitap Fuarı", date: "2026 · 04", text: "Proje yöneticimiz sayesinde tek bir telefonla her şeyi çözdük. Ziyaretçilerden standımız için çok güzel geri dönüşler aldık.", who: "Kurumsal İletişim Ekibi" },
    { title: "Karavan Markası @ GitFest", date: "2026 · 05", text: "12x12 ada standımız fuarın en çok konuşulan alanlarından biri oldu. Teklif ettikleri fiyatın üzerine tek kuruş eklenmedi.", who: "Genel Müdür" },
    { title: "Gıda Markası @ Mesir Ticaret Fuarı", date: "2026 · 03", text: "Küçük bir stant için bile aynı özeni gösterdiler. 3D tasarım birkaç gün içinde elimizdeydi.", who: "Firma Sahibi" },
    { title: "Eğitim Kurumu @ Aydın Kitap Fuarı", date: "2026 · 06", text: "Modüler stantımızı birden fazla fuarda kullanıyoruz; depolama ve nakliyeyi de onlar yönetiyor. Çok rahatız.", who: "Halkla İlişkiler Sorumlusu" },
  ];

  const FAIRS = [
    ["Manisa Tarım Fuarı", "Tarım"], ["Aydın Tarım Fuarı", "Tarım"], ["İzmir Kitap Fuarı", "Kitap"],
    ["Manisa Kitap Fuarı", "Kitap"], ["Aydın Kitap Fuarı", "Kitap"], ["Mesir Ticaret Fuarı", "Ticaret"],
    ["GitFest İzmir", "Karavan"], ["GitFest Aydın", "Karavan"], ["TeknoTarım", "Tarım"],
  ];

  const STEPS = [
    { t: "Keşif", d: "Önce bir keşif görüşmesinde hedeflerinizi dinliyoruz — marka bilinirliği, ürün lansmanı, demo, müşteri etkileşimi ya da başka bir şey.", i: '<circle cx="28" cy="28" r="16"/><path d="m40 40 12 12"/><path d="M22 28h12M28 22v12"/>' },
    { t: "Tasarım", d: "Hedeflerinize, alanınıza ve bütçenize göre standınızın 3D tasarımını ve her şey dahil teklifini 4 iş günü içinde hazırlıyoruz.", i: '<path d="M32 6 56 20v24L32 58 8 44V20z"/><path d="M8 20l24 14 24-14M32 34v24"/>' },
    { t: "Grafik Üretim", d: "Onaylanan tasarıma göre baskı dosyalarını hazırlıyor, yüksek çözünürlüklü grafikleri kendi tesisimizde üretiyoruz.", i: '<rect x="8" y="10" width="48" height="36" rx="3"/><path d="m8 38 14-12 10 8 8-6 16 12"/><circle cx="42" cy="20" r="4"/><path d="M22 54h20"/>' },
    { t: "Ön Kurulum Testi", d: "Standınızı atölyemizde birebir kuruyor; grafik, zemin ve aydınlatmayı test edip fotoğraf ve videolarla sizinle paylaşıyoruz.", i: '<path d="M8 54V24l24-14 24 14v30"/><path d="M20 54V34h24v20"/><path d="m26 44 5 5 9-10"/>' },
    { t: "Proje Yönetimi", d: "Size özel proje yöneticiniz zaman planını, tedarikçileri ve fuar organizasyonu ile iletişimi tek elden yönetir.", i: '<rect x="10" y="10" width="44" height="44" rx="4"/><path d="M10 22h44M20 6v8M44 6v8"/><path d="m20 36 6 6 12-12"/>' },
    { t: "Nakliye & Kurulum", d: "Standınızı fuar alanına taşıyor, kuruyor ve fuar sonrası söküp depoluyoruz. Siz sadece ziyaretçilerinize odaklanın.", i: '<path d="M4 16h34v26H4zM38 26h12l8 8v8H38z"/><circle cx="16" cy="46" r="5"/><circle cx="48" cy="46" r="5"/>' },
  ];

  /* ---------------- Helpers ---------------- */
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

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
    const L = esc(label.toUpperCase());
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
        <rect x="200" y="20" width="0" height="0"/>
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

  /* ---------------- Render ---------------- */
  const opt = (v, t = v) => `<option value="${esc(v)}">${esc(t)}</option>`;
  $("#finder-city").insertAdjacentHTML("beforeend", CITIES.map((c) => opt(c)).join(""));
  $("#finder-size").insertAdjacentHTML("beforeend", SIZES.map((s) => opt(s, `${s} m`)).join(""));
  $$("[data-size-select]").forEach((el) => el.insertAdjacentHTML("beforeend", SIZES.map((s) => opt(s, `${s} m`)).join("")));
  $$("[data-city-select]").forEach((el) => el.insertAdjacentHTML("beforeend", CITIES.map((c) => opt(c)).join("")));
  $("#footer-sizes").innerHTML = ["3x6", "3x9", "6x6", "6x9", "9x9", "12x12"].map((s) => `<li><a href="#portfolio" data-size="${s}">${s} m Kiralık Stant</a></li>`).join("");

  $("#featured-track").innerHTML = FEATURED.map((f) => `
    <article class="feat-card card-hover">
      <div class="booth-visual"><span class="tag">${esc(f.tag)}</span>${boothSVG(f)}</div>
      <p class="meta-top">${esc(f.show)}</p>
      <h3>${esc(f.name)}</h3>
      <p class="meta-sub">${esc(f.tag)} · Anahtar teslim</p>
    </article>`).join("");

  function renderPortfolio(filter = {}) {
    let items = PORTFOLIO.filter((p) => (!filter.size || p.size === filter.size) && (!filter.city || p.city === filter.city));
    const note = $("#filter-note");
    if (filter.size || filter.city) {
      const parts = [filter.city, filter.size && `${filter.size} m`].filter(Boolean).join(" · ");
      note.hidden = false;
      note.innerHTML = items.length
        ? `<span><strong>${esc(parts)}</strong> için ${items.length} proje gösteriliyor.</span><button type="button" data-clear>Filtreyi temizle</button>`
        : `<span><strong>${esc(parts)}</strong> için henüz yayınlanmış proje yok — size özel tasarım hazırlayalım!</span><button type="button" data-clear>Tümünü göster</button>`;
      if (!items.length) items = PORTFOLIO;
    } else note.hidden = true;
    $("#portfolio-track").innerHTML = items.map((p) => `
      <article class="pf-card card-hover">
        <div class="booth-visual">${boothSVG(p)}</div>
        <div class="pf-info">
          <span class="pf-size">${esc(p.size.toUpperCase().replace("X", "X"))} M</span>
          <h3>${esc(p.client)}</h3>
          <div class="pf-meta">
            <div><small>FUAR</small><span>${esc(p.show)}</span></div>
            <div><small>LOKASYON</small><span>${esc(p.city)}</span></div>
          </div>
        </div>
      </article>`).join("");
    $("#portfolio-track").scrollLeft = 0;
    updateSliders();
  }

  $("#testi-track").innerHTML = TESTIMONIALS.map((t) => `
    <article class="testi">
      <div class="stars" aria-label="5 yıldız">★★★★★</div>
      <h4>${esc(t.title)}</h4>
      <time>${esc(t.date)}</time>
      <p>“${esc(t.text)}”</p>
      <span class="who">${esc(t.who)}</span>
    </article>`).join("");

  const chips = FAIRS.map(([n, k]) => `<div class="brand-chip"><strong>${esc(n)}</strong><span>${esc(k)}</span></div>`).join("");
  $("#marquee-track").innerHTML = chips + chips;

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
  tabs.innerHTML = STEPS.map((s, i) => `<button class="step-tab" role="tab" aria-selected="${i === 0}" data-i="${i}"><small>0${i + 1}</small>${esc(s.t)}</button>`).join("");
  let stepIdx = 0, stepTimer;
  function showStep(i) {
    stepIdx = i;
    const s = STEPS[i], n = String(i + 1).padStart(2, "0");
    $$(".step-tab", tabs).forEach((b, j) => b.setAttribute("aria-selected", j === i));
    $("#step-num").textContent = n;
    $("#step-of").textContent = `ADIM ${n} / 06`;
    $("#step-title").textContent = s.t.toLocaleUpperCase("tr-TR");
    $("#step-text").textContent = s.d;
    $("#step-visual").innerHTML = `<svg viewBox="0 0 64 64">${s.i}</svg>`;
    const p = $("#step-panel");
    p.classList.remove("anim"); void p.offsetWidth; p.classList.add("anim");
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
  showStep(0); restartAuto();

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
    if (e.target.closest("[data-clear]")) renderPortfolio();
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
    const labels = { name: "Ad Soyad", company: "Firma", email: "E-posta", phone: "Telefon", size: "Stant ölçüsü", city: "Şehir", source: "Kaynak", message: "Mesaj" };
    const body = Object.entries(d).filter(([, v]) => v).map(([k, v]) => `${labels[k] || k}: ${v}`).join("\n");
    window.location.href = `mailto:${TO}?subject=${encodeURIComponent("Stant teklif talebi — " + (d.company || ""))}&body=${encodeURIComponent(body)}`;
    $(".form-status", f).textContent = "Teşekkürler! E-posta uygulamanız açılıyor; talebiniz bize iletilecek.";
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

  $("#year").textContent = new Date().getFullYear();
  renderPortfolio();
})();
