export default function InvertImage(darkmode: boolean) {
    let images = document.querySelectorAll("img");
    images.forEach((img) => {
        if (!img.src.includes("sample_menu")) img.style.filter = darkmode ? "invert(1)" : "invert(0)";
    });
}
