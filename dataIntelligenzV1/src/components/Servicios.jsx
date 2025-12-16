import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCode,
  faShoppingCart,
  faMobileAlt,
  faDatabase,
  faFile,
} from "@fortawesome/free-solid-svg-icons";

function Servicios() {
  const iconMap = {
    faCode,
    faShoppingCart,
    faMobileAlt,
    faDatabase,
  };

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
    <div className="relative bg-gray-200 w-full py-14">
      {/* SVG de onda */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none">
        <svg
          className="relative block w-full h-14"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
        >
          <path
            fill="#ffffff"
            d="M0,60
              C144,0,288,120,432,60
              C576,0,720,120,864,60
              C1008,0,1152,120,1296,60
              C1368,30,1440,90,1440,90
              L1440,0 L0,0 Z"
          ></path>
        </svg>
      </div>

      <div className="px-6 md:px-20 my-9">
        <h2 className="text-3xl font-bold font-poppins text-black mb-12 text-center">
          LO QUE OFRECEMOS
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {cards.map((card) => (
            <div
              key={card.id}
              className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center font-raleway transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
            >
              <FontAwesomeIcon
                icon={card.icon}
                className="text-prop-red text-4xl mb-4"
              />

              <h3 className="text-xl font-bold mb-2">{card.title}</h3>

              <p className="text-black text-sm text-justify">{card.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Servicios;
