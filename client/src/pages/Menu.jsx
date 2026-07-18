import React from "react";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import PlantDecor from "../components/PlantDecor";

const menuItems = {
  Starters: [
    { name: "Garlic Herb Bruschetta", price: "$8", desc: "Toasted bread, fresh tomato, basil oil" },
    { name: "Creamy Mushroom Soup", price: "$9", desc: "Wild mushrooms, cream, a touch of truffle" },
    { name: "Crispy Zucchini Fritters", price: "$10", desc: "Served with garlic yogurt dip" },
  ],
  "Main Course": [
    { name: "Herb Butter Steak", price: "$24", desc: "Grilled with garden herbs, cooked to order" },
    { name: "Green Basil Pasta", price: "$16", desc: "Fresh basil, parmesan, olive oil" },
    { name: "Golden Saffron Risotto", price: "$19", desc: "Creamy risotto finished with saffron" },
    { name: "Grilled Lemon Chicken", price: "$18", desc: "Charred lemon, rosemary, roasted vegetables" },
  ],
  Desserts: [
    { name: "Molten Chocolate Cake", price: "$8", desc: "Warm centre, vanilla ice cream" },
    { name: "Honey Pistachio Baklava", price: "$7", desc: "Flaky layers, honey syrup, pistachio" },
  ],
  Beverages: [
    { name: "Golden Turmeric Latte", price: "$5", desc: "Warm milk, turmeric, a hint of cinnamon" },
    { name: "Fresh Mint Lemonade", price: "$4", desc: "Mint, lemon, sparkling water" },
  ],
};

function Menu() {
  return (
    <div style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif" }}>
      <section className="py-5 text-center position-relative" style={{ paddingTop: "100px", overflow: "hidden" }}>
        <PlantDecor position="bottom-left" size={120} opacity={0.3} />
        <span style={{ color: "#5B89B5", fontWeight: 600, letterSpacing: "2px" }}>OUR MENU</span>
        <h1 className="display-4 fw-bold mt-2" style={{ fontFamily: "Playfair Display, serif" }}>
          Simple Food, Made Well
        </h1>
        <p style={{ color: "#64748B", maxWidth: "550px" }} className="mx-auto mt-2">
          Nothing overworked, nothing rushed — just good ingredients treated with care.
        </p>
      </section>

      <section className="py-5">
        <div className="container pb-5">
          {Object.entries(menuItems).map(([category, items]) => (
            <div className="mb-5" key={category}>
              <h3
                className="mb-4"
                style={{
                  fontFamily: "Playfair Display, serif",
                  color: "#5B89B5",
                  borderBottom: "1px solid rgba(91,137,181,0.2)",
                  paddingBottom: "12px",
                }}
              >
                {category}
              </h3>

              <div className="row g-4">
                {items.map((item, i) => (
                  <div className="col-md-6 col-lg-4" key={i}>
                    <MenuCard name={item.name} price={item.price} desc={item.desc} />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="py-5 text-center position-relative" style={{ backgroundColor: "#EAF1F8", overflow: "hidden" }}>
        <PlantDecor position="bottom-right" size={130} opacity={0.35} />
        <div className="container py-4">
          <h2 className="fw-bold mb-3" style={{ fontFamily: "Playfair Display, serif" }}>Something Caught Your Eye?</h2>
          <p className="mb-4" style={{ color: "#64748B" }}>Reserve a table and have it fresh, tonight.</p>
          <Link to="/reservation" className="btn btn-lg rounded-3 px-5" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}>
            Reserve a Table
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Menu;