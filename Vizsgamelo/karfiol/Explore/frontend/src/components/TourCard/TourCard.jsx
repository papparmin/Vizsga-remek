import React from "react";
import { Link } from "react-router-dom";
import "./TourCard.css";

export default function TourCard({
  badge = "",
  image = "",
  title = "",
  description = "",
  duration = "",
  price = "",
  linkTo = "/turak",
  linkText = "Részletek",
}) {
  return (
    <article className="tour-card reveal">
      {badge ? <span className="tour-card__badge">{badge}</span> : null}

      <div className="tour-card__img">
        <img src={image} alt={title} loading="lazy" />
      </div>

      <div className="tour-card__body">
        <h3 className="tour-card__title">{title}</h3>
        <p className="tour-card__desc">{description}</p>

        <div className="tour-card__meta">
          <span>{duration}</span>
          <span>{price}</span>
        </div>

        <div className="tour-card__actions">
          <Link to={linkTo} className="tour-card__btn">
            {linkText}
          </Link>
        </div>
      </div>
    </article>
  );
}
