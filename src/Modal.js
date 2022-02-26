import "./modal.css";

const Modal = ({
  setModalVisibility,
  modalData,
  setMenuObj,
  menuObj,
  handleAddToMenu,
  modalError,
  setModalError,
}) => {
  const handleClose = () => {
    setModalError('');
    setModalVisibility(false);
  };

  return (
    <div className='modal_container'>
      <div className='modal_container_inner'>
        <button onClick={handleClose} className='modal_close_btn'>
          X
        </button>
        <h3>{modalData.name}</h3>
        <ul className='modal_ul'>
          <li>{`Precio: $${modalData.price}`}</li>
          <li>{`Health Score: ${modalData.health}`}</li>
          <li>{`Tiempo estimado de preparación: ${modalData.time}`}</li>
          <li>{modalData.vegan ? "Es vegano" : "No es vegano"}</li>
          <li>{modalData.veggie ? "Es vegetariano" : "No es vegetariano"}</li>
        </ul>
        <button
          className='modal_add_btn'
          type='button'
          onClick={handleAddToMenu}>
          Agregar al menú
        </button>
        <div className="modal_error">{modalError}</div>
      </div>
    </div>
  );
};

export default Modal;
