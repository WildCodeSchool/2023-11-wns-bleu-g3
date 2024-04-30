import { render } from "@testing-library/react";
import Button from "@/components/Button"

describe("Button component", () => {
  it("renders correctly", () => {
    const view = render(
      <Button title="test"/>
    );

    expect(view.baseElement).toMatchSnapshot();
  });
});