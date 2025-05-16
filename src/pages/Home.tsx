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

  const toggleCart = () => setCartOpen(prev => !prev);

  useEffect(() => {
    fetchCategories().then(setCategories).catch(() => {});
    fetchProducts().then(setProducts).catch(() => {});
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
            {(categories.length ? categories : [
              { name: 'Zöldség', iconUrl: '/assets/ad-image-1.png' },
              { name: 'Gyümölcs', iconUrl: '/assets/ad-image-2.png' },
              { name: 'Ital', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Snack', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Hús', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Tejtermék', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Tejtermék', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Tejtermék', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Tejtermék', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Tejtermék', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Tejtermék', iconUrl: '/assets/ad-image-3.png' },
              { name: 'Tejtermék', iconUrl: '/assets/ad-image-3.png' }
            ]).map((cat, idx) => (
              <div key={idx} className="category-box">
                <img src={cat.iconUrl} alt={cat.name} />
                <p>{cat.name}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Termékek */}
        <section className="products">
          <h2>Products</h2>
          <div className="product-grid">
            {(products.length ? products : [
              { id: 1, name: 'Uborka', price: 450, imageUrl: '/assets/thumb-cucumber.png' },
              { id: 2, name: 'Paradicsom', price: 399, imageUrl: '/assets/product-thumb-1.png' },
              { id: 3, name: 'Paradicsom', price: 399, imageUrl: '/assets/product-thumb-1.png' },
              { id: 4, name: 'Paradicsom', price: 399, imageUrl: '/assets/product-thumb-1.png' },
              { id: 5, name: 'Paradicsom', price: 399, imageUrl: '/assets/product-thumb-1.png' },
              { id: 6, name: 'Paradicsom', price: 399, imageUrl: '/assets/product-thumb-1.png' }
            ]).map(product => (
              <div className="product-card" key={product.id}>
                <img src={product.imageUrl} alt={product.name} />
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
