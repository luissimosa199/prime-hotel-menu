import "./aside.css"

const Aside = ({renderMenu, deletePlate, setMenuObj, setLoadingModalVisibility, setRenderMessage}) => {

  const handleProceed = () => {

    setLoadingModalVisibility(true)
    setRenderMessage(<div className="spinner"></div>)

    setTimeout(()=>{
      if(renderMenu.platesArr.length < 4){
        setRenderMessage(<div><p>Tienes que agregar cuatro platos antes de proceder</p><button className="modal_acept_btn" type="button" onClick={() => {setLoadingModalVisibility(false)}}>Aceptar</button></div>)
      } else {
        setRenderMessage(<div><p>¡Tu orden se ha generado exitosamente!</p></div>)
        window.location.reload(false)
      }
    }, 2000)
  }


    return ( 
        <aside className='menu'>
        <h2 className='menu_title'>Tu menú:</h2>
        <div className='menu_info'>
          <ul className='menu_info_ul'>
            <li>Precio total: ${renderMenu.totalPrice.toFixed(2)}</li>
            <li>Tiempo promedio de preparación: {renderMenu.promTime.toFixed(2)} minutos</li>
            <li>Health Score: {renderMenu.promHealth.toFixed(2)}</li>
          </ul>
        </div>
        <div className='menu_plates'>
          <ul className='menu_plates_ul'>
            {renderMenu.platesArr && renderMenu.platesArr.map((e) => {
              return (
              <li key={e.id} className='menu_plates_li'>{e.name}
              <button className="menu_plate_delete" id={e.id} onClick={deletePlate}>X</button>
              </li>
              )
            })}
          </ul>
          {renderMenu.platesArr.length !== 0 && (<div className="menu_btns">
            <button className="menu_btn menu_btn_empty" onClick={() => {setMenuObj([])}}>Vaciar</button>
            <button className="menu_btn menu_btn_proceed" onClick={handleProceed}>Proceder</button>
          </div>)}
        </div>
      </aside>
     );
}
 
export default Aside;