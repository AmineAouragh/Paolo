import { Client } from "@langchain/langgraph-sdk"

const apiKey = process.env.PAOLO_LANGSMITH_PERSONAL_ACCESS_TOKEN
const apiUrl = process.env.LANGSMITH_API_URL

export const client = new Client({
    apiUrl, 
    apiKey,
    defaultHeaders: {
        "X-Auth-Scheme": apiKey
    }
})