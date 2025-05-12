import { IonContent, IonPage } from '@ionic/react';
import './Login.css';

const Login: React.FC = () => {
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

                <button className="btn btn-outline-secondary w-75 mb-3 google-btn">
                  <img
                    src="https://img.icons8.com/color/16/000000/google-logo.png"
                    alt="Google"
                  />
                  &nbsp; Continue with Google
                </button>

                <div className="divider-text">or sign in with email</div>

                <form className="login-form">
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="me@domain.com"
                    />
                  </div>

                  <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                      Password
                    </label>
                    <input
                      type="password"
                      className="form-control"
                      id="password"
                      placeholder="Password"
                    />
                  </div>

                  <button type="submit" className="btn btn-primary w-100 login-btn">
                    Login
                  </button>
                  <div className="login-footer">
                  <div className="text-center mt-3">
                    <a href="#">Forgot Password?</a>
                  </div>

                  <div className="text-center mt-3">
                    Not registered yet? <a href="#">Create an account</a>
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
