type Height = number;
type Weight = number;

const calculateBmi = (height: Height, weight: Weight): string => {
    const BMI: number = weight / Math.pow(height / 100, 2);

    if (BMI < 18.5) return "underweight";

    if (18.5 <= BMI && BMI < 24.8) return "healthy weight";

    return "overweight";
};

console.log(calculateBmi(180, 74));
