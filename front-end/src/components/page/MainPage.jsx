import { useEffect, useState } from "react";
import jwt_decode from "jwt-decode";
import { Link, useNavigate } from "react-router-dom";

function MainPage() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // 로컬 스토리지에서 토큰 가져오기
    const token = localStorage.getItem("accessToken");
    if (token) {
      try {
        // 토큰 디코딩
        const decodedToken = jwt_decode(token);

        // 토큰 만료 여부 확인
        const isExpired = Date.now() >= decodedToken.exp * 1000;
        setIsLoggedIn(!isExpired);
      } catch (error) {
        setIsLoggedIn(false);
        console.error("토큰 디코딩 오류:", error);
      }
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  const handleLogout = () => {
    // 로그아웃 처리 로직
    // 토큰 제거 등 필요한 작업 수행
    localStorage.removeItem("accessToken");

    // 로그인 상태 변경
    setIsLoggedIn(false);
  };



  return (
    <div>
      <h1>메인 페이지</h1>
      {isLoggedIn ? (
        <>
        <p>로그인 상태입니다.</p>
        <button onClick={handleLogout}>로그아웃</button>
          <p>
        <Link to="/boards">게시글 리스트로 이동</Link>
          </p>
        </>
      ) : (
        <>
        <p>로그인이 필요합니다.</p>
        <Link to ="/auth/signin">로그인</Link>
        <p></p><Link to="/auth/signup">회원가입</Link>
        </>
        )}
    </div>
  );
}

export default MainPage;
