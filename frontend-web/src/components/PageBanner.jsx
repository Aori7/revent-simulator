import "../css/page-banner.css";

export default function PageBanner({
  eyebrow,
  title,
  description,
}) {
  return (
    <header className="page-banner">
      <div className="page-banner-content">
        {eyebrow && (
          <p className="page-banner-eyebrow">{eyebrow}</p>
        )}

        <h1>{title}</h1>

        {description && (
          <p className="page-banner-description">
            {description}
          </p>
        )}
      </div>
    </header>
  );
}