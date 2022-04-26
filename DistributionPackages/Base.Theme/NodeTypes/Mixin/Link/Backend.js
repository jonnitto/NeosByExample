const liveUpdate = window.liveUpdate;

liveUpdate.link = (element, detail, fallback) => {
    if (!liveUpdate.onTheCorrectNode(element, detail)) {
        return;
    }

    if (!fallback) {
        fallback = "read more";
    }

    liveUpdate.propertyCallback(detail, "linkText", (property, node) => {
        liveUpdate.buttonContent(element, property.updated || fallback, node.properties.linkAppearance);
    });

    liveUpdate.propertyCallback(detail, "linkAppearance", (property, node) => {
        const props = node.properties;

        // Check if the button is on dark background
        const dark = props.backgroundColor == "neos-dark";

        liveUpdate.button(element, dark, property);
    });
};
