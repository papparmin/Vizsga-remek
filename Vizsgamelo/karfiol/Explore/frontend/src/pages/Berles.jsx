import React, { useMemo, useState } from "react";
import "./Berles.css";

const formatHuf = (n) => new Intl.NumberFormat("hu-HU").format(Math.round(n)) + " Ft";

const toISO = (d) => {
  const pad = (x) => String(x).padStart(2, "0");
  return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
};

const parseISO = (s) => {
  if (!s) return null;
  const [y, m, d] = s.split("-").map(Number);
  if (!y || !m || !d) return null;
  const dt = new Date(y, m - 1, d);
  if (dt.getFullYear() !== y || dt.getMonth() !== m - 1 || dt.getDate() !== d) return null;
  return dt;
};

const diffDays = (fromISO, toISODate) => {
  const a = parseISO(fromISO);
  const b = parseISO(toISODate);
  if (!a || !b) return 0;
  const A = new Date(a.getFullYear(), a.getMonth(), a.getDate()).getTime();
  const B = new Date(b.getFullYear(), b.getMonth(), b.getDate()).getTime();
  return Math.round((B - A) / (1000 * 60 * 60 * 24));
};

const imgQueryFor = (name, category) => {
  const s = (name + " " + category).toLowerCase();
  if (s.includes("sátor")) return "tent";
  if (s.includes("hálózsák")) return "sleepingbag";
  if (s.includes("matrac")) return "sleeping%20pad";
  if (s.includes("hátizsák")) return "backpack";
  if (s.includes("túrabot")) return "trekking%20poles";
  if (s.includes("bakancs") || s.includes("cipő")) return "hiking%20boots";
  if (s.includes("fejlámpa")) return "headlamp";
  if (s.includes("főző") || s.includes("jetboil") || s.includes("msr")) return "camp%20stove";
  if (s.includes("edény")) return "camp%20cookware";
  if (s.includes("vízszűrő")) return "water%20filter";
  if (s.includes("garmin") || s.includes("gps")) return "gps";
  if (s.includes("kabát") || s.includes("hardshell")) return "hardshell%20jacket";
  if (s.includes("hótalp")) return "snowshoes";
  if (s.includes("hágóvas")) return "microspikes";
  return "hiking%20gear";
};

