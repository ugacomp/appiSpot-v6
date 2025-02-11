import api from './api';
import type { Spot } from './database.types';
import toast from 'react-hot-toast';

export const getSpots = async (): Promise<Spot[]> => {
  try {
    const response = await api.get<Spot[]>('/spots');
    return response.data;
  } catch (error) {
    console.error('Error fetching spots:', error);
    toast.error('Unable to load spots. Please try again later.');
    return [];
  }
};

export const getSpot = async (id: string): Promise<Spot | null> => {
  try {
    const response = await api.get<Spot>(`/spots/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching spot details:', error);
    toast.error('Unable to load spot details. Please try again later.');
    return null;
  }
};

export const createSpot = async (spotData: Partial<Spot>): Promise<Spot | null> => {
  try {
    const response = await api.post<Spot>('/spots', spotData);
    toast.success('Spot created successfully!');
    return response.data;
  } catch (error) {
    console.error('Error creating spot:', error);
    toast.error('Unable to create spot. Please try again later.');
    return null;
  }
};

export const updateSpot = async (id: string, spotData: Partial<Spot>): Promise<Spot | null> => {
  try {
    const response = await api.patch<Spot>(`/spots/${id}`, spotData);
    toast.success('Spot updated successfully!');
    return response.data;
  } catch (error) {
    console.error('Error updating spot:', error);
    toast.error('Unable to update spot. Please try again later.');
    return null;
  }
};

export const deleteSpot = async (id: string): Promise<boolean> => {
  try {
    await api.delete(`/spots/${id}`);
    toast.success('Spot deleted successfully!');
    return true;
  } catch (error) {
    console.error('Error deleting spot:', error);
    toast.error('Unable to delete spot. Please try again later.');
    return false;
  }
};

export const getHostSpots = async (): Promise<Spot[]> => {
  try {
    const response = await api.get<Spot[]>('/spots/host/spots');
    return response.data;
  } catch (error) {
    console.error('Error fetching host spots:', error);
    toast.error('Unable to load your spots. Please try again later.');
    return [];
  }
};