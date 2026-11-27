import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons/faCheck";
import { faHandshakeAlt } from "@fortawesome/free-solid-svg-icons/faHandshakeAlt";

const highlights = [
  "Agentes de IA y automatización conectados al ERP",
  "Desarrollos Web y Apps Móviles integrados al ERP",
  "Integraciones Web Services y APIs",
  "Analítica de datos e inteligencia de negocio",
];

function QuienesSomos() {
  return (
    <section className="w-full bg-white py-24">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div className="lg:col-span-7">
          <span className="section-eyebrow">Quiénes somos</span>
          <h2 className="section-title mt-3">
            Tu aliado estratégico en datos, ERP e inteligencia artificial
          </h2>
          <p className="section-lead">
            Agilizamos la captura de datos desde sistemas ERP, aplicaciones móviles y portales
            web, y los convertimos en información útil para decidir con Datawarehouse e
            inteligencia de negocio. Hoy sumamos inteligencia artificial y automatización para
            que esa información también actúe.
          </p>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3">
            {highlights.map((item) => (
              <li key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand">
                  <FontAwesomeIcon icon={faCheck} className="text-xs" />
                </span>
                <span className="text-sm font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-slate-50 to-white p-8 shadow-sm">
            <img
              src="assets/DataIntelligenz2.png"
              alt="DataIntelligenz"
              className="mx-auto max-h-56 object-contain"
              loading="lazy"
            />
            <div className="mt-8 flex items-start gap-4 border-t border-slate-200 pt-6">
              <FontAwesomeIcon icon={faHandshakeAlt} className="text-brand text-3xl" />
              <div>
                <h3 className="font-display font-bold text-slate-900">Socios estratégicos</h3>
                <p className="mt-1 text-sm text-slate-600">
                  Desarrolladores de software, partners de ERP, Hosting y VM: una opción completa.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm italic text-slate-500">
              "Si quieres ir rápido camina solo, si quieres llegar lejos ve acompañado."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default QuienesSomos;
