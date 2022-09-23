import MuiDialog from '@mui/material/Dialog';
import MuiDialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import Box from '@mui/material/Box';
import { styled } from '@mui/material/styles';
import CloseIcon from '@mui/icons-material/Close';

const Dialog = styled(MuiDialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

const DialogTitle = (props) => {

    const { children, onClose, ...other } = props;

    return (

        <MuiDialogTitle sx={{ m: 0, p: 2, pb: 0.5 }} {...other}>
            { children }
            { onClose ? (
                <IconButton
                    aria-label="close"
                    onClick={ onClose }
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
            ) : null }
        </MuiDialogTitle>
    );
};

const DialogBox = ({ title, open, onClose, dividers, maxWidth, children, actions }) => {

    return (

        <Dialog
            open={ open }
            onClose={ onClose }
            maxWidth={ maxWidth ?? 'xs' }
            fullWidth
        >
            { title && (
                <DialogTitle onClose={ onClose }>
                    { title }
                </DialogTitle>
            )}

            <DialogContent sx={{ pt: 1 }}>
                { dividers && <Divider sx={{ mt: 1.5, mb: 3 }} /> }

                <Box sx={{ mt: 1 }}>
                    { children }
                </Box>

                { actions && (
                    <>
                        { dividers && <Divider sx={{ mb: 3 }} /> }

                        <Box sx={{ mb: 1 }}>
                            { actions }
                        </Box>
                    </>
                )}

            </DialogContent>
        </Dialog>
    );
};

export default DialogBox;