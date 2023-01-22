import { useState } from 'react';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import SearchBar from '../../Components/Explore/SearchBar';
import Baskets from '../../Components/Explore/Baskets';
import Head from 'next/head';

const filters = {
  growthRate: 'any',
  getGrowthRate: function () {
    return this.growthRate[0].toUpperCase() + this.growthRate.slice(1);
  },

  tokens: new Set(),
  getTokens: function () {
    return Array.from(this.tokens);
  },

  getAll: function () {
    const filters = [];
    if (this.growthRate !== 'any') {
      filters.push({
        label: this.getGrowthRate(),
        clear: (filters, setFilters) => {
          setFilters({ ...filters, growthRate: 'any' });
        },
      });
    }

    filters.push(
      ...this.getTokens().map((token) => ({
        label: token,
        clear: (filters, setFilters) => {
          const tokens = new Set(filters.tokens);
          tokens.delete(token);
          setFilters({ ...filters, tokens });
        },
      }))
    );

    return filters;
  },

  clearAll: (filters, setFilters) => {
    setFilters({
      ...filters,
      growthRate: 'any',
      tokens: new Set(),
    });
  },

  toString: function () {
    // const tokens = encodeURIComponent(JSON.stringify(this.getTokens()));
    const tokens = JSON.stringify(this.getTokens());
    return `growthRate=${this.growthRate}&tokens=${tokens}`;
  },
};

const Explore = () => {
  const [query, setQuery] = useState({ search: '', filters });
  const queryString = `?q=${query.search}&${query.filters.toString()}`;
  return (
    <>
      <Head>
        <title>Basketo | Explore</title>
      </Head>
      <Container maxWidth="lg">
        <Box sx={{ mt: 2, mb: 2 }}>
          <SearchBar
            search={query.search}
            setSearch={(val) => setQuery({ ...query, search: val })}
            filters={query.filters}
            setFilters={(val) => setQuery({ ...query, filters: val })}
          />
        </Box>
        <Box sx={{ mt: 4, mb: 8 }}>
          <Baskets queryString={queryString} />
        </Box>
      </Container>
    </>
  );
};

export default Explore;
