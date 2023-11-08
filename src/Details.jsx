import { useEffect, useState } from "react";
import Tesseract from "tesseract.js";

function Details() {
  const [ocr, setOcr] = useState("");
  const [imageData, setImageData] = useState(null);
  // const worker = createWorker();

  const convertImageToText = async () => {
    if (!imageData) return;
    // await worker.load();
    // await worker.loadLanguage("eng");
    // await worker.initialize("eng");
    // const {
    //   data: { text },
    // } = await worker.recognize(imageData);

    Tesseract.recognize(imageData, 'eng').then(({ data: { text } }) => {
      console.log('Recognized Text:', text);  
      setOcr(text); })
  };

  useEffect(() => {
    convertImageToText();
  }, [imageData]);

  function handleImageChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const imageDataUri = reader.result;
      console.log({ imageDataUri });
      setImageData(imageDataUri);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="App">
      <div>
        <p>Choose an Image</p>
        <input
          type="file"
          name=""
          id=""
          onChange={handleImageChange}
          accept="image/*"
        />
      </div>
      <div className="display-flex">
        <img src={imageData} alt="" srcSet="" />
        <p>{ocr}</p>
      </div>
    </div>
  );
}

export default Details;
