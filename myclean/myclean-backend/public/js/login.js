document.getElementById("loginForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      localStorage.setItem('myclean_user_id', result.userId);
      alert("Login successful!");
      window.location.href = "index.html";
    } else {
      alert("Login failed: " + result.message);
    }
  } catch (error) {
    console.error("Error during login:", error);
    alert("An error occurred.");
  }
});
