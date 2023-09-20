import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../../images/logo_200x200.png'
import { Bars3Icon, ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/solid'

function NavBar() {
    const [navBar, setNavBar] = useState(false);
    const [openNav, setOpenNav] = useState(false)

    const handleNav = () => {
        setOpenNav(!openNav);
    }

    return (
        <nav id='navBar' className='fixed h-24 w-full shadow-xl bg-white'>
            <div
                id='left-side'
                className='flex justify-between items-center h-full w-full  px-4 2xl:px16'>
                <Link href='/'>
                    <Image
                        src={Logo}
                        alt='Logo'
                        width={75}
                        height={75}
                        className=' border-orange-300 border border-opacity-50 rounded-3xl cursor-pointer'
                        priority
                    />
                </Link>
                <div id='right-side' className='hidden sm:flex'>
                    <ul id='menu-list' className='hidden sm:flex'>
                        <Link href="">
                            <li className='ml-10 uppercase hover:border-b text-xl'>Home</li>
                        </Link>

                        <Link href="">
                            <li className='ml-10 uppercase hover:border-b text-xl'>Contact Us</li>
                        </Link>

                        <Link href="">
                            <li className='ml-10 uppercase hover:border-b text-xl'>About</li>
                        </Link>

                        <Link href="">
                            {/* <li className='ml-10 uppercase hover:border-b text-xl'>Cart</li> */}
                            <ShoppingCartIcon className='h-6 w-6 ml-10 uppercase hover:border-b text-xl' />
                        </Link>
                    </ul>
                </div>
                <div id='hamburger' onClick={handleNav} className='sm:hidden cursor-pointer pl-24'>
                    <Bars3Icon className='h-6 w-6' />
                </div>
            </div>
            <div className=
                {
                    openNav ?
                        `fixed left-0 top-0 w-[65%] sm:hidden h-screen bg-[#ecf0f3] p-10 ease-in duration-500 overflow-auto`
                        :
                        `fixed left-[-100%] top-0 p-10 ease-in duration-500`
                }>
                <div className='flex w-full items-center justify-end'>
                    <div>
                        <XMarkIcon onClick={handleNav} className='h-6 w-6 ml-10 uppercase hover:border-b text-xl' />
                    </div>
                </div>
                <div className='cursor-pointer ml-10'>
                    <Link href='/'>
                        <Image
                            src={Logo}
                            alt='Logo'
                            width={75}
                            height={75}
                            className=' border-orange-300 border border-opacity-50 rounded-3xl cursor-pointer'
                            priority
                        />
                    </Link>
                </div>
                <div className='flex-col py-4'>
                    <ul id='menu-list' className='justify-between'>

                        <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
                            <Link href="">
                                Home
                            </Link>
                        </li>

                        <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
                            <Link href="">
                                Contact Us
                            </Link>
                        </li>

                        <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
                            <Link href="">
                                About
                            </Link>
                        </li>

                        <li className='ml-10 uppercase hover:border-b text-xl cursor-pointer py-4'>
                            <Link href="">
                                <ShoppingCartIcon className='h-6 w-6 uppercase hover:border-b text-xl' />
                            </Link>
                        </li>

                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default NavBar