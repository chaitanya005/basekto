import { useEffect, useState } from 'react';
import { ethAddEventListener } from '@basketo/web-utils';
import YourProfile from '../Components/Profile';
import SideNavigationLayout from '../Components/Common/SideNavigationLayout';

const Profile = () => {

    const [userAddress, setUserAddress] = useState(undefined);
    const getUserAddress = () => localStorage.getItem('address');

    useEffect(() => {

        const updateUserAddress = () =>
            setUserAddress(getUserAddress());

        updateUserAddress();
        const cleanup = ethAddEventListener('accountsChanged', updateUserAddress);
        return cleanup;
    }, []);


    return (

        <SideNavigationLayout userAddress={ userAddress }>
            <YourProfile userAddress={ userAddress } />
        </SideNavigationLayout>
    );
};

export default Profile;