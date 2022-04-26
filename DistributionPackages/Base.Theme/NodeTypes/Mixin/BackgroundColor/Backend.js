const liveUpdate = window.liveUpdate;

liveUpdate.backgroundColor = (element, detail) => {
    if (!liveUpdate.onTheCorrectNode(element, detail)) {
        return;
    }
    const classList = element.classList;

    liveUpdate.propertyCallback(detail, "backgroundColor", (property) => {
        const { updated, previous } = property;

        if (previous) {
            classList.remove("bg-" + previous);
        }
        if (updated) {
            classList.add("bg-" + updated);
        }
    });
};
