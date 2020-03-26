import React from 'react';
import Header from './Header';
import Part from './Content/Part';
import Total from './Content/Total';

const Course = ({ course }) => {
  const { parts } = course;

  const total = parts.reduce((sum, curr) => sum + curr.exercises, 0)

  return (
    <>
      <Header course={course} />

      {parts.map(part => (
        <Part key={part.id} part={part} />
      ))}
      <Total total={total} />
    </>
  )
}

export default Course;