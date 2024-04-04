import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Button } from 'antd';
import { IDish, ISelection } from '../hook/types';

interface SelectDishesProps {
    restaurant: string;
    dishes: IDish[];
    updateSelection: (key: keyof ISelection, value: any) => void;
}

const SelectDishes: React.FC<SelectDishesProps> = ({ restaurant, dishes, updateSelection }) => {
    const [selectedDishes, setSelectedDishes] = useState<{ name: string; servings: number }[]>([{ name: '', servings: 1 }]);
    const [filteredDishes, setFilteredDishes] = useState<IDish[]>([]);

    useEffect(() => {
        setFilteredDishes(dishes.filter(dish => dish.restaurant === restaurant));
    }, [dishes, restaurant]);

    useEffect(() => {
        updateSelection('dishes', selectedDishes);
    }, [selectedDishes, updateSelection]);

    const handleDishChange = (index: number, field: 'name' | 'servings', value: string | number | null) => {
        if (value == null) return;
        setSelectedDishes(currentDishes =>
            currentDishes.map((dish, i) =>
                i === index ? { ...dish, [field]: value } : dish
            ),
        );
    };

    const handleAddDish = () => {
        setSelectedDishes(currentDishes => [
            ...currentDishes,
            { name: '', servings: 1 }
        ]);
    };

    const handleRemoveDish = (index: number) => {
        if (selectedDishes.length > 1) {
            setSelectedDishes(currentDishes =>
                currentDishes.filter((_, i) => i !== index)
            );
        }
    };

    return (
        <>
            {selectedDishes.map((selectedDish, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <Select
                        value={selectedDish.name}
                        style={{ width: 120, marginRight: '10px' }}
                        onChange={value => handleDishChange(index, 'name', value)}
                        placeholder="Select a dish"
                    >
                        {filteredDishes.map(dish => (
                            <Select.Option key={dish.id} value={dish.name}>{dish.name}</Select.Option>
                        ))}
                    </Select>
                    <InputNumber
                        min={1}
                        value={selectedDish.servings}
                        onChange={value => handleDishChange(index, 'servings', value ?? 1)}
                        placeholder="Servings"
                        style={{ marginRight: '10px' }}
                    />
                    <Button type="dashed" onClick={() => handleRemoveDish(index)}>
                        Remove
                    </Button>
                </div>
            ))}
            <Button type="dashed" onClick={handleAddDish} style={{ marginTop: '10px' }}>
                Add Dish
            </Button>
        </>
    );
};

export default SelectDishes;
