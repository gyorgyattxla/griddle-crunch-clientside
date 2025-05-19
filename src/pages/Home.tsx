import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonButton, IonIcon
} from '@ionic/react';
import { cartOutline, closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/categoryApi';
import { fetchProducts } from '../api/productApi';
import 'swiper/css';
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

  const BASE_URL = 'http://localhost:8080';

  const toggleCart = () => setCartOpen(prev => !prev);

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
            <p>A kosarad üres.</p>
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

        {/* Kategória sáv*/}
<section className="category-carousel">
  <h2>Kategóriák</h2>
  <div className="category-scroll">
    {(categories.length ? categories : []).map((cat, idx) => (
      <div key={idx} className="category-slide">
        {cat.image ? (
          <img src={`${BASE_URL}/uploads/categories/${cat.image}`} alt={cat.name} />
        ) : (
          <div style={{width: '100px', height: '100px', backgroundColor: '#ccc'}} />
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
    {(products.length ? products : []).map(product => (
      <div className="product-card" key={product.id}>
        {product.image ? (
          <img src={`${BASE_URL}/uploads/${product.image}`} alt={product.name} />
        ) : (
          <div style={{width: '150px', height: '150px', backgroundColor: '#eee'}} />
        )}
        <h4>{product.name}</h4>
        <p>{product.price} Ft</p>
        <IonButton size="small">Buy</IonButton>
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
