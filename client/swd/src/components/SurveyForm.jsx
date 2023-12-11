import React, { useState } from 'react';

function SurveyForm() {
  const [criteria, setCriteria] = useState('');
  const [title, setTitle] = useState('');
  const [criteriaList, setCriteriaList] = useState([]); // Lista kryteriów
  const [sliderValues, setSliderValues] = useState({}); // Obiekt przechowujący wartości suwaków dla każdego kryterium

  const handleSliderChange = (criterion, value) => {
    setSliderValues({ ...sliderValues, [criterion]: value });
  };

  const handleAddCriterion = () => {
    setCriteriaList([...criteriaList, criteria]);
    setSliderValues({ ...sliderValues, [criteria]: 10 }); // Domyślna wartość suwaka dla nowego kryterium
    setCriteria('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newSurvey = {
      title: title,
      criteria: criteriaList.map(criterion => ({ name: criterion, value: sliderValues[criterion] || 0 })),
    };

    try {
      const response = await fetch('http://localhost:5000/api/surveys', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newSurvey),
      });

      if (response.ok) {
        setCriteria('');
        setTitle('');
        setCriteriaList([]);
        setSliderValues({});
        console.log('Ankieta została dodana!');
      } else {
        console.error('Błąd podczas dodawania ankiety');
      }
    } catch (error) {
      console.error('Błąd podczas komunikacji z serwerem:', error);
    }
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='font-semibold text-2xl'>Create a New Survey</h2>
      <form className='flex flex-col mt-12 text-xl w-[800px]' onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            className='border border-[#19c249] focus:outline-none w-full'
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <label>Criteria:</label>
          <input
            type="text"
            value={criteria}
            className='border border-[#19c249] focus:outline-none w-full'
            onChange={(e) => setCriteria(e.target.value)}
          />
          <button type="button" onClick={handleAddCriterion} className='bg-[#19c249] text-white p-2 rounded-md font-semibold mt-2'>
            Add Criterion
          </button>
        </div>
        {criteriaList.map((criterion) => (
          <div key={criterion}>
            <label>{criterion}:</label>
            <input
              type="range"
              min="0"
              max="20"
              value={sliderValues[criterion] || 0}
              onChange={(e) => handleSliderChange(criterion, e.target.value)}
            />
            <span>{sliderValues[criterion] || 0}</span>
          </div>
        ))}
        <button className='bg-[#19c249] text-white p-2 rounded-md font-semibold mt-8' type="submit">Create Survey</button>
      </form>
    </div>
  );
}

export default SurveyForm;
