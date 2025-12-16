function ModalDesarrollos({ show, onClose, title, children }) {
  if (!show) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40"
        onClick={onClose} // con clic fuera se cierra
      />

      {/* Contenedor modal centrado */}
      <div
        className="fixed inset-0 flex items-center justify-center z-50 px-4"
        onClick={onClose} //Detecta clic fuera del modal
      >
        <div
          className="bg-gray-100 rounded-lg shadow-lg max-w-3xl w-full p-4 md:p-6 relative border border-slate-400 max-h-[60vh] overflow-y-auto md:max-h-none"
          onClick={(e) => e.stopPropagation()} // Evita cierre si clic dentro
        >
          {/* Botón cerrar (X) */}
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-500 hover:text-red-600 text-2xl font-bold"
          >
            ×
          </button>

          {/* Contenido */}
          <h3 className="text-lg font-semibold mb-4 text-center">{title}</h3>
          {children}
        </div>
      </div>
    </>
  );
}

export default ModalDesarrollos;
