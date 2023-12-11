// SurveyResultsTable.js

import React, { useState, useEffect } from 'react';

function SurveyResultsTable({ surveyId }) {
  const [responses, setResponses] = useState([]);

  useEffect(() => {
    const fetchResponses = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/surveys/${surveyId}/responses`);

        if (response.ok) {
          const responseData = await response.json();
          setResponses(responseData);
        } else {
          console.error('Error fetching responses');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchResponses();
  }, [surveyId]);

  // Oblicz średnią wartość suwaka
  const calculateAverage = () => {
    if (responses.length === 0) {
      return 0;
    }

    const total = responses.reduce((acc, response) => acc + parseInt(response.selectedOption), 0);
    return total / responses.length;
  };

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='font-semibold text-2xl'>Survey Results</h2>
      <table className='border'>
        <thead>
          <tr className='border'>
            <th>User</th>
            <th>Slider Value</th>
          </tr>
        </thead>
        <tbody>
          {responses.map((response, index) => (
            <tr key={index} className='border'>
              <td>{index + 1}</td>
              <td>{response.selectedOption}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>Average Slider Value: {calculateAverage().toFixed(2)}</p>
    </div>
  );
}

export default SurveyResultsTable;