const makeProducts = () => {
  // “létező cucc” jellegű nevek, de bérléshez.
  const rows = [
    // SÁTOR
    ["MSR Hubba Hubba NX 2", "Sátor", 5900, 4, "Könnyű 2 személyes sátor, stabil, 3 évszak."],
    ["Big Agnes Copper Spur HV UL2", "Sátor", 6400, 3, "Ultrakönnyű, tágas belső, gyors felállítás."],
    ["Naturehike Cloud Up 1", "Sátor", 3900, 6, "Budget ultralight 1 személy, túrára tökéletes."],
    ["Tarp / ponyva 3x3m", "Sátor", 2400, 8, "Esővédő, árnyékolás, tábor."],
    ["Footprint (sátor alj) univerzális", "Kiegészítő", 1200, 12, "Alj védelem, hosszabb élettartam."],

    // HÁLÓZSÁK / ALVÁS
    ["Rab Ascent 700 (-5°C)", "Alvás", 4200, 5, "Meleg pehely hálózsák hidegebb éjszakákra."],
    ["Sea to Summit Spark III (-2°C)", "Alvás", 4300, 4, "Könnyű pehely, kompakt, 3 évszak."],
    ["Marmot Trestles Elite 20", "Alvás", 3200, 7, "Szintetikus, megbízható, nedvesebb környezetben is."],
    ["Therm-a-Rest NeoAir Xlite", "Alvás", 3200, 6, "Könnyű, kényelmes, magas R-érték."],
    ["Z-Lite habmatrac", "Alvás", 1400, 14, "Bombabiztos, nem lyukad ki, könnyű."],
    ["Párna (kompakt)", "Alvás", 700, 18, "Apró, de sokat dob."],
    ["Bivakzsák vízlepergető", "Alvás", 2200, 6, "Vésztartalék / minimál tábor."],

    // HÁTIZSÁK
    ["Osprey Talon 33", "Hátizsák", 2900, 6, "Napi / hétvégi túra, kényelmes hátpanel."],
    ["Deuter Aircontact 55+10", "Hátizsák", 3600, 4, "Többnapos túrára, stabil csípőöv."],
    ["Gregory Baltoro 65", "Hátizsák", 3900, 3, "Nagy teherhez, prémium kényelem."],
    ["Esőhuzat hátizsákra", "Kiegészítő", 900, 18, "Ne ázzon szét a cucc."],
    ["Dry bag 20L", "Kiegészítő", 1100, 14, "Vízálló zsák ruhának/elektronikának."],

    // CIPŐ / BOT / TÉLI KIEG.
    ["Salomon X Ultra 4 Mid (bakancs)", "Cipő", 2900, 8, "Stabil, jó tapadás, terepre."],
    ["Merrell Moab 3 (cipő)", "Cipő", 2400, 10, "Kényelmes, túrázós alap."],
    ["Black Diamond Trail Pro (túrabot pár)", "Túrabot", 1600, 12, "Állítható, strapabíró."],
    ["Komperdell Carbon (túrabot pár)", "Túrabot", 1900, 6, "Könnyű, gyors zár."],
    ["Microspikes (hágóvas)", "Téli", 1900, 8, "Jeges útra, csúszás ellen."],
    ["Kamásli", "Téli", 900, 12, "Sár / hó ellen."],
    ["Hótalp pár", "Téli", 3200, 4, "Havas terepre, ha elsüllyedsz."],

    // FŐZÉS / VÍZ
    ["Jetboil Flash főző", "Főzés", 1900, 10, "Villám gyors vízforralás, hegyre ideális."],
    ["MSR PocketRocket 2", "Főzés", 1200, 14, "Mini gázfőző, ultrakönnyű."],
    ["Edény szett (2 fő)", "Főzés", 1100, 10, "Kemping főzés, normális méret."],
    ["Spork + bögre", "Főzés", 400, 30, "Alap, nem kell gondolkodni."],
    ["Vízszűrő (Sawyer jelleg)", "Víz", 1900, 8, "Patakból iható víz, könnyű."],
    ["Kulacs 1L", "Víz", 500, 24, "Egyszerű."],
    ["Termosz 0.7L", "Víz", 900, 12, "Téli túrán életmentő."],

    // ELEKTRONIKA / NAV
    ["Petzl Actik fejlámpa", "Elektronika", 700, 20, "Túrára, táborba, okés fény."],
    ["Black Diamond Spot fejlámpa", "Elektronika", 800, 16, "Erősebb, strapás."],
    ["Powerbank 20 000mAh", "Elektronika", 1200, 10, "Telefon + fejlámpa + GPS."],
    ["Garmin eTrex (GPS)", "Navigáció", 1600, 6, "Egyszerű, megbízható."],
    ["Garmin Instinct (óra)", "Navigáció", 1700, 5, "Túraóra, strapabíró."],
    ["Kompasz + térképtok", "Navigáció", 600, 14, "Ha nincs térerő, akkor is van agy."],

    // RUHÁZAT
    ["Hardshell kabát (Gore-Tex jelleg)", "Ruházat", 3200, 6, "Eső/szél, komolyabb túrára."],
    ["Softshell kabát", "Ruházat", 2400, 10, "Mindennapos túra kabát."],
    ["Esőnadrág", "Ruházat", 1800, 8, "Nedves időben kötelező."],
    ["Thermo aláöltözet szett", "Ruházat", 1600, 16, "Télre, rétegezéshez."],
    ["Polár pulóver", "Ruházat", 1400, 14, "Meleg középréteg."],
    ["Túrakesztyű", "Ruházat", 700, 20, "Hidegben kell."],
    ["Sapka / beanie", "Ruházat", 500, 24, "Apró, de számít."],
    ["Buff / csősál", "Ruházat", 500, 24, "Szél ellen."],

    // BIZTONSÁG / EGYÉB
    ["Elsősegély csomag", "Biztonság", 700, 20, "Alap csomag."],
    ["Túlélő fólia", "Biztonság", 300, 40, "Vésztartalék."],
    ["Sípszó", "Biztonság", 200, 50, "Jelzéshez."],
    ["Multitool / bicska", "Kiegészítő", 700, 14, "Táborban hasznos."],
    ["Kötél 10m", "Kiegészítő", 600, 16, "Tarp, tábor, rögzítés."],
  ];

  // töltsük fel 60 körülire extra variánsokkal (ugyanúgy “létező” jelleggel)
  const extras = [];
  const extraNames = [
    ["MSR Titan Kettle", "Főzés", 800, 12, "Könnyű forraló/edény."],
    ["Sea to Summit Dry Bag 35L", "Kiegészítő", 1300, 10, "Nagyobb vízálló zsák."],
    ["Petzl Tikka fejlámpa", "Elektronika", 650, 18, "Alap fejlámpa."],
    ["Garmin InReach (kommunikáció)", "Navigáció", 2900, 2, "SOS / üzenet műholdon (demo item)."],
    ["Therm-a-Rest ProLite", "Alvás", 2200, 10, "Kényelmes, tartós matrac."],
    ["Deuter Futura 32", "Hátizsák", 2800, 7, "Szellőző hátpanel."],
    ["Black Diamond Distance Z (bot)", "Túrabot", 1700, 8, "Összecsukható, gyors."],
    ["Trangia szett", "Főzés", 1500, 6, "Klasszikus túrafőző."],
    ["Vízálló poncsó", "Ruházat", 1200, 12, "Gyors esővédelem."],
    ["Kemping szék (ultrakönnyű)", "Tábor", 1400, 6, "Kényelem a tábornál."],
    ["Kemping asztal mini", "Tábor", 1600, 4, "Kicsi, stabil."],
    ["Fej- és kézmosó szett", "Tábor", 400, 20, "Higiénia."],
  ];
  extras.push(...extraNames);

  const all = [...rows, ...extras];

  return all.map((r, i) => {
    const [name, category, pricePerDay, stock, desc] = r;
    const q = imgQueryFor(name, category);
    return {
      id: `p_${i + 1}`,
      name,
      category,
      pricePerDay,
      stock,
      desc,
      img: `https://source.unsplash.com/featured/900x650?${q}&sig=${i + 1}`,
    };
  });
};

