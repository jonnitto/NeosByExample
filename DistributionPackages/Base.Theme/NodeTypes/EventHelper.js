// Trigger neos event to one event handler
const triggerEvent = (event) => {
    window.dispatchEvent(new CustomEvent("neosnodeupdate", { detail: event.detail }));
};

document.addEventListener("Neos.NodeCommit", (event) => {
    triggerEvent(event);
});

document.addEventListener("Neos.NodeDiscard", (event) => {
    triggerEvent(event);
});

const onTheCorrectNode = (element, detail) => {
    let contextPathFromNode = element.dataset.__neosNodeContextpath;
    const contextPathFromEvent = detail.node.contextPath;

    // The element is the root element and the paths are equal
    if (contextPathFromNode === contextPathFromEvent) {
        return true;
    }

    // We are deeper in the element, try to get the root element
    if (!contextPathFromNode) {
        return !!element.closest(`[data-__neos-node-contextpath="${contextPathFromEvent}"]`);
    }

    return false;
};

const propertyCallback = (detail, name, callbackFn) => {
    // Save propertis in array
    const properties = detail.property ? [detail.property] : detail.properties;
    const node = detail.node;
    properties.every((property) => {
        if (property.name !== name) {
            return true;
        }

        callbackFn(property, node);
        return false;
    });
};

const button = (element, dark, property) => {
    if (!element) {
        return;
    }
    const { updated, previous } = property;
    const classList = element.classList;

    // Remove all appearance classes
    classList.remove("btn--main", "btn--minor", "btn--ghost", "btn--link");

    classList.toggle("btn--dark", dark);
    classList.add(`btn--${updated}`);

    if (updated === "ghost" || previous === "ghost") {
        buttonContent(element, null, updated);
    }
};

const buttonContent = (element, content, appearance) => {
    if (!element) {
        return;
    }

    if (!content) {
        content = element.innerText;
    }

    if (appearance !== "ghost") {
        element.innerText = content;
        return;
    }

    element.innerHTML = `<span class="relative"><span aria-hidden="true" class="btn__bg"></span><span class="btn__content">${content}</span></span>`;
};

window.liveUpdate = window.liveUpdate || { onTheCorrectNode, propertyCallback, button, buttonContent };
