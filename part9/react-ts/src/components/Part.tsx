import { CoursePart } from "../types"

const Part = ({ coursePart }: { coursePart: CoursePart }) => {

    const secondSection = () => {
        switch (coursePart.kind) {
            case "basic":
                return <>
                    <i>{coursePart.description}</i>
                </>
            case "group":
                return <>
                    <p>project exercises: {coursePart.groupProjectCount}</p>
                </>
            case "background":
                return <>
                    <i>{coursePart.description}</i>
                    <p>Submit to: {coursePart.backgroundMaterial}</p>
                </>
            case "special":
                return <>
                    <i>{coursePart.description}</i>
                    <p>Required skills: {coursePart.requirements.join(", ")}</p>
                </>
            default:
                return null
        }
    }

    return (
        <div>
            <h2>{coursePart.name} {coursePart.exerciseCount}</h2>
            {secondSection()}
        </div>
    )
}

export default Part