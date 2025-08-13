// 视频控制器
import React from 'react';
import { type VideoPlayerState } from './types';
import styles from './control.module.scss';
// 视频控制器props
interface VideoControlsProps {
  state: VideoPlayerState;
  onTogglePlay: () => void;
  onSetCurrentTime: (time: number) => void;
  onSetVolume: (volume: number) => void;
  onToggleMute: () => void;
  onSetPlaybackRate: (rate: number) => void;
  onToggleFullscreen: () => void;
  formatTime: (time: number) => string;
}

export const VideoControls: React.FC<VideoControlsProps> = ({
  state,
  onTogglePlay,
  onSetCurrentTime,
  onSetVolume,
  onToggleMute,
  onSetPlaybackRate,
  onToggleFullscreen,
  formatTime
}) => {
  // 播放速度
  const playbackRates = [0.5, 0.75, 1, 1.25, 1.5, 2];
  // 进度条变化
  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const time = (parseFloat(e.target.value) / 100) * state.duration; // 计算时间
    onSetCurrentTime(time); // 设置播放时间
  };

  // 音量变化
  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const volume = parseFloat(e.target.value); // 获取音量
    onSetVolume(volume); // 设置音量
  };

  return (
    <div className={styles['video-controls']}>
      {/* 进度条 */}
      <div className={styles['progress-bar']}>
        <input
          type="range"
          min="0"
          max="100"
          value={(state.currentTime / state.duration) * 100 || 0}
          onChange={handleProgressChange}
          className={styles['progress-slider']}
        />
        <div 
          className={styles['progress-buffered']}
          style={{ 
            width: `${state.buffered && state.buffered.length > 0 
              ? (state.buffered.end(0) / state.duration) * 100 
              : 0}%` 
          }}
        />
      </div>

      {/* 控制按钮 */}
      <div className={styles['controls-main']}>
        <div className={styles['controls-left']}>
          {/* 播放/暂停按钮 */}
          <button 
            className={styles['play-btn']}
            onClick={onTogglePlay}
          >
            {state.isPlaying ? '⏸️' : '▶️'}
          </button>

          {/* 时间显示 */}
          <span className={styles['time-display']}>
            {formatTime(state.currentTime)} / {formatTime(state.duration)}
          </span>
        </div>

        <div className={styles['controls-right']}>
          {/* 音量控制 */}
          <div className={styles['volume-control']}>
            <button 
              className={styles['volume-btn']}
              onClick={onToggleMute}
            >
              {state.isMuted || state.volume === 0 ? 'x' : 
               state.volume < 0.5 ? '🔉' : '🔊'}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={state.volume}
              onChange={handleVolumeChange}
              className={styles['volume-slider']}
            />
          </div>

          {/* 播放速度 */}
          <div className={styles['playback-rate']}>
            <select
              value={state.playbackRate}
              onChange={(e) => onSetPlaybackRate(parseFloat(e.target.value))}
            >
              {playbackRates.map(rate => (
                <option key={rate} value={rate}>
                  {rate}x
                </option>
              ))}
            </select>
          </div>

          {/* 全屏按钮 */}
          <button 
            className={styles['fullscreen-btn']}
            onClick={onToggleFullscreen}
          >
            {state.isFullscreen ? '⏹️' : '⛶'}
          </button>
        </div>
      </div>
    </div>
  );
};