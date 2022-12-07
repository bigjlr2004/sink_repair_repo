/*

the function you write will convert each service request object into HTML representations. Since it is wrapped with a <ul> element, 
make each one an <li> element showing only the description of the request to start.

The function should define 1 parameter (value will be each object in the array)
The description of the service request should be interpolated inside the <li> HTML representation.
The function should return the HTML representation.
For example, if you write a function named convertRequestToListElement, then you would update the code below to the following...

requests.map(convertRequestToListElement).join("")
*/

import { getRequests, getPlumbers, saveCompletion } from "./dataAccess.js"
import { deleteRequest } from "./dataAccess.js"



// function to convert each service request object into HTML representations
const convertRequestToListElement = (request,plumbers) => {
    return `<li>
       ${request.description}  
       ${convertPlumbers(request.id,plumbers)}

       
       <button class="request__delete"
                id="request--${request.id}">
            Delete
        </button>
    
   </li>`
}
const convertPlumbers = (request,plumbers) => {
   return   `<select class="plumbers" id="plumbers">
   <option value="">Choose</option>
   ${
       plumbers.map(
           plumber => {
               return `<option value="${request}--${plumber.id}--">${plumber.name}</option>`
           }
       ).join("")
   }
</select>`
}

export const Requests = () => {
    const requests = getRequests()
    const plumbers = getPlumbers()

    let html = `
        <ul><div class="requests">
            ${requests.map(
        (request) => {
            return convertRequestToListElement(request,plumbers)
        }
    ).join("")
        } 
           </div> </ul>`


    return html
}
const mainContainer = document.querySelector("#container")

document.addEventListener("click", click => {
    if (click.target.id.startsWith("request--")) {
        const [, requestId] = click.target.id.split("--")
        deleteRequest(parseInt(requestId))
    }
})

mainContainer.addEventListener(
    "change",
    (event) => {
        if (event.target.id === "plumbers") {
            const [requestId, plumberId] = event.target.value.split("--")
        
            const completion ={
            requestId: requestId,
            plumberId: plumberId,
            date_created: Date.now()
                        }            /*
                This object should have 3 properties
                   1. requestId
                   2. plumberId
                   3. date_created
            */
    

            /*
                Invoke the function that performs the POST request
                to the `completions` resource for your API. Send the
                completion object as a parameter.
             */
                saveCompletion(completion)
        }
    }
)

