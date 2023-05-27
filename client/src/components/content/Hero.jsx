import React from 'react'
import { motion } from 'framer-motion';

const Hero = () => {
    return (
        <>
            <motion.div className='h-screen relative flex items-center justify-center px-20 text-center'>
                <motion.h1 className="tagline relative font-jost text-7xl md:text-8xl font-bold`">
                    <motion.span
                        initial={{ opacity: 0, x: -100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}>
                        Blockchain-powered Scrapbook</motion.span>
                    <motion.span
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1.2, delay: 0.4 }}
                        className='text-7xl  md:text-8xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-[#9b5afc] to-[#00CC99]'> memories, securely stored, forever cherished. </motion.span>
                    <motion.div
                        initial={{ opacity: 0, x: 100 }}
                        animate={{ opacity: 1, x: 0 }}
                        // transition={{ duration: 1.2}}
                        className='h-[0.2rem] -bottom-40 mx-80 w-full lg:w-1/2 absolute bg-gradient-to-r from-[#9b5afc] to-[#00CC99]'></motion.div>
                </motion.h1>
            </motion.div>
        </>
    )
}

export default Hero
