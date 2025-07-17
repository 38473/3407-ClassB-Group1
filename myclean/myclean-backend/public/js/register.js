document.getElementById("registerForm").addEventListener("submit", async function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    alert("The passwords entered twice are inconsistent");
    return;
  }

  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, email, password })
    });

    const result = await response.json();

    if (response.ok && result.success) {
      localStorage.setItem('myclean_user_id', result.userId);
      alert("Registered successfully!");
      window.location.href = "index.html";
    } else {
      alert("Registration failed: " + result.message);
    }
  } catch (error) {
    console.error("Error during registration:", error);
    alert("An error occurred.");
  }
});
