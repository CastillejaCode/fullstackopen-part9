import axios from 'axios';
import { useEffect, useState } from 'react';
import { getAll, createDiary } from './services/noteService';
import { Diary } from './types';

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([]);

	const [date, setDate] = useState<string>('');
	const [weather, setWeather] = useState<string>('');
	const [visibility, setVisibility] = useState<string>('');
	const [comment, setComment] = useState<string>('');

	const [notification, setNotification] = useState<string>('');

	useEffect(() => {
		getAll().then((data) => setDiaries(diaries.concat(data)));
	}, []);

	const submitDiary = async (event: React.SyntheticEvent) => {
		event.preventDefault();
		try {
			const newDiary = {
				date,
				weather,
				visibility,
				comment,
				id: diaries.length + 1,
			};
			const response = await createDiary(newDiary);
			await setDiaries(diaries.concat(response));
			setDate('');
			setWeather('');
			setVisibility('');
			setComment('');
		} catch (error: unknown) {
			if (axios.isAxiosError(error)) {
				setNotification(error.response?.data);
				setInterval(() => setNotification(''), 5000);
			}
		}
	};

	return (
		<div>
			{notification && <h2 style={{ color: 'red' }}>{notification}</h2>}
			<div>
				<h1>Add new entry</h1>
				<form action='' onSubmit={submitDiary}>
					<div>
						<label htmlFor=''>
							Date
							<input
								type='date'
								name='date'
								value={date}
								onChange={(event) => setDate(event?.target.value)}
							/>
						</label>
					</div>
					<div>
						Weather{' '}
						<label htmlFor=''>
							sunny
							<input
								type='radio'
								name='weather'
								value='sunny'
								onChange={(event) => setWeather(event.target.value)}
							/>
						</label>
						<label htmlFor=''>
							rainy
							<input
								type='radio'
								name='weather'
								value='rainy'
								onChange={(event) => setWeather(event.target.value)}
							/>
						</label>
						<label htmlFor=''>
							cloudy
							<input
								type='radio'
								name='weather'
								value='cloudy'
								onChange={(event) => setWeather(event.target.value)}
							/>
						</label>
						<label htmlFor=''>
							stormy
							<input
								type='radio'
								name='weather'
								value='stormy'
								onChange={(event) => setWeather(event.target.value)}
							/>
						</label>
						<label htmlFor=''>
							windy
							<input
								type='radio'
								name='weather'
								value='windy'
								onChange={(event) => setWeather(event.target.value)}
							/>
						</label>
					</div>
					<div>
						Visibility{' '}
						<label htmlFor=''>
							great
							<input
								type='radio'
								name='vis'
								value='great'
								onChange={(event) => setVisibility(event.target.value)}
							/>
						</label>
						<label htmlFor=''>
							good
							<input
								type='radio'
								name='vis'
								value='good'
								onChange={(event) => setVisibility(event.target.value)}
							/>
						</label>
						<label htmlFor=''>
							ok
							<input
								type='radio'
								name='vis'
								value='ok'
								onChange={(event) => setVisibility(event.target.value)}
							/>
						</label>
						<label htmlFor=''>
							poor
							<input
								type='radio'
								name='vis'
								value='poor'
								onChange={(event) => setVisibility(event.target.value)}
							/>
						</label>
					</div>
					<div>
						<label htmlFor=''>
							Comment
							<input
								type='text'
								name='comment'
								value={comment}
								onChange={(event) => setComment(event.target.value)}
							/>
						</label>
					</div>
					<button>Submit</button>
				</form>
			</div>
			<h3>Diary Entries</h3>
			<ul>
				{diaries.map((diary) => {
					return (
						<li key={diary.id}>
							<strong>{diary.date}</strong> <br /> Weather: {diary.weather}{' '}
							<br /> Visibility: {diary.visibility}
						</li>
					);
				})}
			</ul>
		</div>
	);
};

export default App;
