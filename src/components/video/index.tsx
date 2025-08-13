import React from 'react';
import { VideoPlayer } from './video';

function App() {
  return (
    <div style={{ maxWidth: 800, margin: '0 auto' }}>
      <h2>视频播放器</h2>
      <VideoPlayer
        src="https://www.w3schools.com/html/mov_bbb.mp4"
        poster="https://peach.blender.org/wp-content/uploads/title_anouncement.jpg"
        width={800}
        height={450}
        autoplay={false}
        controls={true}
        preload="auto"
      />
    </div>
  );
}

export default App;