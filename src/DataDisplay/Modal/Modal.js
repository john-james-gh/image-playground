import { useRef, useLayoutEffect } from "react";
import { createPortal } from "react-dom";

import * as S from "./styles";

const Modal = (props) => {
  const { children, onClose } = props;

  const modal = useRef(null);

  const restoreFocus = useRef(null);

  const container = document.createElement("div");

  container.style.position = "relative";
  /** portaled content should get their own stacking context so they don't interfere */
  /** with each other in unexpected ways. one should never find themselves tempted */
  /** to change the zIndex to a value other than "1" */
  container.style.zIndex = "1";

  const containerRef = useRef(container);

  /** rule of thumb is to use `useLayoutEffect` if the effect needs to be synchronous and also */
  /** if there are any direct mutations to the DOM */
  /** since we’re directly mutating the DOM and want the effect to run synchronously before */
  /** the DOM is repainted, we use `useLayoutEffect` instead of `useEffect` here */
  useLayoutEffect(() => {
    const node = containerRef.current;

    document.body.appendChild(node);

    /** since we're directly mutating the DOM, we should remove any existing elements during the cleanup process */
    return () => {
      document.body.removeChild(node);
    };
  }, []);

  /** get all natively focusable elements within the modal and convert them to an array of strings */
  /** however since in this app, there is only a use case for `button`, we grab only `button` */
  const getFocusableElements = (modal) =>
    Array.from(
      modal.querySelectorAll(
        [
          "a[href]:not([tabindex='-1'])",
          "area[href]:not([tabindex='-1'])",
          "button:not([tabindex='-1'])",
          "input:not([tabindex='-1'])",
          "select:not([tabindex='-1'])",
          "textarea:not([tabindex='-1'])",
        ].join(",")
      )
    );

  const setFocus = (elements, forward = true) => {
    const currentIndex = elements.findIndex(
      (element) => element === document.activeElement
    );

    let nextIndex = 0;

    if (forward) {
      /** when tab is pressed, we check if the currently focused element is the last */
      /** if no, increase `currentIndex` by 1, which focuses the next element */
      /** if yes, focus the first element */
      nextIndex = currentIndex < elements.length - 1 ? currentIndex + 1 : 0;
    } else {
      /** when shift + tab is pressed, check if currently focused element is the first */
      /** if no, decrease `currentIndex` by 1, which focuses the previous element */
      /** if yes, focus the last element */
      nextIndex = currentIndex > 0 ? currentIndex - 1 : elements.length - 1;
    }

    elements[nextIndex].focus();
  };

  useLayoutEffect(() => {
    const onKeyDown = (event) => {
      switch (event.key) {
        case "Escape":
          onClose();
          break;

        case "Tab":
          /** prevents `Tab` default behavior that would otherwise ignore the focus trap */
          event.preventDefault();

          /** event.shiftKey will be true if shift + tab is pressed */
          if (modal.current) {
            /** first get all focusable elements */
            const focusableElements = getFocusableElements(modal.current);

            /** then use them to set next focus */
            setFocus(focusableElements, !event.shiftKey);
          }
          break;

        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose]);

  useLayoutEffect(() => {
    /** prevent content behind the modal from scrolling */
    document.body.style.overflow = "hidden";
    /** makes the root element hidden from assistive technology while the modal is opened */
    document.getElementById("root")?.setAttribute("aria-hidden", "true");

    /** just before a focusable element within the modal is focused, we store a reference to the */
    /** element that was focused just before the modal opened. that way we can restore the focus */
    /** to that element when the modal closes */
    restoreFocus.current = document.activeElement;

    /** focus a focusable element when the modal opens */
    if (modal.current) {
      const focusableElements = getFocusableElements(modal.current);
      setFocus(focusableElements);
    }

    return () => {
      /** resets to the its inherited or initial value */
      document.body.style.overflow = "unset";

      document.getElementById("root").removeAttribute("aria-hidden");

      /** restore focus to the element that was focused just before the modal opened */
      restoreFocus.current.focus();
    };
  }, []);

  return (
    <>
      {createPortal(
        <S.ModalContainer
          role="dialog"
          aria-labelledby="title"
          aria-describedby="description"
          aria-modal="true"
          aria-hidden="false"
          ref={modal}
        >
          <S.ModalBody>
            <S.IconCloseButton
              type="button"
              onClick={onClose}
              aria-label="Close modal"
            >
              X
            </S.IconCloseButton>

            {children}
          </S.ModalBody>
        </S.ModalContainer>,
        containerRef.current
      )}
    </>
  );
};

export default Modal;
