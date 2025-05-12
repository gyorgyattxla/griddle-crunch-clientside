import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import './Home.css';

const Home: React.FC = () => {
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
        <div className="rendelos-container">
          <h1>rendelos oldal</h1>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
