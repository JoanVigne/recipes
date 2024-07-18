export default function DropZone({ handleFileChange }) {
  function handleDrop(event) {
    event.preventDefault(); // Prevent default behavior
    const file = event.dataTransfer.files[0]; // Get the dropped file
    handleFileChange({ target: { files: [file] } }); // Reuse the file change handler
  }

  // Function to handle drag over event
  function handleDragOver(event) {
    event.preventDefault(); // This is necessary to allow the drop
  }
  return (
    <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
      <label htmlFor="image" style={{ width: "100%" }}>
        Dépose une photo de ta recette. <br />
        Les photos moches sont accéptées !
      </label>
    </div>
  );
}
