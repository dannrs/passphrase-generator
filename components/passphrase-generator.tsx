"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import RandomDiceSequence from "@/components/random-dice-sequence";
import Dropdown from "@/components/dropdown";
import data1 from "@/data/data1.json";
import data2 from "@/data/data2.json";
import data3 from "@/data/data3.json";
import data4 from "@/data/data4.json";

type DataItem = {
  id: string;
  word: string;
};

type DataMap = {
  [key: string]: DataItem[];
};

export default function PassphraseGenerator() {
  const [result, setResult] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const [selectedData, setSelectedData] = useState("data1.json");
  const textRef = useRef<HTMLSpanElement>(null);

  const dataOptions = [
    { label: "EFF's Long Wordlist", value: "data1.json" },
    { label: "EFF's Short Wordlist #1", value: "data2.json" },
    { label: "EFF's Short Wordlist #2", value: "data3.json" },
    { label: "Diceware Wordlist", value: "data4.json" },
  ];

  const handleGenerateButton = useCallback(() => {
    const dataMap: DataMap = {
      "data1.json": data1,
      "data2.json": data2,
      "data3.json": data3,
      "data4.json": data4,
    };

    if (!selectedData) {
      return;
    }

    const idLengthMap: { [key: string]: number } = {
      "data1.json": 5,
      "data2.json": 4,
      "data3.json": 4,
      "data4.json": 5,
    };

    const idLength = idLengthMap[selectedData];
    const data = dataMap[selectedData];

    if (idLength === undefined || !data) {
      return;
    }

    const output = RandomDiceSequence(idLength);
    const outputArray = output.split(" ");
    let generatedResult = "";

    for (let i = 0; i < outputArray.length - 1; i++) {
      const randomNumber = parseInt(outputArray[i]);
      const match = data.find(
        (item: { id: string; word: string }) =>
          parseInt(item.id) === randomNumber
      );
      if (match) {
        generatedResult += match.word;
        if (i !== outputArray.length - 2) {
          generatedResult += " ";
        }
      }
    }
    setResult(generatedResult);
  }, [selectedData]);

  const handleCopy = () => {
    const textToCopy = textRef.current?.textContent

    if (textToCopy) {
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setIsCopied(true)
          setTimeout(() => setIsCopied(false), 2000)
        })
        .catch(error => {
          console.log('Failed to copy', error)
        })
    }
  }

  const handleDataChange = (selectedOption: string) => {
    setSelectedData(selectedOption);
  };

  useEffect(() => {
    handleGenerateButton();
  }, [handleGenerateButton, selectedData]);

  return (
    <div className="flex h-[calc(100dvh)] items-center justify-center bg-gray-900">
      <div className="w-4/5 rounded bg-gray-800 p-8 text-center shadow-lg">
        <h1 className="mb-4 text-2xl font-semibold text-white sm:text-3xl">
          Passphrase Generator
        </h1>
        <Dropdown options={dataOptions} onSelect={handleDataChange} />
        <span
          ref={textRef}
          className="mt-6 block text-lg text-white sm:text-xl"
        >
          {result}
        </span>
        <button
          className="mt-8 rounded bg-indigo-600 px-4 py-2 font-semibold text-white hover:bg-indigo-700"
          onClick={handleGenerateButton}
        >
          Generate
        </button>
        <button
          className={
            "ml-2 rounded bg-blue-500 px-4 py-2 font-semibold text-white hover:bg-blue-600"
          }
          onClick={handleCopy}
        >
          {isCopied ? "Copied!" : "Copy"}
        </button>
      </div>
    </div>
  );
}
