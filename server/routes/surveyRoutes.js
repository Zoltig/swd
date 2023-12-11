const express = require('express');
const router = express.Router();

// Przykładowa lista ankiet (do zastąpienia danymi z bazy danych)
const surveys = [
  {
    id: 1,
    title: 'Ankieta 1',
    criteria: 'Jakość',
    sliderValue: 10,
  },
  {
    id: 2,
    title: 'Ankieta 2',
    criteria: 'Gwarancja',
    sliderValue: 10,
  },
];

// Pobierz listę ankiet
router.get('/', (req, res) => {
  res.json(surveys);
});

// Pobierz szczegóły ankiety
router.get('/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const survey = surveys.find((survey) => survey.id === id);
  if (survey) {
    res.json(survey);
  } else {
    res.status(404).json({ message: 'Ankieta nie znaleziona' });
  }
});

// Dodaj nową ankietę
router.post('/', (req, res) => {
  const newSurvey = req.body;
  newSurvey.id = surveys.length + 1;
  surveys.push(newSurvey);
  res.json(newSurvey);
});

// Inne operacje na ankietach (aktualizacja, usuwanie itp.) można dodać zgodnie z potrzebami

router.get('/:id/responses', (req, res) => {
  const surveyId = parseInt(req.params.id);
  const survey = surveys.find((survey) => survey.id === surveyId);

  if (survey) {
    res.json(survey.responses || []);
  } else {
    res.status(404).json({ message: 'Survey not found' });
  }
});

router.post('/:id/responses', (req, res) => {
  const surveyId = parseInt(req.params.id);
  const survey = surveys.find((survey) => survey.id === surveyId);

  if (survey) {
    const response = req.body.selectedOption;
    console.log(`Received response for survey ${surveyId}: ${response}`);

    // Dodaj odpowiedzi do tablicy w obiekcie ankiety
    survey.responses = survey.responses || [];
    survey.responses.push({ selectedOption: response });

    res.sendStatus(200);
  } else {
    res.status(404).json({ message: 'Survey not found' });
  }
});

module.exports = router;