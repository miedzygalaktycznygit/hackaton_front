import api from '../lib/axiosInstance';

export interface Photo {
    id: number;
    user_id: number;
    imgurl: string;
}

export const getMyPhotos = async (): Promise<Photo[]> => {
    const response = await api.get('/dashboard/images');
    return response.data.images; 
};

export const uploadPhoto = async (file: File) => {
  const formData = new FormData();
  formData.append('image', file); 
  const response = await api.post('/dashboard/upload', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};

export const getSharedImages = async (): Promise<Photo[]> => {
    // Ten adres jest poprawny (z prefiksem dashboard)
    const response = await api.get('/dashboard/sharedImages');
    return response.data.images; 
};

// === FUNKCJA DO POPRAWY ===
export const sharePhoto = async ({ photoId, email }: { photoId: number; email: string }) => {
    // Musimy wysłać 'image_id', a nie 'photoId'
    const response = await api.post('/dashboard/upload/shared', { 
        email: email, 
        image_id: photoId // <--- TUTAJ JEST KLUCZOWA POPRAWKA
    });
    return response.data;
};