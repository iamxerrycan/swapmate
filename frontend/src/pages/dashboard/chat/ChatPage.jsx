import React, { useState } from 'react';

const dummyMessages = [
  { id: 1, sender: 'Admin', text: 'Hello, how can I help you?' },
  { id: 2, sender: 'User', text: 'I have a query regarding my account.' },
];

const ChatPage = () => {
  const [messages, setMessages] = useState(dummyMessages);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      setMessages([...messages, { id: Date.now(), sender: 'Admin', text: input }]);
      setInput('');
    }
  };

  return (
    <div className="flex flex-col h-full p-4">
      <h2 className="text-xl font-semibold mb-4">Chat Support</h2>
      <div className="flex-1 overflow-y-auto border p-4 rounded mb-4 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className={`mb-2 ${msg.sender === 'Admin' ? 'text-right' : 'text-left'}`}>
            <span className="text-sm bg-gray-100 px-3 py-1 rounded inline-block">
              <strong>{msg.sender}:</strong> {msg.text}
            </span>
          </div>
        ))}
      </div>
      <div className="flex items-center space-x-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 px-3 py-2 border rounded"
          placeholder="Type your message..."
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
