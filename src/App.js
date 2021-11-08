import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
library.add(faStar);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [toCart, setToCart] = useState([]);
  const [cartPrice, setCartPrice] = useState(0);
  // const [cartName, setCartName] = useState([]);

  // const test = [...toCart];
  // const num = 0;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-backend-deliveroo.herokuapp.com/"
        );
        console.log(response.data);
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  const addToCart = (name, price) => {
    const goToCart = [...toCart];
    // const number= num +1;
    // goToCart.map((elem, index) => {
    //   if (elem && elem.name === name) {
    //     return (elem.num = elem.num + 1);
    //   } else {
    //     return goToCart.push({ name: { name }, price: { price } });
    //   }
    // });
    goToCart.push({ name: { name }, price: { price }, num: 1 });

    const newPrice = cartPrice + Number(price);
    setCartPrice(newPrice);
    // const newName = [...cartName];
    // newName.push(name);
    // setCartName(newName);

    setToCart(goToCart);
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section>
      <header>
        <div className="contain">
          <img
            src="https://upload.wikimedia.org/wikipedia/fr/thumb/f/f7/Deliveroo_logo.svg/2560px-Deliveroo_logo.svg.png"
            alt="logo"
          />
          <div className="part1">
            <div>
              <h1>{data.restaurant.name}</h1>
              <p className="description">{data.restaurant.description}</p>
            </div>
            <div>
              <img src={data.restaurant.picture} alt="" />
            </div>
          </div>
        </div>
      </header>
      <main className="container">
        <div className="part2">
          {data.categories
            .map((elem, index) => {
              return (
                <div key={index}>
                  <h2>{elem.name}</h2>
                  <div className="menu">
                    {elem.meals.map((elem, index) => {
                      return (
                        <div
                          key={index}
                          className="meals"
                          onClick={() => addToCart(elem.title, elem.price)}
                        >
                          <div className="meal">
                            <h3>{elem.title}</h3>
                            <p>{elem.description}</p>
                            <span className="price">{elem.price} € </span>
                            {elem.popular && (
                              <span className="popular">
                                {" "}
                                <FontAwesomeIcon icon="star" /> Populaire
                              </span>
                            )}
                          </div>
                          <div className="pic-meal">
                            {elem.picture && <img src={elem.picture} alt="" />}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })
            .slice(0, 6)}
        </div>
        <div className="cart">
          {toCart.length > 0 ? (
            <button>Valider mon panier</button>
          ) : (
            <button disabled>Valider mon panier</button>
          )}

          {toCart.length > 0 &&
            toCart.map((elem, index) => {
              return (
                <div className="cart1" key={index}>
                  <span>1</span>
                  <span>{elem.name.name}</span>
                  <span>{elem.price.price} €</span>
                </div>
              );
            })}
          {toCart.length > 0 ? (
            <div>
              <div className="cart1 bordered">
                <span>Sous-total</span>
                <span>{Number(cartPrice)} €</span>
              </div>
              <div className="cart1">
                <span>Frais de livraison</span>
                <span>{2.5} €</span>
              </div>
              <div className="cart1 bordered last">
                <span>Total</span>
                <span>{Number(cartPrice) + 2.5} €</span>
              </div>
            </div>
          ) : (
            <div className="emptyCart">Votre panier est vide</div>
          )}
        </div>
      </main>
    </section>
  );
}

export default App;

// for(const name in elem)
