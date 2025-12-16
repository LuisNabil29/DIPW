import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFacebook, faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { HashLink } from "react-router-hash-link";
import { Link } from "react-router-dom";
import useContactoData from "./hooks/ContactoData";

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
    <footer className="bg-gray-800 text-white w-full mt-auto pt-8">

      {/* Parte superior */}
      <div className="text-center px-8 py-12 md:px-0 md:py-6">
        <p className="text-xl text-gray-200 italic animate-bounce">
          Nos enorgullece ser parte del crecimiento de tu empresa.
        </p>
      </div>

      {/* Parte inferior - 3 columnas */}
      <div className="px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">

        {/* Izquierda - Redes sociales */}
        <div className="flex flex-col items-center md:items-start space-y-4">
          <h3 className="text-lg font-bold">Síguenos:</h3>

          <div className="flex space-x-4">
            <a href={contacto.redes.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-pink-400 transition">
              <FontAwesomeIcon icon={faInstagram} size="2x" />
            </a>
            <a href={contacto.redes.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook" className="hover:text-blue-500 transition">
              <FontAwesomeIcon icon={faFacebook} size="2x" />
            </a>
            <a href={contacto.redes.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="hover:text-blue-300 transition">
              <FontAwesomeIcon icon={faLinkedin} size="2x" />
            </a>
          </div>
        </div>

        {/* Centro - Navegación */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold mb-4">Navegación:</h3>

          <ul className="space-y-1">
            <li>
              <Link
                to="/"
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                className="hover:text-red-400 transition"
              >
                Inicio
              </Link>
            </li>
            <li>
              <HashLink smooth to="/#quienes-somos" className="hover:text-red-400 transition">
                Quienes Somos
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#servicios" className="hover:text-red-400 transition">
                Servicios
              </HashLink>
            </li>
            <li>
              <HashLink smooth to="/#desarrollos" className="hover:text-red-400 transition">
                Apps y Desarrollos
              </HashLink>
            </li>
          </ul>
        </div>

        {/* Derecha - Contacto */}
        <div className="flex flex-col">
          <h3 className="text-lg font-bold mb-4">Contacto (Querétaro)</h3>

          <p className="text-gray-300">Tel: {contacto.telefono.display}</p>
          <p className="text-gray-300 mb-4">Correo: {contacto.correo}</p>
         
          {/* Botón de contacto */}
          <a
            href="/contacto"
            className="hover:text-red-400 transition"
          >
            Ir a Contacto
          </a>
        </div>

      </div>

      {/* Copyright abajo centrado */}
      <div className="text-center py-4 border-t border-gray-700">
        <p className="text-sm text-gray-400">
          © {new Date().getFullYear()} DataIntelligenz
        </p>
      </div>

    </footer>
  );
}

export default Footer;
