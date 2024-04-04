import React from 'react';
import { ISelection } from '../hook/types';

interface ReviewSelectionProps {
    selection: ISelection;
}

const ReviewSelection: React.FC<ReviewSelectionProps> = ({ selection }) => {
    return (
        <div>
            <p>Meal: {selection.meal}</p>
            <p>Number of People: {selection.numberOfPeople}</p>
            <p>Restaurant: {selection.restaurant}</p>
            <div style={{ border: '1px solid #ddd', padding: '10px', marginTop: '10px' }}>
                <h3>Dishes:</h3>
                {selection.dishes.length > 0 ? (
                    selection.dishes.map((dish, index) => (
                        <p key={index}>
                            {dish.name} - {dish.servings} servings
                        </p>
                    ))
                ) : (
                    <p>No dishes selected.</p>
                )}
            </div>
        </div>
    );
};

export default ReviewSelection;
