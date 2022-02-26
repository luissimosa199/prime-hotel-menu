import Aside from "./Aside";
import "./home.css";

const Home = ({
  handleSearchSubmit,
  setSearchterm,
  queryResults,
  handleSeeMore,
  renderMenu,
  deletePlate,
  setMenuObj,
  setLoadingModalVisibility, 
  setRenderMessage
}) => {
  return (
    <div className='home_container'>
      <div className='searchbar'>
        <h2>Busca tus platos favoritos:</h2>
        <form className='searchbar_form' onSubmit={handleSearchSubmit}>
          <input
            className='searchbar_input'
            type='text'
            placeholder="Ej. 'Ensalada'"
            onChange={(e) => {
              setSearchterm(e.target.value);
            }}
          />
          <button className='searchbar_btn' type='submit'>
            Buscar
          </button>
        </form>
        <div className='results_container'>
          <ul className='results_ul'>
            {queryResults.map((e) => (
              <li key={e.id} className='results_card'>
                <h3 className='card_title'>{e.title}</h3>
                <img src={e.image} alt={e.title + "photo"} />
                <button 
                id={e.id} 
                className='results_card_btn' 
                type='button' 
                onClick={handleSeeMore}
                >
                  Ver
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Aside 
      renderMenu={renderMenu} 
      deletePlate={deletePlate} 
      setMenuObj={setMenuObj}
      setLoadingModalVisibility={setLoadingModalVisibility} 
      setRenderMessage={setRenderMessage}
      />
    </div>
  );
};

export default Home;
