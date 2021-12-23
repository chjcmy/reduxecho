import React from 'react';
import { Container } from 'reactstrap';
import { Switch, Route } from 'react-router-dom';
import Header from '../components/header';
import Footer from '../components/Footer';
import AppNavbar from '../components/AppNavbar';
import PostCardList from './normalRoute/PostCardList';
import PostWrite from './normalRoute/PostWrite';
import PostDetail from './normalRoute/PostDetail';
import CategoryResult from './normalRoute/CategoryResult';
import Search from './normalRoute/Search';
import { EditProtectedRoute } from './protectedRoute/ProtectedRoute';
import PostEdit from './normalRoute/PostEdit';

const MyRouter = () => (
  <>
    <AppNavbar />
    <Header />
    <Container id="main-body">
      <Switch>
        <Route path="/" exact component={PostCardList} />
        <Route path="/posts" exact component={PostWrite} />
        <Route path="/post/:id" exact component={PostDetail} />
        <Route path="/post/category/:categoryName" exact component={CategoryResult} />
        <EditProtectedRoute path="/postedit/:id" exact component={PostEdit} />
        <Route path="/search/:searchTerm" component={Search} />
        <Route path="*" to="/" />
      </Switch>
    </Container>
    <Footer />
  </>
);

export default MyRouter;
