// src/pages/Account/Account.js
import React, { useEffect, useState } from 'react';
import Auth from '../../utils/Auth'; // Import your Auth utility
import { toast } from 'react-toastify';

const Account = () => {
    const [accountData, setAccountData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAccountData = async () => {
            const jwt = Auth.getToken(); // Get the token from Auth utility
            if (!jwt) {
                toast.error("User is not logged in.");
                setLoading(false);
                return;
            }

            // Decode the token to get userId
            const decoded = Auth.decodeToken(jwt);
            const customerID = decoded.userId;

            try {
                const response = await fetch(`http://localhost:3000/user/customer/account?customerID=${customerID}`, {
                    headers: {
                        'Authorization': `Bearer ${jwt}`
                    }
                });

                const data = await response.json();

                if (response.ok) {
                    setAccountData(data);
                } else {
                    toast.error(data.message || "Error fetching account details.");
                }
            } catch (error) {
                console.error("Error fetching account data:", error);
                toast.error("Unable to fetch account details.");
            } finally {
                setLoading(false);
            }
        };

        fetchAccountData();
    }, []);

    return (
        <div>
            <h1>Account Details</h1>
            {loading ? (
                <p>Loading account data...</p>
            ) : (
                accountData ? (
                    <div>
                        <p>Username: {accountData.Username}</p>
                        <p>Name: {accountData.Name}</p>
                        <p>Address: {accountData.Address}</p>
                        <p>Contact: {accountData.Contact}</p>
                        <p>City: {accountData.City}</p>
                    </div>
                ) : (
                    <p>No account data available.</p>
                )
            )}
        </div>
    );
};

export default Account;
