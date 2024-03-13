import sass from "./App.module.scss";
import { DocumentsList, File } from "./components";
import { useReduxState } from "./hooks";

function App() {
  const { documents } = useReduxState();

  return (
    <main className={sass.main}>
      <div className={sass.wrapper}>
        <File />
        <DocumentsList list={documents.documents} />
      </div>
    </main>
  );
}

export default App;
