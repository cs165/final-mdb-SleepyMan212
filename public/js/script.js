//
// TODO(you): Add the JavaScript necessary to complete your final project.
//
class App {
    constructor() {
        this.codeTable = null;
        this.search = document.querySelector("#search");
        this.search.addEventListener('change',this.onChange);
        this.onChange = this.onChange.bind(this);
        fetch("http://localhost:3000/api/getCode/",{header:{'Access-Control-Allow-Origin': '*'}})
            .then(res=>res.json())
            .then((res)=>{this.codeTable=res})
        fetch("http://localhost:3000/api/getData/",{header:{'Access-Control-Allow-Origin': '*'}})
            .then(res=>res.json())
            .then((res)=>{
                // console.log(res);
                let o;
                for(o in res){
                    // console.log(o);
                    new Course(this.codeTable,res[o]);
                }
            })
    }
    onChange(e){
        const searchName = e.currentTarget.value;
        this.courses = document.querySelectorAll('.course_box');
        this.courses.forEach((c)=>{
            c.classList.remove("hidden");
        });
        this.courses.forEach((c)=>{
            // console.log(c);
            let name = c.querySelector(".course_name").innerText;
            // console.log(name);

            if(!new RegExp(`.*${searchName}.*`).test(name)){
                c.classList.add("hidden");
            }
        })
        // console.log(e);
        // console.log(e.currentTarget.value);
        // console.log(this.courses);

    }
}
class Course{
    constructor(codeTable,data){
        // console.log(data);
        // console.log(codeTable);
        this.panel = document.querySelector('.couerse_panel');
        const box = document.createElement('div');
        const type = document.createElement('div');
        const depart = document.createElement('span');
        const grade = document.createElement('span');
        const category = document.createElement('span');
        const name = document.createElement('div');
        const teacher = document.createElement('div');
        const time = document.createElement('div');
        const location = document.createElement('div');
        const link = document.createElement('div');
        const outline = document.createElement('a');
        const ccuplus = document.createElement('a');

        box.className = 'course_box';
        type.className = 'course_type';
        depart.className = 'department';
        category.className = 'category';
        name.className = 'course_name';
        teacher.className = 'course_teacher';
        time.className = 'course_time';
        location.className = 'course_location';
        link.className = 'link';

        let text = document.createTextNode(codeTable[data.departmentID]);
        depart.appendChild(text);
        if(data.category=='通識'){
            grade.className='direction';
            text = document.createTextNode(data.direction);
        }else{
            grade.className='grade';
            text = document.createTextNode(data.grade);
        }
        grade.appendChild(text);
        text = document.createTextNode(data.category);
        category.appendChild(text);

        type.appendChild(depart);
        type.appendChild(grade);
        type.appendChild(category);

        text = document.createTextNode(data.class_name);
        name.appendChild(text);
        text = document.createTextNode(data.teacher);
        teacher.appendChild(text);
        text = document.createTextNode(data.time);
        time.appendChild(text);
        text = document.createTextNode(data.location);
        location.appendChild(text);

        outline.href=data.outline
        ccuplus.href="https://ccu.plus/#!/courses/"+data.class_id;
        text = document.createTextNode("ccuplus");
        ccuplus.appendChild(text);
        text = document.createTextNode("課程大綱");
        outline.appendChild(text);
        link.appendChild(outline);
        link.appendChild(ccuplus);


        // box.innerHTML = this.html;
        box.appendChild(type);
        box.appendChild(name);
        box.appendChild(teacher);
        box.appendChild(time);
        box.appendChild(location);
        box.appendChild(link);

        this.panel.appendChild(box);;
    }
}
new App();
