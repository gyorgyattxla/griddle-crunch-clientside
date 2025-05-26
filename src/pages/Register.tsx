import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
  IonText,
  IonLoading,
  IonBackButton,
  IonButtons
} from '@ionic/react';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './Register.css'; // CSS importálása

const Register: React.FC = () => {
  const history = useHistory();

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
  setError(null);

  if (!firstName || !lastName || !email || !password || !password2) {
    setError('Minden mezőt ki kell tölteni!');
    return;
  }
  if (password !== password2) {
    setError('A jelszavak nem egyeznek!');
    return;
  }
  if (password.length < 6) {
    setError('A jelszónak legalább 6 karakter hosszúnak kell lennie!');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('https://dev01.szitar.net/api/register', { // Use your Yii2 endpoint here
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        email: email,
        password:password,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      console.log(data.message)
      throw new Error(data.message || 'Ismeretlen hiba történt.');
    }

    alert('Sikeres regisztráció!');
    history.push('/login');
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
};

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonButtons slot="start">
            <IonBackButton defaultHref="/" />
          </IonButtons>
          <IonTitle>Regisztráció</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent fullscreen className="ion-padding register-content">
        <h2 className="register-title">Hozz létre új fiókot</h2>

        {error && (
          <IonText color="danger" className="error-text">
            <p>{error}</p>
          </IonText>
        )}
        <IonLabel position="floating" className='label'>Keresztnév</IonLabel>
        <IonItem lines="full" className="input-item">
          
          <IonInput
            type="text"
            value={firstName}
            onIonChange={e => setFirstName(e.detail.value!)}
            required
            placeholder="Keresztnév"
          />
        </IonItem>
        <IonLabel position="floating" className='label'>Vezetéknév</IonLabel>
        <IonItem lines="full" className="input-item">
          
          <IonInput
            type="text"
            value={lastName}
            onIonChange={e => setLastName(e.detail.value!)}
            required
            placeholder="Vezetéknév"
          />
        </IonItem>
        <IonLabel position="floating" className='label'>Email cím</IonLabel>
        <IonItem lines="full" className="input-item">
          
          <IonInput
            type="email"
            value={email}
            onIonChange={e => setEmail(e.detail.value!)}
            required
            inputMode="email"
            autocapitalize="off"
            placeholder='Email cím'
          />
        </IonItem>
        <IonLabel position="floating" className='label'>Jelszó</IonLabel>
        <IonItem lines="full" className="input-item">
          
          <IonInput
            type="password"
            value={password}
            onIonChange={e => setPassword(e.detail.value!)}
            required
            autocomplete="new-password"
            placeholder='Jelszó'
        
          />
        </IonItem>
        <IonLabel position="floating" className='label'>Jelszó újra</IonLabel>
        <IonItem lines="full" className="input-item">
          <IonInput
            type="password"
            value={password2}
            onIonChange={e => setPassword2(e.detail.value!)}
            required
            autocomplete="new-password"
            placeholder='Jelszó újra'
          />
        </IonItem>

        <IonButton
          expand="block"
          className="register-btn ion-margin-top"
          onClick={handleRegister}
          shape="round"
          size="large"
          disabled={loading}
        >
          {loading ? 'Feldolgozás...' : 'Regisztráció'}
        </IonButton>

        <IonLoading isOpen={loading} message={'Feldolgozás...'} />

        <p className="ion-text-center login-link">
          Már van fiókod?{' '}
          <IonButton fill="clear" onClick={() => history.push('/login')}>
            Bejelentkezés
          </IonButton>
        </p>
      </IonContent>
    </IonPage>
  );
};

export default Register;
