const defaultTheme = require("tailwindcss/defaultTheme");
const content = require("./Build/Carbon.Pipeline/purge");
const plugin = require("tailwindcss/plugin");

module.exports = {
    content,
    theme: {
        extend: {
            minHeight: defaultTheme.spacing,
            colors: {
                neos: {
                    light: "#00ADEE",
                    dark: "#26224C",
                },
            },
        },
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/typography"),
        require("@tailwindcss/aspect-ratio"),
        require("@tailwindcss/line-clamp"),
        plugin(function ({ addVariant }) {
            addVariant("hocus", ["&:hover", "&:focus"]);
            addVariant("group-hocus", [".group:hover &", ".group:focus &"]);
            addVariant("supports-backdrop-blur", "@supports (backdrop-filter: blur(5px))");
        }),
    ],
};
