import React from 'react';
import { useParams } from 'react-router-dom';
import SurveyDetail from '../components/SurveyDetail';
import SurveyResponseForm from '../components/SurveyResponseForm'; // Import the new component

function SurveyDetailPage() {
  const { id } = useParams();

  return (
    <div>
      <SurveyDetail match={{ params: { id } }} />
      {/*<SurveyResponseForm />  Render the response form */}
    </div>
  );
}

export default SurveyDetailPage;