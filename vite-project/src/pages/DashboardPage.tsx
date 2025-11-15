// src/pages/DashboardPage.tsx
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getMyPhotos } from '../api/photosApi';
import { PhotoCard } from '../components/PhotoCard';
import styles from './DashboardPage.module.css';
import { Link } from "react-router-dom";

export function DashboardPage() {
    const { logout, user } = useAuth();
    
    const { 
      data: photos,
      isLoading,
      isError,
      error
    } = useQuery({
      queryKey: ['myPhotos'],
      queryFn: getMyPhotos,
      retry: 1,
      onError: (err: any) => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          console.error("Sesja wygasła, wylogowywanie...", err);
          setTimeout(() => {
            logout();
          }, 2000);
        }
      }
    });

    const renderGalleryContent = () => {
      if (isLoading) {
          return <div>Ładowanie Twoich zdjęć...</div>;
      }

      if (isError) {
          if (error.response && (error.response.status === 401 || error.response.status === 403)) {
            return <div style={{ color: 'red' }}>Twoja sesja wygasła. Za chwilę zostaniesz wylogowany...</div>;
          }
          return <div style={{ color: 'red' }}>Nie udało się załadować galerii zdjęć.</div>;
      }

      if (photos && photos.length > 0) {
          return (
            <div className={styles.galleryGrid}>
              {photos.map(photo => (
                <PhotoCard key={photo.id} photo={photo} />
              ))}
            </div>
          );
      }
      return (
          <p>Nie masz jeszcze żadnych zdjęć. Czas coś przesłać!</p>
      );
    };
    return (
        <div className={styles.dashboardWrapper}>
            <header className={styles.header}>
              <h1>Witaj, {user?.email}!</h1>
              <div> 
                <Link to="/upload" className={styles.uploadButton}>
                  Dodaj zdjęcie
                </Link>
                <button onClick={logout} className={styles.logoutButton}>
                  Wyloguj
                </button>
              </div>
            </header>
            
            <h2>Twoja galeria</h2>
            
            {renderGalleryContent()}

        </div>
    );
}