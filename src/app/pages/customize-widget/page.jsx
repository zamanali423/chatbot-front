"use client";
import { useState } from "react";
import {
  Plus,
  Trash2,
  X,
  ChevronLeft,
  Menu,
  Send,
  MessageCircle,
} from "lucide-react";
import Sidebar from "@/components/Sidebar";
import CopyBoxPage from "../components/CopyBoxPage";

export default function CustomizeWidget() {
  const [messages, setMessages] = useState(["I have a question"]);
  const [welcomeMsg, setWelcomeMsg] = useState("👋 Hi! How can we help?");
  const [newMsg, setNewMsg] = useState("");
  const [selectedColor, setSelectedColor] = useState("#2563eb");
  const [isCopyBoxShow, setIsCopyBoxShow] = useState(false);

  const addMessage = () => {
    if (newMsg.trim() !== "") {
      setMessages([...messages, newMsg]);
      setNewMsg("");
    }
  };

  const removeMessage = (index) => {
    const updated = [...messages];
    updated.splice(index, 1);
    setMessages(updated);
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* LEFT SIDE */}
      <Sidebar height="100vh" />

      {isCopyBoxShow ? (
        <CopyBoxPage />
      ) : (
        <div className="flex-1 p-10">
          <h2 className="text-xl font-semibold mb-2">
            Customize the widget to suit your brand
          </h2>
          <p className="text-gray-500 text-sm mb-6">
            (you can change this later)
          </p>

          <div className="grid grid-cols-2 gap-10">
            {/* Controls */}
            <div>
              {/* Logo */}
              <div className="mb-6">
                <div className="mt-2 relative w-32 h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                  <span className="text-gray-400 text-sm">Upload Logo</span>
                  <button
                    type="button"
                    className="absolute top-1 right-1 w-6 h-6 flex items-center justify-center bg-green-500 text-white rounded-full shadow hover:bg-green-600"
                  >
                    +
                  </button>
                  <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                </div>
              </div>

              {/* Colors */}
              <div className="mb-6">
                <label className="font-bold">Color</label>
                <div className="flex items-center gap-3 mt-2">
                  {["#2563eb", "#dc2626", "#16a34a", "#9333ea", "#364359"].map(
                    (c) => (
                      <button
                        key={c}
                        className={`w-8 h-8 rounded cursor-pointer border ${
                          selectedColor === c
                            ? "ring-2 ring-offset-1 ring-blue-500"
                            : ""
                        }`}
                        style={{ background: c }}
                        onClick={() => setSelectedColor(c)}
                      ></button>
                    )
                  )}
                  <div className="border-1 border-gray-400 rounded-lg flex items-center bg-gray-300">
                    <div
                      className="relative w-10 h-10 border-2 border-gray-300 rounded-lg overflow-hidden"
                      style={{ background: selectedColor }}
                    >
                      <input
                        type="color"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                    </div>
                    <span className="text-sm font-mono text-gray-700 px-2">
                      {selectedColor}
                    </span>
                  </div>
                </div>
              </div>

              {/* Welcome Message */}
              <div className="mb-6">
                <label className="font-bold">Welcome Message</label>
                <input
                  type="text"
                  value={welcomeMsg}
                  onChange={(e) => setWelcomeMsg(e.target.value)}
                  className="mt-2 w-full border rounded-lg px-3 py-2 text-sm border-gray-400"
                />
              </div>

              {/* Suggested Messages */}
              <div className="mb-6">
                <label className="font-bold">Suggested message</label>
                <div className="mt-2 space-y-2">
                  {messages.map((msg, i) => (
                    <div
                      key={i}
                      className="flex items-center gap-2 border border-gray-400 px-2 py-1 rounded-lg"
                    >
                      <input
                        type="text"
                        value={msg}
                        onChange={(e) => {
                          const updated = [...messages];
                          updated[i] = e.target.value;
                          setMessages(updated);
                        }}
                        className="flex-1 bg-transparent text-sm outline-none py-1"
                      />
                      <Trash2
                        className="w-4 h-4 text-red-500 cursor-pointer"
                        onClick={() => removeMessage(i)}
                      />
                    </div>
                  ))}
                </div>
                {messages.length >= 2 ? null : (
                  <div className="flex gap-2 mt-3">
                    <input
                      type="text"
                      value={newMsg}
                      onChange={(e) => setNewMsg(e.target.value)}
                      className="flex-1 border rounded-lg px-3 py-2 text-sm border-gray-400"
                      placeholder="New message"
                    />
                    <button
                      onClick={addMessage}
                      className="px-3 py-1 bg-green-500 text-white rounded-lg text-sm flex items-center gap-1"
                    >
                      <Plus className="w-4 h-4" /> Add
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Chat Preview */}
            <div>
              <div className="border border-gray-400 rounded-lg shadow bg-white flex flex-col h-[450px]">
                {/* Header */}
                <div
                  className="flex justify-between items-center border-b border-gray-400 rounded-t-lg pb-2 mb-2 px-2"
                  style={{ backgroundColor: selectedColor }}
                >
                  <button className="p-2 rounded-full">
                    <ChevronLeft
                      className="w-6 h-6"
                      style={{
                        color: selectedColor === "#ffffff" ? "black" : "white",
                      }}
                    />
                  </button>
                  <div className="flex items-center">
                    <button className="p-2 rounded-full">
                      <Menu
                        className="w-6 h-6"
                        style={{
                          color:
                            selectedColor === "#ffffff" ? "black" : "white",
                        }}
                      />
                    </button>
                    <button className="p-2 rounded-full">
                      <X
                        className="w-6 h-6"
                        style={{
                          color:
                            selectedColor === "#ffffff" ? "black" : "white",
                        }}
                      />
                    </button>
                  </div>
                </div>

                {/* Messages Area */}
                <div className="flex-1 space-y-3 overflow-y-auto px-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-300"></div>
                    <div
                      className="px-3 py-2 rounded-lg text-sm"
                      style={{
                        backgroundColor: selectedColor,
                        color: selectedColor === "#ffffff" ? "black" : "white",
                      }}
                    >
                      {welcomeMsg}
                    </div>
                  </div>
                  {messages.map((msg, i) => (
                    <button
                      key={i}
                      className="block border rounded-lg px-3 py-1 text-sm text-left w-fit hover:bg-gray-50"
                    >
                      {msg}
                    </button>
                  ))}
                </div>

                {/* Input Bar */}
                <div className="border-t border-gray-400 p-3 flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Type your message..."
                    className="flex-1 px-3 py-2 text-sm focus:outline-none"
                  />
                  <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg shadow">
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="flex justify-end mt-3">
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: selectedColor }}
                >
                  <MessageCircle className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <button
              className="bg-green-600 text-white px-6 py-2 rounded-lg cursor-pointer"
              onClick={() => setIsCopyBoxShow(true)}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
