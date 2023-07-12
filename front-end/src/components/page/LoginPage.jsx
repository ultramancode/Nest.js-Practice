import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("/auth/signin", {
        username,
        password,
      });

      // 로그인 성공 시 토큰을 받아옴
      const { accessToken } = response.data;

      // 토큰을 로컬 스토리지에 저장
      localStorage.setItem("accessToken", accessToken);

      // 로그인 성공 메시지 표시
      setSuccessMessage("로그인에 성공했습니다.");

      // 2초 후에 리다이렉트 또는 다른 처리 로직 구현
      setTimeout(() => {
        // 페이지 이동 또는 다른 처리 로직 구현
        // 예시: 홈 페이지로 리다이렉트
        window.location.href = "/home";
      }, 1000);

    } catch (error) {
      setError("로그인에 실패했습니다.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>로그인</h1>
      {error && <p>{error}</p>}
      {successMessage && <p>{successMessage}</p>}
      <form onSubmit={handleLogin}>
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
        <button type="submit">로그인</button>
      </form>
      <Link to="/home">메인 페이지로 이동</Link>
    </div>
  );
}

export default LoginPage;
