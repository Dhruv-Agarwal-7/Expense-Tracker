import React from 'react';
import { FaYoutube, FaInstagram, FaFacebook } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { Link } from 'react-router-dom';

export const Footer = () => {
    return (
        <footer className="bg-green-200 text-white py-8 mt-8">
            <div className="container mx-auto flex flex-col items-center justify-between md:flex-row">
                <div className="mb-4 md:mb-0">
                    <h2 className="text-2xl font-bold text-green-800">Expense Tracker</h2>
                    <p className="text-md font-normal text-green-800">© 2024 Expense Tracker. All rights reserved.</p>
                </div>
                <div className="flex space-x-4">
                    <Link to="/home" className="hover:text-green-500 text-green-800 text-xl font-medium">Home</Link>
                    <Link to="/about" className="hover:text-green-500 text-green-800 text-xl font-medium">About</Link>
                    <Link to="/services" className="hover:text-green-500 text-green-800 text-xl font-medium">Services</Link>
                    <Link to="/contact" className="hover:text-green-500 text-green-800 text-xl font-medium">Contact</Link>
                    <Link to="/faqs" className="hover:text-green-500 text-green-800 text-xl font-medium">FAQs</Link>
                </div>
                <div className="flex space-x-4 mb-4">
                    <Link to="https://www.instagram.com" className="hover:text-green-500 text-green-800">
                        <FaInstagram className='text-3xl'/>
                    </Link>                    
                    <Link to="https://www.twitter.com" className="hover:text-green-500 text-green-800">
                        <FaXTwitter className='text-3xl '/>
                    </Link>
                    <Link to="https://www.youtube.com" className="hover:text-green-500 text-green-800">
                        <FaYoutube className='text-3xl'/>
                    </Link>
                    <Link to="https://www.facebook.com" className="hover:text-green-500 text-green-800">
                        <FaFacebook className='text-3xl'/>
                    </Link>
                </div>
            </div>
        </footer>
    );
};
