const liveUpdate = window.liveUpdate;

liveUpdate.textWidthContent = (element, detail, referencedElements) => {
    if (!liveUpdate.onTheCorrectNode(element, detail)) {
        return;
    }
    const classList = element.classList;
    const { button } = referencedElements;

    liveUpdate.propertyCallback(detail, "backgroundColor", (property, node) => {
        const { updated, previous } = property;

        if (previous) {
            classList.remove("bg-" + previous);
        }
        if (updated) {
            classList.add("bg-" + updated, "py-12");
        }
        if (!updated) {
            classList.remove("-text-with-content--bg", "py-12");
        }

        const dark = updated == "neos-dark";
        classList.toggle("text-slate-100", dark);
        classList.toggle("-links-light", dark);
        classList.toggle("text-slate-900", !dark);
        if (!dark) {
            classList.toggle("-links-dark", updated != "slate-50");
        }

        // Update the button
        liveUpdate.button(button, dark, { updated: node.properties.linkAppearance });
    });

    liveUpdate.propertyCallback(detail, "textLeft", (property) => {
        const { updated } = property;
        classList.remove("-text-with-content--left", "-text-with-content--right");
        classList.add("-text-with-content--" + (updated ? "left" : "right"));
    });

    liveUpdate.propertyCallback(detail, "linkText", (property, node) => {
        liveUpdate.buttonContent(button, property.updated || "read more", node.properties.linkAppearance);
    });

    liveUpdate.propertyCallback(detail, "linkAppearance", (property, node) => {
        const props = node.properties;

        // Check if the button is on dark background
        const dark = ["main", "neos-dark"].includes(props.backgroundColor);

        liveUpdate.button(button, dark, property);
    });
};
