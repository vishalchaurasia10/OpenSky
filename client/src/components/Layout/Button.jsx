import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import NFT from '../../artifacts/contracts/NFT.sol/NFT.json';
import Share from '../../artifacts/contracts/Share.sol/Share.json'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

const Button = (props) => {
    const [account, setAccount] = useState(null);
    const [contract, setContract] = useState(null);
    const [contract2, setContract2] = useState(null);
    const [provider, setProvider] = useState(null);
    const [share, setShare] = useState(false)
    const [showButtons, setShowButtons] = useState(false);
    const [details, setDetails] = useState(false)
    const [shareholders, setShareholders] = useState([])
    const [shareInfo, setShareInfo] = useState({ receipentAddress: '', NFTAddress: '', percentage: 0 });

    const loadProvider = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                const contractAddress = '0xD7F78c4ec845B1aAc4430db4e97eea65a56810a6';
                const contract = new ethers.Contract(contractAddress, NFT.abi, signer);
                setContract(contract);
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

    const toggleDeatilsModal = async () => {
        if (contract2) {
            if (shareholders.length === 0) {
                const temp = await contract2.getShareholders();
                setShareholders(temp);
            }
            setDetails(!details);
            console.log(shareholders);
        } else {
            console.log('Contract2 is null');
        }
    };

    function hexToDecimal(hex) {
        // Remove any leading "0x" if present
        if (hex.startsWith("0x")) {
            hex = hex.slice(2);
        }

        // Convert hexadecimal to decimal using parseInt with base 16
        const decimal = parseInt(hex, 16);
        return decimal;
    }



    const loadProvider2 = async () => {
        try {
            if (window.ethereum) {
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                await provider.send('eth_requestAccounts', []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                const contractAddress = '0x6FCdd669Dc99979bD1f05E82E412346C8f91a8cC';
                const contract = new ethers.Contract(contractAddress, Share.abi, signer);
                setContract2(contract);
            } else {
                console.log('Metamask not found');
            }
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const shareNFT = async () => {
            if (contract2) {
                try {
                    await contract2.addShareholder(shareInfo.receipentAddress, shareInfo.percentage, shareInfo.NFTAddress);
                    toggleModal();
                    setShareInfo({ receipentAddress: '', NFTAddress: '', percentage: 0 });
                } catch (err) {
                    console.log(err);
                }
            }
        };

        shareNFT();
    }, [contract2]);

    const onChange = (e) => {
        setShareInfo({ ...shareInfo, [e.target.name]: e.target.value })
    }


    return (
        <>
            <div className={`transition-all lg:left-1/4 lg:w-1/2 duration-500 ${share ? 'top-20' : 'top-[-45rem]'} fixed w-full z-40`}>
                <div className='createNote bg-[rgba(255,255,255,0.1)] text-white bg-[url("/src/assets/notesBackground.svg)] bg-no-repeat bg-cover bg-center flex flex-col mr-4 lg:mx-16 rounded-xl space-y-8 p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                    <div>
                        <FontAwesomeIcon onClick={toggleModal} className='absolute w-4 h-4 m-2 rounded-md px-2 py-2 bg-[rgba(255,255,255,0.2)] top-0 right-0' icon={faXmark} />
                        <input required onChange={onChange} className='input outline-none w-full placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={shareInfo.NFTAddress} type="text" placeholder='Enter NFT Address' name="NFTAddress" id="NFTAddress" />
                    </div>
                    <input required onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={shareInfo.receipentAddress} type="text" placeholder='Enter the receipent address' name="receipentAddress" id="receipentAddress" />
                    <input required onChange={onChange} className='input outline-none placeholder:text-white bg-transparent border-b p-2 border-[rgba(255,255,255,0.5)]' value={shareInfo.percentage} type="text" placeholder='Enter the percentage' name="percentage" id="percentage" />
                    <button onClick={loadProvider2} className={`text-left w-fit p-2 rounded-md transition-all duration-150 hover:shadow-lg hover:-translate-y-1 bg-[rgba(255,255,255,0.2)] border border-[rgba(255,255,255,0.1)]`}>Confirm</button>
                </div>
            </div>
            <div className={`transition-all lg:left-1/4 lg:w-1/2 duration-500 ${details ? 'top-20' : 'top-[-45rem]'} fixed w-full z-40`}>
                <div className='createNote bg-[rgba(255,255,255,0.1)] text-white bg-[url("/src/assets/notesBackground.svg)] bg-no-repeat bg-cover bg-center flex flex-col mr-4 lg:mx-16 rounded-xl space-y-8 p-8 backdrop-blur-2xl shadow-2xl border-[rgba(255,255,255,0.1)]'>
                    <div>
                        <FontAwesomeIcon onClick={toggleDeatilsModal} className='absolute w-4 h-4 m-2 rounded-md px-2 py-2 bg-[rgba(255,255,255,0.2)] top-0 right-0' icon={faXmark} />
                    </div>
                    <div className="shareholders">
                        {shareholders.length > 0 && shareholders.map((shareholder, index) => {
                            return (
                                <div className="shareholder flex space-x-4" key={index}>
                                    <div className="shareholderAddress">{shareholder.shareholder} </div>
                                    {/* <div className="shareholderPercentage">{hexToDecimal(shareholder.shares.toString())}</div> */}
                                </div>
                            )
                        })
                        }
                    </div>

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
                            onClick={toggleDeatilsModal}
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
