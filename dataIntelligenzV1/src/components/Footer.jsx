import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faLinkedin, faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import useContactoData from "./Hooks/ContactoData";

const navLinks = [
  { to: "/#quienes-somos", label: "Nosotros" },
  { to: "/#ia-automatizacion", label: "IA y Automatización" },
  { to: "/#servicios", label: "Servicios" },
  { to: "/#desarrollos", label: "Apps y Desarrollos" },
];

const socialStyle = "flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-slate-300 transition hover:border-white hover:text-white";

function Footer() {

  //Carga datos de Tel y correo
  const contacto = useContactoData();
  if (!contacto) {
    return (
      <div className="text-center py-20">
        Cargando contacto...
      </div>
    );
  }

  return (
    <footer className="bg-slate-950 text-slate-300 w-full mt-auto">
      <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 md:grid-cols-12 gap-12">
        <div className="md:col-span-5">
          <img src="/assets/DataIntelligenzWhite.png" alt="DataIntelligenz" className="h-12" loading="lazy" />
          <p className="mt-5 max-w-sm text-sm leading-relaxed">
            Inteligencia artificial, automatización de procesos e integración ERP.
            Nos enorgullece ser parte del crecimiento de tu empresa.
          </p>
          <div className="mt-6 flex gap-3">
            <a href={contacto.redes.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className={socialStyle}>
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href={contacto.redes.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className={socialStyle}>
              <FontAwesomeIcon icon={faFacebook} />
            </a>
            <a href={contacto.redes.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className={socialStyle}>
              <FontAwesomeIcon icon={faLinkedin} />
            </a>
            {contacto.redes.youtube ? (
              <a href={contacto.redes.youtube} target="_blank" rel="noopener noreferrer" aria-label="YouTube" className={socialStyle}>
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            ) : null}
          </div>
        </div>

        <div className="md:col-span-3">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Navegación</h3>
          <ul className="mt-5 space-y-3 text-sm">
            <li>
              <Link to="/" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="hover:text-white transition">
                Inicio
              </Link>
            </li>
            {navLinks.map((link) => (
              <li key={link.to}>
                <HashLink smooth to={link.to} className="hover:text-white transition">{link.label}</HashLink>
              </li>
            ))}
            <li>
              <Link to="/blog" className="hover:text-white transition">Blog</Link>
            </li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <h3 className="font-display text-sm font-semibold uppercase tracking-wider text-white">Contacto (Querétaro)</h3>
          <p className="mt-5 text-sm">Tel: {contacto.telefono.display}</p>
          <p className="mt-2 text-sm">Correo: {contacto.correo}</p>
          <Link to="/contacto" className="btn-primary mt-6">Ir a Contacto</Link>
        </div>
      </div>

      <div className="border-t border-white/10">
        <p className="max-w-7xl mx-auto px-6 py-5 text-xs text-slate-500">
          © {new Date().getFullYear()} DataIntelligenz
        </p>
      </div>
    </footer>
  );
}

export default Footer;
