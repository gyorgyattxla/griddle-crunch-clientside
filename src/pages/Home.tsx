import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar } from '@ionic/react';

import { useEffect, useState } from 'react';

import { fetchCategories } from '../api/categoryApi';

import './Home.css';

const Home: React.FC = () => {

  const [categories, setCategories] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories()
      .then(data => setCategories(data))
      .catch(err => setError(err.message));
  }, []);

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
