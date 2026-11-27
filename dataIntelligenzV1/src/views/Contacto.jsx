import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ModalAviso from "../components/Modals/ModalAviso"; 
import useContactoData from "../components/Hooks/ContactoData";

const inputStyle = "mt-2 block w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/15";

function Contacto() {

    //Carga datos de Tel y correo
    const contacto = useContactoData();

    //ELementos para el form
    const [modalMsg, setModalMsg] = useState("");
    const [showMsg, setShowMsg] = useState(false);
    const [loading, setLoading] = useState(false);


    if (!contacto) {
      return (
        <div className="text-center py-20">
          Cargando contacto...
        </div>
      );
    }


    const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

      const formData = {
        nombre: e.target.nombre.value,
        correo: e.target.correo.value,
        mensaje: e.target.mensaje.value
      };

      try {
        const response = await fetch("http://localhost:3000/api/enviar-correo", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData)
        });

        if (response.ok) {
          setModalMsg("Tu mensaje fue enviado correctamente.");
          setShowMsg(true);
          e.target.reset();
        } else {
          setModalMsg("Hubo un error al enviar el mensaje.");
          setShowMsg(true);
        }
      } catch {
        setModalMsg("No se pudo conectar con el servidor.");
        setShowMsg(true);
      }

      setLoading(false);
      
  };


  return (
    <div className="w-full bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 py-20 grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <span className="section-eyebrow">Contacto</span>
          <h1 className="section-title mt-3 md:!text-5xl">Hablemos de tu próximo proceso automatizado</h1>
          <p className="section-lead max-w-xl">
            Cuéntanos qué quieres resolver: un proceso manual, una integración con tu ERP o una
            idea de inteligencia artificial. Te respondemos con una propuesta concreta.
          </p>

          <div className="mt-10 space-y-4">
            <a
              href={`tel:${contacto.telefono.link}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <FontAwesomeIcon icon={faPhone} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-slate-500">Teléfono</span>
                <span className="font-display font-semibold text-slate-900">{contacto.telefono.display}</span>
              </span>
            </a>
            <a
              href={`mailto:${contacto.correo}`}
              className="flex items-center gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition hover:border-brand/40"
            >
              <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-soft text-brand">
                <FontAwesomeIcon icon={faEnvelope} />
              </span>
              <span>
                <span className="block text-xs uppercase tracking-wider text-slate-500">Correo</span>
                <span className="font-display font-semibold text-slate-900">{contacto.correo}</span>
              </span>
            </a>
          </div>
        </div>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <form className="space-y-5" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="nombre" className="text-sm font-medium text-slate-700">Nombre</label>
              <input type="text" id="nombre" name="nombre" placeholder="Tu nombre" className={inputStyle} required />
            </div>
            <div>
              <label htmlFor="correo" className="text-sm font-medium text-slate-700">Correo</label>
              <input type="email" id="correo" name="correo" placeholder="tu@empresa.com" className={inputStyle} required />
            </div>
            <div>
              <label htmlFor="mensaje" className="text-sm font-medium text-slate-700">¿Qué te gustaría automatizar?</label>
              <textarea id="mensaje" name="mensaje" rows="5" placeholder="Describe el proceso o la idea..." className={inputStyle} required />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Enviar mensaje"
              )}
            </button>
          </form>

          <ModalAviso
            show={showMsg}
            message={modalMsg}
            onClose={() => setShowMsg(false)}
          />
        </div>
      </div>
    </div>
  );
}

export default Contacto;
