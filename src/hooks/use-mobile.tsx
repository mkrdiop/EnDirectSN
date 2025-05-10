
import * as React from "react"

const MOBILE_BREAKPOINT = 768

export function useIsMobile() {
  // Default to a consistent value for SSR and initial client render (e.g., false for desktop-first)
  const [isMobile, setIsMobile] = React.useState<boolean>(false);
  // Track if the component has mounted to switch to client-side determined value
  const [hasMounted, setHasMounted] = React.useState(false);

  React.useEffect(() => {
    // Set hasMounted to true once the component is mounted on the client
    setHasMounted(true);

    const mql = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT - 1}px)`);
    
    // Handler to update isMobile state based on media query changes
    const onChange = () => {
      setIsMobile(mql.matches);
    };
    
    // Set the initial client-side value
    setIsMobile(mql.matches);
    
    // Add event listener for changes in media query
    mql.addEventListener("change", onChange);
    
    // Cleanup function to remove event listener
    return () => mql.removeEventListener("change", onChange);
  }, []); // Empty dependency array ensures this effect runs only once on mount

  // During SSR or before the component has mounted on the client, return the default value
  if (!hasMounted) {
    return false; // Or another appropriate default that matches server rendering
  }

  // After mounting, return the actual client-side determined value
  return isMobile;
}

