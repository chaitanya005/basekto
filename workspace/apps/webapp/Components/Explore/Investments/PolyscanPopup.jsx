import Link from 'next/link';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import DialogBox from '../../Common/DialogBox';
import Table from '../../Common/Table';
import { createTableData } from '@basketo/web-utils';

const PolyscanPopup = ({ open, tokens, amount, onClose }) => {

    const polyscanUrl = process.env.NEXT_PUBLIC_ENV === 'testnet'
        ? 'https://mumbai.polygonscan.com/tx/'
        : 'https://polygonscan.com/tx/';

    const columns = {
        Tokens: (token) => (

            <Box
                display="flex"
                alignItems="center"
                gap={ 1 }
            >
                <Avatar
                    src={token.img}
                    alt={token.name + ' logo'}
                    sx={{ width: 28, height: 28 }}
                />

                <Box>
                    <Typography>
                        { token.name }
                    </Typography>
                    <Typography
                        variant="caption"
                        color="muted"
                    >
                        { amount * token.weight / 100 } MATIC
                    </Typography>
                </Box>
            </Box>
        ),
        PolygonScan: (token) => (

            <Link href={ polyscanUrl + token.txHash }>
                <a target="_blank">
                    <Button endIcon={ <OpenInNewIcon /> }>
                        { token.txHash?.slice(0, 4) + '...' + token.txHash?.slice(-4) }
                    </Button>
                </a>
            </Link>
        ),
    };
    const tableData = createTableData(columns, tokens);

    return (

        <DialogBox
            open={ open }
            title="Investment Details"
            onClose={ () => onClose() }
        >
            <Table data={ tableData } />
        </DialogBox>
    );
};

export default PolyscanPopup;