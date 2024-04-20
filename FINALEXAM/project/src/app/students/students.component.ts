
import { Component, OnInit } from '@angular/core';
import { Student, StudentService } from '../Services/student-service.service';

@Component({
    selector: 'app-students',
    templateUrl: './students.component.html',
    styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
    students: Student[];
    selectedStudent: Student | null = null;

    constructor(private studentService: StudentService) {}

    ngOnInit() {
        this.getStudents();
    }

    getStudents(): void {
        this.studentService.getStudents().subscribe(students => this.students = students);
    }

    selectStudent(student: Student): void {
        this.selectedStudent = {...student};
    }

    initializeStudent(): void {
        this.selectedStudent = { id: null, name: '', course: '', enrollmentDate: '' };
    }

    deleteStudent(id: number): void {
        this.studentService.deleteStudent(id).subscribe(() => {
            this.students = this.students.filter(student => student.id !== id);
        });
    }

    onSubmit(): void {
        if (this.selectedStudent.id) {
            this.studentService.updateStudent(this.selectedStudent).subscribe(() => {
                this.getStudents(); 
            });
        } else {
            this.studentService.addStudent(this.selectedStudent).subscribe((newStudent) => {
                this.students.push(newStudent);
            });
        }
        this.selectedStudent = null;  
    }
}
