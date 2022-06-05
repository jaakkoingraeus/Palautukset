type Height = number;
type Weight = number;

export interface Values {
    height: Height;
    weight: Weight;
}

export const parseArg = (args: Array<string>): Values => {
    const height: Height = Number(args[2]);
    const weight: Weight = Number(args[3]);

    if (args.length > 4) throw new Error("Too many arguments.");
    if (height <= 0) throw new Error("Height can't be zero or negative.");
    if (weight <= 0) throw new Error("Weight can't be zero or negative.");
    if (height && weight) {
        return {
            height: height,
            weight: weight,
        };
    }
    throw new Error("Missing parameters");
};

export const parseHTTP = (height: Height, weight: Weight) => {
    if (height <= 0) throw new Error("Height can't be zero or negative.");
    if (weight <= 0) throw new Error("Weight can't be zero or negative.");
    if (height && weight) {
        return {
            height: height,
            weight: weight,
        };
    }
    throw new Error("Missing parameters");
};

export const calculateBmi = (weight: Weight, height: Height): string => {
    const BMI: number = weight / Math.pow(height / 100, 2);

    if (BMI < 18.5) return "underweight";

    if (18.5 <= BMI && BMI < 24.8) return "healthy weight";

    return "overweight";
};

try {
    const { height, weight } = parseArg(process.argv);
    console.log(calculateBmi(weight, height));
} catch (error) {
    console.log("Error: ", error.message);
}
