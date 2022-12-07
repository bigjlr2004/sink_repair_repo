import { mainContainer } from "./main.js"
//requests stores the external data in the application state when it is fetched
const applicationState = {
    requests: {}

}
// this sets the location of my external data and saves that location to a variable named API

const API = "http://localhost:8088"

// this function and variable get the data from the outside and store it in the requests application state

export const fetchRequests = () => {
    return fetch(`${API}/requests`)
        .then(response => response.json())
        .then(
            (serviceRequests) => {
                // Store the external state in application state
                applicationState.requests = serviceRequests
            }
        )
}

export const sendRequest = (userServiceRequest) => {
    const fetchOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(userServiceRequest)
    }


    return fetch(`${API}/requests`, fetchOptions)
        .then(response => response.json())
        .then(() => {
            mainContainer.dispatchEvent(new CustomEvent("stateChanged"))

        })
}

export const deleteRequest = (id) => {
    return fetch(`${API}/requests/${id}`, { method: "DELETE" })
        .then(
            () => {
                mainContainer.dispatchEvent(new CustomEvent("stateChanged"))
            }
        )
}






// create a copy of the requests database from the 

export const getRequests = () => {
    return applicationState.requests.map(request => ({...request}))

}


