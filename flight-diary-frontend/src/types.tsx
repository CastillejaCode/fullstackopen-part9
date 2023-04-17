export interface Diary {
	weather: string;
	visibility: string;
	date: string;
	comment: string;
	id: number;
}

export type NewDiary = Omit<Diary, 'id'>;
