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
  const [toCart, setToCart] = useState([]); // tableau (vide initialement) d'objet pour le panier
  const [cartPrice, setCartPrice] = useState(0); // état utilisé pour le prix total du panier
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

  const addToCart = (name, price, index) => {
    // fonction utilisé pour le panier (quand on clique sur un des menus)
    const goToCart = [...toCart];
    const newCart = [...cart];

    if (newCart.indexOf(index) === -1) {
      goToCart.push({
        id: { index },
        name: { name },
        price: { price },
        num: 1,
      });
      newCart.push(index);
      setCart(newCart);
      setToCart(goToCart);
    } else {
      goToCart[newCart.indexOf(index)].num =
        goToCart[newCart.indexOf(index)].num + 1;
      setToCart(goToCart);
    }

    const newPrice = cartPrice + Number(price);
    setCartPrice(newPrice);
  };

  const clickMinus = (index) => {
    const goToCart = [...toCart];
    setToCart(goToCart);
    const add = toCart[index].num;
    if (add > 0) {
      goToCart[index].num = add - 1;
      setToCart(goToCart);
    } else {
      goToCart.splice(index, 1);
      setToCart(goToCart);
    }
    const newPrice = cartPrice - Number(toCart[index].price.price);
    setCartPrice(newPrice);
  };
  const clickPlus = (index) => {
    const goToCart = [...toCart];
    const add = toCart[index].num;
    goToCart[index].num = add + 1;
    setToCart(goToCart);
    const newPrice = cartPrice + Number(toCart[index].price.price);
    setCartPrice(newPrice);
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
              return <Category elem={elem} addToCart={addToCart} />;
            })
            .slice(0, 6)}
        </div>
        {/*---------------------------  CART  ----------------------------*/}
        <div className="cart">
          {toCart.length > 0 ? (
            <button className="button">Valider mon panier</button>
          ) : (
            <button disabled>Valider mon panier</button>
          )}
          {Number(cartPrice) !== 0 &&
            toCart.map((elem, index) => {
              return (
                <div className="cart1" key={index}>
                  <span>
                    <FontAwesomeIcon
                      className="icon"
                      icon="minus"
                      onClick={() => clickMinus(index)}
                    />

                    {elem.num}
                    <FontAwesomeIcon
                      className="icon"
                      icon="plus"
                      onClick={() => clickPlus(index)}
                    />
                  </span>
                  <span>{elem.name.name}</span>

                  <span>{Number(elem.price.price) * elem.num} €</span>
                </div>
              );
            })}
          {Number(cartPrice) !== 0 ? (
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
