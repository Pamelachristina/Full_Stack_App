import React, { Component } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';


/**
 * Course Detail Component
 *  - /courses/:id route
 *  - retrieves detail for a course from REST API /api/courses/:id route
 *  - renders course
 *  - renders "Delete Course" button that sends DELETE request to /api/courses/:id route
 *  - renders "Update Course" button to navigate to "Update Course" screen
 */


export class courseDetail extends Component {
    state = {
      course: {},
      userInfo: {},
      error: {},
      isLoading: false
        

    };


     componentDidMount(){
      const { context } = this.props;
      const { match } = this.props;

      // renders course that was clicked 
      context.data.getCourse(match.params.id)
      .then((course) => {
        this.setState({
          
          course,
          userInfo: course.User
        });
      })
      .catch(err => {
        this.props.history.push('/notfound');
       console.log(`Course ID not found ${err}`);

     })
     
  }


    render() {
      console.log(this.state.course);
      const { course, userInfo } = this.state;
      const { context } = this.props;
      const authUser = context.authenticatedUser;
      return(
        <React.Fragment>
            <div className="actions--bar">
              <div className="wrap">
                {
                  (authUser && course.userId === authUser.id)?
                  <React.Fragment>
                    <Link className="button" to={`/courses/${course.id}/update`}>Update Course</Link>
                    <Link className="button" to="/" onClick={() => this.deleteCourse()}>Delete Course</Link>
                    <Link className="button" to="/">Return to List</Link>
                  </React.Fragment>
                  :
                  <React.Fragment>
                    <Link className="button" to="/">Return to List</Link>
                  </React.Fragment>
                }
              </div>
            </div>
            <div className="wrap">
              <h2>Course Detail</h2>
              <form>
                <div className="main--flex">
                  <div>
                    <h3 className="course--detail--title">Course</h3>
                    <h4 className="course--name">{course.title}</h4>
                    <p>By {userInfo.firstName} {userInfo.lastName}</p>
                    <ReactMarkdown children={course.description} />
                  </div>
                  <div>
                    <h3 className="course--detail--title">Estimated Time</h3>
                    <p>{course.estimatedTime}</p>
                    <h3 className="course--detail--title">Materials Needed</h3>
                    <ReactMarkdown className="course--detail--list" children={course.materialsNeeded} />
                  </div>
                </div>
              </form>
            </div>
        </React.Fragment>
      );
    }
  
    deleteCourse = () => {
      const { context } = this.props;
      const { match } = this.props;
      const authUser = context.authenticatedUser;
      context.data.deleteCourse(match.params.id, authUser.emailAddress, authUser.password)
      .then(errors => {
        if(errors.length){
          this.setState({ errors })
        } else {
          console.log(`course deleted`);
          this.props.history.push("/");
        }
      })
      .catch(err => {
        //handle the rejected promise
        console.log(err);
        //redirect to error page by pushing to history stack
        this.props.history.push('/error');
      });
    }
  
  }
  

export default courseDetail



