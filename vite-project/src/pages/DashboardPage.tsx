import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { getMyPhotos, getSharedImages } from '../api/photosApi';
import { PhotoCard } from '../components/PhotoCard';
import { ShareModal } from '../components/ShareModal';
import styles from './DashboardPage.module.css';
import { Link } from "react-router-dom";
import { useState } from 'react';


export function DashboardPage() {
    const { logout, user, isAuthenticated } = useAuth();
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPhotoId, setSelectedPhotoId] = useState<number | null>(null);

    const { 
      data: myPhotos, 
      isLoading: isLoadingMyPhotos, 
      isError: isErrorMyPhotos, 
      error: errorMyPhotos, 
    } = useQuery({
      queryKey: ['myPhotos'],
      queryFn: getMyPhotos,
      retry: 1,
      enabled: isAuthenticated,
      onError: (err: any) => {
        if (err.response && (err.response.status === 401 || err.response.status === 403)) {
          console.error("Sesja wygasła, wylogowywanie...", err);
          setTimeout(() => logout(), 2000);
        }
      }
    });

    const { 
      data: sharedPhotos, 
      isLoading: isLoadingSharedPhotos 
    } = useQuery({
      queryKey: ['sharedPhotos'],
      queryFn: getSharedImages,
      retry: 1,
      enabled: isAuthenticated,
    });

    const handleShareClick = (photoId: number) => {
        setSelectedPhotoId(photoId);
        setIsModalOpen(true);
    };

    const renderMyGallery = () => {
      if (isLoadingMyPhotos || !isAuthenticated) {
          return <div>Ładowanie Twoich zdjęć...</div>;
      }
      if (isErrorMyPhotos) {
          if ((errorMyPhotos as any).response && ((errorMyPhotos as any).response.status === 401 || (errorMyPhotos as any).response.status === 403)) {
            return <div style={{ color: 'red' }}>Twoja sesja wygasła. Za chwilę zostaniesz wylogowany...</div>;
          }
          return <div style={{ color: 'red' }}>Nie udało się załadować galerii zdjęć.</div>;
      }
      if (myPhotos && (myPhotos as any).length > 0) {
          return (
            <div className={styles.galleryGrid}>
              {(myPhotos as any).map(photo => (
                <PhotoCard 
                    key={photo.id} 
                    photo={photo} 
                    onShareClick={handleShareClick}
                />
              ))}
            </div>
          );
      }
      return <p>Nie masz jeszcze żadnych zdjęć. Czas coś przesłać!</p>;
    };

    const renderSharedGallery = () => {
        if (isLoadingSharedPhotos || !isAuthenticated) {
            return <div>Ładowanie udostępnionych zdjęć...</div>;
        }
        if (sharedPhotos && sharedPhotos.length > 0) {
            return (
                <div className={styles.galleryGrid}>
                    {sharedPhotos.map(photo => (
                        <PhotoCard 
                            key={photo.id} 
                            photo={photo} 
                            isSharedView={true}
                        />
                    ))}
                </div>
            );
        }
        return null; 
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
            {renderMyGallery()}
            
            <h2 className={styles.sharedHeader}>Udostępnione dla mnie</h2>
            {renderSharedGallery()}

            {isModalOpen && selectedPhotoId && (
                <ShareModal 
                    photoId={selectedPhotoId}
                    onClose={() => setIsModalOpen(false)}
                />
            )}
        </div>
    );
}