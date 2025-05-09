import React from "react";
import { ConfigProvider, theme } from "antd";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/route";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <ConfigProvider
        theme={{
          token: {
            colorPrimary: "#00b96b",
            borderRadius: 4,
          },
          components: {
            Button: {
              colorPrimary: "#00b96b",
              algorithm: true,
            },
          },
          algorithm: theme.defaultAlgorithm,
        }}
      >
        <Router />
      </ConfigProvider>
    </BrowserRouter>
  );
};

export default App;
