import axios from 'axios';
import { Diary } from '../types';

const baseUrl = 'http://localhost:3000/api/diaries';

export const getAll = async () => {
	const response = await axios.get<Diary[]>(baseUrl);
	return response.data;
};

export const createDiary = async (diary: Diary) => {
	const response = await axios.post<Diary>(baseUrl, diary);
	return response.data;
};
