import { useRouter } from 'next/router';
import { useContext, useState } from 'react';
import { UserContext } from '../../utils/UserContext';
import Nav from '../../components/Nav';
import Home from '../../components/Home';
import Create from '../../components/Create';
import DashFooter from '../../components/Footer';

const Dashboard = () => {
  const [user, setUser] = useContext(UserContext);
  const router = useRouter();
  const [tab, setTab] = useState('home');
  const tabs = ['home', 'create'];
  if (!user) {
    router.push('/');
  }

  return (
    <>
      <Nav tabs={tabs} setTab={setTab} />
      <div className="container mx-auto mt-16">
        {tab === 'home' ? (
          <Home />
        ) : null || tab === 'create' ? (
          <Create />
        ) : null}
      </div>
      {/* <DashFooter /> */}
    </>
  );
};
export default Dashboard;
