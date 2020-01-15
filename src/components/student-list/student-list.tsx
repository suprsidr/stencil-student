import { Component, h, State } from '@stencil/core';
import { StudentDisplay } from '../student-display/student-display';

type Name = {
  first: string,
  last: string
}

type Picture = {
  large: string
}

type Location = {
  street: string,
  city: string,
  state: string,
  postcode: string
}

type Student = {
  name: Name,
  dob: string,
  picture: Picture,
  location: Location,
  phone: string,
  cell: string,
  email: string,
  registered: number,
  major: string,
  gpa: string,
  sid: string,
  modified: number,
  modifiedby: string
}

@Component({
  tag: 'student-list',
  styleUrl: 'student-list.css',
  shadow: true
})

export class StudentList {

  @State() students: Student[] = [];

  @State() filter: string = 'A';

  availableLetters = new Set();

  componentDidLoad(): void {
    fetch('http://localhost:3000/students/%7B%7D/0/%7B%7D/%7B%22_id%22:0%7D')
    .then(resp => resp.json())
    .then((data) => {
      data.forEach(s => this.availableLetters.add(s.name.last.charAt(0)));
      this.students = data;
    })
  }

  handleSelectChange(e): void {
    this.filter = e.target.value;
  }

  letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

  render() {
    return (
      <div class="main">
        <div>
          <select onChange={(e) => this.handleSelectChange(e)}>
            {this.letters
            .filter(a => this.availableLetters.has(a))
            .map(char => <option value={char}>{char}</option>)}
          </select>
        </div>
        <div class="row">
          <div class="small-12 columns text-center">
        {this.students
        .filter(student => student.name.last.startsWith(this.filter))
        .map(student => (
          <StudentDisplay student={student}></StudentDisplay>
        ))}
          </div>
        </div>
      </div>
    );
  }

}
