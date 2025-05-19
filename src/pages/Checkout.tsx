import {
  IonPage,  IonHeader,  IonToolbar,  IonTitle,
  IonContent,  IonItem,  IonLabel,  IonInput,
  IonButton,  IonList,  IonToast,  IonSelect,
  IonSelectOption,  IonButtons,  IonIcon
} from '@ionic/react';

import { walletOutline } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import { useEffect, useState, /*useEffect*/ } from 'react';

import './Checkout.css';
import { useCart } from '../context/cartContext';
import { clearUserData, getUserId } from '../utils/auth';

import { saveOrder } from '../api/Api';

const Checkout: React.FC = () => {

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

  const [paymentMethod, setPaymentMethod] = useState('cash');
  const { cart, removeFromCart, getFinalAmount } = useCart();
  const history = useHistory();
  const [form, setForm] = useState({
    name: '',
    email: '',
    address: '',
    cardNumber: '',
    expiry: '',
    cvv: '',
  });

  const [showToast, setShowToast] = useState(false);

  const handleChange = (e: CustomEvent) => {
  const target = e.target as HTMLInputElement;
  const name = target.name;
  const value = e.detail.value;

  setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setShowToast(true);
  try {
    const userId = getUserId();

    const orderData = {
      client_id: userId || null,
      client_name: form.name,
      client_address: form.address,
      payment_method: paymentMethod,
      meals: cart.map(item => ({
        id: item.id,
        price: item.price,
        quantity: item.quantity,
      })),
    };
    console.log(orderData);
    await saveOrder(orderData);

    setShowToast(true);
    // Optionally clear cart and go to home
    setTimeout(() => {
      history.push('/home');
      window.location.reload(); // optional: force full reload
    }, 1500);
  } catch (err) {
    console.error(err);
    alert('Hiba történt a rendelés leadása közben.');
  }
};

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
        <IonTitle>Griddle & Crunch</IonTitle>
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
        </IonToolbar>
    </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit}>
            <ul>
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
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
            </li>
            ))}
          </ul>
        <div className="cart-total">
          <h4>Összesen: {getFinalAmount()} Ft</h4>
        </div>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Teljes név</IonLabel>
              <IonInput
                name="name"
                value={form.name}
                onIonChange={handleChange}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email cím</IonLabel>
              <IonInput
                type="email"
                name="email"
                value={form.email}
                onIonChange={handleChange}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Cím</IonLabel>
              <IonInput
                name="address"
                value={form.address}
                onIonChange={handleChange}
                required
              />
            </IonItem>

            <IonItem>
            <IonLabel position="stacked">Fizetési mód</IonLabel>
            <IonSelect
                value={paymentMethod}
                onIonChange={(e) => setPaymentMethod(e.detail.value)}
            >
            <IonSelectOption value="cash">Készpénz</IonSelectOption>
            <IonSelectOption value="card_pickup">Kártya (Átvételkor)</IonSelectOption>
            <IonSelectOption value="card">Kártya (Most)</IonSelectOption>
            </IonSelect>
            </IonItem>

            {paymentMethod === 'card' && (
            <>
                <IonItem>
                <IonLabel position="stacked">Card Number</IonLabel>
                <IonInput
                    type="text"
                    name="cardNumber"
                    value={form.cardNumber}
                    onIonChange={handleChange}
                    required={paymentMethod === 'card'}
                />
                </IonItem>

                <IonItem>
                <IonLabel position="stacked">Expiry Date</IonLabel>
                <IonInput
                 type="text"
                    name="expiry"
                    value={form.expiry}
                    onIonChange={handleChange}
                    placeholder="MM/YY"
                    required={paymentMethod === 'card'}
                />
                </IonItem>

                <IonItem>
                <IonLabel position="stacked">CVV</IonLabel>
                <IonInput
                    type="password"
                    name="cvv"
                    value={form.cvv}
                    onIonChange={handleChange}
                    required={paymentMethod === 'card'}
                />
                </IonItem>
            </>
            )}
            <IonButton className='order-btn' onClick={() => history.push('/home')}>
                <IonIcon icon={walletOutline} /> Főoldal
            </IonButton>
          </IonList>

          <div className="ion-padding">
            <IonButton expand="block" type="submit">
              Rendelés leadása
            </IonButton>
          </div>
        </form>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Rendelés sikeresen leadva!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
