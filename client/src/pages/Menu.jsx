import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuCard from "../components/MenuCard";
import PlantDecor from "../components/PlantDecor";
import usePageTitle from "../hooks/usePageTitle";
import lemonade from "../assets/images/lemonade.jpg";
import baklava from "../assets/images/baklava.jpg";
import moltenchocolatecake from "../assets/images/moltenchocolatecake.jpg";
import friedchicken from "../assets/images/friedchicken.jpg";
import Bruschetta from "../assets/images/Bruschetta.jpg";
import Fritters from "../assets/images/Fritters.jpg";
import steak from "../assets/images/steak.jpg";
import Mashroom from "../assets/images/Mashroom.jpg";
import Greenpasta from "../assets/images/Greenpasta.jpg";
import yellowrice from "../assets/images/yellowrice.jpg";
import goldenmilk from "../assets/images/goldenmilk.jpg";


const menuItems = {
  Starters: [
    { name: "Garlic Herb Bruschetta", price: 8, desc: "Toasted bread, fresh tomato, basil oil", image: Bruschetta },
    { name: "Creamy Mushroom Soup", price: 9, desc: "Wild mushrooms, cream, a touch of truffle", image: Mashroom },
    { name: "Crispy Zucchini Fritters", price: 10, desc: "Served with garlic yogurt dip", image: Fritters },
  ],
  "Main Course": [
    { name: "Herb Butter Steak", price: 24, desc: "Grilled with garden herbs, cooked to order", image: steak },
    { name: "Green Basil Pasta", price: 16, desc: "Fresh basil, parmesan, olive oil", image: Greenpasta },
    { name: "Golden Saffron Risotto", price: 19, desc: "Creamy risotto finished with saffron", image: yellowrice },
    { name: "Grilled Lemon Chicken", price: 18, desc: "Charred lemon, rosemary, roasted vegetables", image: friedchicken },
  ],
  Desserts: [
    { name: "Molten Chocolate Cake", price: 8, desc: "Warm centre, vanilla ice cream", image: moltenchocolatecake },
    { name: "Honey Pistachio Baklava", price: 7, desc: "Flaky layers, honey syrup, pistachio", image: baklava },
  ],
  Beverages: [
    { name: "Golden Turmeric Latte", price: 5, desc: "Warm milk, turmeric, a hint of cinnamon", image: goldenmilk},
    { name: "Fresh Mint Lemonade", price: 4, desc: "Mint, lemon, sparkling water", image: lemonade  },
  ],
};

const allCategories = ["All", ...Object.keys(menuItems)];

function Menu() {
  usePageTitle("Menu");
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [maxPrice, setMaxPrice] = useState(30);

  const getFilteredItems = () => {
    let entries = Object.entries(menuItems);

    if (activeCategory !== "All") {
      entries = entries.filter(([category]) => category === activeCategory);
    }

    const filtered = {};
    entries.forEach(([category, items]) => {
      const matchingItems = items.filter(
        (item) =>
          item.price <= maxPrice &&
          (item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.desc.toLowerCase().includes(searchTerm.toLowerCase()))
      );
      if (matchingItems.length > 0) filtered[category] = matchingItems;
    });

    return filtered;
  };

  const filteredMenu = getFilteredItems();
  const hasResults = Object.keys(filteredMenu).length > 0;

  return (
    <div className="page-fade" style={{ backgroundColor: "#F7FAFD", color: "#2D3B4E", fontFamily: "Poppins, sans-serif", overflowX: "hidden" }}>
      <section className="py-5 text-center position-relative" style={{ paddingTop: "100px", overflow: "hidden" }}>
        <PlantDecor position="bottom-left" size={100} opacity={0.25} />
        <span style={{ color: "#5B89B5", fontWeight: 600, letterSpacing: "2px", fontSize: "0.85rem" }}>OUR MENU</span>
        <h1
          className="fw-bold mt-2 px-3"
          style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.6rem, 4vw, 2.8rem)" }}
        >
          Simple Food, Made Well
        </h1>
        <p style={{ color: "#64748B", maxWidth: "550px", fontSize: "clamp(0.85rem, 2vw, 1rem)" }} className="mx-auto mt-2 px-3">
          Nothing overworked, nothing rushed — just good ingredients treated with care.
        </p>
      </section>

      <section className="pb-2">
        <div className="container">
          <div className="row g-3 align-items-end mb-3">
            <div className="col-12 col-md-5">
              <label style={{ color: "#64748B", fontSize: "0.85rem" }}>Search dishes</label>
              <input
                type="text"
                placeholder="Search by name or ingredient..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="form-control mt-1"
                style={{ backgroundColor: "#FFFFFF", color: "#2D3B4E", border: "1px solid rgba(91,137,181,0.2)" }}
              />
            </div>

            <div className="col-12 col-md-4">
              <label style={{ color: "#64748B", fontSize: "0.85rem" }}>
                Max Price: <strong style={{ color: "#5B89B5" }}>${maxPrice}</strong>
              </label>
              <input
                type="range"
                min="4"
                max="30"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="form-range mt-2"
                style={{ accentColor: "#5B89B5" }}
              />
            </div>

            <div className="col-12 col-md-3 d-flex flex-wrap gap-2">
              {allCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  className="btn btn-sm rounded-pill px-3"
                  style={{
                    backgroundColor: activeCategory === cat ? "#5B89B5" : "transparent",
                    color: activeCategory === cat ? "#fff" : "#2D3B4E",
                    border: "1px solid rgba(91,137,181,0.3)",
                    fontSize: "0.75rem",
                  }}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-4">
        <div className="container pb-5">
          {!hasResults ? (
            <div className="text-center py-5">
              <p style={{ color: "#94A3B8" }}>No dishes match this filter. Try a different search or price range.</p>
            </div>
          ) : (
            Object.entries(filteredMenu).map(([category, items]) => (
              <div className="mb-5" key={category}>
                <h3
                  className="mb-4"
                  style={{
                    fontFamily: "Playfair Display, serif",
                    color: "#5B89B5",
                    borderBottom: "1px solid rgba(91,137,181,0.2)",
                    paddingBottom: "12px",
                    fontSize: "clamp(1.2rem, 3vw, 1.6rem)",
                  }}
                >
                  {category}
                </h3>

                <div className="row g-4">
                  {items.map((item, i) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={i}>
                      <MenuCard name={item.name} price={`$${item.price}`} desc={item.desc} image={item.image} />
                    </div>
                  ))}
                </div>
              </div>
            ))
          )}
        </div>
      </section>

      <section className="py-5 text-center position-relative" style={{ backgroundColor: "#EAF1F8", overflow: "hidden" }}>
        <PlantDecor position="bottom-right" size={110} opacity={0.3} />
        <div className="container py-4 px-3">
          <h2 className="fw-bold mb-3" style={{ fontFamily: "Playfair Display, serif", fontSize: "clamp(1.3rem, 3.5vw, 2rem)" }}>
            Something Caught Your Eye?
          </h2>
          <p className="mb-4" style={{ color: "#64748B", fontSize: "0.95rem" }}>Reserve a table and have it fresh, tonight.</p>
          <Link to="/reservation" className="btn rounded-3 px-5 py-2" style={{ backgroundColor: "#5B89B5", color: "#fff", fontWeight: 600 }}>
            Reserve a Table
          </Link>
        </div>
      </section>
    </div>
  );
}

export default Menu;