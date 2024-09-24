import express from 'express';
import calculateBmi from './bmiCalculator';
import calculateExercises from './exerciseCalculator';
import bodyParser from 'body-parser';

const app = express();
app.use(bodyParser.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
    const { height, weight } = req.query;
    if (!height || !weight) {
        res.status(400).send({ error: "Missing parameters" });
    } else if (isNaN(Number(height)) || isNaN(Number(weight))) {
        res.status(400).send({ error: "Provided values were not numbers!" });
    }

    res.send({
        height,
        weight,
        bmi: calculateBmi(Number(height), Number(weight))
    });
});

app.post('/exercises', (req, res) => {
    const { daily_exercises, target } = req.body;
    if (!daily_exercises || !target) {
        res.status(400).send({ error: "Missing parameters" });
    }else if(isNaN(Number(target)) || !Array.isArray(daily_exercises)){
        res.status(400).send({ error: "Malformatted parameters" });
    }

    res.send(calculateExercises(daily_exercises, target));
});


const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
