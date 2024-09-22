export async function queryAPI(query, variables = {}) {
    const token = localStorage.getItem('jwt');
    console.log(`queryAPI called with query: ${query}`);
  
    if (!token) {
      throw new Error("No valid token provided");
    }
  
    return fetch("https://01.kood.tech/api/graphql-engine/v1/graphql", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`,
      },
      body: JSON.stringify({ query, variables }),
    })
      .then(res => res.json())
      .then(data => {
        if (data.errors) {
          console.error("GraphQL errors:", data.errors);
          throw new Error(data.errors[0].message || "GraphQL query error");
        }
        return data.data;
      })
      .catch(error => {
        console.error("Network error:", error);
        throw new Error("Failed to fetch data from the server.");
      });
  }
