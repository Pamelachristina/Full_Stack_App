import React, { Component } from 'react';
import { Link } from 'react-router-dom';



/**
 * Courses Component
 *  - / home route
 *  - retrieves the list of courses from the REST API /api/courses route
 *  - renders list of courses
 *  - each course needs to link to its respective "Course Detail" screen
 *  - component renders a link to the "Create Course" screen
 */






export class Courses extends Component {
    state = {
      courses: [],
    };


    componentDidMount() {
      const { context } = this.props;
      console.log(context);

      context.data.getCourses()
      .then((courses) => {
          this.setState({ courses });
          console.log(this.state.courses)
      })
      .catch(err =>{
        this.props.history.push('/error');
        console.log(err);
      })


    }


    render() {
// TODO map over the courses. Dynamically link course titles and id's
const { courses } =this.state;
const courseList = courses.map((course) => {
    return(
      <Link className="course--module course--link" to={`/courses/${course.id}`} key={course.id}>
      <h2 clasname="course--label">Course</h2>
      <h3 className="course--title">{course.title}</h3>
      </Link>
    );
});


        return (

    <div className="wrap main--grid">
          {courseList}
          <Link className="course--module course--add--module" to="/courses/create">
          <span className="course--add--title">
          <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" viewBox="0 0 13 13" className="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 " /></svg>
          New Course
        </span>
      </Link>
    </div>



        )
    }
}

export default Courses

