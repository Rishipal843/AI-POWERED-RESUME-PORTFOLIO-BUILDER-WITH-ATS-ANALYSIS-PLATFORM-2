import React, { useEffect, useState, useContext } from 'react'; // Add useContext
import axios from 'axios';
import Cookies from 'js-cookie';
import user_context from '../UseContext'; // Import your context

const Protect = ({children}) => {
    const { notlogin } = useContext(user_context);


    useEffect(() => {
        const checkAuth = async () => {
            try {
                if (Cookies.get('token')) {
                    notlogin(true); 
                } else {
                    notlogin(false); 
                }
            } catch (err) {
               console.log(err)
            }
        };
        checkAuth();
    }, [notlogin]);

    return children;
};


export default Protect;