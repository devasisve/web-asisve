/**
 * Donorbox Configuration
 * Centralized configuration to allow easy updates without touching the logic.
 */
export const DONORBOX_CONFIG = {
  // Replace this with the real campaign name/ID when available
  campaignName: "asisve-donaciones", 
  
  // Default styling for the iframe
  defaults: {
    width: "100%",
    height: "900px",
    frameborder: "0",
    name: "donorbox",
    allow: "payment",
    scrolling: "no",
  },
  
  // Widget script URL
  scriptUrl: "https://donorbox.org/widget.js",
  
  // Base embed URL
  baseUrl: "https://donorbox.org/embed/",
  
  // UI Constants
  colors: {
    primary: "#7e2b34",
    skeleton: "#f3f4f6"
  }
};
