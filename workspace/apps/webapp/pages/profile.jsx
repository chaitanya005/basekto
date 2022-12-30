import { useEffect, useState } from 'react';
import { onAccountsChanged } from '@basketo/web-utils';
import YourProfile from '../Components/Profile';
import SideNavigationLayout from '../Components/Common/SideNavigationLayout';

const Profile = () => {

    const [userAddress, setUserAddress] = useState(undefined);
    const getUserAddress = () => localStorage.getItem('address');

    useEffect(() => {
      setUserAddress(getUserAddress());
    }, []);

    onAccountsChanged(() =>
        setUserAddress(getUserAddress())
    );

    return (

        <SideNavigationLayout userAddress={ userAddress }>
            <YourProfile userAddress={ userAddress } />
        </SideNavigationLayout>
    );
};

export default Profile;