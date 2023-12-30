import { findLowestTotalCost } from "@/utils/tarrahi-algorithm/usefullFunctions";
import Graph from "./Graph"

export default function Graphs({ res }) {
    const ans = findLowestTotalCost(res);

    return (
        <div className="flex flex-col justify-center">

            <div className="mx-auto text-center my-5">
                <span>بهینه ترین گراف:</span>
                <div>
                    <Graph arr={ans} />
                </div>
            </div>

            <br /><br />

            {res.map((v, i) => {
                return <Graph key={i} arr={v} />
            })}

        </div>
    )
}
