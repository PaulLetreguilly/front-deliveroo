import Meal from "./Meal";

const Category = ({ item, addToCart }) => {
  return (
    <div>
      <h2>{item.title}</h2>
      <div className="menu">
        {item.meals.map((elem, index) => {
          return (
            <Meal
              key={elem.id}
              meal={elem}
              addToCart={addToCart}
              index={index}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Category;
