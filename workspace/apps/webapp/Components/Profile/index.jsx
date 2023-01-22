import { useEffect, useState } from 'react';
import axios from 'axios';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import parse from 'html-react-parser';
import ProfileEditDialog from './ProfileEditDialog';
import { useSelector } from 'react-redux';
import { getUserAddress } from 'apps/webapp/features/userAddress';

const YourProfile = ({ userAddress }) => {
  const sm = useMediaQuery(useTheme().breakpoints.down('sm'));
  const { userAddress: loggedInUserAddres } = useSelector(getUserAddress);

  const [user, setUser] = useState(null);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  const handleSave = (newData, onSuccess, onError, onCompletion) => {
    axios
      .put(
        `${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userAddress}`,
        newData
      )
      .then((res) => {
        if (res.data.success) {
          setUser({ ...newData });
          onSuccess();
          setEditDialogOpen(false);
        }
      })
      .catch((err) => {
        console.log(err);
        onError();
      })
      .finally(onCompletion);
  };

  useEffect(() => {
    function fetchData() {
      axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_API}/user/${userAddress}`)
        .then((userData) => {
          setUser(userData.data);
        })
        .catch((e) => {
          setUser(null);
          console.log(e);
        });
    }
    userAddress && fetchData();
  }, [userAddress]);

  return (
    user && (
      <Box>
        <Box
          display="flex"
          alignItems="center"
          marginTop={4}
          sx={
            sm
              ? {
                  gap: 2,
                  flexDirection: 'column',
                  textAlign: 'center',
                }
              : {
                  gap: 5,
                }
          }
        >
          <Avatar
            sx={{
              width: '6rem',
              height: '6rem',
            }}
          />

          <Box flexGrow={1} width="100%" sx={{ wordBreak: 'break-word' }}>
            <Box
              marginBottom={0.5}
              display="flex"
              alignItems="center"
              gap={2}
              sx={
                sm
                  ? {
                      justifyContent: 'center',
                    }
                  : {
                      justifyContent: 'space-between',
                    }
              }
            >
              <Typography variant="h5">
                {user.firstName + ' ' + user.lastName}
              </Typography>

              {!sm && loggedInUserAddres === userAddress && (
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => setEditDialogOpen(true)}
                >
                  Edit Profile
                </Button>
              )}
            </Box>

            <Typography>{user.email}</Typography>

            <Typography>{user.userAddress}</Typography>
          </Box>
        </Box>

        {sm && (
          <Button
            variant="contained"
            size="small"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setEditDialogOpen(true)}
          >
            Edit Profile
          </Button>
        )}

        <Divider sx={{ my: 3 }} />

        <div className="ql-snow">
          <div className="ql-editor" data-gramm="false">
            {user.description ? (
              <Typography>{parse(user.description)}</Typography>
            ) : (
              <Typography color="gray" fontStyle="italic">
                It&apos;s empty here...
              </Typography>
            )}
          </div>
        </div>

        <ProfileEditDialog
          isOpen={editDialogOpen}
          user={user}
          handleSave={handleSave}
          onClose={() => setEditDialogOpen(false)}
        />
      </Box>
    )
  );
};

export default YourProfile;
