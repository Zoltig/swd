import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function SurveyDetail({ match }) {
  const [survey, setSurvey] = useState(null);
  const [sliderValues, setSliderValues] = useState({});

  const handleOptionChange = (criterion, value) => {
    setSliderValues({ ...sliderValues, [criterion]: value });
  };

  const handleSubmitResponse = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/surveys/${match.params.id}/responses`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sliderValues }),
      });

      if (response.ok) {
        console.log('Response submitted successfully!');
        console.log('Submitted values:', sliderValues);
      } else {
        console.error('Error submitting response');
      }
    } catch (error) {
      console.error('Error during response submission:', error);
    }
  };

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/surveys/${match.params.id}`);

        if (response.ok) {
          const surveyDetails = await response.json();
          setSurvey(surveyDetails);

          // Initialize slider values with default values from the survey
          const initialSliderValues = {};
          surveyDetails.criteria.forEach((criterion) => {
            initialSliderValues[criterion.name] = criterion.value;
          });
          setSliderValues(initialSliderValues);
        } else {
          console.error('Error fetching survey details:', response.statusText);
        }
      } catch (error) {
        console.error('Error during fetch:', error);
      }
    };

    fetchSurveyDetails();
  }, [match.params.id]);

  return (
    <>
      <div>
        {survey ? (
          <div className='flex flex-col items-center justify-center mt-8'>
            <h2 className='font-semibold text-2xl'>{survey.title}</h2>
            {survey.criteria.map((criterion) => (
              <div key={criterion.name}>
                <p className='text-xl mt-4'>{criterion.name}:</p>
                <label className='flex flex-col items-center justify-center mt-2'>
                  <input
                    type="range"
                    min="0"
                    max="20"
                    value={sliderValues[criterion.name] || 0}
                    onChange={(e) => handleOptionChange(criterion.name, e.target.value)}
                  />
                  <span>{sliderValues[criterion.name] || 0}</span>
                </label>
              </div>
            ))}
            <button className='bg-[#19c249] text-white px-8 py-2 rounded-md font-semibold mt-8' onClick={handleSubmitResponse}>
              Submit
            </button>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
      <div className='flex items-center justify-center mt-8'>
        {survey ? (
          <div>
            <Link to={`/survey/${match.params.id}/results`} className='bg-[#19c249] text-white px-8 py-2 rounded-md font-semibold mt-8'>View Results</Link>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </>
  );
}

export default SurveyDetail;
