import { Link, Outlet } from 'react-router-dom';

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to='new-user'>New User</Link>
      {/* Outlet: 중첩 함수가 들어갈 자리를 표시 */}
      <Outlet />
    </section>
  );
};

export default Welcome;
