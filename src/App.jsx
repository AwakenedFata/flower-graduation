import { useEffect, useRef, useState } from "react";
import "@google/model-viewer/dist/model-viewer";
import "./App.css";

function App() {
  const [loading, setLoading] = useState(true);
  const [loadingProgress, setLoadingProgress] = useState(0);
  const [modelError, setModelError] = useState(false);
  const [audioPlaying, setAudioPlaying] = useState(false);
  const modelRef = useRef(null);
  const audioRef = useRef(null);

  useEffect(() => {
    // Inisialisasi animasi setelah halaman dimuat
    const timer = setTimeout(() => {
      document.body.classList.remove("not-loaded");
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!modelRef.current) return;

    const model = modelRef.current;

    // Tangani progress loading
    const handleProgress = (event) => {
      const progress = Math.floor(event.detail.totalProgress * 100);
      setLoadingProgress(progress);
      console.log(`Loading progress: ${progress}%`);
    };

    // Tangani ketika model berhasil dimuat
    const handleLoad = () => {
      console.log("Model berhasil dimuat");
      setLoading(false);

      // Putar audio setelah model dimuat
      if (audioRef.current) {
        // Mencoba autoplay dengan user interaction
        const playPromise = audioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setAudioPlaying(true);
              console.log("Audio berhasil diputar otomatis");
            })
            .catch((error) => {
              console.log("Autoplay tidak diizinkan:", error);
              // Autoplay tidak diizinkan, tampilkan tombol play
              setAudioPlaying(false);
            });
        }
      }
    };

    // Tangani error loading
    const handleError = (error) => {
      console.error("Error loading model:", error);
      setModelError(true);
      setLoading(false);
    };

    model.addEventListener("progress", handleProgress);
    model.addEventListener("load", handleLoad);
    model.addEventListener("error", handleError);

    // Timeout untuk memastikan loading overlay dihapus
    const timeout = setTimeout(() => {
      if (loading) {
        setLoading(false);
      }
    }, 15000);

    return () => {
      model.removeEventListener("progress", handleProgress);
      model.removeEventListener("load", handleLoad);
      model.removeEventListener("error", handleError);
      clearTimeout(timeout);
    };
  }, [loading]);

  // Buat elemen petal untuk animasi
  const renderPetals = () => {
    const petals = [];
    for (let i = 0; i < 15; i++) {
      const style = {
        width: `${8 + Math.random() * 8}px`,
        height: `${8 + Math.random() * 8}px`,
        left: `${Math.random() * 100}%`,
        animationDuration: `${10 + Math.random() * 10}s`,
        animationDelay: `${Math.random() * 10}s`,
      };
      petals.push(<div className="petal" style={style} key={i}></div>);
    }
    return petals;
  };

  // Toggle audio play/pause
  const toggleAudio = () => {
    if (audioRef.current) {
      if (audioPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setAudioPlaying(!audioPlaying);
    }
  };

  return (
    <>
      {loading && (
        <div className="loading-overlay">
          <div className="spinner"></div>
          <p className="loading-text">
            tunggu bentar yh sayang... {loadingProgress}%
          </p>
          {modelError && (
            <p className="loading-error">
              Error loading model. Coba refresh halaman.
            </p>
          )}
        </div>
      )}

      <div className="night"></div>

      {/* Audio Player */}
      <audio
        ref={audioRef}
        src="./audio/youll-be-in-my-heart.mp3"
        loop
        preload="auto"
      />

      {/* Audio Control Button */}
      <button
        className="audio-control"
        onClick={toggleAudio}
        aria-label={audioPlaying ? "Pause music" : "Play music"}
      >
        {audioPlaying ? "🔊" : "🔇"}
      </button>

      <div className="main-container">
        {/* Left side flowers */}
        <div className="flower-container flower-container--left">
          <div className="flowers">
            <div className="flower flower--1">
              <div className="flower__leafs flower__leafs--1">
                <div className="flower__leaf flower__leaf--1"></div>
                <div className="flower__leaf flower__leaf--2"></div>
                <div className="flower__leaf flower__leaf--3"></div>
                <div className="flower__leaf flower__leaf--4"></div>
                <div className="flower__white-circle"></div>

                <div className="flower__light flower__light--1"></div>
                <div className="flower__light flower__light--2"></div>
                <div className="flower__light flower__light--3"></div>
                <div className="flower__light flower__light--4"></div>
              </div>
              <div className="flower__line">
                <div className="flower__line__leaf flower__line__leaf--1"></div>
                <div className="flower__line__leaf flower__line__leaf--2"></div>
                <div className="flower__line__leaf flower__line__leaf--3"></div>
                <div className="flower__line__leaf flower__line__leaf--4"></div>
              </div>
            </div>

            <div className="growing-grass">
              <div className="flower__grass flower__grass--1">
                <div className="flower__grass--top"></div>
                <div className="flower__grass--bottom"></div>
                <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                <div className="flower__grass__leaf flower__grass__leaf--4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Center model viewer */}
        <div className="model-container">
          <h1 className="graduation-text" id="message">
            Happy Graduation
          </h1>
          <model-viewer
            ref={modelRef}
            id="flower-model"
            src="./models/flower_bouquet.glb" // Perhatikan perubahan path
            alt="Buket Mawar 3D"
            auto-rotate
            camera-controls
            camera-orbit="0deg 75deg 6m"
            field-of-view="30deg"
            reveal="auto"
            ar
            ar-modes="webxr scene-viewer quick-look"
            loading="eager"
            poster="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
          ></model-viewer>
          <h2 className="love-text">My Love Risa</h2>
        </div>

        {/* Right side flowers */}
        <div className="flower-container flower-container--right">
          <div className="flowers">
            <div className="flower flower--2">
              <div className="flower__leafs flower__leafs--2">
                <div className="flower__leaf flower__leaf--1"></div>
                <div className="flower__leaf flower__leaf--2"></div>
                <div className="flower__leaf flower__leaf--3"></div>
                <div className="flower__leaf flower__leaf--4"></div>
                <div className="flower__white-circle"></div>

                <div className="flower__light flower__light--1"></div>
                <div className="flower__light flower__light--2"></div>
                <div className="flower__light flower__light--3"></div>
                <div className="flower__light flower__light--4"></div>
              </div>
              <div className="flower__line">
                <div className="flower__line__leaf flower__line__leaf--1"></div>
                <div className="flower__line__leaf flower__line__leaf--2"></div>
                <div className="flower__line__leaf flower__line__leaf--3"></div>
                <div className="flower__line__leaf flower__line__leaf--4"></div>
              </div>
            </div>

            <div className="flower flower--3">
              <div className="flower__leafs flower__leafs--3">
                <div className="flower__leaf flower__leaf--1"></div>
                <div className="flower__leaf flower__leaf--2"></div>
                <div className="flower__leaf flower__leaf--3"></div>
                <div className="flower__leaf flower__leaf--4"></div>
                <div className="flower__white-circle"></div>

                <div className="flower__light flower__light--1"></div>
                <div className="flower__light flower__light--2"></div>
                <div className="flower__light flower__light--3"></div>
                <div className="flower__light flower__light--4"></div>
              </div>
              <div className="flower__line">
                <div className="flower__line__leaf flower__line__leaf--1"></div>
                <div className="flower__line__leaf flower__line__leaf--2"></div>
                <div className="flower__line__leaf flower__line__leaf--3"></div>
                <div className="flower__line__leaf flower__line__leaf--4"></div>
              </div>
            </div>

            <div className="growing-grass">
              <div className="flower__grass flower__grass--2">
                <div className="flower__grass--top"></div>
                <div className="flower__grass--bottom"></div>
                <div className="flower__grass__leaf flower__grass__leaf--1"></div>
                <div className="flower__grass__leaf flower__grass__leaf--2"></div>
                <div className="flower__grass__leaf flower__grass__leaf--3"></div>
                <div className="flower__grass__leaf flower__grass__leaf--4"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Falling petals animation */}
        <div className="petals-container">{renderPetals()}</div>
      </div>
    </>
  );
}

export default App;
