import { useState,useEffect  } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMobileAlt, faGlobe, faClone, faFile } from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import { motion as Motion, AnimatePresence } from "motion/react";
import ModalDesarrollos from "./Modals/ModalDesarrollos";

const iconMap = {
  faMobileAlt: faMobileAlt,
  faGlobe: faGlobe,
  faClone: faClone,
  faFile: faFile,
};

const categories = [
  { value: "All", label: "Todos" },
  { value: "Webs", label: "Webs" },
  { value: "Apps Móviles", label: "Apps Móviles" },
  { value: "Integraciones", label: "Integraciones" },
];

const actionStyle = "inline-flex items-center gap-2 rounded-full border border-slate-200 px-3 py-1.5 text-xs font-semibold text-slate-700 transition hover:border-brand hover:text-brand";

function Desarrollos() {

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

  const openContent = (card, type) => {
    setSelectedCard(card);
    setContentType(type);
  };

  return (
    <section className="w-full bg-slate-50 py-24 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
          <div className="max-w-2xl">
            <span className="section-eyebrow">Apps y Desarrollos</span>
            <h2 className="section-title mt-3">Productos que ya automatizan empresas</h2>
            <p className="section-lead">
              Soluciones construidas sobre el ERP que resuelven cobranza, flujo de efectivo,
              contabilidad y relación con proveedores.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setSelectedCategory(cat.value)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                  selectedCategory === cat.value
                    ? "bg-slate-900 text-white"
                    : "bg-white text-slate-600 border border-slate-200 hover:border-brand hover:text-brand"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {filteredCards.map((card) => (
              <Motion.article
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white transition hover:border-brand/40 hover:shadow-lg"
              >
                {card.imgUrl && (
                  <div className="aspect-[4/3] overflow-hidden bg-slate-100">
                    <img
                      src={card.imgUrl}
                      alt={card.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                )}

                <div className="flex flex-grow flex-col p-6">
                  <span className="text-xs font-semibold uppercase tracking-wider text-brand">
                    {card.category}
                  </span>
                  <h3 className="font-display mt-2 text-xl font-bold text-slate-900">{card.title}</h3>
                  {card.description && (
                    <p className="mt-2 text-sm leading-relaxed text-slate-600">{card.description}</p>
                  )}

                  <div className="mt-auto flex flex-wrap gap-2 pt-5">
                    {card.siteUrl && (
                      <a href={card.siteUrl} target="_blank" rel="noopener noreferrer" className={actionStyle} title="Abrir sitio">
                        <FontAwesomeIcon icon={faGlobe} /> Sitio
                      </a>
                    )}
                    {card.pdfUrl && (
                      <button className={actionStyle} title="Ver ficha PDF" onClick={() => openContent(card, "pdf")}>
                        <FontAwesomeIcon icon={faFile} /> Ficha
                      </button>
                    )}
                    {card.videoUrl && (
                      <button className={actionStyle} title="Ver video" onClick={() => openContent(card, "video")}>
                        <FontAwesomeIcon icon={faYoutube} /> Video
                      </button>
                    )}
                  </div>
                </div>
              </Motion.article>
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
    </section>
  );
}

export default Desarrollos;
