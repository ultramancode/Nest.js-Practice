import React, { useState } from "react";
import axios from "axios";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/auth/signup", {
        username,
        password,
      });

      console.log("회원가입 성공:", response.data);
      setModalMessage("회원가입이 성공적으로 완료되었습니다.");
      setShowModal(true);
      // 로그인 페이지로 이동
      navigate("/auth/signin")
      // 추가적인 리다이렉트나 처리 로직을 구현할 수 있습니다.

    } catch (error) {
      setError("회원가입에 실패했습니다.");
      if (error.response && error.response.data && error.response.data.message) {
        setModalMessage(error.response.data.message);
      } else {
        setModalMessage("알 수 없는 오류가 발생했습니다.");
      }
      setShowModal(true);
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div>
      <h1>회원가입</h1>
      {error && <p>{error}</p>}
      <form onSubmit={handleSignup}>
        <div>
          <label>사용자명:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>비밀번호:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit">회원가입</button>
      </form>
      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <h2>회원가입 결과</h2>
            <p>{modalMessage}</p>
            <button onClick={closeModal}>확인</button>
          </div>
        </div>
      )}
      <Link to="/home">메인 페이지로 이동</Link>
    </div>
  );
}

export default Signup;
