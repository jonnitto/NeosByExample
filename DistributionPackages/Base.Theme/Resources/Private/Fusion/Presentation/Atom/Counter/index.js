import Alpine from "alpinejs";
import { rafInterval } from "../../Universal/requestAnimationFrame";

const formatThousands = (number) => number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

// Calculate how long each 'frame' should last if we want to update the animation 60 times per second
const frameDuration = 1000 / 60;

// An ease-out function that slows the count as it progresses
// https://easings.net/de#easeOutExpo
const ease = (x) => (x === 1 ? 1 : 1 - Math.pow(2, -10 * x));

Alpine.data("counter", (countTo, animationDuration) => ({
    current: 0,
    init() {
        this.useEase = countTo > 10;
        if (!animationDuration) {
            // How long you want the animation to take, in ms
            animationDuration = this.useEase ? 2000 : 1000;
        }
        // Use that to calculate how many frames we need to complete the animation
        this.totalFrames = Math.round(animationDuration / frameDuration);
    },
    counter: {
        "x-intersect.full.once"() {
            let frame = 0;
            // Start the animation running 60 times per second
            const counter = rafInterval(() => {
                frame++;
                // Calculate our progress as a value between 0 and 1
                // Pass that value to our easing function to get our
                // progress on a curve
                const progressValue = frame / this.totalFrames;

                const progress = this.useEase ? ease(progressValue) : progressValue;
                // Use the progress value to calculate the current count
                const currentCount = Math.round(countTo * progress);

                // If the current count has changed, update the element
                if (this.current !== currentCount) {
                    this.current = currentCount;
                }

                // If we’ve reached our last frame, stop the animation
                if (frame === this.totalFrames) {
                    counter.clear();
                }
            }, frameDuration);
        },
        "x-text"() {
            return formatThousands(this.current);
        },
    },
}));
