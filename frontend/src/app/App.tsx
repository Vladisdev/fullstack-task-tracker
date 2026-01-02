import { Router } from "./providers";
import { ReactQueryProvider } from "./providers/reactQueryProvider";

function App() {
    return (
        <ReactQueryProvider>
            <Router />
        </ReactQueryProvider>
    );
}

export default App;
