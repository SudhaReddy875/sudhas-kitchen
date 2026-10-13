
import { useEffect, useRef, useState } from "react";
import {
  Routes,
  Route,
  NavLink,
  Link,
  Outlet,
  useParams,
  useSearchParams,
  useNavigate
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toggleFavorite } from "./store/favoritesSlice";
import { dishes as initialDishes } from "./data/dishes";
import { useCart } from "./context/CartContext";
import useFetchData from "./hooks/useFetchData";

const PHONE = "7780278702";
const ADDRESS =
  "Sirivella Metta, on the highway, opposite Sher-e-Punjab Dhaba";

function Header() {
  const { cart } = useCart();
  const favorites = useSelector((state) => state.favorites);

  const links = [
    ["/", "Home"],
    ["/about", "About"],
    ["/menu", "Menu"],
    ["/services", "Services"],
    ["/reservations", "Reservations"],
    ["/contact", "Contact"],
    ["/customers", "Customers"],
    ["/admin", "Manage Menu"]
  ];

  return (
    <header className="header">
      <Link to="/" className="brand">
        <span className="brand-icon">SK</span>
        <span>
          <strong>Sudha's Kitchen</strong>
          <small>Authentic Rayalaseema Flavours</small>
        </span>
      </Link>

      <nav className="nav">
        {links.map(([path, label]) => (
          <NavLink
            key={path}
            to={path}
            end={path === "/"}
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="header-actions">
        <Link to="/favorites" className="small-action">
          ♥ {favorites.length}
        </Link>
        <Link to="/cart" className="small-action">
          🛒 {cart.length}
        </Link>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <h3>Sudha's Kitchen</h3>
      <p>Bringing the bold, spicy taste of Rayalaseema to your table.</p>
      <p>Owner: Sudha Raghunatha Reddy</p>
      <p>
        Phone: <a href={`tel:${PHONE}`}>{PHONE}</a>
      </p>
      <p>{ADDRESS}</p>
      <small>© {new Date().getFullYear()} Sudha's Kitchen</small>
    </footer>
  );
}

function DishCard({ dish, onDelete }) {
  const { dispatch: cartDispatch } = useCart();
  const dispatch = useDispatch();
  const favorites = useSelector((state) => state.favorites);
  const isFavorite = favorites.some((item) => item.id === dish.id);

  return (
    <article className="dish-card">
      <Link to={`/menu/${dish.id}`} className="dish-image-link">
        <img src={dish.image} alt={dish.name} className="dish-image" />
      </Link>

      <div className="dish-content">
        <div className="dish-topline">
          <span className="category-tag">{dish.category}</span>
          <button
            className={isFavorite ? "heart selected" : "heart"}
            onClick={() => dispatch(toggleFavorite(dish.id))}
            aria-label="Toggle favourite"
          >
            {isFavorite ? "♥" : "♡"}
          </button>
        </div>

        <h3>
          <Link to={`/menu/${dish.id}`}>{dish.name}</Link>
        </h3>
        <p>{dish.description}</p>

        <div className="dish-bottom">
          <strong className="price">₹{dish.price}</strong>
          <button
            className="button button-small"
            onClick={() => cartDispatch({ type: "ADD", dish })}
          >
            Add to Cart
          </button>
        </div>

        {onDelete && (
          <button
            className="button button-danger button-small full-button"
            onClick={() => onDelete(dish.id)}
          >
            Delete Dish
          </button>
        )}
      </div>
    </article>
  );
}

function Home() {
  const featured = initialDishes.slice(0, 3);

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">A TASTE OF ANDHRA TRADITION</span>
          <h1>Bold spices.<br />Warm hospitality.</h1>
          <p>
            Discover the fiery, earthy and unforgettable flavours of
            Rayalaseema, prepared with love at Sudha's Kitchen.
          </p>
          <div className="hero-buttons">
            <Link to="/menu" className="button">Explore Our Menu</Link>
            <Link to="/reservations" className="button button-outline">
              Book a Table
            </Link>
          </div>
          <div className="hero-note">
            <span>✦</span> Authentic regional recipes · Made with care
          </div>
        </div>

        <div className="hero-visual">
          <img
            src="https://images.unsplash.com/photo-1565557623262-b51c2513a641?auto=format&fit=crop&w=1000&q=85"
            alt="Traditional Indian curry served with rice"
          />
          <div className="hero-stamp">
            <strong>100%</strong>
            <span>Andhra Soul</span>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">FROM OUR KITCHEN</span>
            <h2>Local favourites</h2>
            <p>Explore the dishes that bring Rayalaseema to your plate.</p>
          </div>
          <Link to="/menu" className="text-link">View Full Menu →</Link>
        </div>

        <div className="dish-grid">
          {featured.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      </section>

      <section className="story-banner">
        <div>
          <span className="eyebrow">ROOTED IN TRADITION</span>
          <h2>Every dish tells a story.</h2>
          <p>
            From comforting ragi sangati to fiery country chicken pulusu,
            experience the distinctive food culture of Rayalaseema.
          </p>
          <Link to="/about" className="button">Our Story</Link>
        </div>
        <div className="story-stats">
          <div><strong>10+</strong><span>Menu favourites</span></div>
          <div><strong>Andhra</strong><span>Regional flavours</span></div>
          <div><strong>Fresh</strong><span>Prepared with care</span></div>
        </div>
      </section>
    </>
  );
}

function About() {
  return (
    <section className="page section">
      <span className="eyebrow">OUR STORY</span>
      <h1>Welcome to Sudha's Kitchen</h1>
      <p className="lead">
        A restaurant celebrating the bold, rustic and soulful food traditions
        of Andhra Pradesh, with a special love for Rayalaseema cuisine.
      </p>

      <div className="about-grid">
        <img
          src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1000&q=85"
          alt="Indian food prepared for sharing"
        />
        <div>
          <h2>Our philosophy</h2>
          <p>
            We celebrate the signature chilli heat, fragrant spices, tangy
            flavours and homestyle preparations that make regional Andhra
            food special.
          </p>
          <p>
            Our menu highlights dishes such as ragi sangati, natu kodi
            pulusu, gutti vankaya and gongura pachadi.
          </p>
          <h3>Meet the owner</h3>
          <p><strong>Sudha Raghunatha Reddy</strong></p>
          <p>
            Sudha's Kitchen is a celebration of traditional food, local
            flavours and the pleasure of sharing a hearty meal.
          </p>
        </div>
      </div>
    </section>
  );
}

function Menu() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [menuItems, setMenuItems] = useState(initialDishes);
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "All";

  const categories = [
    "All", ...new Set(initialDishes.map((dish) => dish.category))
  ];

  const filteredDishes = menuItems.filter((dish) => {
    const matchesSearch =
      dish.name.toLowerCase().includes(search.toLowerCase()) ||
      dish.description.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      category === "All" || dish.category === category;

    return matchesSearch && matchesCategory;
  });

  function updateFilter(key, value) {
    const next = new URLSearchParams(searchParams);

    if (!value || value === "All") {
      next.delete(key);
    } else {
      next.set(key, value);
    }

    setSearchParams(next);
  }

  return (
    <section className="page section">
      <span className="eyebrow">AUTHENTIC ANDHRA CUISINE</span>
      <h1>Our Menu</h1>
      <p className="lead">
        From comforting vegetarian dishes to fiery Rayalaseema favourites,
        find something to love.
      </p>

      <div className="menu-filters">
        <input
          aria-label="Search dishes"
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => updateFilter("search", e.target.value)}
        />

        <select
          aria-label="Filter by category"
          value={category}
          onChange={(e) => updateFilter("category", e.target.value)}
        >
          {categories.map((item) => (
            <option key={item} value={item}>{item}</option>
          ))}
        </select>
      </div>

      <p className="results-count">
        Showing {filteredDishes.length} dishes
      </p>

      {filteredDishes.length > 0 ? (
        <div className="dish-grid">
          {filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No dishes found</h3>
          <p>Try a different search or category.</p>
          <button
            className="button"
            onClick={() => setSearchParams({})}
          >
            Clear Filters
          </button>
        </div>
      )}
    </section>
  );
}

function DishDetails() {
  const { id } = useParams();
  const dish = initialDishes.find((item) => item.id === Number(id));
  const navigate = useNavigate();
  const { dispatch } = useCart();

  if (!dish) {
    return (
      <section className="page section empty-state">
        <h1>Dish not found</h1>
        <p>This dish may no longer be available.</p>
        <button className="button" onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </section>
    );
  }

  return (
    <section className="page section detail-layout">
      <img src={dish.image} alt={dish.name} className="detail-image" />
      <div>
        <span className="eyebrow">{dish.category}</span>
        <h1>{dish.name}</h1>
        <p className="lead">{dish.description}</p>
        <p><strong>Spice level:</strong> {dish.spicy}</p>
        <p><strong>Type:</strong> {dish.vegetarian ? "Vegetarian" : "Non-vegetarian"}</p>
        <h2 className="price">₹{dish.price}</h2>
        <button
          className="button"
          onClick={() => dispatch({ type: "ADD", dish })}
        >
          Add to Cart
        </button>
        <button className="button button-outline back-button" onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    </section>
  );
}

function ServicesLayout() {
  return (
    <section className="page section">
      <span className="eyebrow">HOW WE SERVE YOU</span>
      <h1>Our Services</h1>
      <p className="lead">
        Traditional flavours, welcoming hospitality and convenient options.
      </p>
      <nav className="subnav">
        <NavLink to="/services/dine-in">Dine-in</NavLink>
        <NavLink to="/services/takeaway">Takeaway</NavLink>
        <NavLink to="/services/celebrations">Celebrations</NavLink>
      </nav>
      <div className="nested-content">
        <Outlet />
      </div>
    </section>
  );
}

function ServiceDetail({ title, description, icon }) {
  return (
    <div className="service-detail">
      <span className="service-icon">{icon}</span>
      <h2>{title}</h2>
      <p>{description}</p>
      <Link to="/contact" className="text-link">Contact us to enquire →</Link>
    </div>
  );
}

function Favorites() {
  const favorites = useSelector((state) => state.favorites);
  const favoriteDishes = initialDishes.filter((dish) =>
    favorites.some((item) => item.id === dish.id)
  );

  return (
    <section className="page section">
      <span className="eyebrow">SAVED FOR LATER</span>
      <h1>Your Favourite Dishes</h1>
      {favoriteDishes.length ? (
        <div className="dish-grid">
          {favoriteDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <h3>No favourites yet</h3>
          <p>Tap the heart on a dish to save it here.</p>
          <Link to="/menu" className="button">Explore Menu</Link>
        </div>
      )}
    </section>
  );
}

function Cart() {
  const { cart, dispatch } = useCart();

  const total = cart.reduce((sum, dish) => sum + dish.price, 0);

  return (
    <section className="page section">
      <span className="eyebrow">YOUR SELECTION</span>
      <h1>Your Cart</h1>

      {cart.length === 0 ? (
        <div className="empty-state">
          <h3>Your cart is empty</h3>
          <p>Add your favourite Rayalaseema dishes to get started.</p>
          <Link to="/menu" className="button">Browse Menu</Link>
        </div>
      ) : (
        <div className="cart-panel">
          {cart.map((dish, index) => (
            <div className="cart-row" key={`${dish.id}-${index}`}>
              <img src={dish.image} alt={dish.name} />
              <div className="cart-item-info">
                <strong>{dish.name}</strong>
                <span>₹{dish.price}</span>
              </div>
              <button
                className="button button-danger button-small"
                onClick={() => dispatch({ type: "REMOVE", index })}
              >
                Remove
              </button>
            </div>
          ))}
          <div className="cart-total">
            <strong>Total</strong>
            <strong className="price">₹{total}</strong>
          </div>
          <p className="muted">
            This is a frontend demo; online payment and order submission are
            not connected.
          </p>
          <button
            className="button button-outline"
            onClick={() => dispatch({ type: "CLEAR" })}
          >
            Clear Cart
          </button>
        </div>
      )}
    </section>
  );
}

function Reservations() {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    guests: "2",
    requests: ""
  });
  const [message, setMessage] = useState("");

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setMessage("");
  }

  function handleSubmit(e) {
    e.preventDefault();

    if (!/^[6-9]\d{9}$/.test(form.phone)) {
      setMessage("Enter a valid 10-digit Indian mobile number.");
      return;
    }

    if (form.date < new Date().toLocaleDateString("en-CA")) {
      setMessage("Please choose today or a future date.");
      return;
    }

    setMessage(
      `Thank you, ${form.name}! Your demo reservation request has been recorded on this page. Please call ${PHONE} to confirm your table.`
    );
  }

  return (
    <section className="page section">
      <span className="eyebrow">JOIN US AT THE TABLE</span>
      <h1>Reserve a Table</h1>
      <p className="lead">
        Planning a meal with family or friends? Send a reservation request.
      </p>

      <form className="form-card" onSubmit={handleSubmit}>
        <div className="form-grid">
          <label>
            Full Name
            <input name="name" value={form.name} onChange={handleChange} required />
          </label>
          <label>
            Phone Number
            <input
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              pattern="[6-9][0-9]{9}"
              title="Enter a valid 10-digit Indian mobile number"
              required
            />
          </label>
          <label>
            Date
            <input
              name="date"
              type="date"
              min={new Date().toLocaleDateString("en-CA")}
              value={form.date}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Time
            <select name="time" value={form.time} onChange={handleChange} required>
              <option value="">Select a time</option>
              <option>12:00 PM</option>
              <option>1:00 PM</option>
              <option>2:00 PM</option>
              <option>7:00 PM</option>
              <option>8:00 PM</option>
              <option>9:00 PM</option>
            </select>
          </label>
          <label>
            Guests
            <select name="guests" value={form.guests} onChange={handleChange}>
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>
              ))}
            </select>
          </label>
          <label className="full-field">
            Special Requests
            <textarea
              name="requests"
              value={form.requests}
              onChange={handleChange}
              rows="3"
              placeholder="Any food preferences or special occasions?"
            />
          </label>
        </div>

        <button className="button" type="submit">Submit Request</button>
        {message && <p className="form-message" role="status">{message}</p>}
        <p className="muted">
          Demo only: requests are not saved to a server. Call {PHONE} to confirm.
        </p>
      </form>
    </section>
  );
}

