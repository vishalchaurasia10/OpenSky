import React, { useContext, useState } from 'react';
import contractContext from '../context/contract/contractContext';
import accountContext from '../context/account/accountContext';
import { motion } from 'framer-motion';
import Button from './Layout/Button';

const Gallery = () => {
    const { contract } = useContext(contractContext);
    const { account } = useContext(accountContext);
    const [images, setImages] = useState([]);

    const getdata = async () => {
        const Otheraddress = document.querySelector('.address').value;
        let dataArray;

        try {
            if (Otheraddress) {
                dataArray = await contract.display(Otheraddress);
                console.log(dataArray);
            } else {
                dataArray = await contract.display(account);
            }
        } catch (e) {
            alert("You don't have access");
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
        } else {
            alert("No image to display");
        }
    };

    // const mintAsNFT = async (account, tokenURI) => {
    //     const token = await contract.mintNFT(account, tokenURI);
    //     console.log(token);
    // }

    return (
        <>
            <div className="container flex flex-col items-center justify-center pt-52">
                <div className="access flex space-x-8">
                    <input
                        className={`address text-black outline-none transition-all duration-300 border-slate-400 drop-shadow-sm border-2 rounded-xl p-4`}
                        type="text"
                        placeholder="Enter Address"
                    ></input>
                    <motion.button
                        onClick={getdata}
                        whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                        className={`overflow-hidden text-white hover:text-white border border-[rgba(255,255,255,0.4)] before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-[#6600FF] to-[#00CC99] py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500`}>
                        <span className={`relative font-roboto text-lg transition-all duration-500`}>Get Images</span>
                    </motion.button>
                </div>
                <div className="image-list mt-52">
                    {images.map((image) => (
                        <div className="wrapper">
                            <a className='p-2' href={image.src} key={image.key} target="_blank">
                                <img {...image} />
                            </a>
                            <Button account={account} uri={image.src}></Button>
                            {/* <motion.button
                                onClick={() => { mintAsNFT(account, image.src) }}
                                whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                                className={`my-4 relative left-1/2 overflow-hidden text-white hover:text-white border border-[rgba(255,255,255,0.4)] before:block before:absolute before:-inset-3 before:skew-x-[30deg] inline-block before:bg-gradient-to-r from-[#6600FF] to-[#00CC99] py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500`}>
                                <span className={`relative font-roboto text-lg transition-all duration-500`}>Mint</span>
                            </motion.button> */}

                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default Gallery;
