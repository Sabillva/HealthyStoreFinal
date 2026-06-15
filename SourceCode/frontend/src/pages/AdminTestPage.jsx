import { useState } from "react";
import { getToken } from "../services/authService";
import api from "../services/api";

function AdminTestPage() {

  const [result, setResult] = useState("");

  const testAdmin = async () => {

    try {

      const token = await getToken();

      const response = await api.get(
        "/api/admin/test",
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
        
      );
      console.log(response.data);

      setResult(response.data);

    } catch (error) {

      console.log(error);

  console.log(error.response);

  console.log(error.response?.data);

  setResult("Request failed");
    }
  };

  return (
    <div>

      <h2>Admin Test</h2>

      <button onClick={testAdmin}>
        Test Admin Endpoint
      </button>

      <h3>{result}</h3>

    </div>
  );
}

export default AdminTestPage;