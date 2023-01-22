import React, { useEffect } from 'react';
import Router from 'next/router';
import { useSelector } from 'react-redux';
import { getUserAddress } from 'apps/webapp/features/userAddress';

export default function withAuth(WrappedComponent) {
  return function (props) {
    const { adminToken } = useSelector(getUserAddress);
    useEffect(() => {
      const token = adminToken;
      if (!token) {
        Router.push('/admin/login');
      }
    }, []);

    return <WrappedComponent {...props} />;
  };
}
