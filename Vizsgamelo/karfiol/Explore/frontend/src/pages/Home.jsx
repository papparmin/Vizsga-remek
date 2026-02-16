import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  // Reveal (stabil)
  useEffect(() => {
    const els = document.querySelectorAll(".reveal");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && e.target.classList.add("active")),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  const featuredTours = [
    {
      badge: "TÉL / PROFI",
      img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=1200",
      title: "Téli Mátra Gerinctúra",
      desc: "Havas gerincek Kékes és Galyatető között. Hidegmenedzsment és tájékozódás.",
      dur: "2 Nap / 1 Éj",
      price: "85 000 Ft",
    },
    {
      badge: "VÍZ / KEZDŐ",
      img: "https://images.unsplash.com/photo-1544550581-5f7ceaf7f992?w=1200",
      title: "Gemenci Vízivilág",
      desc: "Kenuzás Európa egyik legnagyobb ártéri erdejében. Tábor a víz közelében.",
      dur: "3 Nap / 2 Éj",
      price: "125 000 Ft",
    },
    {
      badge: "ERDŐ / HALADÓ",
      img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1200",
      title: "Bükki Őserdő",
      desc: "Rejtett ösvények a Bükk-fennsíkon, barlangszakaszok, tábor tűzzel.",
      dur: "2 Nap / 1 Éj",
      price: "79 000 Ft",
    },
    {
      badge: "ALPOK / PROFI",
      img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1200",
      title: "Alpesi Hajnal Expedíció",
      desc: "Korai indulás, szintemelkedés, napfelkelte a csúcson. Tempós, technikás.",
      dur: "1 Nap",
      price: "69 000 Ft",
    },
    {
      badge: "SZIKLA / HALADÓ",
      img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=1200",
      title: "Kőszálak & Gerincek",
      desc: "Gerinctúra kitettebb részekkel, stabil tempó, biztos lépéstechnika.",
      dur: "2 Nap / 1 Éj",
      price: "92 000 Ft",
    },
    {
      badge: "TÓ / KEZDŐ",
      img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1200",
      title: "Tavi Tábor & Túra",
      desc: "Kényelmes túra, tanulható táborozás, esti tűz és chill. Ideális első tábor.",
      dur: "2 Nap / 1 Éj",
      price: "59 000 Ft",
    },
  ];

  const whyCards = [
    {
      title: "Letisztultság",
      front: "Egy útvonal, egy terv, tiszta keretek.",
      back: "Minden túra egy logikára épül: útvonal, tempó, pihenők. Nincs felesleges körítés.",
      review: {
        name: "Bence",
        rating: 5,
        avatar: "https://i.pravatar.cc/80?img=11",
        text: "Végre egy csapat, ahol nincs káosz. Minden percre pontos.",
      },
    },
    {
      title: "Szakmai vezetés",
      front: "Döntések terepre, nem elméletre.",
      back: "Útvonalterv, időjárás, kockázatkezelés — minden a terepen működjön.",
      review: {
        name: "Ádám",
        rating: 5,
        avatar: "https://i.pravatar.cc/80?img=12",
        text: "Vihar előtt profi döntések. Végig biztonságban voltunk.",
      },
    },
    {
      title: "Kis csoport",
      front: "Figyelem, ritmus, csapatélmény.",
      back: "Kis létszám mellett jobb tempó és jobb élmény. Nem szakad szét a brigád.",
      review: {
        name: "Zsófi",
        rating: 4,
        avatar: "https://i.pravatar.cc/80?img=5",
        text: "Mindenkire jutott figyelem, nem futószalag túra.",
      },
    },
    {
      title: "Minőség & felszerelés",
      front: "Nem sufni megoldások.",
      back: "Ajánlott lista, indulás előtti check, és ha kell: bérelhető profi cuccok.",
      review: {
        name: "Nóri",
        rating: 5,
        avatar: "https://i.pravatar.cc/80?img=44",
        text: "A cucc tényleg prémium, és segítettek a rétegezésben.",
      },
    },
    {
      title: "Biztonság",
      front: "Nem hősködünk.",
      back: "Kockázatelemzés, visszafordulási pontok, tartalékterv — nem a szerencsére építünk.",
      review: {
        name: "Gábor",
        rating: 5,
        avatar: "https://i.pravatar.cc/80?img=22",
        text: "Végig érezni lehetett, hogy biztonság az első.",
      },
    },
    {
      title: "Valódi élmény",
      front: "Nem Insta-túra.",
      back: "Tempó, csend, jelenlét. Nem pózolni megyünk, hanem átélni.",
      review: {
        name: "Eszter",
        rating: 5,
        avatar: "https://i.pravatar.cc/80?img=31",
        text: "Nem fotózás, hanem igazi élmény volt. Pont ezt kerestem.",
      },
    },
  ];

  const renderStars = (rating) => {
    const full = "★★★★★".slice(0, rating);
    const empty = "★★★★★".slice(rating);
    return (
      <span className="stars" aria-label={`${rating} csillag`}>
        {full}
        <span className="stars-muted">{empty}</span>
      </span>
    );
  };

  // ✅ Komoly galéria: lapozható, thumbokkal
  const gallery = useMemo(
    () => [
      { title: "Gerinc", place: "Alpok", img: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=2000" },
      { title: "Napfelkelte", place: "Csúcs", img: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=2000" },
      { title: "Zöld út", place: "Erdő", img: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=2000" },
      { title: "Téli gerinc", place: "Mátra", img: "https://images.unsplash.com/photo-1454496522488-7a8e488e8606?w=2000" },
      { title: "Vízpart", place: "Tábor", img: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=2000" },
      { title: "Köd", place: "Reggel", img: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?w=2000" },
    ],
    []
  );

  const [gIndex, setGIndex] = useState(0);
  const prev = () => setGIndex((i) => (i - 1 + gallery.length) % gallery.length);
  const next = () => setGIndex((i) => (i + 1) % gallery.length);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="home-page">
      {/* HERO */}
      <section className="hero" id="top">
        <div className="container content reveal">
          <h1>EXPLORE.</h1>
          <p>
            Nem csak nézni kell a természetet. Benne kell lenni. Prémium expedíciók, kis csoportok,
            valódi kihívások.
          </p>

          <div className="hero-actions">
            <Link to="/turak" className="btn">Túrák megtekintése</Link>
            <Link to="/berles" className="btn btn-ghost">Felszerelés</Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* TOURS */}
      <section id="tours">
        <div className="container">
          <div className="section-head reveal">
            <h2>Ajánlott túráink</h2>
            <p>Válogatott útvonalak, átlátható infó. A teljes listához kattints a gombra.</p>
          </div>

          <div className="grid">
            {featuredTours.map((t, i) => (
              <article className="card tour reveal glass" key={i}>
                <span className="tour-badge">{t.badge}</span>
                <div className="tour-img">
                  <img src={t.img} alt={t.title} />
                </div>
                <div className="tour-body">
                  <h3>{t.title}</h3>
                  <p className="tour-desc">{t.desc}</p>
                  <div className="tour-meta">
                    <span>{t.dur}</span>
                    <span>{t.price}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          <div className="tours-cta reveal">
            <Link to="/turak" className="btn btn-wide">Összes túra listázása</Link>
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* WHY */}
      <section id="why">
        <div className="container">
          <div className="section-head reveal">
            <h2>Miért EXPLORE</h2>
            <p>Vidd rá az egeret a kártyára a részletekhez.</p>
          </div>

          <div className="grid">
            {whyCards.map((c, idx) => (
              <div className="flip reveal" key={idx}>
                <div className="flip-inner">
                  <div className="flip-face flip-front glass">
                    <h3>{c.title}</h3>
                    <p>{c.front}</p>
                    <span className="flip-hint">Vidd rá az egeret</span>
                  </div>

                  <div className="flip-face flip-back glass">
                    <h3>{c.title}</h3>
                    <p className="flip-back-text">{c.back}</p>

                    <div className="card-reviews">
                      <div className="card-reviews-title">Vélemény</div>
                      <div className="card-review">
                        <div className="card-review-head">
                          <div className="review-user">
                            <img className="review-avatar" src={c.review.avatar} alt={c.review.name} />
                            <span className="card-review-name">{c.review.name}</span>
                          </div>
                          {renderStars(c.review.rating)}
                        </div>
                        <div className="card-review-text">“{c.review.text}”</div>
                      </div>
                    </div>

                    <span className="flip-hint flip-hint-back">Vissza</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* ✅ GALLERY (komoly slider) */}
      <section className="gallery-pro" id="gallery">
        <div className="container">
          <div className="gallery-pro-head reveal">
            <div>
              <h2>Galéria</h2>
              <p>Lapozható, stabil, igényes. (← → billentyűvel is megy)</p>
            </div>

            <div className="gallery-actions">
              <button className="g-nav" type="button" onClick={prev} aria-label="Előző">
                ‹
              </button>
              <button className="g-nav" type="button" onClick={next} aria-label="Következő">
                ›
              </button>
            </div>
          </div>

          <div className="gallery-stage glass reveal">
            <img src={gallery[gIndex].img} alt={`${gallery[gIndex].title} - ${gallery[gIndex].place}`} />
            <div className="gallery-stage-meta">
              <strong>{gallery[gIndex].title}</strong>
              <small>{gallery[gIndex].place}</small>
            </div>
          </div>

          <div className="gallery-thumbs reveal" role="list">
            {gallery.map((g, i) => (
              <button
                key={`${g.title}-${i}`}
                type="button"
                className={`g-thumb ${i === gIndex ? "active" : ""}`}
                onClick={() => setGIndex(i)}
                aria-label={`${g.title} – ${g.place}`}
              >
                <img src={g.img} alt={g.title} loading="lazy" />
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="section-divider" />

      {/* FOOTER */}
      <footer className="footer-pro">
        <div className="container footer-top">
          <div className="footer-brand">
            <h3>EXPLORE.</h3>
            <p>Prémium túrák, kis csoportok. Valódi terep, valódi élmény.</p>
            <div className="footer-social">
              <a href="#" aria-label="Instagram">Instagram</a>
              <a href="#" aria-label="Facebook">Facebook</a>
              <a href="#" aria-label="YouTube">YouTube</a>
            </div>
          </div>

          <div className="footer-col">
            <h4>Navigáció</h4>
            <Link to="/turak">Túrák</Link>
            <Link to="/berles">Bérlés</Link>
            <a href="#gallery">Galéria</a>
          </div>

          <div className="footer-col">
            <h4>Kapcsolat</h4>
            <p>hello@explore.hu</p>
            <p>+36 30 123 4567</p>
            <p>Keszthely</p>
          </div>

          <div className="footer-col">
            <h4>Hírlevél</h4>
            <p>Havi 1 email. Nincs spam.</p>
            <form className="footer-newsletter" onSubmit={(e) => e.preventDefault()}>
              <input type="email" placeholder="Email címed" />
              <button className="btn" type="submit">Feliratkozás</button>
            </form>
          </div>
        </div>

        <div className="container footer-bottom">
          <span>© 2026 EXPLORE · Minden jog fenntartva</span>
          <div className="footer-legal">
            <a href="#">ÁSZF</a>
            <a href="#">Adatvédelem</a>
            <a href="#">Impresszum</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
