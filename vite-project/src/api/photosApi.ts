import api from '../lib/axiosInstance';

export interface Photo {
    id: string;
    filename: string;
    url: string;
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