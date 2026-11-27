import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBrain,
  faGears,
  faCode,
  faChartLine,
  faShoppingCart,
  faMobileAlt,
  faDatabase,
  faCloud,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

const iconMap = {
  faBrain,
  faGears,
  faCode,
  faChartLine,
  faShoppingCart,
  faMobileAlt,
  faDatabase,
  faCloud,
};

function Servicios() {

  const [cards, setCards] = useState([]);

  useEffect(() => {
    fetch("/data/CardsServicios.xml")
      .then((res) => res.text())
      .then((xmlStr) => {
        const parser = new DOMParser();
        const xml = parser.parseFromString(xmlStr, "text/xml");

        const cardNodes = [...xml.getElementsByTagName("card")];
        const get = (node, tag) =>
          node.getElementsByTagName(tag)[0]?.textContent || "";

        const parsed = cardNodes.map((node) => ({
          id: parseInt(get(node, "id")),
          title: get(node, "title"),
          text: get(node, "text"),
          icon: iconMap[get(node, "icon")] || faFile,
        }));

        parsed.sort((a, b) => a.id - b.id);

        setCards(parsed);
      })
      .catch((e) => console.error("Error cargando CardsServicios.xml", e));
  }, []);

  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <span className="section-eyebrow">Servicios</span>
          <h2 className="section-title mt-3">Lo que ofrecemos</h2>
          <p className="section-lead">
            De la estrategia de IA a la infraestructura: un solo equipo para todo el ciclo de tus datos.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {cards.map((card) => (
            <div
              key={card.id}
              className="rounded-2xl border border-slate-200 bg-white p-7 transition hover:border-brand/40 hover:shadow-lg"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900 text-white">
                <FontAwesomeIcon icon={card.icon} className="text-lg" />
              </span>
              <h3 className="font-display mt-5 text-lg font-bold text-slate-900">{card.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Servicios;
