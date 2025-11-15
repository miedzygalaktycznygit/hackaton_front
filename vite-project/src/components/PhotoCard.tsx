import { type Photo } from '../api/photosApi';
import styles from './PhotoCard.module.css';

interface PhotoCardProps {
    photo: Photo;
}

export function PhotoCard({ photo}: PhotoCardProps) {
    return (
        <div className={styles.card}>
            <img src={photo.url} alt={photo.filename} className={styles.image} />
            <div className={styles.footer}>
                <p className={styles.filename}>{photo.filename}</p>
                <div className={styles.action}>
                    <a 
                        href={photo.url}
                        download={photo.filename}
                        className={styles.downloadLink}
                    >Pobierz</a>
                    <button className={styles.shareButton}>Udostępnij</button>
                </div>
            </div>
        </div>
    );
}