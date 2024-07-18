import './App.css';
import { Outlet } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import Navbar from './components/Navbar';
import SavedBooks from './pages/SavedBooks';
import SearchBooks from './pages/SearchBooks';

// Set up the HTTP link
const httpLink = createHttpLink({
  uri: '/graphql',
});

// Set up the auth link for adding the authorization header
const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('id_token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '',
    },
  };
});

// Create the Apollo Client
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <SearchBooks />
      <SavedBooks />
      <LoginForm />
      <SignupForm />
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;
