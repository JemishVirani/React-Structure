import {
	createTheme,
	filledInputClasses,
	inputLabelClasses,
	outlinedInputClasses,
	paperClasses,
	tableCellClasses,
} from '@mui/material';
import { common } from './colors';

// Used only to create transitions
const muiTheme = createTheme();

export function createComponents(config) {
	const { palette } = config;

	return {
		MuiAvatar: {
			styleOverrides: {
				root: {
					fontSize: '1.4rem',
					fontWeight: 600,
					letterSpacing: 0,
				},
			},
		},
		MuiButtonBase: {
			styleOverrides: {
				root: {
					'&:disabled': {
						cursor: 'not-allowed',
						pointerEvents: 'auto',
					},
				},
			},
		},
		MuiButton: {
			styleOverrides: {
				root: {
					fontSize: '1.4rem',
					borderRadius: '12px',
					textTransform: 'none',

					'&:disabled': {
						cursor: 'not-allowed',
						pointerEvents: 'auto',
					},
				},
				contained: {
					'&:disabled': {
						backgroundColor: common.grey,
						color: common.white,
						cursor: 'not-allowed',
						pointerEvents: 'auto',
					},
					'&:hover': {
						color: common.white,
					},
				},
				sizeSmall: {
					padding: '6px 16px',
				},
				sizeMedium: {
					padding: '0.8rem 2rem',
				},
				sizeLarge: {
					padding: '11px 24px',
				},
				textSizeSmall: {
					padding: '7px 12px',
				},
				textSizeMedium: {
					padding: '9px 16px',
				},
				textSizeLarge: {
					padding: '12px 16px',
				},
			},
		},
		MuiIconButton: {
			styleOverrides: {
				root: {
					padding: 0,
					color: common.darkGrey,
					'&:disabled': {
						color: common.grey,
						cursor: 'not-allowed',
						pointerEvents: 'auto',
					},
				},
			},
		},
		MuiCard: {
			styleOverrides: {
				root: {
					borderRadius: 20,
					[`&.${paperClasses.elevation1}`]: {
						boxShadow:
							'0px 5px 22px rgba(0, 0, 0, 0.04), 0px 0px 0px 0.5px rgba(0, 0, 0, 0.03)',
					},
				},
			},
		},
		MuiCardContent: {
			styleOverrides: {
				root: {
					padding: '32px 24px',
					'&:last-child': {
						paddingBottom: '32px',
					},
				},
			},
		},
		MuiCardHeader: {
			defaultProps: {
				titleTypographyProps: {
					variant: 'h6',
				},
				subheaderTypographyProps: {
					variant: 'body2',
				},
			},
			styleOverrides: {
				root: {
					padding: '32px 24px 16px',
				},
			},
		},
		MuiCssBaseline: {
			styleOverrides: {
				'*': {
					boxSizing: 'border-box',
				},
				html: {
					MozOsxFontSmoothing: 'grayscale',
					WebkitFontSmoothing: 'antialiased',
					display: 'flex',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				body: {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					minHeight: '100%',
					width: '100%',
				},
				'#__next': {
					display: 'flex',
					flex: '1 1 auto',
					flexDirection: 'column',
					height: '100%',
					width: '100%',
				},
				'#nprogress': {
					pointerEvents: 'none',
				},
				'#nprogress .bar': {
					backgroundColor: palette.primary.main,
					height: 3,
					left: 0,
					position: 'fixed',
					top: 0,
					width: '100%',
					zIndex: 2000,
				},
			},
		},
		MuiInputBase: {
			styleOverrides: {
				input: {
					'&::placeholder': {
						opacity: 0.5,
					},
				},
			},
		},
		MuiInput: {
			styleOverrides: {
				input: {
					fontSize: '1.6rem',
					fontWeight: 500,
					lineHeight: '24px',
					'&::placeholder': {
						color: palette.text.secondary,
					},
				},
			},
		},
		MuiFilledInput: {
			styleOverrides: {
				root: {
					backgroundColor: 'transparent',
					borderRadius: 8,
					borderStyle: 'solid',
					borderWidth: 1,
					overflow: 'hidden',
					borderColor: common.grey,
					transition: muiTheme.transitions.create([
						'border-color',
						'box-shadow',
					]),
					'&:hover': {
						backgroundColor: palette.action.hover,
					},
					'&:before': {
						display: 'none',
					},
					'&:after': {
						display: 'none',
					},
					[`&.${filledInputClasses.disabled}`]: {
						backgroundColor: 'transparent',
					},
					[`&.${filledInputClasses.focused}`]: {
						backgroundColor: 'transparent',
						borderColor: palette.primary.main,
						boxShadow: `${palette.primary.main} 0 0 0 2px`,
					},
					[`&.${filledInputClasses.error}`]: {
						borderColor: palette.error.main,
						boxShadow: `${palette.error.main} 0 0 0 2px`,
					},
				},
				input: {
					fontSize: '1.6rem',
					fontWeight: 500,
					lineHeight: '24px',
				},
			},
		},
		// MuiInputBase: {
		//   styleOverrides: {
		//     input: {
		//       padding: "0 !important",
		//     },
		//   },
		// },
		MuiOutlinedInput: {
			styleOverrides: {
				root: {
					'&:hover': {
						backgroundColor: palette.action.hover,
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: common.grey,
						},
					},
					[`&.${outlinedInputClasses.focused}`]: {
						backgroundColor: 'transparent',
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: palette.primary.main,
							boxShadow: `${palette.primary.main} 0 0 0 1px`,
						},
					},
					[`&.${filledInputClasses.error}`]: {
						[`& .${outlinedInputClasses.notchedOutline}`]: {
							borderColor: palette.error.main,
							boxShadow: `${palette.error.main} 0 0 0 1px`,
						},
					},
				},
				input: {
					fontSize: '1.6rem',
					fontWeight: 500,
					lineHeight: '24px',
					padding: '1.2rem 1.2rem',
				},
				notchedOutline: {
					borderColor: common.grey,
					transition: muiTheme.transitions.create([
						'border-color',
						'box-shadow',
					]),
				},
			},
		},
		MuiFormLabel: {
			styleOverrides: {
				root: {
					fontSize: '1.6rem',
					fontWeight: 500,
					[`&.${inputLabelClasses.filled}`]: {
						transform: 'translate(12px, 18px) scale(1)',
					},
					[`&.${inputLabelClasses.shrink}`]: {
						[`&.${inputLabelClasses.standard}`]: {
							transform: 'translate(0, -1.5px) scale(0.85)',
						},
						[`&.${inputLabelClasses.filled}`]: {
							transform: 'translate(12px, 6px) scale(0.85)',
						},
						[`&.${inputLabelClasses.outlined}`]: {
							transform: 'translate(14px, -9px) scale(0.85)',
						},
					},
				},
			},
		},
		MuiInputLabel: {
			styleOverrides: {
				root: {
					fontSize: '1.6rem',
					fontWeight: 500,
					paddingBottom: '0.4rem',
					color: palette.text.primary,
					whiteSpace: 'wrap',
					[`&.${inputLabelClasses.filled}`]: {
						transform: 'translate(12px, 18px) scale(1)',
					},
					[`&.${inputLabelClasses.shrink}`]: {
						[`&.${inputLabelClasses.standard}`]: {
							transform: 'translate(0, -1.5px) scale(0.85)',
						},
						[`&.${inputLabelClasses.filled}`]: {
							transform: 'translate(12px, 6px) scale(0.85)',
						},
						[`&.${inputLabelClasses.outlined}`]: {
							transform: 'translate(14px, -9px) scale(0.85)',
						},
					},
				},
			},
		},
		MuiTab: {
			styleOverrides: {
				root: {
					fontSize: '1.6rem',
					fontWeight: 500,
					lineHeight: 1.71,
					minWidth: 'auto',
					paddingLeft: 0,
					paddingRight: 0,
					textTransform: 'none',
					'& + &': {
						marginLeft: 24,
					},
				},
			},
		},
		MuiTableCell: {
			styleOverrides: {
				root: {
					borderBottomColor: common.lightGrey,
				},
				sizeSmall: {
					padding: '1.2rem 1.6rem',
				},
			},
		},
		MuiTableHead: {
			styleOverrides: {
				root: {
					borderBottom: 'none',
					[`& .${tableCellClasses.root}`]: {
						borderBottom: 'none',
						backgroundColor: common.white,
						color: common.darkGrey,
						fontSize: '1.4rem',
						fontWeight: 600,
						lineHeight: 'normal',
						letterSpacing: 0.5,
						// textTransform: "uppercase",
						padding: '1.6rem 1rem',
					},
					[`& .${tableCellClasses.paddingCheckbox}`]: {
						paddingTop: 4,
						paddingBottom: 4,
					},
				},
			},
		},
		// MuiTableRow: {
		//   styleOverrides: {
		//     root: {
		//       "&:hover": {
		//         backgroundColor: "rgb(0 153 22 / 50%) !important",
		//       },
		//     },
		//   },
		// },
		MuiTextField: {
			defaultProps: {
				variant: 'filled',
			},
		},
		MuiSvgIcon: {
			styleOverrides: {
				root: {},
				fontSizeSmall: {
					fontSize: '1.6rem',
				},
				fontSizeMedium: {
					fontSize: '2rem',
				},
				fontSizeLarge: {
					fontSize: '2.2rem',
				},
			},
		},
	};
}
