import React from "react";
import { act, renderHook } from "@testing-library/react-hooks";
import {render, waitFor} from '@testing-library/react-native';
import Screen1 from "../src/screen/Screen1";

describe("Render default screen", () => {
  it("Check screen with text matching ", () => {
    const { getAllByText } = render(<Screen1 />);
    getAllByText("Select season");
  });
});
