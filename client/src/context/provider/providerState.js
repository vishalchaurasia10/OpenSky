import { useState } from 'react';
import ProviderContext from './providerContext';

const ProviderState = (props) => {

    const [provider, setProvider] = useState(null);

    return (
        <ProviderContext.Provider value={{ provider, setProvider }}>
            {props.children}
        </ProviderContext.Provider>
    );
}

export default ProviderState;