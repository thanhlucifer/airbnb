import { useState, useEffect } from 'react';


function useResponsive(breakpoints) {
    const [isResponsive, setIsResponsive] = useState({});

    useEffect(() => {
        const handleResize = () => {
            const newIsResponsive = {};
            for (const key in breakpoints) {
                if (Object.hasOwnProperty.call(breakpoints, key)) {
                    newIsResponsive[key] = window.innerWidth <= breakpoints[key];
                }
            }
            setIsResponsive(newIsResponsive);
        };

        handleResize(); 
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    return isResponsive;
}

export default useResponsive;