import Hero from '../Components/Home/Hero';
import TopBaskets from '../Components/Home/TopBaskets';
import TrendingManagers from '../Components/Home/TrendingManagers.js';
import Partners from '../Components/Home/Partners';
import CreateBaskets from '../Components/Home/CreateBaskets';
import Steps from '../Components/Home/Steps';
import Subscription from '../Components/Home/Subscription';
import FAQ from '../Components/Home/FAQ';

const index = () => {
  return (
    <>
      <Hero />
      <TopBaskets />
      <TrendingManagers />
      <Partners />
      <Steps />
      <CreateBaskets />
      <Subscription />
      <FAQ />
    </>
  );
};

export default index;
