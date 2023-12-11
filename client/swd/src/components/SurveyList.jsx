import React, { useState, useEffect } from 'react';

function SurveyList() {
  const [surveys, setSurveys] = useState([]);

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        // Fetch the list of surveys from the server
        const response = await fetch('http://localhost:5000/api/surveys'); // Update the URL as needed

        if (response.ok) {
          const surveyData = await response.json();
          setSurveys(surveyData);
        } else {
          console.error('Error fetching surveys');
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    // Call the fetchSurveys function
    fetchSurveys();
  }, []);

  return (
    <div className='flex flex-col items-center justify-center'>
      <h2 className='font-semibold text-2xl'>Survey List</h2>
      <ul className='flex mt-4'>
        {surveys.map((survey) => (
          <li key={survey.id} className='m-2'>
            <a href={`/survey/${survey.id}`} className='border border-[#19c249] text-[#19c249] p-2 rounded-md font-semibold'>{survey.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SurveyList;