import  {useState} from 'react';
import ContractContext from './contractContext';

const ContractState = (props) => {

    const [contract, setContract] = useState(null);

    return (
        <ContractContext.Provider
            value={{
                contract,
                setContract
            }}
        >
            {props.children}
        </ContractContext.Provider>
    );
}

export default ContractState;