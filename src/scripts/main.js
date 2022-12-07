import { fetchRequests,fetchPlumbers, fetchCompletions} from "./dataAccess.js"
import { SinkRepair } from "./SinkRepair.js"


export const mainContainer = document.querySelector("#container")

mainContainer.addEventListener(
    "stateChanged",
    customEvent => {
        render()
    }
)

const render = () => {
    const render = () => {
        fetchRequests()
            .then(() => fetchPlumbers())
            .then(() => fetchCompletions())
            .then(
                () => {
                    mainContainer.innerHTML = SinkRepair()
                }
            )
    }
   

render()
}
render()