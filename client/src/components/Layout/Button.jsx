// import React, { useEffect, useState } from 'react'
// import { motion } from 'framer-motion';
// import { ethers } from 'ethers';
// import NFT from '../../artifacts/contracts/NFT.sol/NFT.json'

// const Button = (props) => {

//     const [account, setAccount] = useState(null);
//     const [contract, setContract] = useState(null);
//     const [provider, setProvider] = useState(null);

//     const loadProvider = async () => {
//         console.log("here")
//         const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;
//         if (provider) {
//             try {
//                 // window.ethereum.on("chainChanged", () => {
//                 //     window.location.reload();
//                 // });

//                 // window.ethereum.on("accountsChanged", () => {
//                 //     window.location.reload();
//                 // });
//                 await provider.send("eth_requestAccounts", []);
//                 const signer = provider.getSigner();
//                 const address = await signer.getAddress();
//                 setAccount(address);
//                 let contractAddress = "0x19737789d80A95109634642E85266512972DAB69";
//                 const contract = new ethers.Contract(contractAddress, NFT.abi, signer);
//                 setContract(contract);
//                 setProvider(provider);
//                 console.log(contract)
//                 console.log(provider)
//                 console.log(address)
//             }
//             catch (err) {
//                 console.log(err);
//             }
//         }
//         else {
//             console.log("Metamask not found");
//         }
//     }

//     useEffect(() => {
//         const getToken = async () => {
//             const token = await contract.mintPDFToken(props.account, props.uri)
//             console.log(token)
//         }

//         getToken()

//     }[account])

//     return (
//         <>
//             <motion.button
//                 onClick={loadProvider}
//                 whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
//                 className={`overflow-hidden border border-[rgba(255,255,255,0.4)] before:-translate-x-[12rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-[#6600FF] to-[#00CC99] py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500`}>
//                 <span className={`relative font-roboto text-lg transition-all duration-500`}>Mint</span>
//             </motion.button>
//         </>
//     )
// }

// export default Button

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';

const Button = (props) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);

    const loadProvider = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                const contractAddress = '0x19737789d80A95109634642E85266512972DAB69';
                const contract = new ethers.Contract(contractAddress, NFT.abi, signer);
                setContract(contract);
                setProvider(provider);
                console.log(contract);
                console.log(provider);
                console.log(address);
            } else {
                console.log('Metamask not found');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const getToken = async () => {
            if (contract) {
                const token = await contract.mintPDFToken(props.account, props.uri);
                console.log(token);
            }
        };

        getToken();
    }, [contract]);

    return (
        <>
            <motion.button
                onClick={loadProvider}
                whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                className="overflow-hidden border border-[rgba(255,255,255,0.4)] before:-translate-x-[12rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-[#6600FF] to-[#00CC99] py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500"
            >
                <span className="relative font-roboto text-lg transition-all duration-500">Mint</span>
            </motion.button>
        </>
    );
};

export default Button;
