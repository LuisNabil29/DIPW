import React, { Suspense, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/zjJJT0RUz8a8puXc/scene.splinecode";

const stats = [
  { value: "+20", label: "años convirtiendo datos en decisiones" },
  { value: "ERP + IA", label: "integración nativa con tu operación" },
  { value: "A medida", label: "automatización para cada proceso" },
];

function isSectionVisible(element) {
  if (!element || document.visibilityState === "hidden") return false;
  const rect = element.getBoundingClientRect();
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  return visibleHeight > 80;
}

// Chrome avisa cuando un frame de requestAnimationFrame pasa de ~50 ms.
// La escena se limita al recuadro visible y a 1x, para no dibujar el buffer
// extra de una pantalla retina. Fuera de vista, el frame sale al instante.
function tuneSpline(spline, section) {
  const canvas = spline?.canvas;
  const parent = canvas?.parentElement;
  const renderer = spline?._renderer;
  if (!canvas || !parent || !renderer?.setPixelRatio) return;

  canvas.style.width = "100%";
  canvas.style.height = "100%";

  const width = parent.clientWidth;
  const height = parent.clientHeight;
  if (width < 2 || height < 2) return;

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
  spline._viewportWidth = width;
  spline._viewportHeight = height;
  spline._resize?.(true);

  // stop() deja el requestAnimationFrame activo y el frame sigue costando
  // lo mismo. El loop se queda, pero no dibuja si la sección no se ve.
  let playing = isSectionVisible(section);
  const render = spline.render;
  renderer.setAnimationLoop((time) => {
    if (!playing) return;
    render(time);
  });

  return () => {
    playing = isSectionVisible(section);
  };
}

function Inicio() {
  const sectionRef = useRef(null);
  const splineRef = useRef(null);
  const syncPlaybackRef = useRef(() => {});

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const syncPlayback = () => syncPlaybackRef.current();

    const observer = new IntersectionObserver(syncPlayback, {
      rootMargin: "-80px 0px -80px 0px",
      threshold: 0,
    });
    observer.observe(section);
    document.addEventListener("visibilitychange", syncPlayback);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", syncPlayback);
    };
  }, []);

  const handleLoad = (spline) => {
    splineRef.current = spline;
    // El runtime enciende su loop en un setTimeout(0). Ajustamos después.
    setTimeout(() => {
      if (splineRef.current !== spline) return;
      syncPlaybackRef.current = tuneSpline(spline, sectionRef.current) ?? (() => {});
    }, 0);
  };

  return (
    <section
      id="inicio"
      ref={sectionRef}
      className="relative min-h-[560px] md:min-h-[620px] overflow-hidden flex flex-col"
    >
      <div className="absolute inset-0 overflow-hidden bg-brand">
        <Suspense fallback={<div className="w-full h-full bg-brand" />}>
          <Spline
            scene={SCENE_URL}
            onLoad={handleLoad}
            className="h-full w-full"
          />
        </Suspense>
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-950/65 to-slate-950/10" />

      <div className="relative z-10 flex-grow flex items-center">
        <div className="max-w-7xl w-full mx-auto px-6 py-20">
          <div className="max-w-2xl text-white">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-rose-400" />
              IA y automatización de procesos empresariales
            </span>
            <h1 className="font-display mt-6 text-4xl md:text-6xl font-extrabold leading-[1.05] tracking-tight">
              Tu ERP ya tiene los datos.
              <br />
              <span className="text-rose-300">Nosotros los ponemos a trabajar.</span>
            </h1>
            <p className="mt-6 text-base md:text-lg text-slate-200 leading-relaxed">
              Agentes de inteligencia artificial y flujos automáticos conectados a tu ERP para
              cobrar, conciliar, proyectar y alertar sin trabajo manual.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <HashLink smooth to="/#ia-automatizacion" className="btn-primary">
                Ver soluciones de IA
              </HashLink>
              <Link
                to="/contacto"
                className="inline-flex items-center justify-center rounded-full border border-white/40 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white hover:text-slate-900"
              >
                Solicitar diagnóstico
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 border-t border-white/15 bg-slate-950/50 backdrop-blur">
        <dl className="max-w-7xl mx-auto px-6 py-5 grid grid-cols-1 sm:grid-cols-3 gap-4 text-white">
          {stats.map((stat) => (
            <div key={stat.label} className="flex items-baseline gap-3">
              <dt className="font-display text-xl sm:text-2xl font-bold text-rose-300 whitespace-nowrap">{stat.value}</dt>
              <dd className="text-sm text-slate-300">{stat.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

export default Inicio;
