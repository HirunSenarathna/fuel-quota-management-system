import React from "react";
import { ConfigProvider, theme } from "antd";
import Router from "./routes/route";

const App: React.FC = () => {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#00b96b",
          borderRadius: 4,
          // You can customize more token variables here
        },
        components: {
          Button: {
            colorPrimary: "#00b96b",
            algorithm: true, // Enable algorithm
          },
          // You can customize other components here
        },
        algorithm: theme.defaultAlgorithm, // or theme.darkAlgorithm for dark mode
      }}
    >
      <Router />
    </ConfigProvider>
  );
};

export default App;
