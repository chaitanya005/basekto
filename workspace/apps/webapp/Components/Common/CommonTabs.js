import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box } from '@mui/material';

function TabPanel({ children, value, index, ...other }) {
  return (
    <Box
      sx={{ mt: 4, mb: 8 }}
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && children}
    </Box>
  );
}

const CommonTabs = (props) => {
  const { tabLabels, tabIndex, handleChange, tabPanels, variant } = props;

  return (
    <>
      <Box
        sx={{
          mt: 2,
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs variant={variant} value={tabIndex} onChange={handleChange}>
          {tabLabels.map((tabLabel, i) => (
            <Tab key={i} label={tabLabel} />
          ))}
        </Tabs>
      </Box>
      {tabPanels.map((tabPanel, i) => (
        <TabPanel value={tabIndex} index={i} key={i}>
          {tabPanel}
        </TabPanel>
      ))}
    </>
  );
};

export default CommonTabs;
