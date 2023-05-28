import { motion } from 'framer-motion'
import React, { useContext, useState } from 'react';
import contractContext from '../context/contract/contractContext';
import accountContext from '../context/account/accountContext';
import providerContext from '../context/provider/providerContext';
import typeContext from '../context/type/typeContext';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faImage } from '@fortawesome/free-solid-svg-icons';

const FileUpload = () => {
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("No image selected");
    // const [fileType, setFileType] = useState(".img");
    const { contract } = useContext(contractContext);
    const { account } = useContext(accountContext);
    const { fileType, setFileType } = useContext(typeContext);

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
                contract.add(account, ImgHash, fileType);
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

    const handleFileTypeChange = (e) => {
        setFileType(e.target.value);
    };

    return (
        <>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, delay: 0.5 }}
                className={`wrapper flex items-center justify-center h-screen transition-all text-black relative duration-300 px-2 mt-10 `}
            >
                <div
                    className={`contact relative transition-all duration-1000 flex flex-col lg:flex-row lg:items-center justify-center backdrop-blur-3xl z-10 lg:top-24 top-10 lg:flex border border-[rgba(255,255,255,0.1)] bg-[rgba(255,255,255,1)] shadow-2xl shadow-black text-center lg:text-left rounded-2xl py-10 -mt-24 lg:-mt-52 m-1`}
                >
                    <div className="details p-6 lg:p-0 lg:pr-7 lg:w-1/2">
                        <input
                            className="hidden"
                            type="file"
                            id="file-upload"
                            name="data"
                            onChange={retrieveFile}
                        />
                        <label htmlFor="file-upload" className='flex flex-col item-center justify-center' >
                            <FontAwesomeIcon className='w-full h-full cursor-pointer lg:mr-40 lg:-ml-6' icon={faImage} />
                            <span className='font-jost pl-4 text-lg font-bold'>Image: {fileName}</span>
                        </label>
                    </div>
                    <div className="form pl-6 lg:p-0 lg:w-1/4">
                        <h1 className="text-2xl -ml-4 mt-2 font-bold font-jost">
                            {/* <span className="ml-2 before:block before:absolute before:-inset-1 before:-skew-y-3 before:bg-pink-500 relative inline-block"> */}
                                <span className="relative text-black text-6xl font-bold">
                                    Upload
                                </span>
                            {/* </span> */}
                        </h1>
                        <form className="flex pt-8 mx-2 mr-6 pb-5 space-y-6 flex-col">
                            <select
                                className=" border border-black rounded-md pl-2 pr-1 py-2"
                                value={fileType}
                                onChange={handleFileTypeChange}
                            >
                                <option value=".img">Image</option>
                                <option value=".pdf">PDF</option>
                                <option value=".docx">DocX</option>
                            </select>
                            <motion.button
                                disabled={!file}
                                onClick={handleSubmit}
                                whileHover={{
                                    y: -3,
                                    scale: 1.05,
                                    boxShadow: "0 0 10px rgba(255,255,255,0.3)",
                                }}
                                className="overflow-hidden text-white hover:text-white border border-[rgba(255,255,255,0.4)] before:block before:absolute before:-inset-3 before:skew-x-[30deg] relative inline-block before:bg-gradient-to-r from-pink-500 to-violet-500 py-2 mx-1 rounded-md before:transition-all before:duration-500"
                            >
                                <span className="relative font-roboto text-lg transition-all duration-500">
                                    Upload
                                </span>
                            </motion.button>
                        </form>
                    </div>
                </div>
            </motion.div>
        </>
    );
};

export default FileUpload;


// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySW5mb3JtYXRpb24iOnsiaWQiOiI5YTZkNzAyYi0zNDY5LTQ1YTctYThhMy0xZDYxZDEzOTlhMmQiLCJlbWFpbCI6InZpc2hhbGNoYXVyYXNpYXZjMTAxMEBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwicGluX3BvbGljeSI6eyJyZWdpb25zIjpbeyJpZCI6IkZSQTEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX0seyJpZCI6Ik5ZQzEiLCJkZXNpcmVkUmVwbGljYXRpb25Db3VudCI6MX1dLCJ2ZXJzaW9uIjoxfSwibWZhX2VuYWJsZWQiOmZhbHNlLCJzdGF0dXMiOiJBQ1RJVkUifSwiYXV0aGVudGljYXRpb25UeXBlIjoic2NvcGVkS2V5Iiwic2NvcGVkS2V5S2V5IjoiMzc5MDUyOGY4MDQ0NzAzZTdiMTEiLCJzY29wZWRLZXlTZWNyZXQiOiJhNzQ3MzY5MzhkODdiZjY5MjRhNmIxNmM1MzRlNTZiNGZiZGJmNDhmMjgwNDUxOTQ3NDRmYTUwNGZmNTBlNjE3IiwiaWF0IjoxNjg1MTUxODk4fQ.lQ6qpIdm5ZYdUIo3oenGOQWTMdQ3fe5vIMY7XT_IM1I