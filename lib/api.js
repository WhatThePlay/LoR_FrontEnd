const JSON_URL = "http://localhost:3001"
const URL = "http://localhost:8080"

export async function login({ email, password }) {
    const response = await fetch(`${JSON_URL}/login`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function register({ email, password }) {
    const response = await fetch(`${JSON_URL}/register`, {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({ email, password })
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getAllCards() {
    const response = await fetch(`${URL}/card`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getCardById(id) {
    const response = await fetch(`${URL}/card/${id}`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}