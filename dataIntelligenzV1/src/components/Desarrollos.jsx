import { useState,useEffect  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faGlobe, faClone, faFile, faVideo } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { motion, AnimatePresence } from "motion/react";
import ModalDesarrollos from "./Modals/ModalDesarrollos";

function Desarrollos() {
  
    const iconMap = {
    faMobileAlt: faMobileAlt,
    faGlobe: faGlobe,
    faClone: faClone,
    faFile: faFile,
  };


  //useEffect para obtner los datos de el xml para las cards de desarrollos
  const [cardsData, setCardsData] = useState([]);

  useEffect(() => {
    fetch("/data/CardsDesarrollos.xml")
      .then((res) => res.text())
      .then((xmlStr) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlStr, "text/xml");
        const cardNodes = [...xml.getElementsByTagName("card")];
        const get = (node, tag) => node.getElementsByTagName(tag)[0]?.textContent || "";

        const parsedCards = cardNodes.map((node) => ({
          id: parseInt(get(node, "id")),
          title: get(node, "title"),
          category: get(node, "category"),
          icon: iconMap[get(node, "icon")] || faFile,
          imgUrl: get(node, "imgUrl"),
          description: get(node, "description"),
          pdfUrl: get(node, "pdfUrl"),
          videoUrl: get(node, "videoUrl"),
          siteUrl: get(node, "siteUrl"),
        }));

        parsedCards.sort((a, b) => a.id - b.id);

        setCardsData(parsedCards);
      })
      .catch((e) => console.error("Error cargando XML", e));
  }, []);


  //Apartado para filtrar por categorias
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedCard, setSelectedCard] = useState(null);
  const [contentType, setContentType] = useState(null); // 'pdf' o 'video'

  const filteredCards = selectedCategory === "All"
    ? cardsData
    : cardsData.filter((c) => c.category === selectedCategory);


  const categories = ["All", "Webs", "Apps Móviles", "Integraciones"];

  


  //Vista
  return (
    <div className="relative w-full py-14">
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-14"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#e5e7eb" // color del div de arriba
            d="M0,0 C480,120 960,0 1440,120 L1440,0 L0,0 Z"
          ></path>
        </svg>
      </div>

            
      <div className="px-6 md:px-20">
        <h2 className="text-3xl font-bold font-poppins text-black mb-6 text-center">
          Apps & Desarrollos
        </h2>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm font-semibold transition 
                ${selectedCategory === cat
                  ? "bg-prop-red text-white"
                  : "bg-white text-gray-700 hover:bg-gray-200"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence>
            {filteredCards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, scale: 0.9, y: 30 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 30 }}
                transition={{ duration: 0.35, easing: "ease-in-out" }}
                className="bg-gray-100 rounded-lg shadow-lg p-6 flex flex-col justify-between text-center 
                font-raleway hover:scale-105 hover:shadow-2xl transition-transform min-h-[120px] 
                border border-slate-300 hover:border-rose-700
                shadow-[0_0_12px_rgba(190,18,60,0.25)]
                hover:shadow-[0_0_20px_rgba(190,18,60,0.45)]"
              >
                <div>
                  
                  <h3 className="text-xl font-bold mb-2">{card.title}</h3>

                  {card.imgUrl && (
                    <img 
                      src={card.imgUrl}
                      alt={card.title}
                      className="w-full max-w-[220px] mx-auto h-auto rounded-lg mb-3 object-contain"
                      loading="lazy"
                    />
                  )}

                  {card.description && (
                    <p className="text-slate-800 text-base font-medium leading-snug mb-3">{card.description}</p>
                  )}

                  <p className="text-gray-600 text-sm mb-1">Más información:</p>
                </div>


                {/* Iconos de acción */}
                <div className="flex items-center justify-center gap-5 mt-auto">
                  {card.siteUrl && (
                    <a
                      href={card.siteUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group w-10 h-10 flex items-center justify-center
                                rounded-full bg-gray-200
                                hover:bg-red-800
                                transition-colors cursor-pointer"
                      title="Abrir sitio"
                    >
                      <FontAwesomeIcon
                        icon={faGlobe}
                        className="text-red-800 text-2xl
                                  group-hover:text-gray-200
                                  transition-colors"
                      />
                    </a>
                  )}

                  {card.pdfUrl && (
                  <button
                      className="group w-10 h-10 flex items-center justify-center
                                rounded-full bg-gray-200
                                hover:bg-red-800
                                transition-colors cursor-pointer"
                      title="Ver ficha PDF"
                      onClick={() => {
                        setSelectedCard(card);
                        setContentType("pdf");
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faFile}
                        className="text-red-800 text-2xl
                                  group-hover:text-gray-200
                                  transition-colors"
                      />
                    </button>
                  )}

                  {/* Botón Video */}
                  {card.videoUrl && (
                    <button
                      className="group w-10 h-10 flex items-center justify-center 
                                rounded-full bg-gray-200 
                                hover:bg-red-800
                                transition-colors cursor-pointer"
                      title="Ver video"
                      onClick={() => {
                        setSelectedCard(card);
                        setContentType("video");
                      }}
                    >
                      <FontAwesomeIcon 
                        icon={faYoutube} 
                        className="text-red-800 text-2xl
                                  group-hover:text-gray-200
                                  transition-colors" />
                    </button>
                  )}
                </div>


              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>


      {/* Modal para PDF o Video */}
      <ModalDesarrollos
        show={!!selectedCard}
        onClose={() => {
          setSelectedCard(null);
          setContentType(null);
        }}
        title={selectedCard?.title}
      >
        {selectedCard && (
          <div className="w-full h-[70vh]">
            {contentType === "pdf" ? (
              <iframe
                src={selectedCard.pdfUrl}
                title={selectedCard.title}
                className="w-full h-full rounded-lg"
              />
            ) : (
              <iframe
                src={selectedCard.videoUrl}
                title={selectedCard.title}
                className="w-full h-full rounded-lg"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            )}
          </div>
        )}
      </ModalDesarrollos>
    </div>

  );
}

export default Desarrollos;
