import { useState, useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const sectionLinks = [
    { to: "/#quienes-somos", label: "Nosotros" },
    { to: "/#ia-automatizacion", label: "IA y Automatización" },
    { to: "/#servicios", label: "Servicios" },
    { to: "/#desarrollos", label: "Apps y Desarrollos" },
];

const linkStyle = "text-sm font-medium text-slate-700 hover:text-brand transition-colors";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const closeMenu = () => setOpenMenu(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    //useEffect para cerrar el menu desplegable con click fuera
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
            setOpenMenu(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const goHome = () => {
        closeMenu();
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return(
        <nav
            ref={menuRef}
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
                scrolled || openMenu
                    ? "bg-white/90 backdrop-blur-md border-b border-slate-200 shadow-sm"
                    : "bg-white"
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-3">
                <Link to="/" onClick={goHome} className="flex items-center">
                    <img src="/assets/dataintelligenz.png" alt="DataIntelligenz" className="h-11" />
                </Link>

                <div className="hidden lg:flex items-center gap-7">
                    {sectionLinks.map((link) => (
                        <HashLink key={link.to} smooth to={link.to} className={linkStyle}>
                            {link.label}
                        </HashLink>
                    ))}
                    <Link to="/blog" className={linkStyle}>Blog</Link>
                </div>

                <div className="hidden lg:block">
                    <Link to="/contacto" className="btn-primary !py-2.5">
                        Agenda un diagnóstico
                    </Link>
                </div>

                <button
                    className="lg:hidden text-slate-800 text-2xl"
                    onClick={() => setOpenMenu(!openMenu)}
                    aria-label="Abrir menú"
                    aria-expanded={openMenu}
                >
                    {openMenu ? "✕" : "☰"}
                </button>
            </div>

            {openMenu && (
            <div className="lg:hidden flex flex-col px-6 pb-6 gap-1 border-t border-slate-200 bg-white">
                <Link to="/" onClick={goHome} className="py-3 text-slate-800">Inicio</Link>
                {sectionLinks.map((link) => (
                    <HashLink key={link.to} smooth to={link.to} className="py-3 text-slate-800" onClick={closeMenu}>
                        {link.label}
                    </HashLink>
                ))}
                <Link to="/blog" className="py-3 text-slate-800" onClick={closeMenu}>Blog</Link>
                <Link to="/contacto" className="btn-primary mt-3" onClick={closeMenu}>
                    Agenda un diagnóstico
                </Link>
            </div>
            )}
        </nav>
    );
}

export default Navbar;
