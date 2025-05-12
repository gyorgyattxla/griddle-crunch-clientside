import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Login.css';

<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet"></link>

const Login: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Griddle & Crunch</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        <IonHeader collapse="condense">
          <IonToolbar>
            <IonTitle size="large">Griddle & Crunch</IonTitle>
          </IonToolbar>
        </IonHeader>
        <div className="login-container">
            <div className="left-side"></div>
            <div className="right-side">
                <div className="logo-img">
                <img alt='logo' src=''></img>
                </div>
                <div className="header">
                    <div className="big-text">
                        Login to your Account
                    </div>
                    <div className="small-text">
                        See what is going on with your business.
                    </div>
                </div>
                <div className="google-button">
                    <button type="submit" className="btn btn-primary">Google Login</button>
                </div>
                <div className="spacer">
                    or Sign in with Email
                </div>
                <div className="login-from">
                    <form action="login">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" placeholder="name@example.com"></input>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password"></input>
                        </div>
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </form>
                </div>
            </div>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default Login;
