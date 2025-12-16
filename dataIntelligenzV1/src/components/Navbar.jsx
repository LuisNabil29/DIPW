import { useState, useEffect, useRef  } from "react";
import { Link } from "react-router-dom";
import { HashLink } from 'react-router-hash-link';


function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [openMenu, setOpenMenu] = useState(false);
    const closeMenu = () => setOpenMenu(false);
    const menuRef = useRef(null);


    useEffect(() => {
        const handleScroll = () => {
        setScrolled(window.scrollY > 10); // cambia después de 50px
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



    return(
        <nav
            className={`fixed top-0 left-0 w-full px-6 py-3 pb-4 max-md:px-4 z-50 text-gray-800 transition-all duration-300 ${
                scrolled ? 'backdrop-blur-md bg-white/30 shadow-md' : ''
            }`}
        >
            <div className="max-w-7xl mx-auto flex items-center justify-between mt-1">

                {/* Logo a la izquierda */}
                <a href="/" className="flex items-center gap-1 cursor-pointer">
                <img src="/assets/dataintelligenz.png" alt="Logo" className="h-12" loading="lazy" />
                </a>


                <button 
                    className="md:hidden text-black text-3xl"
                    onClick={() => setOpenMenu(!openMenu)}
                    >
                    ☰
                </button>

                {/* Vinculos del centro */}
                <div className="flex-grow flex justify-end mr-2 gap-4 
                max-md:hidden">
                <Link
                    to="/"
                    onClick={() => {
                        closeMenu();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="text-black relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-900 after:transition-all after:duration-300 hover:after:w-full"
                    >
                    Inicio
                </Link>

                <HashLink 
                    smooth 
                    to="/#quienes-somos" 
                    className="text-black relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                    Quienes Somos
                </HashLink>

                <HashLink 
                    smooth 
                    to="/#servicios" 
                    className="text-black relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                    Servicios
                </HashLink>

                <HashLink 
                    smooth 
                    to="/#desarrollos" 
                    className="text-black relative after:content-[''] after:block after:w-0 after:h-[2px] after:bg-red-900 after:transition-all after:duration-300 hover:after:w-full"
                >
                    Apps y Desarrollos
                </HashLink>
                </div>

                {/* Contacto / login */}
                <div className="flex items-center gap-4 ml-auto max-md:hidden lg:flex">
                    <a
                        href="/contacto"
                        className="px-6 py-2 border border-black text-black rounded-full hover:bg-red-900 hover:text-white hover:border-red-900 transition duration-300"
                    >
                        Contacto
                    </a>
                </div>


            </div>


            {/* Menu Desplegable pantallas mas pequeñas */}
            {openMenu && (
            <div ref={menuRef} className="md:hidden flex flex-col bg-white p-4 gap-4 text-black">
                <Link
                    to="/"
                    onClick={() => {
                        closeMenu();
                        window.scrollTo({ top: 0, behavior: "smooth" });
                    }}
                    className="py-2"
                    >
                    Inicio
                </Link>
                <HashLink smooth to="/#quienes-somos" className="py-2" onClick={closeMenu}>Quienes Somos</HashLink>
                <HashLink smooth to="/#servicios" className="py-2" onClick={closeMenu}>Servicios</HashLink>
                <HashLink smooth to="/#desarrollos" className="py-2" onClick={closeMenu}>Apps y Desarrollos</HashLink>
                <a href="/contacto" className="py-2" onClick={closeMenu}>Contacto</a>
            </div>
            )}

        </nav>
    );
}

export default Navbar;