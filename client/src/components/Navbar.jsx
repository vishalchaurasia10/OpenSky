import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Upload from '../artifacts/contracts/Upload.sol/Upload.json'
import { motion } from 'framer-motion';
import { ethers } from 'ethers';
import contractContext from '../context/contract/contractContext';
import accountContext from '../context/account/accountContext';
import providerContext from '../context/provider/providerContext';

const NavBar = () => {

    const location = useLocation();
    const [navExpand, setNavExpand] = useState(false)
    const { setContract } = useContext(contractContext);
    const { setAccount } = useContext(accountContext);
    const { setProvider } = useContext(providerContext);

    const expandNav = () => {
        setNavExpand(!navExpand)
    }

    const loadProvider = async () => {
        console.log("here")
        const provider = window.ethereum ? new ethers.providers.Web3Provider(window.ethereum) : null;
        if (provider) {
            try {
                // window.ethereum.on("chainChanged", () => {
                //     window.location.reload();
                // });

                // window.ethereum.on("accountsChanged", () => {
                //     window.location.reload();
                // });
                await provider.send("eth_requestAccounts", []);
                const signer = provider.getSigner();
                const address = await signer.getAddress();
                setAccount(address);
                let contractAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
                const contract = new ethers.Contract(contractAddress, Upload.abi, signer);
                setContract(contract);
                setProvider(provider);
                console.log(contract)
                console.log(provider)
                console.log(address)
            }
            catch (err) {
                console.log(err);
            }
        }
        else {
            console.log("Metamask not found");
        }
    }


    return (
        <>
            <motion.nav
                className='z-20 font-jost shadow-2xl bg-black text-white backdrop-blur-3xl fixed top-0 left-0 right-0 flex justify-between items-center px-5 md:px-10 py-3'>
                <div className="left">
                    <Link to="/">MemoriesOnChain</Link>
                </div>
                <div className="center hidden lg:block">
                    <ul className='flex items-center justify-center space-x-8 text-xl'>

                        <li className={`hover:bg-[rgba(255,255,255,0.2)] ${location.pathname === '/' ? 'bg-[rgba(255,255,255,0.2)]' : ''} p-1 px-4 rounded-md transition-all duration-300 cursor-pointer`}>
                            <Link to="/">Home</Link>
                        </li>

                        <li className={`hover:bg-[rgba(255,255,255,0.2)] ${location.pathname === '/gallery' ? 'bg-[rgba(255,255,255,0.2)]' : ''} p-1 px-4 rounded-md transition-all duration-300 cursor-pointer`}>
                            <Link to="/gallery">Gallery</Link>
                        </li>

                        <li className={`hover:bg-[rgba(255,255,255,0.2)] ${location.pathname === '/mint_as_nft' ? 'bg-[rgba(255,255,255,0.2)]' : ''} p-1 px-4 rounded-md transition-all duration-300 cursor-pointer`}>
                            <Link to="/mint_as_nft">Upload</Link>
                        </li>

                    </ul>
                </div>
                <div className="right">
                    <motion.button
                    onClick={loadProvider}
                        whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                        className={`overflow-hidden border border-[rgba(255,255,255,0.4)] before:-translate-x-[12rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-[#6600FF] to-[#00CC99] py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500`}>
                        <span className={`relative font-roboto text-lg transition-all duration-500`}>Connect Wallet</span>
                    </motion.button>
                </div>
                <div className="hamburger relative -mr-2 ml-2 lg:hidden space-y-1">
                    <div onClick={expandNav} className={`${navExpand ? '-rotate-45 translate-y-[0.45rem]' : ''} w-6 transition-all duration-300 rounded-full bg-white h-1`}></div>
                    <div onClick={expandNav} className={`${navExpand ? 'scale-0' : ''} w-6 transition-all duration-300 rounded-full bg-white h-1`}></div>
                    <div onClick={expandNav} className={`${navExpand ? 'rotate-45 -translate-y-2' : ''} w-6 transition-all duration-300 rounded-full bg-white h-1`}></div>
                </div>
            </motion.nav>
            <div className={`expanded lg:hidden w-full text-white z-[15] h-screen flex items-center justify-center backdrop-blur-3xl fixed top-0 transition-all duration-500 ${navExpand ? '' : 'translate-x-[60rem]'}`}>
                <ul className={`flex text-2xl space-y-4 flex-col justify-center font-jost text-center items-center`}>
                    <li className={`logo font-jost my-4 font-extrabold text-5xl`}>Clip<span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500'>Surf</span> </li>
                    <li onClick={expandNav} className='cursor-pointer'><Link to='/'>Home</Link></li>
                    <li onClick={expandNav} className='cursor-pointer'><Link to='/gallery'>Gallery</Link></li>
                    <li onClick={expandNav} className='cursor-pointer'><Link to='/mint_as_nft'>Mint</Link></li>
                </ul>
            </div>
        </>
    )
}

export default NavBar
