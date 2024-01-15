import React from 'react';

interface ProductBannerProps {
    productItems: Product[]
}

const ProductBanner: React.FC<ProductBannerProps> = ({ productItems}) => {
    const discountedProduct = Math.floor(Math.random() * 10) + 1;

    return (
        <div className="mx-8 py-24 bg-[#fbf0e4] flex flex-row justify-around rounded-[25px]">
            <h1 className="text-4xl text-left py-5 font-extrabold ml-6 text-[#003d29] px-24 w-1/2">
                Grab Upto 50% off On Selected {productItems[discountedProduct]?.title}
            </h1>
            <div className="">

                <img className="-mt-20 h-[400px] my-2 px-18" src={`${productItems[discountedProduct]?.images}`} alt={`${productItems[discountedProduct]?.title ?? "feature product"}`} />

            </div>
        </div>
    );
}
export default ProductBanner;
