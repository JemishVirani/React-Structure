import { alpha } from '@mui/material';
import { primary, common, error, info, success, warning } from './colors';

export function createPalette() {
	return {
		action: {
			active: common.grey,
			disabled: alpha(common.black, 0.38),
			disabledBackground: alpha(common.black, 0.12),
			focus: alpha(common.black, 0.16),
			hover: alpha(common.black, 0.04),
			selected: alpha(common.black, 0.12),
		},
		background: {
			default: common.white,
			paper: common.white,
		},
		divider: '#F2F4F7',
		error,
		info,
		mode: 'light',
		primary,
		secondary: {
			main: '#777777',
			dark: '#323232',
		},
		success,
		text: {
			primary: common.black,
			secondary: common.grey,
			disabled: alpha(common.black, 0.38),
		},
		warning,
	};
}
