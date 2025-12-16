import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import ModalAviso from "../components/Modals/ModalAviso"; 
import useContactoData from "../components/hooks/ContactoData";


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
    <div className="w-full text-white py-12 relative overflow-hidden">
      <div className=" text-gray-800 px-6 py-16 md:px-20">

        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">Contactanos</h2>
        <p className="text-center max-w-2xl mx-auto italic">
          Ponte en contacto con nosotros para conocer más sobre nuestros servicios, solicitar una propuesta personalizada o resolver cualquier duda. 
          Estamos listos para ayudarte a llevar tu proyecto al siguiente nivel.
        </p>

        {/*cantidad de coumnas(responsivas)*/}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-15">

          {/*parte izquierda*/}
          <div className="md:col-span-1 p-4">
            <div className="space-y-6 mt-8 text-lg">
              {/* Teléfono */}
              <div className="flex flex-col items-center pb-12">
                <a href={`tel:${contacto.telefono.link}`}>
                  <FontAwesomeIcon icon={faPhone} className="text-4xl text-prop-red mb-2" />
                </a>
                <span className="text-xl">{contacto.telefono.display}</span>
              </div>

              {/* Correo */}
              <div className="flex flex-col items-center">
                <a href={`mailto:${contacto.correo}`} >
                  <FontAwesomeIcon icon={faEnvelope} className="text-4xl text-prop-red mb-2" />
                </a>
                <span className="text-xl italic">{contacto.correo}</span>
              </div>
            </div>

          </div>

          {/*perte derecha*/}
          <div className="md:col-span-1 p-4 ">
            <div className="bg-gray-100 shadow-lg rounded-lg p-4">
              <form className="space-y-4" onSubmit={handleSubmit}>
                {/* Nombre */}
                <div>
                  <label htmlFor="nombre" className="block text-sm font-medium text-gray-700">
                    Nombre
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Correo */}
                <div>
                  <label htmlFor="correo" className="block text-sm font-medium text-gray-700">
                    Correo
                  </label>
                  <input
                    type="email"
                    id="correo"
                    name="correo"
                    placeholder="tu@email.com"
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Mensaje */}
                <div>
                  <label htmlFor="mensaje" className="block text-sm font-medium text-gray-700">
                    Mensaje
                  </label>
                  <textarea
                    id="mensaje"
                    name="mensaje"
                    rows="4"
                    placeholder="Escribe tu mensaje..."
                    className="mt-1 block w-full rounded-md border border-gray-300 shadow-sm p-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>

                {/* Botón */}  
              <div className="text-center">
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-prop-red-button text-white font-semibold py-2 px-4 rounded-full transition-colors flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    "Enviar"
                  )}
                </button>
              </div>

              </form>

                <ModalAviso
                  show={showMsg}
                  message={modalMsg}
                  onClose={() => setShowMsg(false)}
                />

            </div>
          </div>

        </div>

      </div>
      
    </div>
    
  );
}

export default Contacto;
