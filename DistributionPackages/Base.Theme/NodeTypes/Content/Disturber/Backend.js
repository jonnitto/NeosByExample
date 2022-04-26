const liveUpdate = window.liveUpdate;

liveUpdate.disturber = (element, detail, referencedElements) => {
    if (!liveUpdate.onTheCorrectNode(element, detail)) {
        return;
    }

    const classList = element.classList;
    const { background, dotsTop, dotsBottom, button } = referencedElements;
    const dots = [dotsTop, dotsBottom];

    liveUpdate.propertyCallback(detail, "backgroundColor", (property, node) => {
        const { updated, previous } = property;

        if (previous) {
            classList.remove("bg-" + previous);
        }
        if (updated) {
            classList.add("bg-" + updated);
        }

        const dark = updated == "neos-dark";
        const onNeosBG = updated.startsWith("neos-");
        const label = element.querySelector(".-js-label").classList;

        // First, remove all classes
        classList.remove("text-slate-100 text-slate-900 -links-light -links-dark");
        if (dark) {
            classList.add("text-slate-100 -links-light");
        } else {
            classList.add("text-slate-900");

            if (onNeosBG) {
                classList.add("-links-dark");
            }
        }

        // const onColoredBg = dark || updated == "neos-light";

        // const label = element.querySelector(".-js-label").classList;
        // label.toggle("text-slate-400", !onMainBg);
        // label.toggle("opactiy-90", onMainBg);

        // if (onMainBg) {

        //     classList.toggle("-links-dark", !dark);
        // } else {
        //     classList.remove("-links-light", "-links-dark");
        // }

        // Updadte the dots
        dots.forEach((circles) => {
            circles.querySelector("rect").setAttribute("fill", `url(#disturber-circles${dark ? "-dark" : ""})`);
        });

        // Update the button
        liveUpdate.button(button, dark, { updated: node.properties.linkAppearance });
    });

    liveUpdate.propertyCallback(detail, "textDark", (property, node) => {
        const { updated } = property;
        classList.remove("-links-light", "-links-dark");

        classList.toggle("text-slate-100", !updated);
        classList.toggle("text-shadow-black", !updated);

        classList.toggle("text-slate-900", !!updated);
        classList.toggle("text-shadow-white", !!updated);

        background.style.background = updated ? "#fff" : "#000";

        // Updadte the dots
        dots.forEach((circles) => {
            circles.querySelector("rect").setAttribute("fill", `url(#disturber-circles${updated ? "" : "-dark"})`);
        });

        // Update the button
        liveUpdate.button(button, updated, { updated: node.properties.linkAppearance });
    });

    liveUpdate.propertyCallback(detail, "opacity", (property) => {
        background.style.opacity = property.updated / 100;
    });

    liveUpdate.propertyCallback(detail, "dotsOpacity", (property) => {
        const value = property.updated / 100;
        dots.forEach((circles) => {
            circles.style.opacity = value;
        });
    });

    liveUpdate.propertyCallback(detail, "linkText", (property, node) => {
        liveUpdate.buttonContent(button, property.updated || "read more", node.properties.linkAppearance);
    });

    liveUpdate.propertyCallback(detail, "linkAppearance", (property, node) => {
        const props = node.properties;

        // Check if the button is on dark background
        const dark = props.image ? props.textDark : ["main", "neos-dark"].includes(props.backgroundColor);

        liveUpdate.button(button, dark, property);
    });
};
