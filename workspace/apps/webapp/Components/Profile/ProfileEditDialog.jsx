import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
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
    const [isError, setIsError] = useState(false);

    const handleChange = (field, value) => {

        setNewData((oldData) => ({
            ...oldData,
            [field]: value,
        }));
    };

    const onSubmit = (e) => {

        e.preventDefault();
        setIsLoading(true);
        const onSuccess = () => setIsError(false);
        const onError = () => setIsError(true);
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

                <Box sx={{ mt: 0.5, mb: 2.5 }}>
                    <TextEditor
                        placeholder="Write your bio/description"
                        value={ newData.description }
                        onChange={ (newText) =>
                            handleChange('description', newText)
                        }
                    />
                </Box>

                <Typography
                    color="error"
                    fontSize="small"
                    textAlign="center"
                    marginBottom={ 2 }
                >
                    { isError && 'Something went wrong' }
                </Typography>

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