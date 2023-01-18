import React from "react";
export let adminContext = createContext();
const AdminProvider = () => {
  const [admin, setAdmin] = useState(false);
  return <div>AdminProvider</div>;
};

export default AdminProvider;
