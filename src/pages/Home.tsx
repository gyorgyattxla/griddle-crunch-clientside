import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButtons,
  IonButton,
  IonIcon
} from '@ionic/react';
import { cartOutline, closeOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useState } from 'react';
import './Home.css';

// Swiper CSS importálása külön fájlban is kell!
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const Home: React.FC = () => {
  const history = useHistory();
  const [cartOpen, setCartOpen] = useState(false);
  const toggleCart = () => setCartOpen(prev => !prev);

  return (
    <IonPage>
      {/* Meglévő NAVBAR marad */}
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

        {/* Kosár oldalsáv */}
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

        {/* HERO SWIPER */}
        <section className="hero-swiper">
          <Swiper spaceBetween={10} slidesPerView={1} loop={true}>
            <SwiperSlide>
              <div className="slide-content">
                <div>
                  <div className="category">100% natural</div>
                  <h3>Fresh Smoothie & Summer Juice</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <IonButton color="dark">Shop Now</IonButton>
                </div>
                <img src="/assets/product-thumb-1.png" alt="Product" />
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="slide-content">
                <div>
                  <div className="category">100% natural</div>
                  <h3>Heinz Tomato Ketchup</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                  <IonButton color="dark">Shop Collection</IonButton>
                </div>
                <img src="/assets/product-thumb-1.png" alt="Product" />
              </div>
            </SwiperSlide>
          </Swiper>
        </section>

        {/* KATEGÓRIÁK SWIPER */}
        <section className="category-carousel">
          <Swiper spaceBetween={10} slidesPerView={3} breakpoints={{ 768: { slidesPerView: 6 } }}>
            {[
              'icon-vegetables-broccoli.png',
              'icon-bread-baguette.png',
              'icon-soft-drinks-bottle.png',
              'icon-wine-glass-bottle.png',
              'icon-animal-products-drumsticks.png',
            ].map((icon, index) => (
              <SwiperSlide key={index} className="category-slide">
                <img src={`/assets/${icon}`} alt="Category" />
                <p>Fruits & Veges</p>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* TERMÉKEK */}
        <section className="products">
          <h2>Newly Arrived Brands</h2>
          <div className="product-grid">
            <div className="product-card">
              <img src="/assets/thumb-cucumber.png" alt="Cucumber" />
              <h4>Melon Juice</h4>
              <p>$18.00</p>
              <IonButton size="small">Kosárba</IonButton>
            </div>
            <div className="product-card">
              <img src="/assets/thumb-cucumber.png" alt="Cucumber" />
              <h4>Tomato Sauce</h4>
              <p>$10.50</p>
              <IonButton size="small">Kosárba</IonButton>
            </div>
          </div>
        </section>

      </IonContent>
    </IonPage>
  );
};

export default Home;
