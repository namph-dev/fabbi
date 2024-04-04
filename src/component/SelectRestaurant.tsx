import React from 'react';
import { Select } from 'antd';
import { IDish, ISelection } from '../hook/types';

interface SelectRestaurantProps {
    meal: string;
    dishes: IDish[];
    updateSelection: (key: keyof ISelection, value: any) => void;
}

const SelectRestaurant: React.FC<SelectRestaurantProps> = ({ meal, dishes, updateSelection }) => {
    const filteredDishes = dishes.filter((dish) => dish.availableMeals.includes(meal));
    const uniqueRestaurants = Array.from(new Set(filteredDishes.map((dish) => dish.restaurant)));
    return (
        <Select onChange={(value) => updateSelection('restaurant', value)} placeholder="Please Select a Restaurant">
            {uniqueRestaurants.map((restaurant) => (
                <Select.Option key={restaurant} value={restaurant}>
                    {restaurant}
                </Select.Option>
            ))}
        </Select>
    );
};

export default SelectRestaurant;
