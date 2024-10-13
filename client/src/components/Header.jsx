export default function Header({ user }) {
  return (
    <div className="flex justify-between">
      <span>Pinata Hack</span>
      <span>{user.username}</span>
    </div>
  );
}
