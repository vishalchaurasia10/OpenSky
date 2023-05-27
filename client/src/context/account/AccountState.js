import { useState } from 'react';
import AccountContext from './accountContext';

const AccountState = (props) => {

    const [account, setAccount] = useState("");

    return (
        <AccountContext.Provider
            value={{ account, setAccount }}
        >
            {props.children}
        </AccountContext.Provider>
    );
}

export default AccountState;