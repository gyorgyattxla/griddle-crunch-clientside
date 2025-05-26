/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { IonContent, IonInput, IonPage } from '@ionic/react';
import { useHistory } from 'react-router-dom';
import './Login.css';
import { useState } from 'react';
import { saveUserId } from '../utils/auth';




const Login: React.FC = () => {
  
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
  
    const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault(); // 💡 prevent full page reload

  setError(null);

  if (!email || !password) {
    setError('Minden mezőt ki kell tölteni!');
    return;
  }
  if (password.length < 6) {
    setError('A jelszónak legalább 6 karakter hosszúnak kell lennie!');
    return;
  }

  setLoading(true);

  try {
    const response = await fetch('http://dev01.szitar.net/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'Ismeretlen hiba történt.');
    }
    alert('Sikeres belépés!');
    saveUserId(data.client.id);
    window.location.href = '/home';
  } catch (error: any) {
    setError(error.message);
  } finally {
    setLoading(false);
  }
  };

  
  const history = useHistory();
  return (
    <IonPage>
      <IonContent>
        <div className="login-page">
          <div className="login-container">
            
            {/* Bal oldali kép */}
            <div className="image-side"></div>

            {/* Jobb oldali űrlap */}
            <div className="form-side">
              <div className="login-card">
                <div className="logo-img">
                  <img alt="logo" src="/assets/logo.png" />
                </div>

                <div className="header">
                  <h2>Login to your Account</h2>
                  <p>See what is going on with your business.</p>
                </div>

                <form className="login-form" onSubmit={handleLogin}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <IonInput
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="me@domain.com"
                      value={email}
                      onIonChange={e => setEmail(e.detail.value!)}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <IonInput
                      type="password"
                      className="form-control"
                      id="password"
                      value={password}
                      onIonChange={e => setPassword(e.detail.value!)}
                      placeholder="Password"
                    />
                  </div>

                  <button 
                    type="submit" 
                    className="btn btn-primary w-100 login-btn"
                    //onClick={handleLogin}
                    >
                    {loading ? 'Feldolgozás...' : 'Belépés'}
                  </button>
                  <div className="login-footer">
                  <div className="text-center mt-3">
                    <a href="#">Forgot Password?</a>
                  </div>

                  <div className="text-center mt-3">
                    Not registered yet? <a
                    href="#"
                    onClick={e => {
                      e.preventDefault();
                      history.push('/register');
                    }}
                  >
                        Create an account
                      </a>
                  </div>
                  </div>
                </form>
              </div>
            </div>

          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Login;
