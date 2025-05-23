import {
  IonPage, IonHeader, IonToolbar, IonTitle,
  IonContent, IonButton, IonButtons,
  IonIcon
} from '@ionic/react';

import { useHistory, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { clearUserData, getUserId } from '../utils/auth';

import MapComponent from '../components/MapComponent';
import { walletOutline } from 'ionicons/icons';

const ViewOrder: React.FC = () => {
  const { orderId } = useParams<{ orderId: string }>();
  const history = useHistory();

  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [orderLocation, setOrderLocation] = useState<string | null>(null);
  const [orderStatus, setOrderStatus] = useState<string | null>(null);

  const fetchOrder = async (orderId: number) => {
    try {
      const response = await fetch(`http://localhost:8080/vieworder/${orderId}`, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const orderData = await response.json();
      return orderData;

    } catch (error) {
      console.error('Error fetching order:', error);
      return null;
    }
  };

  useEffect(() => {
  const userId = getUserId();
  setIsLoggedIn(!!userId);

  let intervalId: NodeJS.Timeout;

  const getData = async () => {
    if (orderId) {
      const orderData = await fetchOrder(Number(orderId));
      if (orderData) {
        if (orderData.client_address) setOrderLocation(orderData.client_address);
        if (orderData.status) setOrderStatus(orderData.status);
      }
    }
  };

  getData();

  intervalId = setInterval(() => {
    getData();
  }, 30000); 

  return () => clearInterval(intervalId);
}, [orderId]);

  const handleLogout = () => {
    clearUserData();
    setIsLoggedIn(false);
    history.push('/');
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
                <IonButton onClick={() => history.push('/register')} color="primary">Regisztráció</IonButton>
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
        {orderStatus ? (
          <p> Rendelés státusza: {orderStatus} </p> 
        ) : (
          <p>Loading order status...</p>
        )}
        {orderLocation ? (
          <MapComponent locationNames={[orderLocation]} />
        ) : (
          <p>Loading map location...</p>
        )}
        {orderStatus == 'delivered' ? (
        <IonButton className='order-btn' onClick={() => history.push('/home')}>
          <IonIcon icon={walletOutline} /> Főoldal
        </IonButton>
        ) : null}
      </IonContent>
    </IonPage>
  );
};

export default ViewOrder;
