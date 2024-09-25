import { CoursePartBase } from "../types"

const Total = ({ courseParts }: { courseParts: CoursePartBase[] }) => {

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <p>Total Number of exercises {totalExercises}</p>
  )
}

export default Total