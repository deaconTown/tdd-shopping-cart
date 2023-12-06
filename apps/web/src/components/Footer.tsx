import React from 'react'

const Footer: React.FC = () => {
    return (
        <footer className="bg-[#003d29] text-white py-8 mt-auto bottom-0">
            <div className="container mx-auto flex flex-wrap justify-between">
                <div className="w-full md:w-1/4">
                    <h3 className="text-lg font-bold mb-4">Company</h3>
                    <ul className="list-none p-0">
                        <li className="mb-2"><a href="/about">About Us</a></li>
                        <li className="mb-2"><a href="/contact">Contact Us</a></li>
                        <li className="mb-2"><a href="/terms">Terms of Service</a></li>
                        <li className="mb-2"><a href="/privacy">Privacy Policy</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/4">
                    <h3 className="text-lg font-bold mb-4">Customer Service</h3>
                    <ul className="list-none p-0">
                        <li className="mb-2"><a href="/faq">FAQ</a></li>
                        <li className="mb-2"><a href="/returns">Returns</a></li>
                        <li className="mb-2"><a href="/shipping">Shipping</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/4">
                    <h3 className="text-lg font-bold mb-4">Connect With Us</h3>
                    <ul className="list-none p-0">
                        <li className="mb-2"><a href="/facebook">Facebook</a></li>
                        <li className="mb-2"><a href="/twitter">Twitter</a></li>
                        <li className="mb-2"><a href="/instagram">Instagram</a></li>
                    </ul>
                </div>

                <div className="w-full md:w-1/4">
                    <h3 className="text-lg font-bold mb-4">Subscribe to Newsletter</h3>
                    <form>
                        <input
                            type="email"
                            placeholder="Your Email"
                            className="w-full py-2 px-3 mb-2 rounded"
                        />
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                            Subscribe
                        </button>
                    </form>
                </div>
            </div>

            <div className="mt-8 border-t border-gray-700 text-center">
                <p className="text-sm">&copy; 2023 ItemRUs. All rights reserved.</p>
            </div>
        </footer>
    )
}

export default Footer