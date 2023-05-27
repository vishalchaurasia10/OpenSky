import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react';
import contractContext from '../context/contract/contractContext';
import accountContext from '../context/account/accountContext';
import providerContext from '../context/provider/providerContext';
import axios from 'axios';

const FileUpload = () => {

    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    const { contract, setContract } = useContext(contractContext);
    const { account, setAccount } = useContext(accountContext);
    const { provider, setProvider } = useContext(providerContext);
    // console.log(contract);
    // console.log(account);
    // console.log(provider);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (file) {
            try {
                const formData = new FormData();
                formData.append("file", file);

                const resFile = await axios({
                    method: "post",
                    url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
                    data: formData,
                    headers: {
                        pinata_api_key: `3790528f8044703e7b11`,
                        pinata_secret_api_key: `a74736938d87bf6924a6b16c534e56b4fbdbf48f28045194744fa504ff50e617`,
                        "Content-Type": "multipart/form-data",
                    },
                });

                const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
                console.log(ImgHash);
                console.log(account);
                contract.add(account, ImgHash);
                alert("Successfully Image Uploaded");
                setFileName("No image selected");
                setFile(null);
            } catch (error) {
                console.log(error); // Log the specific error message for debugging
                alert("Unable to upload image to Pinata");
            }
        } else {
            alert("No image selected");
        }
    };

    const retrieveFile = (e) => {
        const data = e.target.files[0]; //files array of files object
        console.log(data);
        const reader = new window.FileReader();
        reader.readAsArrayBuffer(data);
        reader.onloadend = () => {
            setFile(e.target.files[0]);
        };
        setFileName(e.target.files[0].name);
        e.preventDefault();
    };


    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`wrapper h-screen py-10 transition-all text-black relative duration-300 px-2 mt-10 lg:-mt-4 `}>
                <div className={`contact relative transition-all duration-1000  backdrop-blur-3xl z-10 lg:top-24 top-10 lg:flex border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,1)] shadow-2xl shadow-black rounded-2xl m-1 lg:p-8 lg:mx-32`}>
                    <div className="details p-4 lg:p-0 lg:pr-7 lg:w-1/2">
                        {/* <input className='hidden' type="file" name="file" id="file" /> */}
                        <input
                            className=''
                            // disabled={!account}
                            type="file"
                            id="file-upload"
                            name="data"
                        />
                        <label htmlFor="file-upload">
                            <span>Image : {fileName}</span>
                            <img className='rounded-2xl h-full' src="https://cdn.pixabay.com/photo/2015/04/19/08/32/marguerite-729510_1280.jpg" alt="uploadedImage" />
                        </label>
                    </div>
                    <div className="form p-6 lg:p-0 lg:w-1/2">
                        <h1 className='text-2xl font-bold font-jost'>
                            <span className='ml-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-[#6600FF] relative inline-block'>
                                <span className='relative text-white text-6xl font-bold'>Upload</span>
                            </span>
                        </h1>
                        <form className='flex pt-8 pb-5 space-y-6 flex-col'>
                            <input required className={`outline-none transition-all duration-300 border-slate-400 drop-shadow-sm border-2 rounded-xl p-4`} type="text" placeholder='Add description to the image' name="description" id="description" />
                            <input required className={`outline-none transition-all duration-300 border-slate-400 drop-shadow-sm border-2 rounded-xl p-4`} type="date" name="date" id="date" />
                            <input required className={`outline-none transition-all duration-300 border-slate-400 drop-shadow-sm border-2 rounded-xl p-4`} type="time" name="time" id="time" />
                            <motion.button
                                disabled={!file}
                                whileHover={{ y: -3, scale: 1.05, boxShadow: '0 0 10px rgba(255,255,255,0.3)' }}
                                className={`overflow-hidden text-white hover:text-white border border-[rgba(255,255,255,0.4)] before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-[#6600FF] to-[#00CC99] py-2 px-4 mx-1 rounded-md before:transition-all before:duration-500`}>
                                <span className={`relative font-roboto text-lg transition-all duration-500`}>Upload</span>
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </>
    )
}

export default FileUpload

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YTZkNzAyYi0zNDY5LTQ1YTctYThhMy0xZDYxZDEzOTlhMmQiLCJlbWFpbCI6InZpc2hhbGNoYXVyYXNpYXZjMTAxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzc5MDUyOGY4MDQ0NzAzZTdiMTEiLCJzY29wZWRLZXlTZWNyZXQiOiJhNzQ3MzY5MzhkODdiZjY5MjRhNmIxNmM1MzRlNTZiNGZiZGJmNDhmMjgwNDUxOTQ3NDRmYTUwNGZmNTBlNjE3IiwiaWF0IjoxNjg1MTUxODk4fQ.lQ6qpIdm5ZYdUIo3oenGOQWTMdQ3fe5vIMY7XT_IM1I