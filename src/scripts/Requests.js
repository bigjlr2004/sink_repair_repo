/*

the function you write will convert each service request object into HTML representations. Since it is wrapped with a <ul> element, 
make each one an <li> element showing only the description of the request to start.

The function should define 1 parameter (value will be each object in the array)
The description of the service request should be interpolated inside the <li> HTML representation.
The function should return the HTML representation.
For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...

requests.map(convertRequestToListElement).join("")
*/

import { getRequests } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"

// function to convert each service request object into HTML representations
const convertRequestToListElement = (work) => {
    return `<li>
       ${work.description} 

       
       <button class="request__delete"
                id="request--${work.id}">
            Delete
        </button>
    </li>`
}


export const Requests = () => {
    const requests = getRequests()

    let html = `
        <ul>
            ${
                requests.map(
                    (request) => {
                        return convertRequestToListElement(request)
                    }


                ).join("")
            }
        </ul>
    `

    return html
}
const mainContainer = document.querySelector("#container")

document.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [,requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})