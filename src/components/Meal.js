import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Meal = ({ meal, addToCart }) => {
  return (
    <div
      className="meals"
      onClick={() => addToCart(meal.title, meal.price, meal.id)}
    >
      <div className="meal">
        <h3>{meal.title}</h3>
        <p>{meal.description}</p>
        <span className="price">{meal.price} € </span>
        {meal.popular && (
          <span className="popular">
            {" "}
            <FontAwesomeIcon icon="star" /> Populaire
          </span>
        )}
      </div>
      <div className="pic-meal">
        {meal.picture && <img src={meal.picture} alt="" />}
      </div>
    </div>
  );
};

export default Meal;
