import React, { Suspense } from "react";

import Inicio from "../components/Inicio";
import QuienesSomos from "../components/QuienesSomos";
import SolucionesIA from "../components/SolucionesIA";
import BlogPreview from "../components/BlogPreview";
const Servicios = React.lazy(() => import("../components/Servicios"));
const Desarrollos = React.lazy(() => import("../components/Desarrollos"));

const SkeletonBlock = () => (
  <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-lg" />
);


function Home() {
    
    return(
        <div className="mt-12 pt-3">
            
            {/*Modulo de inicio */}
            <div id="Inicio">
                <Inicio/>
            </div>

            {/*Modulo Quienes somos */}
            <div id="quienes-somos">
                <QuienesSomos />
            </div>

            {/* IA y Automatización */}
            <div id="ia-automatizacion">
                <SolucionesIA />
            </div>

             {/* Servicios*/}
            <div id="servicios">
                <Suspense fallback={<SkeletonBlock />}>
                <Servicios />
                </Suspense>
            </div>

            {/* Desarrollos */}
            <div id="desarrollos">
                <Suspense fallback={<SkeletonBlock />}>
                <Desarrollos />
                </Suspense>
            </div>

            {/* Blog */}
            <div id="blog">
                <BlogPreview />
            </div>

        </div>
    );
}

export default Home;
