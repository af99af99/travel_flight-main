// Function to toggle overlay visibility
export const toggleOverlay = (setOverlayVisible, setActive) => {
    setOverlayVisible((prevState) => !prevState);
    setActive((prevState) => !prevState);
};

export const handleClickOutside = (event, overlayRef, buttonRef, setOverlayVisible, setActive) => {
    // Check if the clicked target is outside the overlay and button
    if (
        overlayRef.current &&
        !overlayRef.current.contains(event.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target)
    ) {
        setOverlayVisible(false);
        setActive(false);
    }
};
