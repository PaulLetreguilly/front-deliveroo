import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStar, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Hero from "./components/Hero";
import Category from "./components/Category";
library.add(faStar, faPlus, faMinus);

function App() {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://my-backend-deliveroo.herokuapp.com/"
        );
        setData(response.data);
        setIsLoading(false);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchData();
  }, []);

  let subTotal = 0;
  const fee = 2.5;
  cart.forEach((item) => (subTotal += Number(item.price) * item.quantity));
  let total = subTotal + fee;

  const addToCart = (item) => {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem.id === item.id);

    if (exist) {
      exist.quantity++;
    } else {
      item.quantity = 1;
      newCart.push(item);
    }
    setCart(newCart);
  };

  const clickMinus = (item) => {
    const newCart = [...cart];
    const exist = newCart.find((elem) => elem.id === item.id);
    if (exist.quantity === 1) {
      const index = newCart.indexOf(exist);
      newCart.splice(index, 1);
    } else {
      exist.quantity--;
    }
    setCart(newCart);
  };

  return isLoading ? (
    <span>En cours de chargement...</span>
  ) : (
    <section>
      <Hero restaurant={data.restaurant} />
      <main className="container">
        <div className="part2">
          {data.categories
            .map((elem, index) => {
              return <Category item={elem} addToCart={addToCart} key={index} />;
            })
            .slice(0, 6)}
        </div>
        {/*---------------------------  CART  ----------------------------*/}
        <div className="cart">
          {cart.length > 0 ? (
            <button className="button">Valider mon panier</button>
          ) : (
            <button disabled>Valider mon panier</button>
          )}
          {cart.length > 0 && (
            <div>
              {cart.map((elem, index) => {
                return (
                  <div className="cart1" key={index}>
                    <div>
                      {" "}
                      <span className="icon" onClick={() => clickMinus(elem)}>
                        -
                      </span>
                      <span>{elem.quantity}</span>
                      <span className="icon" onClick={() => addToCart(elem)}>
                        +
                      </span>
                    </div>

                    <span>{elem.title}</span>
                    <span>
                      {(Number(elem.price) * elem.quantity).toFixed(2)} €
                    </span>
                  </div>
                );
              })}
              <p className="bordered cart2">
                <span>Sous-total</span>
                <span>{subTotal.toFixed(2)} €</span>
              </p>
              <p className="cart2">
                <span>Frais</span>
                <span>{fee} €</span>
              </p>
              <p className="bordered cart2">
                <span>Total</span>
                <span>{total.toFixed(2)} €</span>
              </p>
            </div>
          )}
        </div>
      </main>
    </section>
  );
}

export default App;
