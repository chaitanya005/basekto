import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Avatar, Box, Skeleton, styled } from '@mui/material';

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

    const tokens = tokensData?.map(
        token => getTokenRow(token, showDetails)
    );

    const getDetailedFormattedValues = (token) => [
        '$' + token.price,
        token.growthRate.toFixed(2) + '%',
        token.withWeight.toFixed(2) + '%',
    ];

    return (

        <TableContainer component={ Paper }>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableHeadRow>
                        <StyledTableCell>Token</StyledTableCell>
                        { showDetails && (
                            <>
                                <StyledTableCell align="right">Price</StyledTableCell>
                                <StyledTableCell align="right">Growth Rate { '(100%)' }</StyledTableCell>
                                <StyledTableCell align="right">Growth Rate</StyledTableCell>
                            </>
                        )}
                        <StyledTableCell align="right">Weight { '(%)' }</StyledTableCell>
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
                                            sx={{ mr: 2.5, width: 28, height: 28 }}
                                        />
                                    </LoadingAnimation>

                                    <LoadingAnimation variant="text" size="60px" isLoading={ isLoading }>
                                        { token?.name }
                                    </LoadingAnimation>
                                </Box>
                            </StyledTableCell>

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
                                        { token?.weight.toFixed(2) + '%' }
                                    </LoadingAnimation>
                                </Box>
                            </StyledTableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default TokensTable;