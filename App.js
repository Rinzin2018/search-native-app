/**
 * App navigation and context provider
 */

import type { Node } from "react";
import React, { useReducer } from "react";
import { LogBox, StatusBar, useColorScheme } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { CustomDarkTheme, LightTheme } from "./Theme";
import { DispatchContext, StateContext } from "./src/store";
import useCombinedReducers from "use-combined-reducers";
import { loaderReducer, loaderStateReducer, loaderValue } from "./src/reducers";
import { ApiUtils } from "./src/utils/ApiUtils";
import Loader from "./src/common/Loader/Loader";
import CharacterList from "./src/screen/CharacterList";

const App: () => Node = () => {
  LogBox.ignoreLogs(["Animated: `useNativeDriver` was not specified."]);
  const isDarkMode = useColorScheme() === "dark";
  const Stack = createNativeStackNavigator();
  const [state, dispatch] = useCombinedReducers({
    loader: useReducer(loaderReducer, loaderValue),
    loaderState: useReducer(loaderStateReducer, true),
  });

  ApiUtils.dispatch = dispatch;
  ApiUtils.state = state;

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        <SafeAreaProvider>
          <StatusBar animated={true} backgroundColor="#101727" />
          <Loader />
          <NavigationContainer
            theme={isDarkMode ? CustomDarkTheme : LightTheme}>
            <Stack.Navigator
              screenOptions={{ headerShown: false }}
              initialRouteName="Characters">
              <Stack.Group screenOptions={{ headerShown: false }}>
                <Stack.Screen
                  name="Characters"
                  component={CharacterList}
                  options={{ headerShown: false }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </SafeAreaProvider>
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export default App;
