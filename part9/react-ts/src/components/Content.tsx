import { CoursePartBase } from "../types"

const Content = ({ courseParts }: { courseParts: CoursePartBase[] }) => {
    return (
        <div>
            {courseParts.map(part => (
                <div key={part.name}>
                    <h2>{part.name}</h2>
                    <p>Number of exercises: {part.exerciseCount}</p>
                </div>
            ))}
        </div>
    )
}

export default Content