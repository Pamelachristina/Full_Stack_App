import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch
} from 'react-router-dom';

 import Header from './components/Header';
 import NotFound from './components/NotFound';
 import UserSignUp from './components/UserSignUp';
 import UserSignIn from './components/UserSignIn';
 import UserSignOut from './components/UserSignOut';
 import Courses from './components/Courses';
 import CourseDetail from './components/CourseDetail';
 import CreateCourse from './components/CreateCourse';
 import UpdateCourse from './components/UpdateCourse';
 import Forbidden from './components/Forbidden';
 import UnhandledError from './components/UnhandledError';
 import withContext from './Context';
 import PrivateRoute from './PrivateRoute';


const HeaderWithContext = withContext(Header);
const UserSignUpWithContext = withContext(UserSignUp);
const UserSignInWithContext = withContext(UserSignIn);
const UserSignOutWithContext = withContext(UserSignOut);
const CoursesWithContext = withContext(Courses);
const CourseDetailWithContext = withContext(CourseDetail);
const CreateCourseWithContext = withContext(CreateCourse);
const UpdateCourseWithContext = withContext(UpdateCourse);

export default () => (
  <Router>
    <div>
      <HeaderWithContext />

      <Switch>
        <Route exact path="/" component={CoursesWithContext} />
        <PrivateRoute path="/courses/create" component={CreateCourseWithContext} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourseWithContext} />
        <Route path="/courses/:id" component={CourseDetailWithContext} />
        <Route path="/signin" component={UserSignInWithContext} /> 
        <Route path="/signup" component={UserSignUpWithContext} />
        <Route path="/signout" component={UserSignOutWithContext} /> 
        <Route path="/notfound" component={NotFound} /> 
        <Route path="/forbidden" component={Forbidden} /> 
        <Route path="/error" component={UnhandledError} /> 
       
      </Switch>
    </div>
  </Router>
);
