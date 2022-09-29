/* eslint-disable @next/next/no-img-element */
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import styles from './Footer.module.css';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TelegramIcon from '@mui/icons-material/Telegram';
import TwitterIcon from '@mui/icons-material/Twitter';
import { Paper } from '@mui/material';
import { useTheme } from '@mui/material';

const socialLinks = [
  { title: 'telegram', url: 'https://t.me/basketofinance', icon: TelegramIcon },
  {
    title: 'instagram',
    url: 'https://www.instagram.com/basketo.finance/',
    icon: InstagramIcon,
  },
  {
    title: 'linkedin',
    url: 'https://www.linkedin.com/company/basketo-finance',
    icon: LinkedInIcon,
  },
  { title: 'twitter', url: 'https://twitter.com/0xBasketo', icon: TwitterIcon },
];

const quickLinks = [
  // { title: "Careers", url: "/careers" },
  { title: 'About us', url: 'https://in.linkedin.com/company/basketo-finance' },
  { title: 'Contact us', url: 'mailto:company@basketo.finance' },
  // { title: "Pricing", url: "/pricing" },
  // { title: "Help and Support", url: "/support" },
];

const Footer = () => {
  const {palette:{mode}} = useTheme();

  return (
    <Paper variant="section" color="secondary" sx={{ padding: '30px 20px' }}>
      <Container maxWidth="lg">
        <Grid container>
          <Grid item xs={12} md={5}>
            <Typography
              variant="h4"
              component="div"
              sx={{ fontFamily: 'Work Sans', mb: 2, fontSize: '2rem' }}
            >
            <div style={{display:"flex"}}>
              <img src={`/images${mode=='dark'?'D':''}/logo.png`} alt="Basketo" 
              style={{maxWidth: "200px"}} 
              /> 
            <span style={{ fontWeight: '300',paddingTop:"10px" }}>finance</span> &#8482;
            </div>
            </Typography> 
            <div className={styles.address}>
              T-Hub, Phase-2
              <br />
              Madhapur, Hyderabad - 500032
            </div>
          </Grid>

          <Grid item xs={12} md={3.5}>
            <div className={styles['quick-links']}>
            <Typography
                variant="h6"
                sx={{
                  color: '#949494',
                  fontSize: '1rem',
                  letterSpacing: '0.2rem',
                }}
              >
                QUICK LINKS
              </Typography>
              <ul>
                {quickLinks.map((link) => (
                  <li key={link.title}>
                    <a href={link.url}>{link.title}</a>
                  </li>
                ))}
              </ul>
            </div>
          </Grid>

          <Grid item xs={12} md={3.5}>
            <Typography
                  variant="h6"
                  sx={{
                    color: '#949494',
                    fontSize: '1rem',
                    letterSpacing: '0.2rem',
                  }}
            >
              Follow us on:
            </Typography>
                  <div className={styles.social}>
                {socialLinks.map(({ title, url, icon: Icon }) => (
                  <a
                    key={title}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    style={{ marginRight: '1rem' }}
                  >
                    <Icon sx={{ fontSize: '2rem' }} />
                  </a>
                ))}
              </div>
          </Grid>
        </Grid>
      </Container>
    </Paper>
  );
};

export default Footer;
