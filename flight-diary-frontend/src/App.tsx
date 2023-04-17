import { useEffect, useState } from 'react';
import { getAll, createDiary } from './services/noteService';
import { Diary } from './types';

const App = () => {
	const [diaries, setDiaries] = useState<Diary[]>([]);
	const [date, setDate] = useState<string>('');
	const [weather, setWeather] = useState<string>('');
	const [visibility, setVisibility] = useState<string>('');
	const [comment, setComment] = useState<string>('');

	useEffect(() => {
		getAll().then((data) => setDiaries(diaries.concat(data)));
	}, []);

	const submitDiary = async (event: React.SyntheticEvent) => {
		event.preventDefault();
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
	};

	return (
		<div>
			<div>
				<h1>Add new entry</h1>
				<form action='' onSubmit={submitDiary}>
					<div>
						<label htmlFor=''>
							Date
							<input
								type='text'
								name='date'
								value={date}
								onChange={(event) => setDate(event?.target.value)}
							/>
						</label>
					</div>
					<div>
						<label htmlFor=''>
							Weather
							<input
								type='text'
								name='weather'
								value={weather}
								onChange={(event) => setWeather(event.target.value)}
							/>
						</label>
					</div>
					<div>
						<label htmlFor=''>
							Visibility
							<input
								type='text'
								name='vis'
								value={visibility}
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
