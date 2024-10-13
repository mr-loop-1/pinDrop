export default function Header({ user }) {
  return (
    <div className="flex justify-between">
      <span>PinDrop</span>
      <span>{user?.username}</span>
    </div>
  );
}
