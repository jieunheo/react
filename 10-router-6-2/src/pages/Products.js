import { Link, useNavigate } from 'react-router-dom';

const Products = () => {
  // useNavigate: 프로그램적 혹은 명령형 탐색
  const navigate = useNavigate();
  // navigate('./welcome', {replace: true}); // replace: true --> 현재의 라우팅을 새것으로 대체
  navigate(-1); // 이전 페이지로 (숫자: 값만큼 앞뒤로 탐색)

  return (
    <section>
      <h1>The Products Page</h1>
      <ul>
        <li>
          <Link to='/products/p1'>A Book</Link>
        </li>
        <li>
          <Link to='/products/p2'>A Carpet</Link>
        </li>
        <li>
          <Link to='/products/p3'>An Online Course</Link>
        </li>
      </ul>
    </section>
  );
};

export default Products;
