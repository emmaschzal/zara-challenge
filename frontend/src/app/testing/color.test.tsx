import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import ColorOptions from "../components/ColorOptions";


describe("ColorOptions", () => {
  const mockColors = [
    { name: "Red", hexCode: "#FF0000" },
    { name: "Blue", hexCode: "#0000FF" },
  ];

  test("renders label and selected color", () => {
    render(
      <ColorOptions
        colors={mockColors}
        selectedColor="Red"
        onSelectColor={() => {}}
      />
    );

    expect(screen.getByText("COLOR. Pick your favourite")).toBeInTheDocument();
    expect(screen.getByText("Red")).toBeInTheDocument();
  });

  test("calls onSelectColor when a swatch is clicked", () => {
    const mockSelect = jest.fn();

    render(
      <ColorOptions
        colors={mockColors}
        selectedColor=""
        onSelectColor={mockSelect}
      />
    );

    const swatches = screen.getAllByTestId("color-swatch");
    fireEvent.click(swatches[1]);

    expect(mockSelect).toHaveBeenCalledWith("Blue");
  });
});
