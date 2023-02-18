import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import DialogBox from '../Common/DialogBox';
import TextEditor from '../Common/TextEditor';

const fields = [
    { name: 'firstName', label: 'First Name' },
    { name: 'lastName', label: 'Last Name' },
    { name: 'email', label: 'Email' },
];

const ProfileEditModal = ({ isOpen, onClose, user, handleSave }) => {

    const [newData, setNewData] = useState({ ...user });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (field, value) => {

        setNewData((oldData) => ({
            ...oldData,
            [field]: value,
        }));
    };

    const onSubmit = (e) => {

        e.preventDefault();
        setIsLoading(true);
        const onSuccess = () => setError(false);
        const onError = (errMsg) => setError(errMsg);
        const onCompletion = () => setIsLoading(false);
        handleSave(newData, onSuccess, onError, onCompletion);
    };

    return (

        <DialogBox
            title="Edit Profile"
            open={ isOpen }
            dividers
            onClose={ onClose }
        >
            <Typography
                color="error"
                fontSize="small"
                textAlign="center"
                sx={{ mt: -1.5 }}
                marginBottom={ 1 }
            >
                { error }
            </Typography>

            <form onSubmit={ onSubmit }>
                { fields.map(({ label, name }) => (

                    <TextField
                        key={ name }
                        variant="standard"
                        label={ label }
                        value={ newData[name] }
                        onChange={ (e) =>
                            handleChange(name, e.target.value)
                        }
                        required
                        fullWidth
                        sx={{ mb: 2.5 }}
                    />
                ))}

                <TextField
                    fullWidth
                    variant="standard"
                    label="Public URL"
                    inputProps={{
                        pattern: '[\\w|-]{3,10}'
                    }}
                    helperText={
                        <ul
                        style={{
                            margin: 0,
                            paddingLeft: '1rem',
                        }}
                        >
                        <li>
                            Should be of 3-10 characters in length
                        </li>
                        <li>
                            No special characters other than hyphens and underscores are allowed
                        </li>
                        </ul>
                    }
                    InputProps={{
                        startAdornment: (
                        <InputAdornment position="start">
                            basketofinance.com/user/
                        </InputAdornment>
                        ),
                        sx: { mb: 1 },
                    }}
                    value={newData.publicUrl}
                    onChange={(e) => handleChange('publicUrl', e.target.value)}
                    required
                />

                <Box sx={{ mt: 2, mb: 2.5 }}>
                    <TextEditor
                        placeholder="Write your bio/description"
                        value={ newData.description }
                        onChange={ (newText) =>
                            handleChange('description', newText)
                        }
                    />
                </Box>

                <Button
                    variant="contained"
                    size="large"
                    type="submit"
                    fullWidth
                    disabled={ isLoading }
                >
                    { isLoading ? 'Saving Changes...' : 'Save Changes' }
                </Button>
            </form>
        </DialogBox>
    );
};

export default ProfileEditModal;