export default function Berles() {
  const products = useMemo(() => makeProducts(), []);
  const categories = useMemo(() => ["Összes", ...Array.from(new Set(products.map((p) => p.category))).sort()], [products]);

  // filters
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("Összes");
  const [sort, setSort] = useState("recommended"); // recommended | price_asc | price_desc | name

  // rental dates
  const todayISO = useMemo(() => toISO(new Date()), []);
  const [fromDate, setFromDate] = useState(todayISO);
  const [toDate, setToDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() + 1);
    return toISO(d);
  });

  const maxDays = 21; // itt állítod: mennyi napra lehet max bérelni
  const rawDays = useMemo(() => diffDays(fromDate, toDate), [fromDate, toDate]);
  const days = useMemo(() => (rawDays > 0 ? rawDays : 0), [rawDays]);

  const dateError = useMemo(() => {
    if (!fromDate || !toDate) return "Válassz dátumot (mettől / meddig).";
    if (rawDays <= 0) return "A 'meddig' dátum legyen későbbi, mint a 'mettől'.";
    if (rawDays > maxDays) return `Max. ${maxDays} napra bérelhető.`;
    return "";
  }, [fromDate, toDate, rawDays, maxDays]);

  // cart: id -> qty
  const [cart, setCart] = useState({});

  const filtered = useMemo(() => {
    const query = q.trim().toLowerCase();
    let list = products.filter((p) => {
      const okCat = cat === "Összes" ? true : p.category === cat;
      const okQ = !query || p.name.toLowerCase().includes(query) || (p.desc || "").toLowerCase().includes(query);
      return okCat && okQ;
    });

    if (sort === "price_asc") list = [...list].sort((a, b) => a.pricePerDay - b.pricePerDay);
    if (sort === "price_desc") list = [...list].sort((a, b) => b.pricePerDay - a.pricePerDay);
    if (sort === "name") list = [...list].sort((a, b) => a.name.localeCompare(b.name, "hu"));
    // recommended: hagyjuk a “curated” sorrendet
    return list;
  }, [products, q, cat, sort]);

  const cartLines = useMemo(() => {
    return Object.entries(cart)
      .map(([id, qty]) => {
        const p = products.find((x) => x.id === id);
        if (!p) return null;
        return { ...p, qty, linePerDay: p.pricePerDay * qty };
      })
      .filter(Boolean);
  }, [cart, products]);

  const cartCount = useMemo(() => cartLines.reduce((s, x) => s + x.qty, 0), [cartLines]);
  const perDayTotal = useMemo(() => cartLines.reduce((s, x) => s + x.linePerDay, 0), [cartLines]);
  const rentTotal = useMemo(() => (days > 0 ? perDayTotal * days : 0), [perDayTotal, days]);

  // “fizetés” – valós fizetéshez backend kell. Itt a helye.
  const [customer, setCustomer] = useState({ name: "", email: "", phone: "" });
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [payLoading, setPayLoading] = useState(false);

  const canCheckout = cartCount > 0 && !dateError;
  const checkoutError =
    cartCount === 0
      ? "Tegyél valamit a kosárba."
      : dateError
      ? dateError
      : !customer.name.trim()
      ? "Add meg a neved."
      : !customer.email.trim() || !customer.email.includes("@")
      ? "Adj meg érvényes email címet."
      : !customer.phone.trim()
      ? "Adj meg telefonszámot."
      : "";

  const add = (p) => {
    setCart((prev) => {
      const current = prev[p.id] || 0;
      const next = Math.min(p.stock, current + 1);
      return { ...prev, [p.id]: next };
    });
  };

  const remove = (p) => {
    setCart((prev) => {
      const current = prev[p.id] || 0;
      const next = Math.max(0, current - 1);
      const copy = { ...prev };
      if (next === 0) delete copy[p.id];
      else copy[p.id] = next;
      return copy;
    });
  };

  const clear = () => setCart({});

  const startPayment = async () => {
    // ✅ Itt van a fizetés “helye”.
    // Valós fizetéshez (Stripe / Barion) kell backend endpoint.
    // Most DEMO: csak kiírjuk az ordert.
    if (checkoutError) {
      alert(checkoutError);
      return;
    }

    const order = {
      customer: { ...customer },
      rental: { fromDate, toDate, days, maxDays },
      items: cartLines.map((x) => ({
        id: x.id,
        name: x.name,
        qty: x.qty,
        pricePerDay: x.pricePerDay,
      })),
      totals: {
        perDayTotal,
        days,
        rentTotal,
      },
    };

    console.log("ORDER (DEMO)", order);
    alert("DEMO fizetés: a rendelés összeállt.\nNézd a konzolt: ORDER (DEMO).");

    // Ha később Stripe Checkoutot akarsz:
    // setPayLoading(true);
    // try {
    //   const res = await fetch("/api/create-checkout-session", {
    //     method: "POST",
    //     headers: { "Content-Type": "application/json" },
    //     body: JSON.stringify(order),
    //   });
    //   const data = await res.json();
    //   window.location.href = data.url; // Stripe checkout URL
    // } catch (e) {
    //   alert("Fizetés hiba (backend hiányzik / rossz endpoint).");
    // } finally {
    //   setPayLoading(false);
    // }
  };

  return (
    <div className="berles-page">
      <header className="berles-hero">
        <div className="container">
          <div className="berles-hero-inner">
            <div className="berles-hero-text">
              <h1>Bérlés</h1>
              <p>
                Prémium túrafelszerelés bérlés. Keresés, kategóriák, dátum, kosár — és checkout.
                <span className="muted"> Max {maxDays} napra bérelhető.</span>
              </p>

              <div className="berles-toolbar glass">
                <div className="tool">
                  <label>Keresés</label>
                  <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="pl. sátor, hálózsák, Garmin…" />
                </div>

                <div className="tool">
                  <label>Kategória</label>
                  <select value={cat} onChange={(e) => setCat(e.target.value)}>
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="tool">
                  <label>Rendezés</label>
                  <select value={sort} onChange={(e) => setSort(e.target.value)}>
                    <option value="recommended">Ajánlott</option>
                    <option value="price_asc">Ár (növekvő)</option>
                    <option value="price_desc">Ár (csökkenő)</option>
                    <option value="name">Név (A–Z)</option>
                  </select>
                </div>

                <div className="tool tool-right">
                  <div className="cart-pill">
                    <span className="cart-pill-title">Kosár</span>
                    <span className="cart-pill-meta">{cartCount} db</span>
                    <span className="cart-pill-meta">{formatHuf(perDayTotal)}/nap</span>
                  </div>

                  <button
                    className="btn"
                    type="button"
                    onClick={() => setCheckoutOpen(true)}
                    disabled={!canCheckout}
                    title={!canCheckout ? "Dátum + kosár kell" : "Checkout"}
                  >
                    Fizetés
                  </button>
                </div>
              </div>

              <div className="rentbar glass">
                <div className="renttool">
                  <label>Mettől</label>
                  <input
                    type="date"
                    value={fromDate}
                    min={todayISO}
                    onChange={(e) => {
                      const v = e.target.value;
                      setFromDate(v);
                      if (toDate && v && toDate <= v) {
                        const d = parseISO(v);
                        if (d) {
                          d.setDate(d.getDate() + 1);
                          setToDate(toISO(d));
                        }
                      }
                    }}
                  />
                </div>

                <div className="renttool">
                  <label>Meddig</label>
                  <input
                    type="date"
                    value={toDate}
                    min={fromDate}
                    onChange={(e) => setToDate(e.target.value)}
                  />
                </div>

                <div className="renttool">
                  <label>Napok</label>
                  <div className="rentpill">
                    <b>{days || 0}</b> nap
                  </div>
                </div>

                <div className="renttool renttool-wide">
                  <label>Számítás</label>
                  <div className="calc">
                    <div className="calc-row">
                      <span>Összes / nap</span>
                      <b>{formatHuf(perDayTotal)}</b>
                    </div>
                    <div className="calc-row">
                      <span>Napok</span>
                      <b>{days || 0}</b>
                    </div>
                    <div className="calc-row calc-grand">
                      <span>Összesen</span>
                      <b>{formatHuf(rentTotal)}</b>
                    </div>
                    {dateError && <div className="calc-error">⚠ {dateError}</div>}
                  </div>
                </div>
              </div>

              {cartCount > 0 && (
                <div className="actions-row">
                  <button className="btn btn-ghost" type="button" onClick={clear}>
                    Kosár ürítése
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      <div className="section-divider" />

      <main className="container">
        <div className="berles-head">
          <div className="berles-stats glass">
            <div className="stat">
              <div className="stat-num">{products.length}</div>
              <div className="stat-label">termék</div>
            </div>
            <div className="stat">
              <div className="stat-num">{filtered.length}</div>
              <div className="stat-label">találat</div>
            </div>
            <div className="stat">
              <div className="stat-num">{categories.length - 1}</div>
              <div className="stat-label">kategória</div>
            </div>
          </div>
        </div>

        <section className="berles-grid">
          {filtered.map((p) => {
            const qty = cart[p.id] || 0;
            const out = p.stock === 0;

            return (
              <article className={`berles-card glass ${out ? "is-out" : ""}`} key={p.id}>
                <div className="berles-img">
                  <img src={p.img} alt={p.name} loading="lazy" />
                  <span className="berles-badge">{p.category}</span>
                </div>

                <div className="berles-body">
                  <h3 title={p.name}>{p.name}</h3>
                  <p className="desc">{p.desc}</p>

                  <div className="berles-meta">
                    <span className="price">{formatHuf(p.pricePerDay)}/nap</span>
                    <span className="stock">
                      Készlet: <b>{p.stock}</b>
                    </span>
                  </div>

                  <div className="berles-actions">
                    <button className="btn btn-ghost" type="button" onClick={() => remove(p)} disabled={qty === 0}>
                      −
                    </button>

                    <div className="qty">
                      <span>{qty}</span>
                    </div>

                    <button
                      className="btn"
                      type="button"
                      onClick={() => add(p)}
                      disabled={out || qty >= p.stock}
                      title={out ? "Nincs készleten" : qty >= p.stock ? "Elérted a készletet" : "Kosárba"}
                    >
                      Kosárba
                    </button>
                  </div>

                  <div className="berles-note">
                    {qty > 0 ? <span>✓ Kosárban: {qty} db</span> : <span className="muted">Add hozzá a kosárhoz</span>}
                  </div>
                </div>
              </article>
            );
          })}
        </section>

        <div className="berles-bottom glass">
          <div>
            <h4>Fontos</h4>
            <p>
              Bérlés max <b>{maxDays} napra</b>. A fizetés gomb most <b>DEMO</b> (backend nélkül nem lehet Stripe/Barion).
              Ha megvan a backend, 1 endpointtal bekötjük és kész.
            </p>
          </div>
        </div>
      </main>

      <footer className="berles-footer">
        <div className="container">
          <span>© 2026 EXPLORE · Bérlés</span>
        </div>
      </footer>

      {/* CHECKOUT MODAL */}
      {checkoutOpen && (
        <div
          className="checkout-overlay"
          role="dialog"
          aria-modal="true"
          onMouseDown={(e) => {
            if (e.target.classList.contains("checkout-overlay")) setCheckoutOpen(false);
          }}
        >
          <div className="checkout-modal glass">
            <div className="checkout-head">
              <div>
                <h3>Fizetés</h3>
                <p className="muted">
                  {fromDate} → {toDate} · {days || 0} nap · {formatHuf(perDayTotal)}/nap
                </p>
              </div>
              <button className="xbtn" type="button" onClick={() => setCheckoutOpen(false)} aria-label="Bezárás">
                ✕
              </button>
            </div>

            <div className="checkout-body">
              <div className="checkout-left">
                <div className="checkout-card">
                  <h4>Adatok</h4>

                  <div className="formgrid">
                    <div className="fitem">
                      <label>Név</label>
                      <input
                        value={customer.name}
                        onChange={(e) => setCustomer((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Teljes név"
                      />
                    </div>
                    <div className="fitem">
                      <label>Email</label>
                      <input
                        value={customer.email}
                        onChange={(e) => setCustomer((p) => ({ ...p, email: e.target.value }))}
                        placeholder="email@pelda.hu"
                      />
                    </div>
                    <div className="fitem">
                      <label>Telefon</label>
                      <input
                        value={customer.phone}
                        onChange={(e) => setCustomer((p) => ({ ...p, phone: e.target.value }))}
                        placeholder="+36 …"
                      />
                    </div>
                  </div>

                  <div className="tiny muted">
                    Valós fizetéshez Stripe/Barion backend kell. Most DEMO: rendelés összeáll és kész.
                  </div>
                </div>
              </div>

              <div className="checkout-right">
                <div className="checkout-card">
                  <h4>Összegzés</h4>

                  <div className="mini-lines">
                    {cartLines.map((x) => (
                      <div className="mini-line" key={x.id}>
                        <div className="mini-left">
                          <div className="mini-name">{x.name}</div>
                          <div className="mini-sub muted">
                            {x.qty} db · {formatHuf(x.pricePerDay)}/nap
                          </div>
                        </div>
                        <div className="mini-right">
                          <b>{formatHuf(x.linePerDay)}/nap</b>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="sumline">
                    <span>Összes / nap</span>
                    <b>{formatHuf(perDayTotal)}</b>
                  </div>
                  <div className="sumline">
                    <span>Napok</span>
                    <b>{days || 0} nap</b>
                  </div>
                  <div className="sumgrand">
                    <span>Végösszeg</span>
                    <b>{formatHuf(rentTotal)}</b>
                  </div>

                  {checkoutError && <div className="checkout-error">⚠ {checkoutError}</div>}

                  <button
                    className="btn btn-wide"
                    type="button"
                    onClick={startPayment}
                    disabled={!!checkoutError || payLoading}
                  >
                    {payLoading ? "Fizetés..." : "Fizetés (DEMO)"}
                  </button>

                  <button className="btn btn-ghost btn-wide" type="button" onClick={() => setCheckoutOpen(false)}>
                    Mégse
                  </button>
                </div>
              </div>
            </div>

            <div className="checkout-foot muted">
              ESC nincs bekötve, de katt a sötét háttérre és bezár.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
