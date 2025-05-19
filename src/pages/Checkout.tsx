import React, { useState } from 'react';
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonItem,
  IonLabel,
  IonInput,
  IonButton,
  IonList,
  IonToast,
  IonSelect,
  IonSelectOption
} from '@ionic/react';

const Checkout: React.FC = () => {
  const [paymentMethod, setPaymentMethod] = useState('card');
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
    const { name, value } = e.detail;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    setShowToast(true);
    // You could integrate Stripe, PayPal, etc. here
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Checkout</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding">
        <form onSubmit={handleSubmit}>
          <IonList>
            <IonItem>
              <IonLabel position="stacked">Name</IonLabel>
              <IonInput
                name="name"
                value={form.name}
                onIonChange={handleChange}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Email</IonLabel>
              <IonInput
                type="email"
                name="email"
                value={form.email}
                onIonChange={handleChange}
                required
              />
            </IonItem>

            <IonItem>
              <IonLabel position="stacked">Address</IonLabel>
              <IonInput
                name="address"
                value={form.address}
                onIonChange={handleChange}
                required
              />
            </IonItem>

            <IonItem>
            <IonLabel position="stacked">Payment Method</IonLabel>
            <IonSelect
                value={paymentMethod}
                onIonChange={(e) => setPaymentMethod(e.detail.value)}
            >
            <IonSelectOption value="card">Card</IonSelectOption>
            <IonSelectOption value="cash">Cash</IonSelectOption>
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
          </IonList>

          <div className="ion-padding">
            <IonButton expand="block" type="submit">
              Pay Now
            </IonButton>
          </div>
        </form>

        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Payment submitted successfully!"
          duration={2000}
        />
      </IonContent>
    </IonPage>
  );
};

export default Checkout;
