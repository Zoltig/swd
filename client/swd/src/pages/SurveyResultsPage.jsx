// SurveyResultsPage.js

import React from 'react';
import { useParams } from 'react-router-dom';
import SurveyResultsTable from '../components/SurveyResultsTable';

function SurveyResultsPage() {
  const { id } = useParams();

  return (
    <div className='mt-8'>
      <SurveyResultsTable surveyId={id} />
    </div>
  );
}

export default SurveyResultsPage;