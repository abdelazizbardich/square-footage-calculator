import { CheckCircle } from "@phosphor-icons/react/dist/ssr";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  badges?: string[];
};

const DEFAULT_BADGES = ["Free, no sign-up", "Feet, inches & meters", "Instant results"];

export function PageHero({ eyebrow, title, lead, badges = DEFAULT_BADGES }: Props) {
  return (
    <section className="hero">
      <div className="container">
        <p className="hero-eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        <p className="hero-lead">{lead}</p>
        <ul className="hero-badges">
          {badges.map((b) => (
            <li key={b}>
              <CheckCircle size={18} weight="fill" aria-hidden />
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
