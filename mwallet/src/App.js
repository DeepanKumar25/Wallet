import "./App.css";
import { useState } from "react";
import logo from "./moralisLogo.svg";
import { Select } from "antd";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CreateAccount from "./components/CreateAccount";
import RecoverAccount from "./components/RecoverAccount";
import WalletView from "./components/WalletView";
import { BsThreeDotsVertical } from "react-icons/bs";

function App() {
  const [wallet, setWallet] = useState(null);
  const [seedPhrase, setSeedPhrase] = useState(null);
  const [selectedChain, setSelectedChain] = useState("0x1");
  const [drop, setdrop] = useState(false);
  const [show, showKey] = useState(false);
  const [copied, setCopied] = useState(false);
  const privatekey = "nfkdshfkshdk";
  const copyCodeHandler = (item) => {
    navigator.clipboard
      .writeText(item)
      .then(() => {
        // Text successfully copied
        setCopied(() => true);
        setTimeout(() => {
          setCopied(true);
        }, 2000); // Hide "Copied" message after 2 seconds
      })
      .catch((err) => {
        // Handle any errors while copying
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <div className="App">
      <header style={{ position: "relative" }}>
        <img src={logo} className="headerLogo" alt="logo" />
        <Select
          onChange={(val) => setSelectedChain(val)}
          value={selectedChain}
          options={[
            {
              label: "Ethereum",
              value: "0x1",
            },
            {
              label: "Mumbai Testnet",
              value: "0x13881",
            },
            {
              label: "Polygon",
              value: "0x89",
            },
            {
              label: "Avalanche",
              value: "0xa86a",
            },
          ]}
          className="dropdown"
        ></Select>
        {wallet && (
          <BsThreeDotsVertical
            onClick={() => {
              setdrop(!drop);
              showKey(false);
            }}
            className="threedots"
          />
        )}
        {drop && (
          <div className="popup">
            <div
              onClick={() => {
                setdrop(!drop);
                showKey(false);
              }}
              style={{
                position: "absolute",
                top: "0",
                right: "15px",
                cursor: "pointer",
              }}
            >
              X
            </div>
            {show ? (
              <div>
                <p>{privatekey}</p>
                <button
                  type="button"
                  onClick={() => copyCodeHandler(privatekey)}
                >
                  {copied ? "Copied" : "Copy Private key"}
                </button>
              </div>
            ) : (
              <button type="button" onClick={() => showKey(true)}>
                Show Private key
              </button>
            )}
          </div>
        )}
      </header>
      {wallet && seedPhrase ? (
        <Routes>
          <Route
            path="/yourwallet"
            element={
              <WalletView
                wallet={wallet}
                setWallet={setWallet}
                seedPhrase={seedPhrase}
                setSeedPhrase={setSeedPhrase}
                selectedChain={selectedChain}
              />
            }
          />
        </Routes>
      ) : (
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/recover"
            element={
              <RecoverAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            }
          />
          <Route
            path="/yourwallet"
            element={
              <CreateAccount
                setSeedPhrase={setSeedPhrase}
                setWallet={setWallet}
              />
            }
          />
        </Routes>
      )}
    </div>
  );
}

export default App;
