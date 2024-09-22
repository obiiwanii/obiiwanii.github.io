export const verifyUser = `query($login: String) {
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
}`

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
      transactions(where: { type: { _eq: "xp" } }) {
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
  }
`;