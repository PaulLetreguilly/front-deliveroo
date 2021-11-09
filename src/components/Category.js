import Meal from "./Meal";

const Category = ({ elem, addToCart }) => {
  return (
    <div>
      <h2>{elem.name}</h2>
      <div className="menu">
        {elem.meals.map((elem, index) => {
          return <Meal key={elem.id} meal={elem} addToCart={addToCart} />;
        })}
      </div>
    </div>
  );
};

export default Category;
