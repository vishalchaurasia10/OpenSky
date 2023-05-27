import { useState } from 'react';
import TypeContext from './typeContext';

const TypeState = (props) => {

    const [fileType, setFileType] = useState("img");

    return (
        <TypeContext.Provider value={{ fileType, setFileType }}>
            {props.children}
        </TypeContext.Provider>
    );
}

export default TypeState;