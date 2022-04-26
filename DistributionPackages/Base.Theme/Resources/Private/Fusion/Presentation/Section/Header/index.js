import Alpine from "alpinejs";

let current = 0;
const fetchedUrls = {};
const HTML = document.documentElement;
const setFullHeight = () => HTML.style.setProperty("--full-height", `${window.innerHeight}px`);

HTML.style.setProperty("--header-height", "84px");
setFullHeight();

Alpine.data("header", () => ({
    mobileMenuOpen: false,
    dropdown: false,
    atTop: true,
    height: 0,
    onScroll() {
        const offset = window.pageYOffset;
        this.atTop = offset < 150 || current > offset;
        current = offset;
        if (!this.height) {
            this.height = this.$refs.header.offsetHeight;
            HTML.style.setProperty("--header-height", `${this.height}px`);
        }
        if (!this.atTop) {
            this.mobileMenuOpen = false;
            this.dropdown = false;
        }
    },
    header: {
        "@resize.window.passive.throttle"() {
            this.mobileMenuOpen = false;
            this.dropdown = false;
            setFullHeight();
        },
        "@resize.window.passive.debounce"() {
            setFullHeight();
        },
        "@scroll.window.passive.throttle"() {
            this.onScroll();
        },
        "@scroll.window.passive.debounce"() {
            this.onScroll();
        },
        ":class"() {
            return this.atTop || "-translate-y-full";
        },
        "@keydown.window.escape"() {
            this.mobileMenuOpen = false;
            this.dropdown = false;
        },
        "x-trap.noscroll.inert"() {
            return this.mobileMenuOpen;
        },
        "@click.outside"() {
            this.mobileMenuOpen = false;
        },
    },
    dropdownButton: (url) => ({
        ":role"() {
            return "button";
        },
        "@click.prevent"() {
            this.dropdown = this.dropdown == url ? false : url;
        },
        ":class"() {
            return this.dropdown == url && "opacity-100";
        },
    }),
    dropdownFetch: (url) => ({
        "x-show"() {
            const visible = this.dropdown == url;
            if (visible && !fetchedUrls[url]) {
                fetch(url + ".ajax?limit=3")
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error("Network response was not ok");
                        }
                        return response.text();
                    })
                    .then((html) => {
                        if (html) {
                            fetchedUrls[url] = true;
                            this.$el.firstElementChild.innerHTML = html;
                        } else {
                            window.location.href = url;
                        }
                    })
                    .catch(() => {
                        window.location.href = url;
                    });
            }
            return visible;
        },
        "x-trap.inert"() {
            return this.dropdown == url;
        },
        "@click.outside"() {
            if (this.dropdown == url) {
                this.dropdown = false;
            }
        },
    }),
    dropdownElement: (url) => ({
        "x-show"() {
            return this.dropdown == url;
        },
        "x-trap.inert"() {
            return this.dropdown == url;
        },
        "@click.outside"() {
            if (this.dropdown == url) {
                this.dropdown = false;
            }
        },
    }),
}));
