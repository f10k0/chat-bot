import React, { useState } from 'react';

function App() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Привет! Я чат-бот', isUser: false }
  ]);
  const [inputText, setInputText] = useState('');

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('привет')) return 'Привет!';
    if (msg.includes('как дела')) return 'Нормально!';
    if (msg.includes('react')) return 'React - это круто!';
    return 'Не понял вопроса';
  };

  const handleSend = () => {
    if (!inputText.trim()) return;

    // Сообщение пользователя
    setMessages(prev => [...prev, {
      id: Date.now(),
      text: inputText,
      isUser: true
    }]);

    // Ответ бота
    setTimeout(() => {
      const response = getBotResponse(inputText);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        text: response,
        isUser: false
      }]);
    }, 500);

    setInputText('');
  };

  return (
    <div style={{ maxWidth: 600, margin: '0 auto', padding: 20 }}>
      <h1>🤖 Чат-Бот</h1>
      
      <div style={{ 
        height: 400, 
        border: '1px solid #ccc', 
        padding: 10, 
        overflowY: 'auto',
        marginBottom: 10 
      }}>
        {messages.map(message => (
          <div key={message.id} style={{ 
            textAlign: message.isUser ? 'right' : 'left',
            margin: '10px 0'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 12px',
              borderRadius: 10,
              background: message.isUser ? '#007bff' : '#f1f1f1',
              color: message.isUser ? 'white' : 'black'
            }}>
              {message.text}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', gap: 10 }}>
        <input
          type="text"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
          placeholder="Введите сообщение..."
          style={{ 
            flex: 1, 
            padding: 8,
            border: '1px solid #ccc',
            borderRadius: 4
          }}
        />
        <button 
          onClick={handleSend}
          style={{ 
            padding: '8px 16px',
            background: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: 4,
            cursor: 'pointer'
          }}
        >
          Отправить
        </button>
      </div>
    </div>
  );
}

export default App;