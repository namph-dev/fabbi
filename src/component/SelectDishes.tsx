import React, { useState, useEffect } from 'react';
import { Select, InputNumber, Button } from 'antd';
import { IDish, ISelection } from '../hook/types';

interface SelectDishesProps {
    restaurant: string;
    dishes: IDish[];
    updateSelection: (key: keyof ISelection, value: any) => void;
}

const SelectDishes: React.FC<SelectDishesProps> = ({ restaurant, dishes, updateSelection }) => {
    const [selectedDishes, setSelectedDishes] = useState<{ name: string; servings: number }[]>([]);
    const [newDish, setNewDish] = useState<{ name: string; servings: number }>({ name: '', servings: 1 });
    const [filteredDishes, setFilteredDishes] = useState<IDish[]>([]);

    useEffect(() => {
        setFilteredDishes(dishes.filter(dish => dish.restaurant === restaurant));
    }, [dishes, restaurant]);

    const handleDishChange = (index: number, field: 'name' | 'servings', value: string | number) => {
        const updatedDishes = [...selectedDishes];
        if (field === 'name') {
            updatedDishes[index].name = value as string;
        } else {
            updatedDishes[index].servings = value as number;
        }
        setSelectedDishes(updatedDishes);
        updateSelection('dishes', updatedDishes);
    };

    const handleAddDish = () => {
        if (newDish.name) {
            const newSelectedDishes = [...selectedDishes, newDish];
            setSelectedDishes(newSelectedDishes);
            updateSelection('dishes', newSelectedDishes);
            setNewDish({ name: '', servings: 1 }); 
        }
    };

    return (
        <>
            {selectedDishes.map((selectedDish, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                    <Select
                        value={selectedDish.name}
                        style={{ width: 120, marginRight: '10px' }}
                        onChange={(value) => handleDishChange(index, 'name', value)}
                    >
                        {filteredDishes.map((dish) => (
                            <Select.Option key={dish.id} value={dish.name}>{dish.name}</Select.Option>
                        ))}
                    </Select>
                    <InputNumber
                        min={1}
                        value={selectedDish.servings}
                        onChange={(value: any) => handleDishChange(index, 'servings', value)}
                        placeholder="Servings"
                        style={{ marginRight: '10px' }}
                    />
                    <Button type="dashed" onClick={() => setSelectedDishes(selectedDishes.filter((_, i) => i !== index))}>
                        Remove
                    </Button>
                </div>
            ))}
            <div style={{ marginBottom: '10px' }}>
                <Select
                    value={newDish.name}
                    style={{ width: 120, marginRight: '10px' }}
                    onChange={(value) => setNewDish({ ...newDish, name: value })}
                    placeholder="Select a dish"
                >
                    {filteredDishes.map((dish) => (
                        <Select.Option key={dish.id} value={dish.name}>{dish.name}</Select.Option>
                    ))}
                </Select>
                <InputNumber
                    min={1}
                    value={newDish.servings}
                    onChange={(value: any) => setNewDish({ ...newDish, servings: value })}
                    placeholder="Servings"
                    style={{ marginRight: '10px' }}
                />
                <Button type="primary" onClick={handleAddDish} disabled={!newDish.name}>
                    Add
                </Button>
            </div>
        </>
    );
};

export default SelectDishes;
