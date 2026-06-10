import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "./page";

describe("Home Page", () => {
    test("renders without crashing", () => {
        render(<Home />);
        expect(
            screen.getByText("JVM Options Configuration Tool")
        ).toBeInTheDocument();
    });

    test("renders the summary textarea", () => {
        render(<Home />);
        expect(
            screen.getByPlaceholderText("JVM Options Summary")
        ).toBeInTheDocument();
    });
});
