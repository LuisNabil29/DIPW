import React, { Suspense, useEffect, useRef } from "react";

const Spline = React.lazy(() => import("@splinetool/react-spline"));

const SCENE_URL = "https://prod.spline.design/zjJJT0RUz8a8puXc/scene.splinecode";

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
    <div
      id="inicio"
      ref={sectionRef}
      className="relative h-[400px] overflow-hidden shadow-2xl"
    >
      <div className="absolute inset-0 overflow-hidden bg-prop-red">
        <Suspense
          fallback={
            <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
          }
        >
          <Spline
            scene={SCENE_URL}
            onLoad={handleLoad}
            className="h-full w-full"
          />
        </Suspense>
      </div>

      <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mt-40 px-6 md:px-12">
        <div className="md:w-1/2 text-white ">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Bienvenido a <span className="italic"> DATAIntelligenz</span>
          </h2>
          <p className="text-base md:text-lg text-justify">
            Inteligencia artificial y automatización de procesos conectadas a tu ERP, con más de 20 años de experiencia convirtiendo datos en decisiones.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Inicio;
