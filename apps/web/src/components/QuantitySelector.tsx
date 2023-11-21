import React from 'react';

interface QuantitySelectorProps {
    quantity: number;
    onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({ quantity, onQuantityChange }) => {
    const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        e.preventDefault();
        const newQuantity = parseInt(e.target.value, 10);
        onQuantityChange(newQuantity);
    };

    return (
        <select
            value={quantity}
            onChange={(e) => onQuantityChange(parseInt(e.target.value, 10))}
            className="border p-2 rounded-md w-20"
        >
            {[...Array(10).keys()].map((num) => (
                <option key={num} value={num + 1}>
                    {num + 1}
                </option>
            ))}
        </select>
    );
};

export default QuantitySelector;
