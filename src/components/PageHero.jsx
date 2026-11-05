import { Link } from 'react-router-dom';

export default function PageHero({ title, crumb }) {
  return (
    <section className="page-hero">
      <div className="container">
        <h1>{title}</h1>
        <div className="breadcrumb">
          <Link to="/">Home</Link> <span>/</span> {crumb || title}
        </div>
      </div>
    </section>
  );
}
