const calculateBmi = (height: number, weight: number): string => {
    return "Normal (healthy weight)";
};

const getHeightAndWeight = (args: Array<string>) => {
    if (args.length < 4 ) throw new Error('Not enough arguments');
    const height = Number(args[2]);
    const weight = Number(args[3]);
    if (isNaN(height) || isNaN(weight)) throw new Error('Provided values were not numbers!');
    return { height, weight };
};
const { height, weight } = getHeightAndWeight(process.argv);

console.log(calculateBmi(height, weight));