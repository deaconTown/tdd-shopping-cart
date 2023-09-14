import React from 'react';
import Image from 'next/image';
import { useState } from 'react';
import Link from 'next/link';
import Logo from '../../images/logo_200x200.png'
import { Bars3Icon, ShoppingCartIcon } from '@heroicons/react/24/solid'

function NavBar() {
    const [navBar, setNavBar] = useState(false);
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
                <div id='right-side'>
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
                <div id='hamburger' className='md:hidden cursor-pointer pl-24'>
                    <Bars3Icon className='h-6 w-6' />
                </div>
            </div>

        </nav>
    )
}

export default NavBar