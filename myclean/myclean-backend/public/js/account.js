function saveAccountChanges(name, email) {
    const validation = validateAccountInput(name, email);
    if (validation !== true) {
      return validation;
    }
  
    return "✅ Saving changes...";
  }
  
  function validateAccountInput(name, email) {
    if (typeof name !== 'string' || typeof email !== 'string') {
      return "❌ Invalid input";
    }
    if (name.trim() === "" || email.trim() === "") {
      return "❌ Name and email are required";
    }
    if (!email.includes("@")) {
      return "❌ Invalid email format";
    }
  
    return true;
  }
  
  module.exports = { saveAccountChanges };
  