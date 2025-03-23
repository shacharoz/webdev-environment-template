export async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
        const data = await response.json();
        document.getElementById('output').innerHTML = `<p>${data.title}</p>`;
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}
