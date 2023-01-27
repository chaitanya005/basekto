import * as React from "react";
import { styled } from "@mui/material/styles";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MuiAccordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/material";

const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:nth-of-type(1)": {
    borderRadius: "15px 15px 0 0",
  },
  "&:last-child": {
    borderRadius: "0 0 15px 15px",
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));

const faqs = [
  {
    id: 1,
    que: "What is Basketo?",
    ans: "Basketo is a decentralized marketplace for investing, tracking, and managing crypto baskets. It is a one-stop-shop for retail crypto investors who want to easily access a range of professional investment strategies and diversify their portfolio with minimal effort.",
  },
  {
    id: 2,
    que: "How does Basketo work?",
    ans: "On Basketo, users can discover and explore a wide variety of crypto baskets that are tailored to different investment goals and risk profiles. These baskets are created and backed by investment DAOs (Decentralized Autonomous Organizations), which are decentralized, transparent, and governed by smart contracts. Users can easily invest in a variety of crypto baskets, track their performance in real-time, and have full control over their funds.",
  },
  {
    id: 3,
    que: "Is Basketo secure?",
    ans: "Yes, Basketo is built on top of multiple blockchains, which ensures that all transactions are secure, transparent, and immutable. In addition, Basketo provides a self-custodian wallet for secure storage of funds.",
  },
  {
    id: 4,
    que: "What types of crypto baskets are available on Basketo?",
    ans: "Basketo offers a wide variety of crypto baskets, tailored to different investment goals and risk profiles. Users can explore different options and choose the ones that best align with their investment strategy.",
  },
  {
    id: 5,
    que: "Can I create my own crypto baskets on Basketo?",
    ans: "Yes, Basketo provides a range of tools and services for creators and investors, including support for multiple blockchains and marketplace analytics. This allows users to create and manage their own crypto baskets on the platform.",
  },
  {
    id: 6,
    que: "Is Basketo only for experienced investors?",
    ans: "No, Basketo is designed to be accessible and user-friendly for retail crypto investors of all levels. Whether you are a seasoned pro or just starting out in the world of cryptocurrency, Basketo has something to offer.",
  },
  {
    id: 7,
    que: "How do I get started with Basketo?",
    ans: "Getting started with Basketo is easy! Simply visit our website and connect your crypto wallet . From there, you can explore the different crypto baskets available on the platform and choose the ones that best align with your investment goals. Is there a minimum investment amount? There may be minimum investment amounts for certain crypto baskets on the platform. Please refer to the individual offerings for more information.",
  },
];

export default function FAQ() {
  const [expanded, setExpanded] = React.useState("");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };

  return (
    <>
      <Container sx={{ mt: 6, mb: 6 }}>
        <Typography
          color={"secondary.dark"}
          sx={{
            mb: { xs: "1rem", sm: "1.5rem" },
            letterSpacing: "3px",
            textAlign: { xs: "center", sm: "left" },
          }}
        >
          FAQs
        </Typography>
        <div>
          {faqs.map((faq) => (
            <Accordion
              expanded={expanded === `panel + ${faq.id}`}
              onChange={handleChange(`panel + ${faq.id}`)}
              key={faq.id}
            >
              <AccordionSummary
                aria-controls="panel1a-content"
                id="panel1a-header"
                expandIcon={<ExpandMoreIcon />}
              >
                <Typography>{faq.que}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{faq.ans}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </Container>
    </>
  );
}
