import Alpine from "alpinejs";

const domains = ["//neos-by-example.ddev.site", "//neos-by-example.local"];
const referrer = document.referrer;
let show = false;

domains.every((domain) => {
    if (referrer.includes(domain)) {
        show = true;
        return false;
    }
    return true;
});

Alpine.data("historyBack", () => ({
    show,
    back() {
        history.back(-1);
    },
}));

Alpine.data("hrefBack", () => ({
    show: !show,
}));
