import { extendTheme, type ThemeConfig } from "@chakra-ui/react";
// import "@fontsource-variable/open-sans";
// import "@fontsource-variable/raleway";

const config: ThemeConfig = {
	initialColorMode: "dark",
	useSystemColorMode: false,
};

const theme = extendTheme({
	...config,
});

export default theme;
