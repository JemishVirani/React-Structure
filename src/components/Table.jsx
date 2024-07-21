import { useState, useMemo, useEffect, useCallback } from 'react';
import {
	Box,
	Button,
	IconButton,
	MenuItem,
	Select,
	Tooltip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import {
	formatDate,
	formatGiftCardCode,
	getNumberInLocalFormat,
} from '../utils/helpers';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import CustomChip from './CustomChip';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PendingIcon from '@mui/icons-material/Pending';
import BlockIcon from '@mui/icons-material/Block';
import EventBusyIcon from '@mui/icons-material/EventBusy';
import ReceiptIcon from '@mui/icons-material/Receipt';
import { GiftCardMode } from '../utils/constants';
// import { mkConfig, generateCsv, download } from 'export-to-csv';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import CopyToClipboard from 'react-copy-to-clipboard';
import serverData from './data';
import { toast } from 'react-toastify';
import {
	MaterialReactTable,
	useMaterialReactTable,
} from 'material-react-table';

const Page = () => {
	const [validationErrors, setValidationErrors] = useState({});
	const [isFetchingGiftCards, setIsFetchingGiftCards] = useState(true);
	const [isSavingGiftCard, setIsSavingGiftCard] = useState(false);
	const [giftCards, setGiftCards] = useState([]);
	const [pagination, setPagination] = useState({
		pageIndex: 0,
		pageSize: 10,
	});
	const [rowCount, setRowCount] = useState(0);
	const [globalFilter, setGlobalFilter] = useState('');
	const [sorting, setSorting] = useState([
		{
			id: 'purchase_date',
			desc: true,
		},
	]);
	const [columnVisibility, setColumnVisibility] = useState({
		firstName: false,
	});
	const [columnFilters, setColumnFilters] = useState([]);
	const [currentEditRow, setCurrentEditRow] = useState(null);

	const getStatusChip = (label) => {
		switch (label) {
			case 'active':
				return (
					<CustomChip
						label={'Active'}
						className='chip-success'
						icon={<CheckCircleIcon />}
					/>
				);
			case 'inactive':
				return (
					<CustomChip
						label={'Inactive'}
						className='chip-error-dark'
						icon={<WarningIcon />}
					/>
				);
			case 'expired':
				return (
					<CustomChip
						label={'Expired'}
						className='chip-error'
						icon={<EventBusyIcon />}
					/>
				);
			case 'pending_payment':
				return (
					<CustomChip
						label={'Payment Pending'}
						className='chip-info'
						icon={<PendingIcon />}
					/>
				);
			case 'blocked':
				return (
					<CustomChip
						label={'Blocked'}
						className='chip-warning'
						icon={<BlockIcon />}
					/>
				);
			default:
				return null;
		}
	};

	const getGiftCardModeChip = (label) => {
		switch (label) {
			case GiftCardMode.LIVE:
				return (
					<CustomChip
						label={'Live'}
						className={'chip-success'}
						icon={<CheckCircleIcon />}
					/>
				);
			case GiftCardMode.DEMO:
				return (
					<CustomChip
						label={'Demo'}
						className='chip-error'
						icon={<WarningIcon />}
					/>
				);
			default:
				return null;
		}
	};

	const giftCardModeOptions = useMemo(() => {
		return [
			{ label: 'Demo', value: GiftCardMode.DEMO },
			{ label: 'Live', value: GiftCardMode.LIVE },
		];
	}, []);

	// const getShortenedId = (text) => {
	// 	if (text) {
	// 		return text.substring(0, 10) + '...';
	// 	} else {
	// 		return text;
	// 	}
	// };

	const columns = useMemo(
		() => [
			{
				accessorKey: 'purchase_date',
				header: 'Purchase Date',
				enableEditing: false,
				filterVariant: 'date',
				muiFilterDatePickerProps: {
					format: 'dd.MM.yyyy',
					disableFuture: true,
				},
			},
			{
				accessorKey: 'code',
				header: 'Gift Card Code',
				enableEditing: false,
			},
			{
				accessorKey: 'amount',
				enableFilterMatchHighlighting: false,
				header: 'Purchase Value',
				enableEditing: false,
				muiFilterTextFieldProps: {
					type: 'number',
				},
			},
			{
				accessorKey: 'available_amount',
				enableFilterMatchHighlighting: false,
				header: 'Available Amount',
				enableEditing: false,
				muiFilterTextFieldProps: {
					type: 'number',
				},
			},
			{
				accessorKey: 'validtill_date',
				header: 'Valid To',
				enableEditing: false,
				filterVariant: 'date',
				muiFilterDatePickerProps: {
					format: 'dd.MM.yyyy',
					disableFuture: true,
				},
			},
			{
				accessorKey: 'studio_name',
				header: 'Issuer',
				enableEditing: false,
			},
			{
				accessorKey: 'fullname',
				header: 'Full Name',
				enableEditing: false,
			},
			{
				accessorKey: 'user',
				header: 'Email',
				muiEditTextFieldProps: {
					required: true,
					error: !!validationErrors?.user,
					helperText: validationErrors?.user,
					onFocus: () =>
						setValidationErrors({
							...validationErrors,
							user: undefined,
						}),
				},
			},
			{
				accessorKey: 'status',
				header: 'Status',
				size: 150,
				enableResizing: false,
				editVariant: 'select',
				editSelectOptions: ['Active', 'Inactive'],
				muiEditTextFieldProps: {
					select: true,
					error: !!validationErrors?.status,
					helperText: validationErrors?.status,
				},
				Edit: ({ row }) => {
					const cellValue = row.getValue('status');
					const onChangeHandler = (event) => {
						row._valuesCache['status'] = event.target.value;
						setValidationErrors({
							...validationErrors,
							status: undefined,
						});
					};
					return (
						<Select value={cellValue} onChange={onChangeHandler} fullWidth>
							<MenuItem value='active'>{'Active'}</MenuItem>
							<MenuItem value='inactive'>{'Inactive'}</MenuItem>
							<MenuItem value='expired' disabled>
								{'Expired'}
							</MenuItem>
							<MenuItem value='pending_payment' disabled>
								{'Payment Pending'}
							</MenuItem>
							<MenuItem value='blocked' disabled>
								{'Blocked'}
							</MenuItem>
						</Select>
					);
				},
				Cell: ({ row }) => {
					const cellValue = row.getValue('status');
					return getStatusChip(cellValue);
				},
				filterVariant: 'select',
				filterSelectOptions: [
					{ label: 'Active', value: 'active' },
					{ label: 'Inactive', value: 'inactive' },
					{ label: 'Expired', value: 'expired' },
					{ label: 'Payment Pending', value: 'pending_payment' },
					{ label: 'Blocked', value: 'blocked' },
				],
			},
			{
				accessorKey: 'giftcard_mode',
				header: 'Gift Card Mode',
				size: 150,
				enableEditing: false,
				filterVariant: 'select',
				filterSelectOptions: giftCardModeOptions,
				enableFilterMatchHighlighting: false,
				Cell: ({ renderedCellValue }) => {
					return <>{getGiftCardModeChip(renderedCellValue)}</>;
				},
			},
			{
				accessorKey: 'invoice_id',
				header: 'Invoice ID',
				enableEditing: false,
				enableFilterMatchHighlighting: false,
				Cell: ({ renderedCellValue }) => (
					<>
						<CopyToClipboard
							text={renderedCellValue}
							onCopy={() =>
								toast.success("Gift Card's invoice ID copied to clipboard")
							}
						>
							<Tooltip title={'Click to copy'}>
								<span style={{ cursor: 'pointer' }}>{renderedCellValue}</span>
							</Tooltip>
						</CopyToClipboard>
					</>
				),
			},
			{
				accessorKey: 'payment_id',
				header: 'Payment ID',
				enableEditing: false,
				enableFilterMatchHighlighting: false,
				Cell: ({ renderedCellValue }) => (
					<>
						{renderedCellValue ? (
							<CopyToClipboard
								text={renderedCellValue}
								onCopy={() =>
									toast.success("Gift Card's payment ID copied to clipboard")
								}
							>
								<Tooltip title={'Click to copy'}>
									<span style={{ cursor: 'pointer' }}>{renderedCellValue}</span>
								</Tooltip>
							</CopyToClipboard>
						) : (
							<span>-</span>
						)}
					</>
				),
			},
		],
		[validationErrors]
	);

	const handleExportRows = () => {
		console.log('exporting rows...');
	};
	const fetchGiftCards = useCallback(
		async (fileType = null) => {
			try {
				if (globalFilter && !globalFilter.trim()) return;
				setIsFetchingGiftCards(true);

				const { giftcards, total_giftcards } = serverData || {};

				if (fileType === 'csv') {
					return handleExportRows(giftcards);
				}
				const formattedData = giftcards.map((item) => {
					return {
						id: item._id,
						purchase_date: formatDate(item.purchase_date),
						code: formatGiftCardCode(item.code),
						amount: `${getNumberInLocalFormat(item.amount)} €`,
						available_amount: `${getNumberInLocalFormat(
							item.available_amount
						)} €`,
						validtill_date: formatDate(item.validtill_date),
						studio_name: item.shop.studio_name,
						user: item.user,
						fullname: item.invoice?.fullname,
						status: item.status,
						pdf_url: item.pdf_url,
						invoice: item.invoice,
						invoice_id: item.invoice?._id,
						payment_id: item.invoice?.payment_id,
						giftcard_mode: item.giftcard_mode,
					};
				});
				setGiftCards(formattedData);
				setRowCount(total_giftcards);
			} catch (error) {
				console.log(error);
				setIsFetchingGiftCards(false);
				toast.error('Something went wrong');
			} finally {
				setIsFetchingGiftCards(false);
			}
		},
		[pagination, sorting, globalFilter, columnFilters]
	);

	const updateGiftCard = async () => {
		try {
			console.log('updating gift card...');
		} catch (error) {
			setIsFetchingGiftCards(false);
			toast.error('Something went wrong');
		}
	};

	const handleUpdateGiftCard = ({ exitEditingMode, row, values }) => {
		const payload = {
			user: values.user,
			status: values.status,
		};
		updateGiftCard(row.id, payload, exitEditingMode, values);
	};

	const handleUpdateCancel = () => {
		setValidationErrors({});
		setCurrentEditRow(null);
	};

	useEffect(() => {
		fetchGiftCards();
	}, [fetchGiftCards]);

	const table = useMaterialReactTable({
		columns: columns,
		data: giftCards,
		createDisplayMode: 'row',
		editDisplayMode: 'row',
		enableEditing: true,
		getRowId: (row) => row.id,
		enableColumnFilters: true,
		muiTableContainerProps: {
			sx: {
				minHeight: '300px',
			},
		},
		enableColumnActions: true,
		onColumnFiltersChange: setColumnFilters,
		onEditingRowCancel: handleUpdateCancel,
		onEditingRowSave: handleUpdateGiftCard,
		onCreatingRowCancel: () => {},
		onCreatingRowSave: () => {},
		positionActionsColumn: 'last',
		renderRowActions: ({ row, table }) => (
			<Box sx={{ display: 'flex', gap: '1rem' }}>
				<Tooltip title={'Edit'}>
					<IconButton
						onClick={() => {
							if (currentEditRow) return;
							setCurrentEditRow(row);
							setValidationErrors({});
							setColumnVisibility({});
							table.setEditingRow(row);
						}}
					>
						<EditIcon />
					</IconButton>
				</Tooltip>
				{/* <Tooltip title={t("giftCardDashboard.resendEmail")}>
                <IconButton onClick={() => {}}>
                  <EmailIcon />
                </IconButton>
              </Tooltip> */}
				<Tooltip title={'Download'}>
					<IconButton>
						<a href={row.original.pdf_url} target='_blank' download>
							<CloudDownloadIcon />
						</a>
					</IconButton>
				</Tooltip>
				{row.original?.invoice?.hosted_url && (
					<Tooltip title={'View'}>
						<IconButton>
							<a
								href={row.original.invoice.hosted_url}
								target='_blank'
								download
							>
								<ReceiptIcon />
							</a>
						</IconButton>
					</Tooltip>
				)}
			</Box>
		),
		manualPagination: true,
		manualFiltering: true,
		manualSorting: true,
		onGlobalFilterChange: setGlobalFilter,
		onPaginationChange: setPagination,
		onSortingChange: setSorting,
		onColumnVisibilityChange: setColumnVisibility,
		rowCount: rowCount,
		muiPaginationProps: {
			rowsPerPageOptions: [10, 25, 50, 100],
			color: 'primary',
			shape: 'rounded',
			variant: 'outlined',
		},
		paginationDisplayMode: 'pages',
		state: {
			isLoading: isFetchingGiftCards,
			isSaving: isSavingGiftCard,
			pagination: pagination,
			sorting: sorting,
			globalFilter: globalFilter,
			columnVisibility: columnVisibility,
			columnFilters: columnFilters,
		},
		muiTopToolbarProps: {
			sx: {
				minHeight: '5.5rem',
				margin: '0.5rem',
			},
		},
		muiBottomToolbarProps: {
			sx: {
				minHeight: '5.5rem',
			},
		},
		muiSearchTextFieldProps: {
			placeholder: 'Search giftcards...',
		},
		muiLinearProgressProps: ({ isTopToolbar }) => ({
			sx: {
				display: isTopToolbar ? 'block' : 'none',
			},
		}),
		enableColumnPinning: true,
		initialState: {
			columnPinning: { left: [], right: ['mrt-row-actions'] },
		},
		renderTopToolbarCustomActions: ({ table }) => (
			<Box sx={{ display: 'flex', gap: '1rem' }}>
				<Button
					disabled={table.getPrePaginationRowModel().rows.length === 0}
					variant='outlined'
					onClick={() => fetchGiftCards('csv')}
					startIcon={<FileDownloadIcon />}
				>
					{'Export as CSV'}
				</Button>
			</Box>
		),
	});

	return (
		<>
			<Box className='material-table'>
				<MaterialReactTable table={table} />
			</Box>
		</>
	);
};

export default Page;
