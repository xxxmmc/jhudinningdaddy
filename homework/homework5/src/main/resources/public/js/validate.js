const validateCourse = () => {
    let name = document.querySelector("#courseName");
    if (name.value.length < 1) {
        alert("Course name cannot be empty!");
        return false;
    } else {
        return true;
    }
}
const validateReview = () => {
        let name = document.querySelector("#rating");
        if(name.value>5||name.value<1) {
            alert("Rating must be a value between 1 and 5 inclusive!");
            return false
        } else {
            return true;
        }
}
;
