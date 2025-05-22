// Ensure localStorage is accessed only on the client side
if (typeof window !== 'undefined') {
  // Access localStorage here
  const value = localStorage.getItem('key');
  // Use the value as needed
  console.log(value);
}