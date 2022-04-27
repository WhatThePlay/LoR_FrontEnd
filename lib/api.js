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

export async function createCard(card, token) {
    const response = await fetch(`${URL}/card`, {
        method: "POST",
        mode: 'cors',
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(card)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function updateCard(card, token) {
    const response = await fetch(`${URL}/card/${card.id}`, {
        method: "PUT",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(card)
    })

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function deleteCard(id, token) {
    const response = await fetch(`${URL}/card/${id}`, {
        method: "DELETE",
        headers: {
            "content-type": "application/json",
            "authorization": `Bearer ${token}`
        }
    })

    if (!response.ok) {
        return Promise.reject(response)
    }
}







export async function getAllRegions() {
    const response = await fetch(`${URL}/region`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}

export async function getAllKeywords() {
    const response = await fetch(`${URL}/keyword`)

    if (!response.ok) {
        return Promise.reject(response)
    }

    const data = await response.json()
    return data
}