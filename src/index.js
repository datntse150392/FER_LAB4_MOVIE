import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import GlobalStyle from "./components/GlobalStyle";
import ThemeProviderUI from "./Theme/ThemeProvider";
import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://8b4c906efb43406c9b8cd0bba0da70cb@o4505494452436992.ingest.sentry.io/4505494457483264",
  integrations: [
    new Sentry.BrowserTracing({
      // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
      tracePropagationTargets: [
        "localhost",
        "https://nha-trang-booking-test.sentry.io/projects/film_react_test/?project=4505494457483264&statsPeriod=14d",
      ],
    }),
    new Sentry.Replay(),
  ],
  // Performance Monitoring
  tracesSampleRate: 1.0, // Capture 100% of the transactions, reduce in production!
  // Session Replay
  replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
  replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <GlobalStyle>
      <ThemeProviderUI>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </ThemeProviderUI>
    </GlobalStyle>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
