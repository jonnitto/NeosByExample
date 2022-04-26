import Alpine from "./Presentation/Universal";
import "./Presentation/Atom/Counter";
import "./Presentation/Section/Header";
import lazySizes from "lazysizes";
import "lazysizes/plugins/bgset/ls.bgset";
import "lazysizes/plugins/parent-fit/ls.parent-fit";
import "lazysizes/plugins/aspectratio/ls.aspectratio";
import "lazysizes/plugins/native-loading/ls.native-loading";

lazySizes.cfg.nativeLoading = {
    disableListeners: {
        focus: true,
        mouseover: true,
        click: true,
        transitionend: true,
        animationend: true,
        scroll: true,
    },
};

Alpine.start();
