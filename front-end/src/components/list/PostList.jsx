import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function PostList() {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

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
            params: {
              page: currentPage,
              limit: 2,
            },
          };

          const response = await axios.get("/boards", config);
          setPosts(response.data.boards);
          setTotalPages(response.data.totalPages)
        } else {
          console.log("토큰이 없습니다.");
          // 로그인하지 않은 상태 처리
        }
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [currentPage]); //currentPage가 변경될 때마다 실행.. []에서 수정

  const handlePageChange = (page) => {
    setCurrentPage(page);
  }
  //1페이지만 증감
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage-1);
    }
  };
  const handleNextPage = () => {
    if (currentPage + 10 <= totalPages) {
      setCurrentPage(currentPage + 10);
    } else {
      setCurrentPage(totalPages);
    }
  }
  //나타내는 페이지 체인지! 10페이지 단위

  const handlePrevPages = () => {
    if (currentPage - 10 >= 1) {
      setCurrentPage(currentPage  - 10);
    } else {
      setCurrentPage(1);
    }
  };

  const handleNextPages = () => {
    setCurrentPage(currentPage + 10);
  };
  const pageNumbers = [];
  const maxPagesToShow = 10; // 한번에 표시할 페이지 수
  const maxPageGroup = Math.ceil(totalPages/ maxPagesToShow); // 총 페이지 그룹 수
  const currentPageGroup = Math.ceil(currentPage/ maxPagesToShow); // 현재 페이지 그룹
  const renderPageNumbers = () => {

    let startPage = Math.floor(currentPageGroup -1) * maxPagesToShow + 1;
    let endPage = startPage + maxPagesToShow -1;
    if (endPage > totalPages) {
      endPage = totalPages;
    }

    for (let i = startPage; i <= endPage; i ++)  {
      pageNumbers.push(
        <button key = {i} onClick = { () => handlePageChange(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };



  //&lt는 '<' &gt는 '>' 기호임 그냥 < > 버튼 만들 때 쓰려고!
  return (
    <div>
      <h1>리스트</h1>
      {posts.map((post) => (
        <div key={post.id}>
          <h2>제목 : {post.title}</h2>
          <p>내용 : {post.content}</p>
          <p>작성자 : {post.status}</p>
        </div>
      ))}
      <div>
        {currentPage > 10 && (
          <button onClick = {handlePrevPages}>&lt;&lt;</button>
        )}
        <button onClick={handlePrevPage}>&lt;</button>
        {renderPageNumbers()}
        <button onClick={handleNextPage}>&gt;</button>
        {currentPageGroup < maxPageGroup && (
          <button onClick={handleNextPages}> &gt;&gt; </button>
        )}
      </div>

      <Link to="/home">메인 페이지로 가기</Link>

    </div>
  );
}

export default PostList;
