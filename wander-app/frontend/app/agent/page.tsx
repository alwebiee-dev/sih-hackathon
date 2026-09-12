"use client";

import { useState } from "react";
import { Bot, Send, User } from "lucide-react";

type Message = {
  id: number;
  role: "user" | "assistant";
  content: string;
};

const API_URL = "http://localhost:8000";

const AgentPage = () => {
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      role: "assistant",
      content: "Hi! I'm Maya 👋 How can I help you today?",
    },
  ]);

  const handleSend = async () => {
    const trimmedMessage = message.trim();

    if (!trimmedMessage || isLoading) return;

    // Add user's message immediately
    const userMessage: Message = {
      id: Date.now(),
      role: "user",
      content: trimmedMessage,
    };

    setMessages((prev) => [...prev, userMessage]);
    setMessage("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/ask/agent`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: trimmedMessage,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to get response from Maya");
      }

      const data = await response.json();

      // Add Maya's response
      const assistantMessage: Message = {
        id: Date.now() + 1,
        role: "assistant",
        content: data.response,
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error(error);

      setMessages((prev) => [
        ...prev,
        {
          id: Date.now() + 1,
          role: "assistant",
          content:
            "Sorry, I couldn't connect to the server. Please try again.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center gap-3 border-b px-6 py-4">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Bot className="h-5 w-5" />
        </div>

        <div>
          <h1 className="font-semibold">Maya</h1>
          <p className="text-sm text-muted-foreground">
            AI Assistant
          </p>
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span
            className={`h-2 w-2 rounded-full ${
              isLoading ? "bg-yellow-500" : "bg-green-500"
            }`}
          />

          <span className="text-sm text-muted-foreground">
            {isLoading ? "Thinking..." : "Online"}
          </span>
        </div>
      </header>

      {/* Chat */}
      <main className="flex-1 overflow-y-auto">
        <div className="mx-auto flex max-w-3xl flex-col gap-6 px-4 py-8">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex gap-3 ${
                msg.role === "user"
                  ? "justify-end"
                  : "justify-start"
              }`}
            >
              {/* Maya Avatar */}
              {msg.role === "assistant" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  <Bot className="h-4 w-4" />
                </div>
              )}

              {/* Message */}
              <div
                className={`max-w-[75%] rounded-2xl px-4 py-3 text-sm ${
                  msg.role === "user"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted"
                }`}
              >
                {msg.content}
              </div>

              {/* User Avatar */}
              {msg.role === "user" && (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-background">
                  <User className="h-4 w-4" />
                </div>
              )}
            </div>
          ))}

          {/* Loading indicator */}
          {isLoading && (
            <div className="flex gap-3">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                <Bot className="h-4 w-4" />
              </div>

              <div className="rounded-2xl bg-muted px-4 py-3">
                <div className="flex gap-1">
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:150ms]" />
                  <span className="h-2 w-2 animate-bounce rounded-full bg-muted-foreground [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Input */}
      <footer className="border-t bg-background p-4">
        <div className="mx-auto flex max-w-3xl items-center gap-2 rounded-xl border bg-muted/30 p-2 shadow-sm">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSend();
              }
            }}
            placeholder="Message Maya..."
            disabled={isLoading}
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground disabled:opacity-50"
          />

          <button
            onClick={handleSend}
            disabled={!message.trim() || isLoading}
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Send className="h-4 w-4" />
          </button>
        </div>

        <p className="mt-2 text-center text-xs text-muted-foreground">
          Maya can make mistakes. Check important information.
        </p>
      </footer>
    </div>
  );
};

export default AgentPage;