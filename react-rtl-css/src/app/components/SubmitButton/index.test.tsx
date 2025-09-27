import SubmitButton from ".";
import * as React from "react";
import '@testing-library/jest-dom';
import { render, screen, waitFor } from "@testing-library/react";
import { useFormStatus } from "react-dom";

jest.mock('react-dom', () => {
    return {
      ...jest.requireActual('react-dom'),
      useFormStatus: jest.fn(),
    };
});

describe("test", () => {
    beforeEach(() => {
        jest.resetAllMocks();
    })

    it("renders as expected when status is not pending", async () => {
        (useFormStatus as jest.Mock).mockImplementation(() => ({
            pending: false,
            data: null,
            method: null,
            action: null,
          }));

        render(<SubmitButton />);

        await waitFor(() => {
            expect(screen.getByText("Save")).toBeInTheDocument();
        });
    });

    it("renders as expected when status is pending", async () => {
        (useFormStatus as jest.Mock).mockImplementation(() => ({
            pending: true,
            data: null,
            method: null,
            action: null,
          }));

        render(<SubmitButton />);
        
        await waitFor(() => {
            expect(screen.getByText("Saving...")).toBeInTheDocument();
        });
    });
})
