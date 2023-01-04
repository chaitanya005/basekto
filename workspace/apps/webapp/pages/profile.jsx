import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { ethAddEventListener } from '@basketo/web-utils';
import YourProfile from '../Components/Profile';
import SideNavigationLayout from '../Components/Common/SideNavigationLayout';

const Profile = () => {

    const router = useRouter();

    const [userAddress, setUserAddress] = useState(undefined);
    const getUserAddress = () => localStorage.getItem('address');

    if (userAddress === null) {
      router.push('/#connect-wallet');
    }

    useEffect(() => {

        const updateUserAddress = () =>
            setUserAddress(getUserAddress());

        updateUserAddress();
        const cleanup = ethAddEventListener('accountsChanged', updateUserAddress);
        return cleanup;
    }, []);


    return userAddress && (

        <SideNavigationLayout userAddress={ userAddress }>
            <YourProfile userAddress={ userAddress } />
        </SideNavigationLayout>
    );
};

export default Profile;