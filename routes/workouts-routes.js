const express = require('express');
const workoutsController = require('../controller/workouts-controller');
const router = express.Router();
const checkAuth = require('../middleware/check-auth');


router.post('/ekle', checkAuth, workoutsController.addWorkout);

router.post('/sil', checkAuth, workoutsController.deleteWorkout);

router.post('/duzenle', checkAuth, workoutsController.updateWorkout);

router.get('/:uid/:wid', checkAuth, workoutsController.getWorkout);

router.get('/:uid', checkAuth, workoutsController.getWorkouts);


module.exports = router;