import Alpine from "alpinejs";
import focus from "@alpinejs/focus";
import intersect from "@alpinejs/intersect";
import collapse from "@alpinejs/collapse";
import { smartypants } from "alpine-typogrify/dist/smartypants/module.mjs";
import { widont } from "alpine-typogrify/dist/widont/module.mjs";
import "./Fetch";
import "./HistoryBack";
import "./Tooltip";

const notInBackend = document.documentElement.classList.contains("-live");

Alpine.plugin(focus);
Alpine.plugin(intersect);
Alpine.plugin(collapse);

if (notInBackend) {
    widont.className = "";
    // Apply smartypants and widont only in live enviroments
    Alpine.plugin((Alpine) => {
        const mutateDom = Alpine.mutateDom;
        // eslint-disable-next-line no-empty-pattern
        Alpine.directive("typogrify", (el, {}, { effect, evaluateLater }) => {
            const evaluate = evaluateLater();
            const text = el.innerHTML;
            effect(() => {
                evaluate(() => {
                    mutateDom(() => {
                        el.innerHTML = smartypants(widont(text));
                    });
                });
            });
        });
    });
}

export default Alpine;
