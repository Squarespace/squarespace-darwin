/**
 * Checks for the MutationObserver API on the window object. If it's not there
 * (including in prefixed forms), error out. Otherwise, return a reference to it.
 *
 * @return {MutationObserver}   The MutationObserver
 */
export const checkForMutationObserver = () => {
  const MutationObserver =
    window.MutationObserver ||
    window.WebKitMutationObserver ||
    window.MozMutationObserver;

  return MutationObserver;
};

/**
 * Ensures that a given callback is a valid function, erroring out otherwise.
 *
 * @param  {*}  callback    Callback from Darwin constructor
 * @return {Function}       The callback if it's a valid function
 */
export const validateCallback = (callback) => {
  if (typeof callback === 'function') {
    return callback;
  }

  const errorMessage = 'Darwin must receive a callback function' +
    ', or there is nothing to run when mutations occur.';
  throw new Error(errorMessage);
};