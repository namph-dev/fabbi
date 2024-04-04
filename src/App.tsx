import React, { useState } from 'react';
import { Steps, Button, Card } from 'antd';

import SelectMeal from './component/SelectMeal';
import SelectRestaurant from './component/SelectRestaurant';
import SelectDishes from './component/SelectDishes';
import ReviewSelection from './component/ReviewSelection';
import { IDish, ISelection } from './hook/types';
import data from './dishes.json';
const { Step } = Steps;

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selection, setSelection] = useState<ISelection>({
    meal: '',
    numberOfPeople: 1,
    restaurant: '',
    dishes: [],
  });

  const mealOptions = Array.from(new Set(data.dishes.flatMap(dish => dish.availableMeals)));

  const updateSelection = (key: keyof ISelection, value: any) => {
    setSelection((prev) => ({ ...prev, [key]: value }));
  };

  const nextStep = () => setCurrentStep((prevStep) => prevStep + 1);
  const prevStep = () => setCurrentStep((prevStep) => prevStep - 1);

  const renderStepContent = (step: number) => {
    switch (step) {
      case 0:
        return <SelectMeal updateSelection={updateSelection} mealOptions={mealOptions} />;
      case 1:
        return <SelectRestaurant dishes={data.dishes as IDish[]} meal={selection.meal} updateSelection={updateSelection} />;
      case 2:
        return <SelectDishes dishes={data.dishes as IDish[]} restaurant={selection.restaurant} updateSelection={updateSelection} />;
      case 3:
        return <ReviewSelection selection={selection} />;
      default:
        return null;
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <Card style={{ width: '80%', maxWidth: '600px' }}>
        <Steps current={currentStep} style={{ marginBottom: '20px' }}>
          <Step title="Step 1" />
          <Step title="Step 2" />
          <Step title="Step 3" />
          <Step title="Review" />
        </Steps>
        <div>{renderStepContent(currentStep)}</div>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'space-between' }}>
          {currentStep > 0 && <Button onClick={prevStep}>Previous</Button>}
          {currentStep < 3 && <Button type="primary" onClick={nextStep}>Next</Button>}
          {currentStep === 3 && <Button type="primary" onClick={() => console.log(selection)}>Submit</Button>}
        </div>
      </Card>
    </div>
  );

};

export default App;
