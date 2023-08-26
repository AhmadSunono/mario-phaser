import { Suspense, lazy } from "react";
import "./App.css";

const PhaserWrapperLazy = lazy(() => import("./PhaserWrapper"));

function App() {
  return (
    <div className="App">
      <Suspense fallback={() => <div>Loading...</div>}>
        <PhaserWrapperLazy />
      </Suspense>
    </div>
  );
}

export default App;
