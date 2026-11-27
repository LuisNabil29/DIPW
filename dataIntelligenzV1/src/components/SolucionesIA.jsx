import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solucionesIA } from "../content/soluciones";

function SolucionesIA() {
  return (
    <section className="w-full py-16 px-6 md:px-20 bg-white text-gray-800">
      <h2 className="text-3xl font-bold font-poppins text-black mb-3 text-center">
        IA y Automatización Empresarial
      </h2>
      <p className="text-center font-raleway max-w-3xl mx-auto mb-12">
        Conectamos inteligencia artificial con tu ERP y tus procesos para que la
        información no solo se consulte: también actúe.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {solucionesIA.map((item) => (
          <div
            key={item.id}
            className="bg-gray-100 rounded-lg shadow-lg p-6 font-raleway border border-slate-300 hover:border-rose-700 transition"
          >
            <div className="flex items-center gap-4 mb-3">
              <FontAwesomeIcon icon={item.icon} className="text-prop-red text-3xl" />
              <h3 className="text-xl font-bold font-poppins">{item.title}</h3>
            </div>
            <p className="text-sm text-gray-700 mb-2">{item.solution}</p>
            <p className="text-sm font-semibold text-prop-red">{item.impact}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SolucionesIA;
