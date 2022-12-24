import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';
import Filters from '../Filters';

const SearchBar = ({ search, setSearch, filters, setFilters }) => {
  return (
    <>
      <Typography variant="h3" sx={{ fontSize: '2.5rem', mb: 3 }}>
        Discover, invest, & participate in Baskets
      </Typography>

      <Grid container alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Grid item sx={{ flex: 1 }}>
          <TextField
            variant="outlined"
            color="primary"
            fullWidth
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
              endAdornment: search && (
                <InputAdornment position="end">
                  <IconButton onClick={() => setSearch('')}>
                    <ClearIcon />
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
        </Grid>

        <Grid item>
          <Filters filters={filters} setFilters={setFilters} />
        </Grid>
      </Grid>

      <Box sx={{ mb: 2 }}>
        {filters.getAll().map((filter, i) => (
          <Chip
            key={i}
            label={filter.label}
            // variant="outlined"
            color="info"
            onClick={() => filter.clear(filters, setFilters)}
            onDelete={() => filter.clear(filters, setFilters)}
            sx={{ mr: 0.5, mb: 0.5 }}
          />
        ))}

        {filters.getAll().length !== 0 && (
          <Chip
            label="Clear All"
            variant="outlined"
            color="error"
            onClick={() => filters.clearAll(filters, setFilters)}
            sx={{ mr: 0.5, mb: 0.5 }}
          >
            Clear All
          </Chip>
        )}
      </Box>

      <Divider />
    </>
  );
};

export default SearchBar;
