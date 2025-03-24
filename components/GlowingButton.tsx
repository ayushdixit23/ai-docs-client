"use client"
import React from 'react'
import { motion } from "motion/react"
import Link from 'next/link'

const GlowingButton = ({ text = "Get Started" }: { text?: string }) => {
    return (
        <Link href={"/chat"}>
        <motion.div whileHover={{ scale: 1.02 }} className="group cursor-pointer relative">
            <div className="absolute -inset-1 cursor-pointer rounded-lg bg-gradient-to-r from-rose-400 via-fuchsia-500 to-indigo-500 opacity-75 blur transition duration-500 group-hover:opacity-100"></div>
            <button className="relative cursor-pointer text-sm sm:text-base px-5 text-white/80 hover:text-white rounded-lg bg-black sm:px-6 py-2">
              {text}
            </button>
        </motion.div>
        </Link>
        
    )
}

export default GlowingButton