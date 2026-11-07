function QuickAction({ icon: Icon, title, description, onClick }) {
  return (
    <button
      type="button"
      className="quick-action"
      onClick={onClick}
    >
      <span className="quick-action-icon">
        <Icon size={23} strokeWidth={1.8} />
      </span>

      <span className="quick-action-text">
        <strong>{title}</strong>
        <small>{description}</small>
      </span>
    </button>
  );
}

export default QuickAction;