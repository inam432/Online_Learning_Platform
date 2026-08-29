import { useEffect, useState } from "react";
import Navbar from '../Components/navbar.jsx';
import axios from "axios";
function Courses() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        getCourses();
    }, []);

    const getCourses = async () => {
        try {
            const token = JSON.parse(localStorage.getItem("token"));
            const response = await axios.get("https://online-learning-platform-19fq.onrender.com/api/getAllCourses",{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });if(response.data.message==="All courses fetched successfully"){
                setCourses(response.data.courses);}else{
                    alert("Please login again");
                }
        } catch (error) {
            console.log(error);
        }
    };

    const deleteCourse = async (id) => {
        try {
            await api.delete(`/courses/${id}`);

            setCourses(
                courses.filter((course) => course._id !== id)
            );

        } catch (error) {
            alert(error.response?.data?.message || "Delete failed");
        }
    };
    const courseEnrollment=async(courseName,instructor)=>{
        const token = JSON.parse(localStorage.getItem("token"));
            const res=await axios.post("https://online-learning-platform-19fq.onrender.com/api/enrollCourse", {
                courseName,instructor
            },{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            if(res.data.message==="Enrollment done"){
            alert("Enrollment done successfully");
    }else{
        alert("Enrollment failed");
    }};

    return (
        <div className="container"><Navbar/><h1>Online Learning Platform</h1>
            <h2>All Courses</h2>

            <div className="row">
                {courses.map((course) =>{return (
                    <div className="col-md-4" key={course._id}>
                        <div className="card">
<div className="card-body">
    <h5 className="card-title">
        {course.courseName}
    </h5>

                                <p className="card-text">
                                    Instructor Name: {course.instructor.instructor_Name}<br/>
                                    Instructor Email: {course.instructor.instructor_Email}
                                </p>

                                <button
                                    className="btn btn-light"
                                    onClick={() =>
courseEnrollment(course.courseName,{instructor_Name:course.instructor.instructor_Name,
    instructor_Email:course.instructor.instructor_Email})
                                    }
                                >
                                    Enroll Now
                                </button>
                            </div>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    );
}

export default Courses;