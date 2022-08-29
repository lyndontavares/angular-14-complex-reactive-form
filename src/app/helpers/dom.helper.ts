export const getFirstAndLastFocusableElements = (wrapper) => {
    // TODO 7: Fetch the list of focusable elements in the modal and
    // return the first and last elements from the list
    /* const focusableElements =
          `a[href], area[href], input:not([disabled]), select:not([disabled]),
           textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"],
           [contenteditable]`; */

    const focusableElements =
           `area[href], input:not([disabled]), select:not([disabled]),
            textarea:not([disabled]) `;

    const wrapperFocusableElements = wrapper.querySelectorAll(focusableElements);
    const wrapperFocusableElementsList = Array.prototype.slice.call(wrapperFocusableElements);

    return {
      firstFocusableElement: wrapperFocusableElementsList[0],
      lastFocusableElement: wrapperFocusableElementsList[wrapperFocusableElementsList.length - 1],
    };
 };
