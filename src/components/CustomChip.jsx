import { Chip } from '@mui/material';

const CustomChip = ({ label, className, icon }) => {
	return (
		<Chip
			size='small'
			label={label}
			className={className}
			icon={icon}
			sx={{ fontSize: '14px', borderRadius: '8px', padding: '0.4rem 0.8rem' }}
		/>
	);
};

export default CustomChip;
