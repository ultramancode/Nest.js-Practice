import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // 로컬 스토리지에서 토큰 가져오기
        const token = localStorage.getItem("accessToken");
        if (token) {
          // 토큰을 헤더에 추가하여 요청 보내기
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };

          const response = await axios.get("/boards", config);
          setPosts(response.data);
        } else {
          console.log("토큰이 없습니다.");
          // 로그인하지 않은 상태 처리
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      <h1>게시글 리스트</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>제목 : {post.title}</h2>
          <p>내용 : {post.content}</p>
          <p>작성자 : {post.status}</p>
        </div>
      ))}
      <Link to="/home">메인 페이지로 가기</Link>

    </div>
  );
}

export default PostList;
