import { checkForMutationObserver, validateCallback } from './validation';

const mutationObserverUnsupportedMessage = 'This browser does not support MutationObserver';

/**
 * Passthrough implementation of MutationObserver designed to make it easier to
 * use, handling DOM querying, browser compatibility, and other stuff like that
 * for you.
 */
class Darwin {
  /**
   * @param  {Function} options.callback    Callback function to run when
   *                                        mutations occur
   * @param  {Array}    [options.targets]     Selectors of targets to observe
   */
  constructor({
    callback,
    targets = []
  }) {
    this.MutationObserver = checkForMutationObserver();

    if (!this.MutationObserver) {
      console.error(mutationObserverUnsupportedMessage);
      return;
    }

    this.callback = validateCallback(callback);
    this.targets = targets;
  }

  /**
   * Creates a MutationObserver, and observes stored targets.
   *
   * @public
   */
  init() {
    if (!this.MutationObserver) {
      console.error(mutationObserverUnsupportedMessage);
      return;
    }
    this.observer = this.createObserver();
    this.observeTargets();
  }

  /**
   * Disconnects the MutationObserver, nulls it out, and removes the
   * DOMContentLoaded event listener added by evaluateMutations.
   *
   * @public
   */
  destroy() {
    if (!this.MutationObserver) {
      console.error(mutationObserverUnsupportedMessage);
      return;
    }
    this.observer.disconnect();
    this.observer = null;
    document.removeEventListener('DOMContentLoaded', this.reactToMutations);
  }

  /**
   * Creates a new instance of MutationObserver using the correct API, with
   * this.evaluateMutations as the callback.
   *
   * @private
   * @return {MutationObserver}   Created instance of MutationObserver
   */
  createObserver() {
    return new this.MutationObserver((mutations) => {
      this.evaluateMutations(mutations);
    });
  }

  /**
   * Loops through targets and instructs the created observer to observe them.
   *
   * @private
   */
  observeTargets() {
    this.targets.forEach((sel) => {
      Array.from(document.querySelectorAll(sel)).forEach((target) => {
        this.observer.observe(target, {
          childList: true,
          subtree: true,
          attributes: true
        });
      });
    });
  }

  /**
   * MutationObserver callback. Given mutations that are observed, evaluate them
   * to see if they are the right type, and if so, react to them in the proper
   * manner. Has logic to protect against mutations observed before
   * DOMContentLoaded occurs.
   *
   * @private
   * @param  {Array} mutations   An array of MutationRecord objects
   */
  evaluateMutations(mutations) {
    if (!mutations) {
      return;
    }

    if (document.readyState === 'loading') {
      document.addEventListener('DOMContentLoaded', this.reactToMutations);
    } else {
      this.reactToMutations();
    }
  }

  /**
   * Upon mutation, call the callback that's passed in. Batches changes with the
   * setTimeout.
   *
   * @private
   * @method reactToMutations
   */
  reactToMutations() {
    if (this.timer) {
      clearTimeout(this.timer);
    }
    this.timer = setTimeout(this.callback, 150);
  }

}


export default Darwin;