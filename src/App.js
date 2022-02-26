import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import Header from "./Header";
import Login from "./Login";
import Home from "./Home";
import Modal from "./Modal";
import PrivateRoute from "./PrivateRoute";
import LoadingModal from "./LoadingModal";

function App() {
  //
  const key = "apiKey=c58dc0295b3f4879b16b67b7eaa415ef";

  // hooks

  // login state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // searchbar state
  const [searchterm, setSearchterm] = useState("");
  const [queryResults, setQueryResults] = useState([]);

  // menuObj
  const [menuObj, setMenuObj] = useState([]);
  const [renderMenu, setRenderMenu] = useState({
    totalPrice: 0,
    promTime: 0,
    promHealth: 0,
    platesArr: [],
  });

  // modal
  const [modalVisibility, setModalVisibility] = useState(false);
  const [modalData, setModalData] = useState({
    id: "",
    price: "",
    health: "",
    time: "",
    vegan: false,
    veggie: false,
  });
  const [modalError, setModalError] = useState("");

  //
  const [loadingModalVisibility, setLoadingModalVisibility] = useState(false);
  const [renderMessage, setRenderMessage] = useState("");
  //

  useEffect(() => {
    if (menuObj.length === 0) {
      setRenderMenu({
        totalPrice: 0,
        promTime: 0,
        promHealth: 0,
        platesArr: [],
      });
      return;
    } else if (menuObj.length === 1) {
      setRenderMenu({
        totalPrice: menuObj[0].price,
        promTime: menuObj[0].time,
        promHealth: menuObj[0].healthScore,
        platesArr: [menuObj[0].name],
      });
    }

    setRenderMenu({
      totalPrice: menuObj
        .map((e) => {
          return e["price"];
        })
        .reduce((a, b) => a + b),
      promTime: sum(menuObj, "time"),
      promHealth: sum(menuObj, "healthScore"),
      platesArr: menuObj.map((e) => {
        return { name: e["name"], id: e["id"] };
      }),
    });
  }, [menuObj]);

  // functions

  //

  function sum(arr, prop) {
    return (
      arr
        .map((e) => {
          return e[prop];
        })
        .reduce((a, b) => a + b) / arr.length
    );
  }

  //

  const deletePlate = (e) => {
    let btnId = Number(e.target.id);

    if (menuObj.length === 1) {
      setMenuObj([]);
      return;
    }

    setMenuObj(
      menuObj.filter((e) => {
        return e["id"] !== btnId;
      })
    );
  };

  //

  function areVegan(arr) {
    return arr
      .map((e) => {
        return e.vegan;
      })
      .filter((e) => e).length;
  }

  //

  const handleAddToMenu = () => {
    if (menuObj.length === 4) {
      setModalError("Tu menú está lleno, elimina un plato para agregar otro");
      return;
    }

    if (areVegan(menuObj) === 2 && modalData.vegan) {
      setModalError("Tu menú no puede contener más de dos platos veganos");
      return;
    }

    if (areVegan(menuObj) === 0 && !modalData.vegan && menuObj.length === 2) {
      setModalError("Tu menú tiene que contener al menos dos platos veganos");
      return;
    }

    if (
      menuObj.filter((e) => {
        return e["id"] === modalData.id;
      }).length > 0
    ) {
      setMenuObj((prev) => {
        return [
          ...prev,
          {
            vegan: modalData.vegan,
            id: Number(modalData.id + "2"),
            name: modalData.name,
            price: modalData.price,
            healthScore: modalData.health,
            time: modalData.time,
          },
        ];
      });
      setModalVisibility(false);
      return;
    }

    setMenuObj((prev) => {
      return [
        ...prev,
        {
          vegan: modalData.vegan,
          id: modalData.id,
          name: modalData.name,
          price: modalData.price,
          healthScore: modalData.health,
          time: modalData.time,
        },
      ];
    });

    setModalVisibility(false);
  };

  //

  const handleSeeMore = (e) => {
    axios
      .get(
        `https://api.spoonacular.com/recipes/${e.target.id}/information?${key}`
      )
      .then((res) => {
        setModalData({
          id: res.data.id,
          name: res.data.title,
          price: res.data.pricePerServing,
          health: res.data.healthScore,
          time: res.data.readyInMinutes,
          vegan: res.data.vegan,
          veggie: res.data.vegetarian,
        });

        setModalVisibility(true);
      });
  };

  //

  const handleSearchSubmit = (e) => {

    setLoadingModalVisibility(true)
    setRenderMessage(<div className="spinner"></div>)

    e.preventDefault();
    let baseURL = "https://api.spoonacular.com/recipes/complexSearch?query=";

    let fullURL =
      baseURL + searchterm.replace(" ", "+").toLowerCase() + "&" + key;

    if (searchterm.length < 2) {
      setRenderMessage(<div><p>Puedes buscar una receta con una o más palabras claves, por ejemplo: 'salad'</p><button className="modal_acept_btn" type="button" onClick={() => {setLoadingModalVisibility(false)}}>Aceptar</button></div>)
    } else {
      axios.get(fullURL).then((res) => {
        let arr = res.data.results;

        if(arr.length === 0){ 
          setRenderMessage(<div><p>No se encontraron resultados, recuerda usar una palabra clave en inglés</p><button className="modal_acept_btn" type="button" onClick={() => {setLoadingModalVisibility(false)}}>Aceptar</button></div>)
        } else {   
          setQueryResults(arr);
          setLoadingModalVisibility(false)
        }
      });
    }
  };

  return (
    <div className='App'>
      <Header />

      <main>
        <BrowserRouter>
          <Routes>
            <Route
              path='/login'
              element={
                <Login
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  setLoadingModalVisibility={setLoadingModalVisibility}
                  setRenderMessage={setRenderMessage}
                />
              }
            />
            <Route
              path='/'
              element={
                <PrivateRoute>
                  <Home
                    handleSearchSubmit={handleSearchSubmit}
                    setSearchterm={setSearchterm}
                    queryResults={queryResults}
                    handleSeeMore={handleSeeMore}
                    setMenuObj={setMenuObj}
                    renderMenu={renderMenu}
                    deletePlate={deletePlate}
                    setLoadingModalVisibility={setLoadingModalVisibility} 
                    setRenderMessage={setRenderMessage}
                  />                  
                </PrivateRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </main>
      <footer>
        <p>Desarrollado por Luis Simosa - 2022</p>
      </footer>
      {modalVisibility && (
        <Modal
          setModalVisibility={setModalVisibility}
          modalData={modalData}
          setMenuObj={setMenuObj}
          menuObj={menuObj}
          handleAddToMenu={handleAddToMenu}
          modalError={modalError}
          setModalError={setModalError}
        />
      )}
      {loadingModalVisibility && <LoadingModal 
      renderMessage={renderMessage}
      setRenderMessage={setRenderMessage}
      setLoadingModalVisibility={setLoadingModalVisibility}
      />}
    </div>
  );
}

export default App;
