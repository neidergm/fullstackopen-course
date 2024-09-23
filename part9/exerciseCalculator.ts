const calculateExercises = (daily_exercises: Array<number>, target: number) => {

    let trainingDays = 0;
    const totalHours = daily_exercises.reduce((a, b) => {
        if (b > 0) trainingDays++;
        return a + b;
    }, 0);
    const averageHours = totalHours / daily_exercises.length;

    const rating = averageHours >= target ? 3 : averageHours >= target / 2 ? 2 : 1;
    const ratingDescription = rating === 3 ? 'excellent' : rating === 2 ? 'not too bad but could be better' : 'bad';

    return {
        periodLength: daily_exercises.length,
        trainingDays,
        success: averageHours >= target,
        rating,
        ratingDescription,
        target,
        average: averageHours
    }
};

const parseArguments = (args: Array<string>) => {
    if (args.length < 4) throw new Error('Not enough arguments');
    const daily_exercises = args.slice(2, -1).map(Number);
    const target = Number(args[args.length - 1]);
    if (isNaN(target)) throw new Error('Provided values were not numbers!');
    return { daily_exercises, target };
};

const { daily_exercises, target } = parseArguments(process.argv);
console.log(daily_exercises, target);
console.log(calculateExercises(daily_exercises, target));