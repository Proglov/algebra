import Graph from "./Graph"

export default function Graphs({ res }) {

    return (
        <div>
            {res.map((v, i) => {
                return <Graph key={i} arr={v} />
            })}
        </div>
    )
}
