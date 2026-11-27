import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faHandshakeAlt } from "@fortawesome/free-solid-svg-icons/faHandshakeAlt";

const highlights = [
  "Agentes de IA y automatización conectados al ERP",
  "Desarrollos Web y Apps Móviles integrados al ERP",
  "Integraciones Web Services y APIs",
  "Analítica de datos e inteligencia de negocio",
];

function QuienesSomos() {
  return (
    <div id="quienes-somos" className="w-full text-white py-12 relative overflow-hidden">
      <div className=" text-gray-800 px-6 py-16 md:px-20">

        {/* Primer bloque */}
        <div className="text-center mt-8 mb-35">
          <h2 className="text-2xl font-bold font-poppins mb-3">
            <span className="italic">DATAIntelligenz</span>, tu aliado estratégico
          </h2>
          <span className="font-raleway text-xl italic">
            "Si quieres ir rápido camina solo, si quieres llegar lejos ve acompañado"
          </span>
        </div>

        <hr className="border-t border-gray-400" />



        {/* Segundo bloque */}
        <h2 className="text-3xl md:text-4xl font-bold mt-20 mb-8">¿Quienes somos?</h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Izquierda */}
          <div className="md:col-span-2 p-4">
            <div className="mb-8 flex items-center">
              <FontAwesomeIcon icon={faHandshakeAlt} className="text-prop-red text-5xl" />
              <div className="ml-5">
                <h2 className="text-xl font-bold font-poppins">Socios estratégicos</h2>
                <span className="font-raleway text-lg italic">
                  Somos Desarrolladores de Software, Partners de ERP, Hosting y VM, <br />
                  lo que nos convierte en una opción completa.
                </span>
              </div>
            </div>

            <span className="font-raleway text-lg">
              Agilizamos la captura de datos desde sistemas ERP, aplicaciones móviles y portales web,
              y los convertimos en información útil para decidir con Datawarehouse e inteligencia de negocio.
              Hoy sumamos inteligencia artificial y automatización para que esa información también
              actúe: agentes que responden con datos reales y flujos que eliminan el trabajo manual.
            </span>

            <div className="space-y-2 mt-8 text-lg">
              {highlights.map((item) => (
                <div key={item} className="flex items-center">
                  <FontAwesomeIcon icon={faCheckCircle} className="text-prop-red mr-2" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Derecha */}
          <div className="md:col-span-1 p-4 ml-15">
            <img src="assets/DataIntelligenz2.png" alt="Logo" loading="lazy"/>
          </div>


        </div>
      </div>
    </div>
  );
}

export default QuienesSomos;
