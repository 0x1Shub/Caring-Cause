import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";


type CircleRatingProps = {
    amountRaised : number;
}

const CircleRating = ({ amountRaised } : CircleRatingProps) => {
    return (
        <div className="circleRating">
            <CircularProgressbar
                value={amountRaised}
                maxValue={100}
                text={`${amountRaised}%`}
                styles={buildStyles({
                    pathColor: "green",
                })}
            />
        </div>
    );
};

export default CircleRating;