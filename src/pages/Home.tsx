import {
  IonContent, IonHeader, IonPage, IonTitle, IonToolbar,
  IonButtons, IonButton, IonIcon,
 
} from '@ionic/react';
import { cartOutline, closeOutline, walletOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { fetchCategories } from '../api/Api';
import { fetchProducts } from '../api/Api';

import { useCart } from '../context/cartContext';
 
import './Home.css';
import { clearUserData, getUserId } from '../utils/auth';

const STORAGE_KEY = 'griddle_crunch_cart';
 
const Home: React.FC = () => {
  
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

  useEffect(() => {
    const userId = getUserId();
    setIsLoggedIn(!!userId);
  }, []);

  const handleLogout = () => {
    clearUserData();
    setIsLoggedIn(false);
    history.push('/');
  };

  const history = useHistory();
  const [cartOpen, setCartOpen] = useState(false);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [categories, setCategories] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [products, setProducts] = useState<any[]>([]);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, setError] = useState<string | null>(null);
  const { cart, addToCart, removeFromCart, getFinalAmount, setCartFromStorage } = useCart();
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);

   // Betöltés localStorage-ból a komponens indulásakor
useEffect(() => {
  const savedCart = localStorage.getItem(STORAGE_KEY);
  if (savedCart) {
    try {
      const parsedCart = JSON.parse(savedCart);
      setCartFromStorage(parsedCart);
    } catch {
      console.warn('Kosár betöltése sikertelen a localStorage-ból');
    }
  }
}, [setCartFromStorage]);

  // Kosár változásakor mentés localStorage-ba
  useEffect(() => {
    if (cart.length) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [cart]);
 
  const toggleCart = () => setCartOpen(prev => !prev);
  const openCart = () => setCartOpen(true);

  const BASE_URL = 'https://dev01.szitar.net';

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

  interface OpenHour {
  day_name: string;
  open_time: string;
  close_time: string;
  }
  const [openHours, setOpenHours] = useState<OpenHour[]>([]);
  useEffect(() => {
    fetch(`${BASE_URL}/api/get-open-hours`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => setOpenHours(data))
      .catch(error => console.error('Error fetching open hours:', error));
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
            <IonButtons slot="end">
              {!isLoggedIn && (
                <>
                <IonButton onClick={() => history.push('/login')}>Bejelentkezés</IonButton>
                <IonButton onClick={() => history.push('/register')} color="primary">
                Regisztráció
                </IonButton>
              </>
              )}
              {isLoggedIn && (
                <IonButton onClick={() => { handleLogout(); window.location.reload(); }}>
                    Kijelentkezés
                </IonButton>
              )}
            </IonButtons>
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
    src={item.image.includes('uploads/')
      ? item.image
      : `${BASE_URL}/uploads/${item.image}`
    }
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
            <p>Legjobb ételek a környékeden</p>
          </div>
          <div className="hero-image">
            <img src="/assets/fast_foods.png" alt="hero" />
          </div>
        </section>
 
        {/* Infó kártyák */}
        <section className="info-cards">
          <div className="info-card">🚚 Gyors szállítás</div>
          <div className="info-card">🥬 Friss alapanyagok</div>
          <div className="info-card">💳 Fizess érintkezés nélkül</div>
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
      <div
        className="product-card"
        key={product.id}
        onClick={() => history.push(`/product/${product.id}`)}
        style={{ cursor: 'pointer', position: 'relative' }}
      >
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

        {/* Buy gomb – kattintás megállítása, ne navigáljon */}
        <IonButton
          size="small"
          onClick={(e) => {
            e.stopPropagation(); // Ne triggerelje a kártya onClick-jét
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
 


        <footer className="footer p-4 bg-white rounded-xl shadow-md">
          
          <div className="flex justify-center items-center mb-4">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Kapcsolat</h2>
            <IonButton
              onClick={() => history.push('/contact')}
              className="bg-blue-500 text-white rounded-lg px-4 py-2"
            >
              Kapcsolatfelvétel
            </IonButton>
          </div>

          
          <div className="grid gap-3">
            <h2 className="text-xl font-semibold mb-4 text-center text-gray-800">Nyitvatartás</h2>
            {openHours.map((item, index) => (
              <div
                key={index}
                className="flex justify-between items-center px-4 py-2 bg-gray-50 rounded-lg border border-gray-200"
              >
                <span className="text-gray-700 font-medium">{item.day_name}: </span>
                <span className="text-gray-600">{item.open_time} - {item.close_time}</span>
              </div>
            ))}
          </div>
          
        </footer>
        <div className="footer text-center mt-4">
            <h1>
              <span className="text-gray-600">Griddle & Crunch</span>
              <span className="text-gray-600"> © 2025</span>
              <span className="text-gray-600"> Minden jog fenntartva.</span>
            </h1>
          </div>
      </IonContent>
        
    </IonPage>
   
  );
};
 
export default Home;