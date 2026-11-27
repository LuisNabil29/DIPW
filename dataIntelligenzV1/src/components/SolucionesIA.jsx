import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import { solucionesIA } from "../content/soluciones";

function SolucionesIA() {
  return (
    <section className="w-full bg-slate-50 py-24 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-3xl">
          <span className="section-eyebrow">IA y Automatización</span>
          <h2 className="section-title mt-3">
            Inteligencia artificial que trabaja dentro de tus procesos
          </h2>
          <p className="section-lead">
            Conectamos IA con tu ERP y tus flujos de trabajo para que la información no solo
            se consulte: también actúe.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-1 md:grid-cols-6 gap-5">
          {solucionesIA.map((item, index) => (
            <article
              key={item.id}
              className={`group relative overflow-hidden rounded-2xl border border-slate-200 bg-white p-7 shadow-sm transition hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg ${
                index === 0 || index === 3 ? "md:col-span-4" : "md:col-span-2"
              }`}
            >
              <span className="absolute right-6 top-5 font-display text-5xl font-extrabold text-slate-100 transition group-hover:text-brand-soft">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative">
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                  <FontAwesomeIcon icon={item.icon} className="text-xl" />
                </span>
                <h3 className="font-display mt-5 text-xl font-bold text-slate-900">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{item.solution}</p>
                <p className="mt-5 inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-brand">
                  {item.impact}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-12 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-2xl bg-slate-900 px-8 py-7 text-white">
          <p className="font-display text-lg font-semibold">
            ¿Qué proceso de tu empresa debería correr solo?
          </p>
          <Link to="/contacto" className="btn-primary">
            Solicitar diagnóstico
          </Link>
        </div>
      </div>
    </section>
  );
}

export default SolucionesIA;
