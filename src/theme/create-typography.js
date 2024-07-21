export const createTypography = () => {
	return {
		fontFamily:
			'"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
		body1: {
			fontSize: '1.6rem',
			fontWeight: 400,
			lineHeight: 1.5,
		},
		body2: {
			fontSize: '1.4rem',
			fontWeight: 400,
			lineHeight: 1.57,
		},
		button: {
			fontWeight: 600,
		},
		caption: {
			fontSize: '1.2rem',
			fontWeight: 500,
			lineHeight: 1.66,
			display: 'block',
		},
		subtitle1: {
			fontSize: '1.6rem',
			fontWeight: 500,
			lineHeight: 1.57,
		},
		subtitle2: {
			fontSize: '1.4rem',
			fontWeight: 500,
			lineHeight: 1.57,
		},
		overline: {
			fontSize: '1.2rem',
			fontWeight: 600,
			letterSpacing: '0.5px',
			lineHeight: 2.5,
			textTransform: 'uppercase',
		},
		h1: {
			fontWeight: 700,
			fontSize: '5.6rem',
			lineHeight: 1.2,
		},
		h2: {
			fontWeight: 700,
			fontSize: '4.8rem',
			lineHeight: 1.2,
		},
		h3: {
			fontWeight: 700,
			fontSize: '3.6rem',
			lineHeight: 1.2,

			'@media (min-width: 601px) and (max-width: 900px)': {
				fontSize: '3.2rem',
			},

			'@media (max-width: 600px)': {
				fontSize: '2.8rem',
			},
		},
		h4: {
			fontWeight: 700,
			fontSize: '3.2rem',
			lineHeight: 1.2,
		},
		h5: {
			fontWeight: 700,
			fontSize: '2.4rem',
			lineHeight: 1.2,

			'@media (min-width: 601px) and (max-width: 900px)': {
				fontSize: '2.2rem',
			},

			'@media (max-width: 600px)': {
				fontSize: '1.8rem',
			},
		},
		h6: {
			fontWeight: 700,
			fontSize: '1.8rem',
			lineHeight: 1.2,

			'@media (max-width: 600px)': {
				fontSize: '1.6rem',
			},
		},
	};
};
