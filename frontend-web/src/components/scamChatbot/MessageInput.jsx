
export default function MessageInput({ message, setMessage }) {
  return (
    <div className="scam-input">
      <label htmlFor="scam-message">Suspicious message</label>

      <textarea
        id="scam-message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Paste a suspicious SMS, email, or chat message here..."
        rows={7}
        maxLength={5000}
      />

      <span className="character-count">
        {message.length}/5000 characters
      </span>
    </div>
  );
}
