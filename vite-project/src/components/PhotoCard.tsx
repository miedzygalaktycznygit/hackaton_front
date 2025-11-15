// src/components/PhotoCard.tsx
import { type Photo } from '../api/photosApi';
import styles from './PhotoCard.module.css';

interface PhotoCardProps {
    photo: Photo;
}

const STATIC_FILES_URL = 'http://localhost:3000/uploads';

export function PhotoCard({ photo }: PhotoCardProps) {
    const imageUrl = photo.imgurl.startsWith('http') 
        ? photo.imgurl 
        : `${STATIC_FILES_URL}/${photo.imgurl}`; 
    const filename = photo.imgurl.split('/').pop() || 'image.jpg';

    const handleDownload = async (event: React.MouseEvent<HTMLAnchorElement>) => {
        event.preventDefault(); 
        
        try {
            const response = await fetch(imageUrl);
            if (!response.ok) {
                throw new Error('Pobieranie pliku nie powiodło się');
            }
            const blob = await response.blob();
            const blobUrl = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = blobUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(blobUrl);

        } catch (error) {
            console.error("Błąd podczas pobierania obrazka:", error);
        }
    };
    return (
        <div className={styles.card}>
            <img src={imageUrl} alt={filename} className={styles.image} />
            
            <div className={styles.footer}>
                <p className={styles.filename}>{filename}</p>
                <div className={styles.action}>
                    <a 
                        href={imageUrl}
                        className={styles.downloadLink}
                        onClick={handleDownload}
                    >Pobierz</a>
                    <button className={styles.shareButton}>Udostępnij</button>
                </div>
            </div>
        </div>
    );
}