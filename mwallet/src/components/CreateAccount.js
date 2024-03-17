import React from "react";
import { Button, Card } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ethers } from "ethers";

function CreateAccount({ setWallet, setSeedPhrase }) {
  const [newSeedPhrase, setNewSeedPhrase] = useState(null);
  const [copied, setCopied] = useState(false);
  const navigate = useNavigate();

  function generateWallet() {
    const mnemonic = ethers.Wallet.createRandom().mnemonic.phrase;
    setNewSeedPhrase(mnemonic);
  }

  function setWalletAndMnemonic() {
    setSeedPhrase(newSeedPhrase);
    setWallet(ethers.Wallet.fromPhrase(newSeedPhrase).address);
  }
  const copyCodeHandler = (item) => {
    navigator.clipboard
      .writeText(item)
      .then(() => {
        // Text successfully copied
        setCopied(() => true);
        setTimeout(() => {
          setCopied(false);
        }, 2000); // Hide "Copied" message after 2 seconds
      })
      .catch((err) => {
        // Handle any errors while copying
        console.error("Failed to copy: ", err);
      });
  };

  return (
    <>
      <div className="content">
        <div className="mnemonic">
          <ExclamationCircleOutlined style={{ fontSize: "20px" }} />
          <div>
            Once you generate the seed phrase, save it securely in order to
            recover your wallet in the future.
          </div>
        </div>
        <Button
          className="frontPageButton"
          type="primary"
          onClick={() => generateWallet()}
        >
          Generate Seed Phrase
        </Button>
        <Card className="seedPhraseContainer">
          {newSeedPhrase && (
            <>
              <pre style={{ whiteSpace: "pre-wrap" }}>{newSeedPhrase}</pre>
              <button className='fixButton' onClick={() => copyCodeHandler(newSeedPhrase)}>
                {copied ? "copied" : "copy"}
              </button>
            </>
          )}
        </Card>
        <Button
          className="frontPageButton"
          type="default"
          onClick={() => setWalletAndMnemonic()}
          disabled={!copied}
        >
          {copied ? "  Open Your New Wallet" : "Please copy seed phrase"}
        </Button>
        <p className="frontPageBottom" onClick={() => navigate("/")}>
          Back Home
        </p>
      </div>
    </>
  );
}

export default CreateAccount;
