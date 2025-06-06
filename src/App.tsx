import { Redirect, Route } from 'react-router-dom';
import { IonApp, IonRouterOutlet, setupIonicReact } from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Capacitor } from '@capacitor/core';
import Home from './pages/Home';
import Login from './pages/Login';
import Checkout from './pages/Checkout';
import ViewOrder from './pages/ViewOrder';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import Register from './pages/Register';
import { CartProvider } from './context/cartContext';
import ProductDetail from './pages/ProductDetail';
import { useEffect } from 'react';

setupIonicReact();

const App: React.FC = () => {
  useEffect(() => {
    const initStatusBar = async () => {
      try {
        if (Capacitor.getPlatform() !== 'web') {
          await StatusBar.hide();
          await StatusBar.setStyle({ style: Style.Dark }); // optional
        }
      } catch (e) {
        console.warn('Failed to hide status bar:', e);
      }
    };
    initStatusBar();
  }, []);

  return (
    <CartProvider>
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/checkout">
              <Checkout />
            </Route>
            <Route exact path="/vieworder/:orderId">
              <ViewOrder />
            </Route>
            <Route path="/register" component={Register} exact />
            <Route path="/product/:id" component={ProductDetail} />
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    </CartProvider>
  );
};

export default App;
