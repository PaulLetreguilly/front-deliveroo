const Hero = ({ restaurant }) => {
  return (
    <header>
      <div className="contain">
        <img
          src="https://upload.wikimedia.org/wikipedia/fr/thumb/f/f7/Deliveroo_logo.svg/2560px-Deliveroo_logo.svg.png"
          alt="logo"
        />
        <div className="part1">
          <div>
            <h1>{restaurant.name}</h1>
            <p className="description">{restaurant.description}</p>
          </div>
          <div>
            <img src={restaurant.picture} alt="" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Hero;
