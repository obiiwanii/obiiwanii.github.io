/*export const verifyUser = `query($login: String) {
  users(where: { login: {_eq: $login}}) {
    login
  	progresses {
      path
    }
  }
}`

export const getAllTasks = `query ($login: String!, $offs: Int!)  {
  users(where: {login: {_eq: $login}}) {
    id
    login
    transactions(offset: $offs,
      where: {type: {_eq: "xp"}}){
      userId
      type
      amount
      createdAt
      path
      object{
        name
        type
        campus
        childrenAttrs
      }
    }
  }
}`

export const getAllAudits = `query ($login: String!, $offs: Int!)  {
  users(where: {login: {_eq: $login}}) {
    id
    login
    transactions(offset: $offs,
      where: {type: {_neq: "xp"}}){
      type
      amount
      createdAt
    }
  }
}`*/

export const getUserData = `
  query {
    user {
      id
      login
      firstName
      lastName
      email
      createdAt
      auditRatio
      transactions( where: { _and: [{ type: { _eq: "xp" } }, { path: { _niregex: "(piscine)" } }] }
      order_by: { createdAt: asc }
      ) {
        type
        amount
        createdAt
        path
        object {
          name
        }
      }
      audits: transactions(where: { type: { _in: ["up", "down"] } }) {
        type
        amount
        createdAt
      }
    }
    xp: transaction_aggregate(where: { type: { _eq: "xp" }, eventId: { _eq: 148 } }) {
      aggregate {
        sum {
          amount
        }
      }
    }
    level: transaction(
      limit: 1
      order_by: { amount: desc }
      where: { type: { _eq: "level" }, eventId: { _eq: 148 } }
    ) {
      amount
    }
  }
`;