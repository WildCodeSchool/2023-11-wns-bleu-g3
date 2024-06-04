import { render } from "@testing-library/react";
import Footer from "@/components/footer"

describe("Footer component", () => {
  it("renders correctly", () => {
    const view = render(
      <Footer/>
    );

    expect(view.baseElement).toMatchSnapshot();
  });
});