// Modal.test.tsx
import React from "react";
import { render, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Modal from "./Modal";

describe("Modal Component", () => {
  test("does not render when isOpen is false", () => {
    const { container } = render(
      <Modal isOpen={false} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    // When the modal is closed, nothing should be rendered.
    expect(container.firstChild).toBeNull();
  });

  test("renders modal when isOpen is true", () => {
    const { getByText, container } = render(
      <Modal isOpen={true} onClose={jest.fn()}>
        <div>Modal Content</div>
      </Modal>
    );
    // The modal content should be visible.
    expect(getByText("Modal Content")).toBeInTheDocument();
    // The backdrop should also be rendered.
    expect(container.firstChild).toBeInTheDocument();
  });

  test("calls onClose when backdrop is clicked", () => {
    const onClose = jest.fn();
    const { container } = render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    // The backdrop is the outermost div.
    const backdrop = container.firstChild;
    if (backdrop) {
      // Simulate a click on the backdrop.
      fireEvent.click(backdrop);
    }
    expect(onClose).toHaveBeenCalledTimes(1);
  });

  test("does not call onClose when clicking inside the modal", () => {
    const onClose = jest.fn();
    const { getByText } = render(
      <Modal isOpen={true} onClose={onClose}>
        <div>Modal Content</div>
      </Modal>
    );
    // Get the inner modal content.
    const modalContent = getByText("Modal Content");
    // Simulate a click on the modal content.
    fireEvent.click(modalContent);
    // onClose should not be called since the click was not on the backdrop.
    expect(onClose).not.toHaveBeenCalled();
  });
});
