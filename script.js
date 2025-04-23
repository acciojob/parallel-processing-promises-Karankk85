const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const errorDiv = document.getElementById("error");
const loadingDiv = document.getElementById("loading");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

// Function to download a single image
function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;

    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to download image: ${url}`));
  });
}

// Main function to download all images
function downloadImages() {
  // Show loading spinner
  loadingDiv.style.display = "block";
  errorDiv.textContent = "";
  output.innerHTML = "";

  const promises = images.map(image => downloadImage(image.url));

  Promise.all(promises)
    .then(imgElements => {
      // Hide loading spinner
      loadingDiv.style.display = "none";

      // Display all images
      imgElements.forEach(img => {
        output.appendChild(img);
      });
    })
    .catch(error => {
      // Hide loading spinner and show error
      loadingDiv.style.display = "none";
      errorDiv.textContent = error.message;
    });
}

// Add click listener to the button
btn.addEventListener("click", downloadImages);
