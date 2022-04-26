import Alpine from "alpinejs";

Alpine.data("fetch", (urls) => ({
    init() {
        const element = this.$el;
        const target = this.$refs.target || element;
        if (!Array.isArray(urls)) {
            urls = urls.split(" ");
        }
        if (urls.length === 0) {
            element.remove();
        }
        const promises = urls.map((url) =>
            fetch(url).then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.text();
            })
        );
        Promise.all(promises).then((results) => {
            const html = results.join("");
            if (html) {
                target.innerHTML = html;
            } else {
                element.remove();
            }
        });
    },
}));
