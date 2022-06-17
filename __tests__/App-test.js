/**
 * @format
 */

import "react-native";
import React from "react";
import App from "../App";
import { NavigationContainer } from "@react-navigation/native";
import { render } from "@testing-library/react-native";
import { DispatchContext, StateContext } from "../src/store";

// Use this instead with React Native >= 0.64
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

describe("Testing react navigation", () => {
  test("page contains list of characters", async () => {
    const component = (
      <DispatchContext.Provider>
        <StateContext.Provider>
          <NavigationContainer>
            <App />
          </NavigationContainer>
        </StateContext.Provider>
      </DispatchContext.Provider>
    );

    const { findByText, findAllByText } = render(component);

    const header = await findByText(/Select season/);
    const items = await findAllByText(/Item number/);

    expect(header).toBeTruthy();
    expect(items.length).toBe(10);
  });
});
