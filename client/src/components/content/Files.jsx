import React from 'react'
import { motion } from 'framer-motion'

const Files = (props) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.2 }}
            className="videoItem rounded-xl p-2 -my-4 lg:-my-3 w-full md:w-1/2 lg:w-1/3">
                
        </motion.div>
    )
}

export default Files
