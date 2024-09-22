// js/auth.js
export async function login(username, password) {
    const credentials = btoa(`${username}:${password}`);
    try {
      const response = await fetch("https://01.kood.tech/api/auth/signin", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${credentials}`,
        },
      });
  
      if (!response.ok) {
        throw new Error("Invalid credentials");
      }
  
      const tokenData = await response.text();
      const token = tokenData.replace(/^"|"$/g, '');
      localStorage.setItem('jwt', token);
      alert("Login successful");
    } catch (error) {
      alert(error.message);
    }
  }
  
  export function logout() {
    localStorage.removeItem('jwt');
    alert("Logged out successfully");
    location.reload(); // Reload the page to clear user-specific data
  }
  