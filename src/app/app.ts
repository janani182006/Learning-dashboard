
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Course {
  id: number;
  name: string;
  description: string;
  duration: string;
  lessons: number;
  status: 'Completed' | 'In Progress' | 'Not Started';
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {

  courses: Course[] = [
    {
      id: 1,
      name: 'Angular Fundamentals',
      description: 'Learn the fundamentals of Angular and build modern web applications.',
      duration: '5 hours',
      lessons: 12,
      status: 'In Progress'
    },
    {
      id: 2,
      name: 'TypeScript Basics',
      description: 'Understand TypeScript fundamentals and how it is used in Angular.',
      duration: '3 hours',
      lessons: 8,
      status: 'Completed'
    },
    {
      id: 3,
      name: 'HTML and CSS',
      description: 'Learn HTML and CSS to create clean and responsive web pages.',
      duration: '4 hours',
      lessons: 10,
      status: 'Completed'
    },
    {
      id: 4,
      name: 'JavaScript Fundamentals',
      description: 'Learn the core concepts of JavaScript for web development.',
      duration: '6 hours',
      lessons: 15,
      status: 'Not Started'
    },
    {
      id: 5,
      name: 'Responsive Web Design',
      description: 'Learn how to build websites that work across different devices.',
      duration: '4 hours',
      lessons: 9,
      status: 'In Progress'
    },
    {
      id: 6,
      name: 'Web Accessibility',
      description: 'Learn basic practices for creating accessible web applications.',
      duration: '2 hours',
      lessons: 6,
      status: 'Not Started'
    }
  ];

  searchText = '';
  selectedStatus = 'All';
  sortOrder = 'az';

  selectedCourse: Course | null = null;
  showAddCourse = false;

  newCourse: Course = {
    id: 0,
    name: '',
    description: '',
    duration: '',
    lessons: 0,
    status: 'Not Started'
  };

  get totalCourses(): number {
    return this.courses.length;
  }

  get completedCourses(): number {
    return this.courses.filter(
      course => course.status === 'Completed'
    ).length;
  }

  get inProgressCourses(): number {
    return this.courses.filter(
      course => course.status === 'In Progress'
    ).length;
  }

  get notStartedCourses(): number {
    return this.courses.filter(
      course => course.status === 'Not Started'
    ).length;
  }

  get filteredCourses(): Course[] {
    let result = this.courses.filter(course => {

      const search = this.searchText.trim().toLowerCase();

      const matchesSearch =
        course.name.toLowerCase().includes(search) ||
        course.description.toLowerCase().includes(search);

      const matchesStatus =
        this.selectedStatus === 'All' ||
        course.status === this.selectedStatus;

      return matchesSearch && matchesStatus;
    });

    result = [...result].sort((a, b) => {

      if (this.sortOrder === 'az') {
        return a.name.localeCompare(b.name);
      }

      return b.name.localeCompare(a.name);
    });

    return result;
  }

  viewCourse(course: Course): void {
    this.selectedCourse = course;
  }

  closeCourse(): void {
    this.selectedCourse = null;
  }

  startCourse(): void {

    if (!this.selectedCourse) {
      return;
    }

    if (this.selectedCourse.status === 'Not Started') {
      this.selectedCourse.status = 'In Progress';
    }

    alert('Course started successfully.');
  }

  addCourse(): void {

    if (
      !this.newCourse.name.trim() ||
      !this.newCourse.description.trim() ||
      !this.newCourse.duration.trim() ||
      this.newCourse.lessons <= 0
    ) {
      alert('Please fill in all fields correctly.');
      return;
    }

    const course: Course = {
      id: Date.now(),
      name: this.newCourse.name.trim(),
      description: this.newCourse.description.trim(),
      duration: this.newCourse.duration.trim(),
      lessons: this.newCourse.lessons,
      status: this.newCourse.status
    };

    this.courses.push(course);

    this.newCourse = {
      id: 0,
      name: '',
      description: '',
      duration: '',
      lessons: 0,
      status: 'Not Started'
    };

    this.showAddCourse = false;

    alert('Course added successfully.');
  }
}

