const liveUpdate = window.liveUpdate;

liveUpdate.breakout = (element, detail, useProse) => {
    if (!liveUpdate.onTheCorrectNode(element, detail)) {
        return;
    }

    liveUpdate.propertyCallback(detail, "breakout", (property) => {
        let updated = property.updated;
        const classList = element.classList;
        classList.remove("-breakout", "-breakout--wide", "-breakout--full");

        if (useProse) {
            const isProse = updated == "prose";
            if (isProse) {
                updated = false;
            }
            classList[isProse ? "add" : "remove"]("prose", "prose-lg", "mx-auto");
        }

        if (updated) {
            classList.add("-breakout", `-breakout--${updated}`);
        }
    });
};
