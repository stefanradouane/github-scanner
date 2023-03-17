/**
 * Search an element after its created by React.
 * Function to prevent undefined elements
 * @param {String} element element string
 * @param {boolean} all boolean all elements or not
 */

export default function getElement(element, all) {
  if (all) {
    return document.querySelectorAll(element);
  }
  return document.querySelector(element);
}
