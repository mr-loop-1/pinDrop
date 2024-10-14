import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  const logout = async () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <div className="flex justify-between">
      <span>PinDrop</span>
      <span
        className="hover:underline cursor-pointer hover:text-red-500"
        onClick={logout}
      >
        logout
      </span>
    </div>
  );
}
