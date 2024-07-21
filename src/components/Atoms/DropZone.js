import "./dropzone.css";

export default function DropZone({ handleFileChange }) {
  function handleDrop(event) {
    event.preventDefault(); // Prevent default behavior
    const file = event.dataTransfer.files[0]; // Get the dropped file
    handleFileChange({ target: { files: [file] } }); // Reuse the file change handler
  }
  function handleDragOver(event) {
    event.preventDefault(); // This is necessary to allow the drop
  }
  return (
    <div className="dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
      <label htmlFor="image">
        Dépose une photo de ta recette ici !
        <div className="container-inline">
          {/*       <label htmlFor="image"></label> */}
          <input
            type="file"
            id="image"
            name="image"
            onChange={(e) => handleFileChange(e)}
          />
        </div>
      </label>
    </div>
  );
}
