import { Link, Route, Routes } from 'react-router-dom';

const Welcome = () => {
  return (
    <section>
      <h1>The Welcome Page</h1>
      <Link to='new-user'>New User</Link>
      <Routes>
        {/* App.js 파일에서 /welcome/* 인 경우 */}
        <Route path="new-user" element={<p>Welcome, new user!</p>} />
      </Routes>
    </section>
  );
};

export default Welcome;
