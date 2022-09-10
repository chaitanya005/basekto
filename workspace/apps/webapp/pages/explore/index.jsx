import { useState } from 'react';
import SearchBar from '../../Components/Explore/SearchBar';
import Baskets from '../../Components/Explore/Baskets';
import { Container, Grid } from '@mui/material';
import Link from 'next/link';
import { BasketCard } from '@basketo/web-ui';
// import Subscription from '../../Components/Home/Subscription';

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

const basketsData = {
  baskets: [
    {
      _id: 'demo',
      name: 'Web3',
      symbol: 'WEB3',
      accountId: '0x87227977f0ce8a35A2E43440AbA7ea186BF65E6f',
      description: 'Through data and research, Alice reveals the depths of opportunities awaiting traditional finance, setting the stage for adventures that come with Web3.',
      growthRate: 11.05,
    }
  ]
};

const Explore = () => {
  const [query, setQuery] = useState({ search: '', filters });
  const queryString = `?q=${query.search}&${query.filters.toString()}`;

  return (
    <>
      <SearchBar
        search={query.search}
        setSearch={(val) => setQuery({ ...query, search: val })}
        filters={query.filters}
        setFilters={(val) => setQuery({ ...query, filters: val })}
      />
      {/* <Subscription title={'Get Early Access'} /> */}
      {/* <Baskets queryString={queryString} /> */}

      <Container maxWidth="lg" sx={{ mt: 4, mb: 8 }}>
        <Grid container spacing={ 2 }>
          { basketsData?.baskets?.map((basket, i) => (
            <Grid item key={i} xs={12} sm={6} md={4} lg={3}>
              <Link href="/demo">
                <a>
                  <BasketCard
                    data={{
                      title: basket?.name,
                      symbol: basket?.symbol,
                      basketeer: basket?.accountId,
                      description: basket?.description,
                      basketGrowth: basket?.growthRate,
                    }}
                    showDescription
                  />
                </a>
              </Link>
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default Explore;
