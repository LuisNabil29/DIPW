function ModalAviso({ show, onClose, message }) {
  if (!show) return null;

  return (
    <>
      <div className="fixed inset-0 bg-black/40 z-40" onClick={onClose} />

      <div className="fixed inset-0 flex items-center justify-center z-50 px-4">
        <div
          className="bg-white rounded-lg shadow-lg max-w-sm w-full p-5 text-center"
          onClick={(e) => e.stopPropagation()}
        >
          <p className="text-gray-700 mb-4">{message}</p>

          <button
            onClick={onClose}
            className="px-4 py-2 bg-prop-red-button text-white rounded"
          >
            Aceptar
          </button>
        </div>
      </div>
    </>
  );
}

export default ModalAviso;
