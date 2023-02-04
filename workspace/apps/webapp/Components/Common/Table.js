import { useState } from 'react';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import MuiTable from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, useTheme } from '@mui/material/styles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';

const StyledTableCell = styled(TableCell)(() => ({
  [`&.${tableCellClasses.head}`]: {
    fontSize: '1rem',
    fontWeight: 'bold',
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: '0.9rem',
  },
}));

const TableHeadRow = styled(TableRow)(() => ({
  borderBottom: '1.1px solid #777',
}));

const Table = ({
	title,
	data,
	stickyHeader,
	defaultColumnIndex,
	style,
}) => {
  const smDown = useMediaQuery(useTheme().breakpoints.down('sm'));

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

	const columns = data.headings;
  const [selectedColumnIndex, setSelectedColumnIndex] = useState(defaultColumnIndex);

  return (
    <>
			{title && (
				<Typography
					variant="h5"
					fontWeight="bold"
				>
					{ title }
				</Typography>
			)}

      <TableContainer
        component={Paper}
        sx={{
					marginTop: '1rem',
					borderRadius: '10px',
					...style,
				}}
      >
        <MuiTable stickyHeader={stickyHeader}>
          <TableHead>
            <TableHeadRow>
							<StyledTableCell>
								{columns[0]}
							</StyledTableCell>

              {smDown && columns.length > 2 ? (
                <StyledTableCell>
                  <Box
                    display="flex"
                    justifyContent="flex-end"
                    alignItems="center"
                    onClick={handleClick}
                    sx={{ cursor: 'pointer' }}
                  >
                    {columns[selectedColumnIndex]}
                    <KeyboardArrowDownIcon />
                  </Box>

                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                    transformOrigin={{
                      horizontal: 'right',
                      vertical: 'top',
                    }}
                    anchorOrigin={{
                      horizontal: 'right',
                      vertical: 'bottom',
                    }}
                  >
                    {Object.keys(columns).slice(1).map((columnIndex) => (
                      <MenuItem
                        key={columnIndex}
                        selected={columnIndex === selectedColumnIndex}
                        onClick={() => {
                          setSelectedColumnIndex(columnIndex);
                          handleClose();
                        }}
                      >
                        {columns[columnIndex]}
                      </MenuItem>
                    ))}
                  </Menu>
                </StyledTableCell>
              ) : (
								columns.slice(1).map((heading, i) => (
									<StyledTableCell
										key={i}
										align={
											smDown ? 'right' : 'center'
										}
									>
										{heading}
									</StyledTableCell>
								))
              )}
            </TableHeadRow>
          </TableHead>

          <TableBody>
						{data.rows?.map((row, i) => (
              <TableRow
                key={i}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
								{(smDown && columns.length > 2
									? [row[0], row[selectedColumnIndex]]
									: row
								).map((rowItem, i) => (
									<StyledTableCell
										key={i}
										align={
											i === 0
												? 'left'
												: smDown ? 'right' : 'center'
										}
									>
										{rowItem}
									</StyledTableCell>
								))}
              </TableRow>
						))}
          </TableBody>
        </MuiTable>
      </TableContainer>
    </>
  );
};

export default Table;