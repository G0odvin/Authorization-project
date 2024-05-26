import { Link } from 'react-router-dom';
import { Users } from './Users';

export const Admin = () => {
  return (
    <section>
      <h1>Admins Page</h1>
      <br />
      <p>You must have been assigned an Admin role.</p>
      <br />
      <Users />
      <div className="flexGrow">
        <Link to="/">Home</Link>
      </div>
    </section>
  );
};
