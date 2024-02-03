// pages/index.tsx

import React, { useState, FormEvent } from 'react';

function HomePage() {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // API ルートに POST リクエストを送信
    const response = await fetch('/api/createItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    
    if (response.ok) {
      const data = await response.json();
      console.log('Item created:', data);
      setName('');
      setDescription('');
    } else {
      // エラーレスポンスの場合、JSONではない可能性があるので、
      // テキストとしてレスポンスを読み取ることを検討してください
      const errorText = await response.text();
      console.error('Error creating item', errorText);
    }
  }  

  return (
    <div className="max-w-lg mx-auto p-4 border border-gray-300 bg-white rounded-md shadow-sm">
      <h1 className="text-xl font-bold mb-6">Create Item</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <input
          type="text"
          name="name"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
          required
        />
        <textarea
          name="description"
          className="w-full mb-4 px-3 py-2 border border-gray-300 rounded-md shadow-sm"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          required
        />
        <button
          type="submit"
          className="w-full px-3 py-2 bg-blue-600 text-white font-bold rounded-md shadow-sm hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default HomePage;
