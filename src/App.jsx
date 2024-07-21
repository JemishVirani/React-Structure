import { ThemeProvider, Typography } from '@mui/material';
import { createTheme } from './theme';
import Table from './components/Table';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
	const muiTheme = createTheme();
	return (
		<>
			<ThemeProvider theme={muiTheme}>
				<ToastContainer
					position='top-right'
					autoClose={4000}
					hideProgressBar={false}
					newestOnTop={false}
					closeOnClick
					rtl={false}
					pauseOnFocusLoss={false}
					draggable
					pauseOnHover
					limit={3}
					closeButton={true}
					toastStyle={{ backgroundColor: '#333' }}
					bodyStyle={{ fontSize: '14px', color: '#fff' }}
				/>
				<Typography component={'h1'}>Vite + React</Typography>
				<Table />
			</ThemeProvider>
		</>
	);
}

export default App;
