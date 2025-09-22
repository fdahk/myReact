// 视频播放器组件
import React from 'react';
import { useVideoPlayer } from './hook';
import { VideoControls } from './control';
import { type VideoPlayerProps } from './types';
import styles from './video.module.scss';

// 视频播放器组件
export const VideoPlayer: React.FC<VideoPlayerProps> = (props) => {
  //获取hook的方法和属性
  const {
    videoRef, // 视频元素引用
    containerRef, // 容器元素引用
    state, // 状态
    togglePlay, // 播放/暂停
    setCurrentTime, // 设置播放时间
    setVolume, // 设置音量
    toggleMute, // 静音切换
    setPlaybackRate, // 设置播放速度
    toggleFullscreen, // 全屏切换
    showControls, // 显示控制栏
    formatTime // 格式化时间
  } = useVideoPlayer(props);

  // 视频点击事件
  const handleVideoClick = () => {
    togglePlay();
  };

  // 鼠标移动事件
  const handleMouseMove = () => {
    showControls();
  };

  // 双击事件
  const handleDoubleClick = () => {
    toggleFullscreen();
  };

  return (
    // 视频播放器容器
    <div 
      ref={containerRef}
      className={`${styles['video-player']} ${state.isFullscreen ? styles['fullscreen'] : ''}`}
      onMouseMove={handleMouseMove}
      onDoubleClick={handleDoubleClick}
    >
      {/* 视频元素 */}
      <video
        ref={videoRef}
        src={props.src}
        poster={props.poster}
        autoPlay={props.autoplay}
        loop={props.loop}
        muted={props.muted}
        preload={props.preload}
        style={{
          width: props.width || '100%',
          height: props.height || '100%'
        }}
      />

      {/* 加载状态 */}
      {state.isLoading && (
        <div className={styles['loading-overlay']}>
          <div className={styles['loading-spinner']}>加载中...</div>
        </div>
      )}

      {/* 错误状态 */}
      {state.error && (
        <div className={styles['error-overlay']}>
          <div className={styles['error-message']}>
            <p>{state.error}</p>
            <button onClick={() => window.location.reload()}>
              重新加载
            </button>
          </div>
        </div>
      )}

      {/* 播放按钮覆盖层 */}
      {!state.isPlaying && !state.error && (
        <div className={styles['play-overlay']} onClick={handleVideoClick}>
          <div className={styles['play-button']}>▶️</div>
        </div>
      )}

      {/* 控制栏 */}
      {state.showControls && (
        <div className={styles['controls-overlay']}>
          <VideoControls
            state={state} // 状态
            onTogglePlay={togglePlay} // 播放/暂停
            onSetCurrentTime={setCurrentTime} // 设置播放时间
            onSetVolume={setVolume} // 设置音量
            onToggleMute={toggleMute} // 静音切换
            onSetPlaybackRate={setPlaybackRate} // 设置播放速度
            onToggleFullscreen={toggleFullscreen} // 全屏切换
            formatTime={formatTime} // 格式化时间
          />
        </div>
      )}
    </div>
  )
}