function Contact() {
  const phoneRef = useRef(null);
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  useEffect(() => {
    document.title = "Contact | Sudha's Kitchen";
    return () => {
      document.title = "Sudha's Kitchen | Rayalaseema Cuisine";
    };
  }, []);

  function submitContact(e) {
    e.preventDefault();

    if (!form.name.trim() || !/^\S+@\S+\.\S+$/.test(form.email) ||
        !form.message.trim()) {
      setStatus("Please enter a valid name, email and message.");
      return;
    }

    setStatus("Thank you! Your message passed validation. This demo does not send messages to a server.");
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <section className="page section">
      <span className="eyebrow">WE WOULD LOVE TO HEAR FROM YOU</span>
      <h1>Contact Us</h1>

      <div className="contact-grid">
        <div className="contact-info">
          <h2>Visit Sudha's Kitchen</h2>
          <p><strong>Owner:</strong> Sudha Raghunatha Reddy</p>
          <p><strong>Phone:</strong> <a href={`tel:${PHONE}`}>{PHONE}</a></p>
          <p><strong>Location:</strong> {ADDRESS}</p>
          <button
            className="button button-outline"
            onClick={() => phoneRef.current?.focus()}
          >
            Enter your phone number
          </button>
          <label className="phone-focus-label">
            Your phone number
            <input ref={phoneRef} type="tel" placeholder="10-digit mobile number" />
          </label>
        </div>

        <form className="form-card" onSubmit={submitContact}>
          <h2>Send an Enquiry</h2>
          <label>
            Name
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              required
            />
          </label>
          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              required
            />
          </label>
          <label>
            Message
            <textarea
              rows="4"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              required
            />
          </label>
          <button className="button" type="submit">Send Message</button>
          {status && <p className="form-message" role="status">{status}</p>}
        </form>
      </div>
    </section>
  );
}

