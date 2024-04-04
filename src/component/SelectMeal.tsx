import React from 'react';
import { Select, InputNumber } from 'antd';
import { ISelection } from '../hook/types';

interface SelectMealProps {
    updateSelection: (key: keyof ISelection, value: any) => void;
    mealOptions: string[];
}

const SelectMeal: React.FC<SelectMealProps> = ({ updateSelection, mealOptions }) => {
    return (
        <div>
            <Select onChange={(value) => updateSelection('meal', value)} placeholder="Please Select a Meal" style={{ marginRight: "10px" }}>
                {mealOptions.map((meal, index) => (
                    <Select.Option key={index} value={meal}>
                        {meal}
                    </Select.Option>
                ))}
            </Select>
            <InputNumber
                min={1}
                defaultValue={1}
                onChange={(value) => updateSelection('numberOfPeople', value)}
                placeholder="Please Enter Number of People"
            />
        </div>
    );
};

export default SelectMeal;
