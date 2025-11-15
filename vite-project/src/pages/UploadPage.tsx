// src/pages/UploadPage.tsx
import { useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { uploadPhoto } from '../api/photosApi'; 
import styles from './UploadPage.module.css';

export function UploadPage() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: uploadPhoto,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myPhotos'] });
      navigate('/dashboard');
    },
    onError: (err: any) => {
      console.error("Błąd przesyłania:", err);
      setError("Nie udało się przesłać pliku. Spróbuj ponownie.");
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setSelectedFile(event.target.files[0]);
      setError(null);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (!selectedFile) {
      setError("Proszę wybrać plik.");
      return;
    }
    mutation.mutate(selectedFile);
  };

  return (
    <div className={styles.uploadWrapper}>
      <h1>Prześlij nowe zdjęcie</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input 
          type="file" 
          onChange={handleFileChange} 
          accept="image/jpeg, image/png"
          className={styles.fileInput}
        />
        {selectedFile && (
          <p className={styles.fileName}>Wybrano: {selectedFile.name}</p>
        )}

        <button 
          type="submit" 
          disabled={mutation.isPending || !selectedFile}
          className={styles.submitButton}
        >
          {mutation.isPending ? 'Przesyłanie...' : 'Prześlij'}
        </button>

        {error && <p className={styles.error}>{error}</p>}
      </form>
    </div>
  );
}