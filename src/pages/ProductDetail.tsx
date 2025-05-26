/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  IonPage,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonButton,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardSubtitle,
} from '@ionic/react';
import { useParams, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProductById } from '../api/Api';
import { useCart } from '../context/cartContext'; // <- kosár kontextus
import './ProductDetail.css';

const BASE_URL = 'https://dev01.szitar.net';
const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const history = useHistory();
  const { addToCart } = useCart(); // <- kosár funkciók
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const productId = Number(id);
    setLoading(true);
    fetchProductById(productId)
      .then(data => {
        
        setProduct(data);
        setLoading(false);
      })
      .catch(() => {
        setProduct(null);
        setLoading(false);
      });
      
  }, [id]);

  if (loading) {
    return (
      <IonContent className="ion-padding ion-text-center" style={{ paddingTop: '50%' }}>
        Termék betöltése...
      </IonContent>
    );
  }

  if (!product) {
    return (
      <IonContent className="ion-padding ion-text-center" style={{ paddingTop: '50%' }}>
        Nem található ilyen termék.
      </IonContent>
    );
  }

const imageUrl = product.image
  ? ((product.image.startsWith('http://') || product.image.startsWith('https://'))
      ? product.image
      : `${BASE_URL}/uploads/${product.image}`)
  : '';

  return (
    <IonPage>
      <IonHeader translucent>
        <IonToolbar>
          <IonTitle>{product.name}</IonTitle>
        </IonToolbar>
      </IonHeader>

 <IonContent fullscreen className="card">
  <div className="product-wrapper">
    <IonCard className="product-cards">
      {imageUrl && (
        <img
          src={imageUrl}
          alt={product.name}
          className="product-image"
        />
      )}

      <IonCardHeader className="product-header">
        <IonTitle className="product-title">{product.name}</IonTitle>
        <IonCardSubtitle className="product-price">{product.price} Ft</IonCardSubtitle>
      </IonCardHeader>

      <IonCardContent className="product-content">
        <strong>Összetevők:</strong>
        <p className="product-ingradients">{product.ingredients}</p>
        {product.allergens && product.allergens.length > 0 && (
  <>
    <strong>Allergének:</strong>
    <ul>
      {product.allergens.map((a: any) => (
        <li key={a.id}>{a.name}</li>
      ))}
    </ul>
  </>
)}
      </IonCardContent>

      <IonButton
        expand="block"
        size="default"
        color="success"
        className="add-to-cart-button"
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product);
        }}
      >
        Kosárba
      </IonButton>
    </IonCard>
  </div>

  <div className="back-button-container">
    <IonButton
      fill="outline"
      color="medium"
      onClick={() => history.goBack()}
      className="back-button"
    >
      Vissza
    </IonButton>
  </div>
</IonContent>
    </IonPage>
  );
};

export default ProductDetail;
