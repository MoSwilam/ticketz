import axios from 'axios';

const LandingPage = ({ currentUser }) => {
  console.log(currentUser);
  // axios.get('/api/users/currentuser').catch((err) => {
  //   console.log(err.message);
  // });
 
  return <h1>Landing Page</h1>;
};

LandingPage.getInitialProps = async ({ req }) => {
  // decide if we are on the server or the client
  if (typeof window === 'undefined') {
    // we are on the server
    // requests should be made to http://ingress-nginx.ingress-nginx.svc.cluster.local
    // http://SERVICENAME.NAMESPACE.svc.cluster.local
    const { data } = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/users/currentuser',
      {
        headers: req.headers
      }
    );
    return data;
  } else {
    // we are on the client
    // requests can be made with a base url of ''
    const { data } = await axios.get('/api/users/currentuser');
    return data;
  }
};

export default LandingPage;