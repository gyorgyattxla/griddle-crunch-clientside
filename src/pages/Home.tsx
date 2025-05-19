import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonButton, IonIcon
} from '@ionic/react';
import { cartOutline, closeOutline, walletOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/Api';
import { fetchProducts } from '../api/Api';
 
import { useCart } from '../context/cartContext';
 
import './Home.css';
 
const Home: React.FC = () => {
  const history = useHistory();
  const [cartOpen, setCartOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, removeFromCart, getFinalAmount } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
 
  const toggleCart = () => setCartOpen(prev => !prev);
  const openCart = () => setCartOpen(true);

  const BASE_URL = 'http://localhost:8080';

  const filteredProducts = selectedCategoryId
  ? products.filter(product => product.category_id === selectedCategoryId)
  : products;
 
  useEffect(() => {
    fetchProducts()
      .then(data => setProducts(data))
      .catch(err => setError(err.message));
 
    fetchCategories()
      .then(data => setCategories(data))
      .catch(err => setError(err.message));
  }, []);
 
  return (
 
    <IonPage>    
      <IonHeader>
        <IonToolbar>
          <IonTitle>Griddle & Crunch</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={toggleCart}>
              <IonIcon icon={cartOutline} />
            </IonButton>
            <IonButton onClick={() => history.push('/login')}>Bejelentkezés</IonButton>
            <IonButton onClick={() => history.push('/register')} color="primary">
              Regisztráció
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
 
      <IonContent fullscreen>
        {/* Kosár panel */}
      <div className={`cart-panel ${cartOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h3>Kosár</h3>
          <IonButton fill="clear" onClick={toggleCart}>
            <IonIcon icon={closeOutline} />
          </IonButton>
        </div>
 
        <div className="cart-content">
          {cart.length === 0 ? (
            <p>A kosarad üres.</p>
          ) : (
            <>
<ul>
  {cart.map((item) => (
    <li key={item.id} className="cart-item">
      <div className="cart-item-image">
        {item.image ? (
          <img
            src={`${BASE_URL}/uploads/${item.image}`}
            alt={item.name}
          />
        ) : (
          <div
            style={{
              width: '60px',
              height: '60px',
              backgroundColor: '#eee',
              borderRadius: '6px',
            }}
          />
        )}
      </div>
      <div className="cart-item-info">
        <span>{item.name}</span>
        <span>{item.quantity} x {item.price} Ft</span>
        <IonButton
          fill="clear"
          color="danger"
          size="small"
          onClick={() => removeFromCart(item.id)}
        >
          Törlés
        </IonButton>
      </div>
    </li>
  ))}
</ul>
        <div className="cart-total">
          <h4>Összesen: {getFinalAmount()} Ft</h4>
        </div>
        <div className='checkout-btn'>
          <IonButton onClick={() => history.push('/checkout')}>
          <IonIcon icon={walletOutline}  className='wallet'/> Fizetéshez
          </IonButton>
        </div>
      </>
          )}
         
        </div>
      </div>
 
        {/* Hero szekció */}
        <section className="hero-section">
          <div className="hero-text">
            <h2>Griddle &Crunch</h2>
            <p>Best Fast Foods in your Area</p>
            <button className='order_btn'>ORDER</button>
          </div>
          <div className="hero-image">
            <img src="/assets/fast_foods.png" alt="hero" />
          </div>
        </section>
 
        {/* Infó kártyák */}
        <section className="info-cards">
          <div className="info-card">🚚 Fast Delivery</div>
          <div className="info-card">🥬 Fresh Ingredients</div>
          <div className="info-card">💳 Pay Without Contact</div>
        </section>


             {/* Kategória sáv - görgethető */}
<section className="category-carousel">
  <h2>Kategóriák</h2>
  <div className="category-scroll">
    {(categories.length ? categories : []).map((cat, idx) => (
      <div
  key={idx}
  className="category-slide"
  onClick={() =>
  setSelectedCategoryId((prev) => (prev === cat.id ? null : cat.id))
}
  style={{ cursor: 'pointer' }}
>
  {cat.image ? (
    <img
      src={`${BASE_URL}/uploads/categories/${cat.image}`}
      alt={cat.name}
    />
  ) : (
    <div style={{
      width: '100px',
      height: '100px',
      backgroundColor: '#ccc',
      borderRadius: '6px',
    }} />
  )}
  <p>{cat.name}</p>
</div>
    ))}
  </div>
</section>
 
             {/* Termékek */}
<section className="products">
  <h2>Products</h2>
  <div className="product-grid">
    {(filteredProducts.length ? filteredProducts : []).map((product) => (
      <div className="product-card" key={product.id}>
        {product.image ? (
          <img
            src={`${BASE_URL}/uploads/${product.image}`}
            alt={product.name}
          />
        ) : (
          <div
            style={{
              width: '150px',
              height: '150px',
              backgroundColor: '#eee',
              borderRadius: '8px',
            }}
          />
        )}
        <h4>{product.name}</h4>
        <p>{product.price} Ft</p>
        <IonButton
          size="small"
          onClick={() => {
            addToCart(product);
            openCart();
          }}
        >
          Buy
        </IonButton>
      </div>
    ))}
  </div>
</section>
 
        {/* Banner / Kupon */}
        <section className="promo-banner">
          <div className="promo-content">
            <h3>✨ 25% Off From Your First Order</h3>
            <p>CODE: <strong> WELCOME25</strong></p>
          </div>
        </section>
      </IonContent>
    </IonPage>
   
  );
};
 
export default Home;