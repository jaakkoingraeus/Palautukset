interface ExStats {
    numberOfDays: number;
    numberOfTrainingDays: number;
    dailyTarget: number;
    dailyAverage: number;
    targetReached: boolean;
    rating: number;
    ratingText: string;
}

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

console.log(calculateExcercises([3, 0, 2, 4.5, 0, 3, 1], 3));