function Customers() {
  const { data, loading, error } = useFetchData(
    "https://jsonplaceholder.typicode.com/users"
  );

  const localNames = [
    "Arjun Reddy", "Lakshmi Devi", "Karthik Kumar", "Sravani Reddy",
    "Venkatesh Rao", "Anusha Devi", "Sai Krishna", "Harika Reddy",
    "Praveen Kumar", "Divya Lakshmi"
  ];

  const localPhones = [
    "9876543210", "9867452310", "9849012345", "9988776655",
    "9701234567", "9398765432", "9123456789", "9012345678",
    "8899776655", "8765432109"
  ];

  if (loading) return <section className="page section"><h1>Customer Directory</h1><p>Loading customer data...</p></section>;
  if (error) return <section className="page section"><h1>Customer Directory</h1><p role="alert">{error}</p></section>;

  return (
    <section className="page section">
      <span className="eyebrow">API INTEGRATION</span>
      <h1>Customer Directory</h1>
      <p className="lead">
        Example customer records loaded through Axios from a public demo API.
      </p>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>ID</th><th>Name</th><th>Username</th><th>Email</th>
              <th>Phone</th><th>Website</th><th>City</th>
            </tr>
          </thead>
          <tbody>
            {data.map((user, index) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{localNames[index % localNames.length]}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{localPhones[index % localPhones.length]}</td>
                <td>{user.website}</td>
                <td>{user.address?.city}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="muted">
        The names and phone numbers shown here are display examples. The
        remaining fields come from the demo API.
      </p>
    </section>
  );
}

function ManageMenu() {
  const [items, setItems] = useState(initialDishes);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: "",
    category: "Traditional",
    price: "",
    description: ""
  });
  const [notice, setNotice] = useState("");

  function updateField(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  function submitDish(e) {
    e.preventDefault();

    if (!form.name.trim() || !form.description.trim() ||
        !Number.isFinite(Number(form.price)) || Number(form.price) <= 0) {
      setNotice("Enter a dish name, description and a valid positive price.");
      return;
    }

    if (editingId !== null) {
      setItems((current) =>
        current.map((dish) =>
          dish.id === editingId
            ? { ...dish, ...form, price: Number(form.price) }
            : dish
        )
      );
      setNotice("Dish updated successfully.");
    } else {
      const newDish = {
        ...form,
        id: Math.max(0, ...items.map((dish) => dish.id)) + 1,
        price: Number(form.price),
        image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
        spicy: "Medium",
        vegetarian: true
      };

      setItems((current) => [...current, newDish]);
      setNotice("Dish added successfully.");
    }

    setForm({ name: "", category: "Traditional", price: "", description: "" });
    setEditingId(null);
  }

  function editDish(dish) {
    setEditingId(dish.id);
    setForm({
      name: dish.name,
      category: dish.category,
      price: String(dish.price),
      description: dish.description
    });
    setNotice("");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function deleteDish(id) {
    setItems((current) => current.filter((dish) => dish.id !== id));
    if (editingId === id) {
      setEditingId(null);
      setForm({ name: "", category: "Traditional", price: "", description: "" });
    }
    setNotice("Dish deleted from this demo menu.");
  }

  return (
    <section className="page section">
      <span className="eyebrow">ADMIN DEMO</span>
      <h1>Manage Menu</h1>
      <p className="lead">
        Create, read, update and delete dishes using React state.
      </p>

      <form className="form-card admin-form" onSubmit={submitDish}>
        <h2>{editingId !== null ? "Edit Dish" : "Add New Dish"}</h2>
        <div className="form-grid">
          <label>
            Dish Name
            <input name="name" value={form.name} onChange={updateField} required />
          </label>
          <label>
            Category
            <select name="category" value={form.category} onChange={updateField}>
              {["Traditional", "Non-Veg", "Vegetarian", "Biryani", "Meals", "Snacks", "Breakfast"].map((item) => (
                <option key={item}>{item}</option>
              ))}
            </select>
          </label>
          <label>
            Price (₹)
            <input name="price" type="number" min="1" value={form.price} onChange={updateField} required />
          </label>
          <label>
            Description
            <input name="description" value={form.description} onChange={updateField} required />
          </label>
        </div>
        <div className="button-row">
          <button className="button" type="submit">
            {editingId !== null ? "Save Changes" : "Add Dish"}
          </button>
          {editingId !== null && (
            <button
              className="button button-outline"
              type="button"
              onClick={() => {
                setEditingId(null);
                setForm({ name: "", category: "Traditional", price: "", description: "" });
                setNotice("");
              }}
            >
              Cancel Edit
            </button>
          )}
        </div>
        {notice && <p className="form-message" role="status">{notice}</p>}
      </form>

      <h2 className="admin-list-title">Current Dishes ({items.length})</h2>
      <div className="admin-list">
        {items.map((dish) => (
          <div className="admin-row" key={dish.id}>
            <div>
              <strong>{dish.name}</strong>
              <span>{dish.category} · ₹{dish.price}</span>
            </div>
            <div className="button-row">
              <button className="button button-small" onClick={() => editDish(dish)}>
                Edit
              </button>
              <button className="button button-danger button-small" onClick={() => deleteDish(dish.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      <p className="muted">
        CRUD changes are stored in memory and reset when the page reloads.
        This is a frontend demonstration, not a persistent database.
      </p>
    </section>
  );
}

function NotFound() {
  return (
    <section className="page section empty-state">
      <h1>404 — Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="button">Return Home</Link>
    </section>
  );
}

export default function App() {
  useEffect(() => {
    document.title = "Sudha's Kitchen | Rayalaseema Cuisine";
  }, []);

  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/menu/:id" element={<DishDetails />} />
          <Route path="/services" element={<ServicesLayout />}>
            <Route index element={<ServiceDetail title="Our Services" description="Choose dine-in, takeaway or enquire about a special celebration." icon="🍽️" />} />
            <Route path="dine-in" element={<ServiceDetail title="Dine-in Experience" description="Enjoy a relaxed meal with traditional regional flavours and warm hospitality." icon="🍛" />} />
            <Route path="takeaway" element={<ServiceDetail title="Takeaway" description="Planning a meal at home? Call us to enquire about takeaway availability." icon="🥡" />} />
            <Route path="celebrations" element={<ServiceDetail title="Family Celebrations" description="Contact us to discuss food arrangements for family gatherings and special occasions." icon="🎉" />} />
          </Route>
          <Route path="/reservations" element={<Reservations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/customers" element={<Customers />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<ManageMenu />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}
