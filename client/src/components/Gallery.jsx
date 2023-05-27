import React, { useContext, useState } from 'react';
import contractContext from '../context/contract/contractContext';
import accountContext from '../context/account/accountContext';
import { motion } from 'framer-motion';
import Button from './Layout/Button';
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import toast, { Toaster } from 'react-hot-toast';

const Gallery = () => {
    const { contract } = useContext(contractContext);
    const { account } = useContext(accountContext);
    const [images, setImages] = useState([]);
    const [minted, setMinted] = useState(false);

    const getdata = async () => {
        const Otheraddress = document.querySelector('.address').value;
        let dataArray;

        try {
            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);
            } else {
                dataArray = await contract.display(account);
            }
        } catch (e) {
            toast.error("You Don't have access");
            dataArray = [];
        }

        const isEmpty = Object.keys(dataArray).length === 0;

        if (!isEmpty) {
            const str = dataArray.toString();
            const str_array = str.split(',');
            console.log(str);
            console.log(str_array);

            const imagesData = str_array.map((item, i) => (
                {
                    key: i,
                    src: `https://ipfs.io/ipfs${item.substring(6)}`,
                    alt: 'new',
                    className: 'image-list'
                }
            ));

            setImages(imagesData);
        }
    };

    // const mintAsNFT = async (account, tokenURI) => {
    //     const token = await contract.mintNFT(account, tokenURI);
    //     console.log(token);
    // }

    console.log(images);

    return (
        <>
            <Toaster />
            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.2 }}
                className={`search ${images.length === 0 ? 'h-screen' : ''} pt-32 pb-8 mb-12 text-center`}>
                <h1 className='text-7xl font-extrabold text-white font-jost'>Clip<span className='text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-violet-500'>Surf</span></h1>
                <h3 className='text-white text-sm font-light font-jost my-3'>Search for your uploaded images</h3>
                <div className="input">
                    <FontAwesomeIcon className='relative text-white left-8' icon={faSearch} />
                    <input className='bg-[rgba(255,255,255,0.2)] address text-white outline-none p-3 pl-12 pr-6 lg:w-[40%] mt-6 mb-10 rounded-full' type="text" name="query" id="query" placeholder='Add the address...' title='Add address' />
                </div>
                <motion.button
                    whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                    className={`overflow-hidden border border-[rgba(255,255,255,0.4)] before:-translate-x-[12rem] hover:before:translate-x-0 before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-pink-500 to-violet-500 text-white py-2 px-8 mx-1 rounded-full before:transition-all before:duration-500`} title='Get Images' onClick={getdata}>
                    <span className={`relative font-roboto text-lg transition-all duration-500`}>Get Images</span>
                </motion.button>
            </motion.div>

            <div className="bg-[rgba(255,255,255,0.5) pb-20 pt-4 text-center flex flex-wrap mx-1 pl-0 lg:pl-4">
                {images.map((image) => (
                    image.src.length > 20 && <div key={image.key} className="videoItem rounded-xl m-1 border border-[rgba(255,255,255,0.2)] w-full md:w-1/2 lg:w-[32%]">
                        <a className='p-2' href={image.src} key={image.key} target="_blank">
                            <img {...image} />
                        </a>
                        <Button account={account} id={image.key} uri={image.src}></Button>
                    </div>
                ))}
            </div>
        </>
    );
};

export default Gallery;
