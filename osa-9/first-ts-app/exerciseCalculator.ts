interface ExStats {
    numberOfDays: number;
    numberOfTrainingDays: number;
    dailyTarget: number;
    dailyAverage: number;
    targetReached: boolean;
    rating: number;
    ratingText: string;
}

interface Specs {
    target: number;
    hours: Array<number>;
}

const parseArgs = (args: Array<string>): Specs => {
    const slicedArgs: Array<string> = args.slice(2);
    const target: number = Number(slicedArgs[0]);
    const hours: Array<number> = slicedArgs.slice(1).map((n) => Number(n));

    if (target < 0) throw new Error("Target can't be negative.");
    if (hours.length < 1) throw new Error("Please add more days.");

    return {
        target: target,
        hours: hours,
    };
};

const calculateExcercises = (hours: Array<number>, target: number): ExStats => {
    const average: number = hours.reduce((a, b) => a + b) / hours.length;
    const diff: number = target - average;

    let rating: number;
    let text: string;

    if (diff < 0) {
        rating = 3;
        text = "great work";
    } else if (diff < 0.8) {
        rating = 3;
        text = "pretty good";
    } else {
        rating = 1;
        text = "not quite there";
    }

    return {
        numberOfDays: hours.length,
        numberOfTrainingDays: hours.filter((day) => day > 0).length,
        dailyTarget: target,
        dailyAverage: average,
        targetReached: average >= target,
        rating: rating,
        ratingText: text,
    };
};

try {
    const { target, hours } = parseArgs(process.argv);
    console.log(calculateExcercises(hours, target));
} catch (error) {
    console.log("Error: ", error.message);
}
