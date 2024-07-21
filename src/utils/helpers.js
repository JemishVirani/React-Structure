export const formatDate = (date) => {
	const d = new Date(date);
	const month = `${d.getMonth() + 1}`.padStart(2, '0');
	const day = `${d.getDate()}`.padStart(2, '0');
	const year = d.getFullYear();
	return `${day}.${month}.${year}`;
};

export const formatGiftCardCode = (data) => {
	const removedDash = data.split('-').join('');
	let finalString = '';
	for (let i = 0; i < removedDash.length; i += 4) {
		finalString += removedDash.slice(i, i + 4) + '-';
	}
	return finalString.slice(0, -1);
};

export const getImageNameFromUrl = (s3Url) => {
	const url = new URL(s3Url);
	const path = url.pathname;

	const pathSegments = path.split('/');
	const fileName = pathSegments[pathSegments.length - 1];

	return fileName.split('-').slice(1).join('-');
};

export function truncateToDecimals(num, decimals) {
	const number = +num;
	if (isNaN(number)) {
		return '';
	}
	const factor = Math.pow(10, decimals);
	return (Math.floor(num * factor) / factor).toFixed(decimals);
}

export function CapitalizeFirstChar(word) {
	if (!word) return '';
	return word.charAt(0).toUpperCase() + word.slice(1);
}

export function getNumberInLocalFormat(num, decimals = 2) {
	const number = +truncateToDecimals(num, decimals);
	if (isNaN(number)) {
		return '';
	}
	return number.toLocaleString('de', {
		minimumFractionDigits: decimals,
	});
}

export function calculateInclusiveTax(amount, taxRate) {
	const rawTaxAmount = amount - amount / (1 + taxRate / 100);
	const taxAmount = parseFloat(truncateToDecimals(rawTaxAmount, 2));
	const netAmount = parseFloat(truncateToDecimals(amount - taxAmount, 2));

	return {
		taxAmount,
		netAmount,
	};
}
