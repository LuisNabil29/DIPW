import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheckCircle } from "@fortawesome/free-solid-svg-icons/faCheckCircle";
import { faBullseye } from "@fortawesome/free-solid-svg-icons/faBullseye";
import { faHandshakeAlt } from "@fortawesome/free-solid-svg-icons/faHandshakeAlt";


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
              Nuestro enfoque es agilizar la captura de datos por diversos medios como sistemas ERP,
              Aplicaciones móviles, portales WEB, etc. para convertir estos datos en información útil que
              sustente la toma de decisiones por medio de herramientas de análisis de datos como Datawarehouse
              e inteligencia de negocio.
            </span>

            <div className="space-y-2 mt-8 text-lg">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-prop-red mr-2" />
                <span>Desarrollos Interfaz Web - ERP</span>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-prop-red mr-2" />
                <span>Desarrollos Móviles App - ERP</span>
              </div>

              <div className="flex items-center">
                <FontAwesomeIcon icon={faCheckCircle} className="text-prop-red mr-2" />
                <span>Integraciones Web Services</span>
              </div>
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
