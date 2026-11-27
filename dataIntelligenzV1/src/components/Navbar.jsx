import { useState, useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';

const sectionLinks = [
    { to: "/#quienes-somos", label: "Quienes Somos" },
    { to: "/#ia-automatizacion", label: "IA y Automatización" },
    { to: "/#servicios", label: "Servicios" },
    { to: "/#desarrollos", label: "Apps y Desarrollos" },
];

const linkUnderline = "text-black relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-900 after:transition-all after:duration-300 hover:after:w-full";

function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const closeMenu = () => setOpenMenu(false);
    const menuRef = useRef(null);


    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10);
        };
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
            className={`fixed top-0 left-0 w-full px-6 py-3 pb-4 max-md:px-4 z-50 text-gray-800 transition-all duration-300 ${
                scrolled ? 'backdrop-blur-md bg-white/30 shadow-md' : ''
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between mt-1">

                {/* Logo a la izquierda */}
                <Link to="/" onClick={goHome} className="flex items-center gap-1 cursor-pointer">
                <img src="/assets/dataintelligenz.png" alt="DataIntelligenz" className="h-12" />
                </Link>


                <button 
                    className="md:hidden text-black text-3xl"
                    onClick={() => setOpenMenu(!openMenu)}
                    aria-label="Abrir menú"
                    >
                    ☰
                </button>

                {/* Vinculos del centro */}
                <div className="flex-grow flex justify-end mr-2 gap-4 max-md:hidden">
                <Link to="/" onClick={goHome} className={linkUnderline}>
                    Inicio
                </Link>

                {sectionLinks.map((link) => (
                    <HashLink key={link.to} smooth to={link.to} className={linkUnderline}>
                        {link.label}
                    </HashLink>
                ))}

                <Link to="/blog" className={linkUnderline}>
                    Blog
                </Link>
                </div>

                {/* Contacto */}
                <div className="flex items-center gap-4 ml-auto max-md:hidden lg:flex">
                    <Link
                        to="/contacto"
                        className="px-6 py-2 border border-black text-black rounded-full hover:bg-red-900 hover:text-white hover:border-red-900 transition duration-300"
                    >
                        Contacto
                    </Link>
                </div>


            </div>


            {/* Menu Desplegable pantallas mas pequeñas */}
            {openMenu && (
            <div ref={menuRef} className="md:hidden flex flex-col bg-white p-4 gap-4 text-black">
                <Link to="/" onClick={goHome} className="py-2">
                    Inicio
                </Link>
                {sectionLinks.map((link) => (
                    <HashLink key={link.to} smooth to={link.to} className="py-2" onClick={closeMenu}>
                        {link.label}
                    </HashLink>
                ))}
                <Link to="/blog" className="py-2" onClick={closeMenu}>Blog</Link>
                <Link to="/contacto" className="py-2" onClick={closeMenu}>Contacto</Link>
            </div>
            )}

        </nav>
    );
}

export default Navbar;
