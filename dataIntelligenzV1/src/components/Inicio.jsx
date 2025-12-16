import React, { Suspense } from "react";

const Spline = React.lazy(() => import('@splinetool/react-spline'));

function Inicio() {

  return (
    <div id="inicio" className="relative h-[400px] overflow-hidden shadow-2xl"> {/*la propiedad relative hace que se haga mas grande la animacion de spline sin afectar el rendimiento*/}
        <div className=" w-full overflow-hidden"> {/*si se le aplica aspect-[16/9] a la animacion se ralentiza la pagina*/}

         {/* Fallback ligero mientras carga Spline */}
        <Suspense
          fallback={
            <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
          }
        >
          <Spline
            scene="https://prod.spline.design/zjJJT0RUz8a8puXc/scene.splinecode"
            className="absolute bg-prop-red"
          />
        </Suspense>

        {/* Contenido encima , mt-50 padding que permitio ser responsivo al mouse la animacion de spline*/}
        <div className="relative z-10 flex flex-col md:flex-row items-center justify-between w-full mt-40 px-6 md:px-12">
          {/* Lado izquierdo: texto */}
          <div className="md:w-1/2 text-white ">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Bienvenido a <span className="italic"> DATAIntelligenz</span>
            </h2>
            <p className="text-base md:text-lg text-justify">
              Somos una empresa con más de 20 años de experiencia en la captura, manejo y uso de información para la toma de decisiones.
            </p>
          </div>  

            {/* Imagen  
            <div className="md:w-1/2 flex justify-center mt-6 md:mt-0 relative">
              <div className="absolute bottom-0 w-32 h-6 bg-black/80 rounded-full blur-lg"></div>
              <div className="relative">
                <img
                  src="/assets/dataintelligenz.png"
                  alt="Logo"
                  className=" bg-white/70 shadow-md rounded-lg p-6 animate-smoothBounce"
                />
              </div>
            </div>
            */}
            
        </div>
      </div>
    </div>
  );
}

export default Inicio;