// Animation features for LazyMotion, loaded after hydration so they stay out of the
// initial bundle. domMax (not domAnimation) because the tab indicators use layoutId.
export { domMax as default } from "framer-motion";
