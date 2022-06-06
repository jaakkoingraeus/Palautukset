import express from "express";
import { calculateBmi, parseHTTP } from "./bmiCalculator";
import { calculateExcercises } from "./exerciseCalculator";

const app = express();
app.use(express.json());

app.get("/hello", (_req, res) => {
    res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
    try {
        const { height, weight } = parseHTTP(
            Number(req.query.height),
            Number(req.query.weight)
        );

        res.json({
            weight: weight,
            height: height,
            bmi: calculateBmi(weight, height),
        });
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
});

app.post("/exercises", (req, res) => {
    let result: object;

    try {
        const body = req.body;
        if (!body.daily_exercises) throw Error("Please provide hours");
        if (!body.target) throw Error("Please provide target");
        result = calculateExcercises(body.daily_exercises, body.target);
    } catch (error) {
        console.log("ERROR: ", error.message);
        result = {
            error: error.message,
        };
    }

    console.log(result);

    res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
