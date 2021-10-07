import "./App.css";
import { useMemo, useState } from "react";
import { getRealPrivateKey } from "./lib";

function App() {
  const [oldKey, setOldKey] = useState("");

  const hexKey = useMemo(() => {
    let prik = `${getRealPrivateKey(oldKey)}`;
    const length = prik.length;
    for (let i = length; i < 64; i++) {
      prik = `0${prik}`;
    }

    return prik;
  }, [oldKey]);

  return (
    <div className="App">
      <p>Nhập private key:</p>
      <textarea
        style={{ minWidth: 400, maxWidth: "90%", minHeight: 100 }}
        value={oldKey}
        onChange={(e) => setOldKey(e.target.value)}
      ></textarea>
      <p>Private key dạng HEX:</p>
      <p>{hexKey}</p>
    </div>
  );
}

export default App;
