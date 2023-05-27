import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Button = (props) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [provider, setProvider] = useState(null);
    const [share, setShare] = useState(false)
    const [showButtons, setShowButtons] = useState(false);
    // const [receipentAddress, setReceipentAddress] = useState('');
    // const [contractAddress, setContractAddress] = useState('');
    // const [percentage, setPercentage] = useState(0);
    const [shareInfo, setShareInfo] = useState({ receipentAddress: '', NFTAddress: '', percentage: 0 });

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
                try {
                    const token = await contract.mintPDFToken(props.account, props.uri);
                    console.log(token.hash);
                    setShowButtons(true);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        getToken();
    }, [contract]);

    const toggleModal = () => {
        setShare(!share);
    };

    const onChange = (e) => {
        setShareInfo({ ...shareInfo, [e.target.name]: e.target.value })
    }

    const handleShare = async () => { }

    return (
        <>
            <div className={`transition-all lg:left-1/4 lg:w-1/2 duration-500 ${share ? 'top-20' : 'top-[-45rem]'} fixed w-full z-40`}>
                <div className='createNote bg-[rgba(255,255,255,0.1)] text-white bg-[url("/src/assets/notesBackground.svg)] bg-no-repeat bg-cover bg-center flex flex-col mr-4 lg:mx-16 rounded-xl space-y-8 p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                    <div>
                        <FontAwesomeIcon onClick={toggleModal} className='absolute w-4 h-4 m-2 rounded-md px-2 py-2 bg-[rgba(255,255,255,0.2)] top-0 right-0' icon={faXmark} />
                        <input onChange={onChange} className='input outline-none w-full placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={shareInfo.NFTAddress} type="text" placeholder='Enter NFT Address' name="NFTAddress" id="NFTAddress" />
                    </div>
                    <input onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={shareInfo.receipentAddress} type="text" placeholder='Enter the receipent address' name="receipentAddress" id="receipentAddress" />
                    <input onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={shareInfo.percentage} type="text" placeholder='Enter the percentage' name="percentage" id="percentage" />
                    <button onClick={handleShare} className={`text-left w-fit p-2 rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>Confirm</button>
                </div>
            </div>
            <motion.button
                onClick={loadProvider} id={props.id}
                whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                className={`overflow-hidden ${showButtons ? 'hidden' : ''} border backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.4)] before:-translate-x-[12rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative bottom-4 inline-block before:bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 px-8 mx-1 rounded-full before:transition-all before:duration-500`} title='Mint'>
                <span className={`relative font-roboto text-lg transition-all duration-500`}>Mint</span>
            </motion.button>
            {showButtons && (
                <>
                    <div className="buttons flex items-center justify-center space-x-4">
                        <motion.button
                            onClick={toggleModal}
                            whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                            className={`overflow-hidden border backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.4)] before:-translate-x-[12rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative bottom-4 inline-block before:bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 px-8 mx-1 rounded-full before:transition-all before:duration-500`} title='Mint'>
                            <span className={`relative font-roboto text-lg transition-all duration-500`}>Share</span>
                        </motion.button>

                        <motion.button
                            whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                            className={`overflow-hidden border backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.4)] before:-translate-x-[12rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative bottom-4 inline-block before:bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 px-8 mx-1 rounded-full before:transition-all before:duration-500`} title='Mint'>
                            <span className={`relative font-roboto text-lg transition-all duration-500`}>Details</span>
                        </motion.button>
                    </div>
                </>
            )}
        </>
    );
};

export default Button;
