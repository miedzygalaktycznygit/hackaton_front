// src/components/ShareModal.tsx
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { sharePhoto } from '../api/photosApi';
import styles from './ShareModal.module.css';

interface ShareModalProps {
    photoId: number;
    onClose: () => void;
}

export function ShareModal({ photoId, onClose }: ShareModalProps) {
    const [email, setEmail] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);

    const mutation = useMutation({
        mutationFn: sharePhoto,
        onSuccess: () => {
            setSuccess(`Zdjęcie udostępnione dla ${email}!`);
            setError(null);
            setEmail('');
            setTimeout(() => {
                onClose();
            }, 2000);
        },
        onError: (err: any) => {
            if (err.response && err.response.status === 404) {
                setError('Nie znaleziono użytkownika o tym adresie e-mail.');
            } else {
                setError('Wystąpił błąd podczas udostępniania.');
            }
            setSuccess(null);
        }
    });

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        if (!email) {
            setError('Adres e-mail jest wymagany.');
            return;
        }
        mutation.mutate({ photoId, email });
    };

    return (
        <div className={styles.overlay} onClick={onClose}>
            <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
                <h3>Udostępnij zdjęcie</h3>
                {!success ? (
                    <form onSubmit={handleSubmit}>
                        <p>Podaj e-mail użytkownika, któremu chcesz udostępnić to zdjęcie.</p>
                        
                        <label htmlFor="email-share" className={styles.label}>E-mail:</label>
                        <input 
                            type="email"
                            id="email-share"
                            className={styles.input}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="uzytkownik@example.com"
                        />

                        <div className={styles.buttons}>
                            <button 
                                type="button" 
                                className={styles.cancelButton} 
                                onClick={onClose}
                                disabled={mutation.isPending}
                            >
                                Anuluj
                            </button>
                            <button 
                                type="submit" 
                                className={styles.submitButton}
                                disabled={mutation.isPending}
                            >
                                {mutation.isPending ? 'Udostępnianie...' : 'Udostępnij'}
                            </button>
                        </div>
                        {error && <p className={styles.error}>{error}</p>}
                    </form>
                ) : (
                    <div className={styles.success}>
                        <p>{success}</p>
                    </div>
                )}
            </div>
        </div>
    );
}