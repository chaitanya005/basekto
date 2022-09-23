import { useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Menu, MenuItem, Skeleton, styled, useMediaQuery, useTheme } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.background.default,
        color: '#777',
        fontSize: '0.9rem',
        fontWeight: 'bold',
    },
    [`&.${tableCellClasses.body}`]: {
        backgroundColor: theme.palette.background.default,
        fontSize: '1rem',
        fontWeight: 'bold',
    },
}));

const TableHeadRow = styled(TableRow)(({ theme }) => ({
    borderBottom: '1.1px solid #777',
}));

const LoadingAnimation = ({ isLoading, variant, size, children }) => {

    const styles = {
        'circular': {
            width: size,
            height: size,
        },
        'text': {
            width: size
        }
    };

    return isLoading ? (

        <Skeleton
            variant={ variant }
            sx={ styles[variant] }
            animation="wave"
        />
    ) : (
        children
    );
};

function getTokenRow({ name, price, growthRate, withWeight, weight, img }, showDetails) {

    let row = { name, weight, img };
    if (showDetails) {
        row = { ...row, price, growthRate, withWeight }
    }
    return row;
}

const TokensTable = ({ tokensData, showDetails, isLoading }) => {

    const smDown = useMediaQuery(useTheme().breakpoints.down('sm'));

    const [anchorEl, setAnchorEl] = useState(null);
    const handleClick = (event) => setAnchorEl(event.currentTarget);
    const handleClose = () => setAnchorEl(null);

    const columns = {
        weight: 'Weight (%)',
        price: 'Price',
        growthRate: 'Growth Rate (100%)',
        withWeight: 'Growth Rate',
    };

    const [selectedColumn, setSelectedColumn] = useState('weight');

    const tokens = tokensData?.map(
        token => getTokenRow(token, showDetails)
    );

    const getFormattedValue = (column, value) => {

        switch (column) {

            case 'price': {
                return '$' + value;
            }
            case 'growthRate':
            case 'withWeight':
            case 'weight': {
                return value.toFixed(2) + '%';
            }
            default: {
                return value;
            }
        }
    };

    const getDetailedFormattedValues = (token) => {

        const detailedColumns = ['price', 'growthRate', 'withWeight'];
        return detailedColumns.map(column =>
            getFormattedValue(column, token[column])
        );
    };

    return (

        <TableContainer component={ Paper }>
            <Table sx={{ minWidth: { sm: 650 } }}>
                <TableHead>
                    <TableHeadRow>
                        <StyledTableCell>Token</StyledTableCell>
                        { showDetails && smDown ? (

                            <StyledTableCell>
                                <Box
                                    display="flex"
                                    justifyContent="flex-end"
                                    alignItems="center"
                                    onClick={ handleClick }
                                    sx={{ cursor: 'pointer' }}
                                >
                                    { columns[selectedColumn] }
                                    <KeyboardArrowDownIcon />
                                </Box>

                                <Menu
                                    anchorEl={ anchorEl }
                                    open={ Boolean(anchorEl) }
                                    onClose={ handleClose }
                                >
                                    { Object.keys(columns).map((column) => (

                                        <MenuItem
                                            key={ column }
                                            selected={ column === selectedColumn }
                                            onClick={ () => {
                                                setSelectedColumn(column);
                                                handleClose();
                                            }}
                                        >
                                            { columns[column] }
                                        </MenuItem>
                                    ))}
                                </Menu>
                            </StyledTableCell>
                        ) : (

                            <>
                                { showDetails && (
                                    <>
                                        <StyledTableCell align="right">Price</StyledTableCell>
                                        <StyledTableCell align="right">Growth Rate { '(100%)' }</StyledTableCell>
                                        <StyledTableCell align="right">Growth Rate</StyledTableCell>
                                    </>
                                )}
                                <StyledTableCell align="right">Weight { '(%)' }</StyledTableCell>
                            </>
                        )}
                    </TableHeadRow>
                </TableHead>

                <TableBody>
                    { (isLoading ? Array.from({ length: 3 }) : tokens)?.map((token, i) => (

                        <TableRow
                            key={ i }
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <StyledTableCell component="th" scope="row">
                                <Box display="flex" alignItems="center" gap={ 2.25 }>
                                    <LoadingAnimation variant="circular" size="28px" isLoading={ isLoading }>
                                        <Avatar
                                            src={ token?.img }
                                            alt={ token?.name + ' logo' }
                                            sx={{ width: 28, height: 28 }}
                                        />
                                    </LoadingAnimation>

                                    <LoadingAnimation variant="text" size="60px" isLoading={ isLoading }>
                                        { token?.name }
                                    </LoadingAnimation>
                                </Box>
                            </StyledTableCell>

                            { showDetails && smDown ? (

                                <StyledTableCell>
                                    <Box display="flex" justifyContent="right">
                                        <LoadingAnimation variant="text" size="30px" isLoading={ isLoading }>
                                            { token && getFormattedValue(selectedColumn, token[selectedColumn]) }
                                        </LoadingAnimation>
                                    </Box>
                                </StyledTableCell>
                            ) : (

                                <>
                                    { showDetails && (token
                                        ? getDetailedFormattedValues(token)
                                        : Array.from({ length: 3 })
                                    ).map((value, i) => (

                                        <StyledTableCell key={ i }>
                                            <Box display="flex" justifyContent="right">
                                                <LoadingAnimation variant="text" size="30px" isLoading={ isLoading }>
                                                    { value }
                                                </LoadingAnimation>
                                            </Box>
                                        </StyledTableCell>
                                    ))}

                                    <StyledTableCell>
                                        <Box display="flex" justifyContent="right">
                                            <LoadingAnimation variant="text" size="30px" isLoading={ isLoading }>
                                                { token && getFormattedValue('weight', token.weight) }
                                            </LoadingAnimation>
                                        </Box>
                                    </StyledTableCell>
                                </>
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TokensTable;