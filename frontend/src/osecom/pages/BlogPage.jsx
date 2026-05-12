import { useState } from "react";
import IconArrow from "../components/IconArrow";
import Placeholder from "../components/Placeholder";

const POSTS = [
  {
    cat: "STRATÉGIE",
    title: "Pourquoi votre contenu performe sans convertir.",
    excerpt:
      "Les vues ne suffisent pas. Le vrai sujet, c'est la mécanique entre attention et action.",
    date: "12 MAI 2026",
    read: "6 min",
    tone: "rose",
    featured: true,
  },
  {
    cat: "UGC",
    title: "Anatomie d'un hook qui retient.",
    excerpt:
      "Décortiquer les 3 premières secondes d'un Reel qui fonctionne, sans tomber dans la formule.",
    date: "28 AVR 2026",
    read: "4 min",
    tone: "cream",
  },
  {
    cat: "GROWTH",
    title: "Construire une présence cohérente en 90 jours.",
    excerpt:
      "Le plan que j'applique avec mes marques pour passer d'éparpillé à structuré.",
    date: "14 AVR 2026",
    read: "8 min",
    tone: "olive",
  },
  {
    cat: "BRAND",
    title: "Le piège du contenu trop léché.",
    excerpt: "Pourquoi un visuel parfait peut tuer la désirabilité d'une marque.",
    date: "02 AVR 2026",
    read: "5 min",
    tone: "sky",
  },
  {
    cat: "STRATÉGIE",
    title: "Audit social : les 7 angles morts.",
    excerpt: "Ce que je regarde en premier quand une marque me confie ses réseaux.",
    date: "20 MAR 2026",
    read: "7 min",
    tone: "rose",
  },
  {
    cat: "CONTENU",
    title: "TikTok n'est plus une option.",
    excerpt: "Trois raisons pour lesquelles vos prospects vous y cherchent déjà.",
    date: "08 MAR 2026",
    read: "3 min",
    tone: "cream",
  },
];

const FILTERS = ["Tout", "Stratégie", "UGC", "Growth", "Brand"];

export default function BlogPage() {
  const featured = POSTS.find((p) => p.featured);
  const rest = POSTS.filter((p) => !p.featured);

  return (
    <main className="page page--blog">
      <BlogHero />
      <section className="blog-list">
        {featured && <FeaturedCard post={featured} />}
        <div className="blog-grid">
          {rest.map((post, i) => (
            <BlogCard key={post.title} post={post} index={i} />
          ))}
        </div>
      </section>
      <NewsletterSubscribe />
    </main>
  );
}

function BlogHero() {
  return (
    <section className="blog-hero">
      <span className="mono">JOURNAL · BIENTÔT EN LIGNE</span>
      <h1>Le journal.</h1>
      <p>
        Mes notes sur la stratégie sociale, le contenu et la croissance des
        marques. Court, direct, terrain.{" "}
        <strong>
          Les premiers articles arrivent — abonnez-vous pour les recevoir.
        </strong>
      </p>
      <div className="blog-hero__filters">
        {FILTERS.map((label, i) => (
          <span key={label} className={"chip " + (i === 0 ? "is-on" : "")}>
            {label}
          </span>
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({ post }) {
  return (
    <article className="blog-featured" data-reveal>
      <div className="blog-featured__media">
        <Placeholder ratio="4/3" label={post.title.toLowerCase()} tone={post.tone} />
      </div>
      <div className="blog-featured__body">
        <span className="mono">À LA UNE · {post.cat}</span>
        <h2>{post.title}</h2>
        <p>{post.excerpt}</p>
        <div className="blog-card__meta">
          <span className="mono">{post.date}</span>
          <span className="mono">{post.read} de lecture</span>
        </div>
        <span className="mono blog-featured__pending">Article à venir</span>
      </div>
    </article>
  );
}

function BlogCard({ post, index }) {
  return (
    <article
      className="blog-card blog-card--static"
      data-reveal
      style={{ "--delay": index * 0.06 + "s" }}
    >
      <div className="blog-card__media">
        <Placeholder ratio="4/3" label={post.title.toLowerCase()} tone={post.tone} />
      </div>
      <span className="mono blog-card__cat">{post.cat}</span>
      <h3>{post.title}</h3>
      <p>{post.excerpt}</p>
      <div className="blog-card__meta">
        <span className="mono">{post.date}</span>
        <span className="mono">{post.read}</span>
      </div>
    </article>
  );
}

function NewsletterSubscribe() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubscribe(e) {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
  }

  return (
    <section className="blog-subscribe" data-reveal>
      <div className="blog-subscribe__card">
        <span className="mono">NEWSLETTER · 1 EMAIL / SEMAINE</span>
        <h2>Recevez les notes directement.</h2>
        <p>
          Une lecture courte, chaque jeudi. Pas de bruit, juste ce qui change la
          donne.
        </p>
        {subscribed ? (
          <p className="mono blog-subscribe__ack">
            ✓ INSCRIPTION ENREGISTRÉE — VOUS RECEVREZ LE PREMIER NUMÉRO.
          </p>
        ) : (
          <form className="blog-subscribe__form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="nom@bonjour.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button className="btn btn--brown" type="submit">
              S'inscrire
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
