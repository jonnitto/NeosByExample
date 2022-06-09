const defaultTheme = require("tailwindcss/defaultTheme");
const content = require("./Build/Carbon.Pipeline/purge");
const plugin = require("tailwindcss/plugin");

/** @type {import('tailwindcss').Config} */
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
            addVariant("hocus-within", ["&:hover", "&:focus-within"]);
            addVariant("group-hocus", [".group:hover &", ".group:focus &"]);
            addVariant("group-hocus-within", [".group:hover &", ".group:focus-within &"]);
            addVariant(
                "supports-backdrop-blur",
                "@supports (backdrop-filter: blur(0)) or (-webkit-backdrop-filter: blur(0))"
            );
            addVariant("supports-scrollbars", "@supports selector(::-webkit-scrollbar)");
            addVariant("children", "& > *");
            addVariant("scrollbar", "&::-webkit-scrollbar");
            addVariant("scrollbar-track", "&::-webkit-scrollbar-track");
            addVariant("scrollbar-thumb", "&::-webkit-scrollbar-thumb");
        }),
    ],
};
