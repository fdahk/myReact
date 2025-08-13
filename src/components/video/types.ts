
export interface VideoPlayerProps {
    src: string; // 视频源
    poster?: string; // 封面
    autoplay?: boolean; // 是否自动播放
    controls?: boolean; // 是否显示控制栏
    loop?: boolean; // 是否循环播放
    muted?: boolean; // 是否静音
    preload?: 'auto' | 'metadata' | 'none'; // 预加载
    width?: number | string; // 宽度
    height?: number | string; // 高度
    onPlay?: () => void; // 播放事件
    onPause?: () => void; // 暂停事件
    onEnded?: () => void; // 结束事件
    onError?: (error: any) => void; // 错误事件
    onTimeUpdate?: (currentTime: number) => void; // 时间更新事件
    onProgress?: (loaded: number, total: number) => void; // 进度更新事件
    onVolumeChange?: (volume: number) => void; // 音量变化事件
    onFullscreenChange?: (isFullscreen: boolean) => void; // 全屏变化事件
  }
  
  export interface VideoPlayerState {
    isPlaying: boolean; // 是否正在播放
    currentTime: number; // 当前播放时间
    duration: number; // 视频总时长
    volume: number; // 音量
    isMuted: boolean; // 是否静音
    isFullscreen: boolean; // 是否全屏
    buffered: TimeRanges | null; // 已缓冲的时间范围
    error: string | null; // 错误信息
    quality: string; // 视频质量
    playbackRate: number; // 播放速度
    showControls: boolean; // 是否显示控制栏
    isLoading: boolean; // 是否正在加载
  }
  
  export interface VideoQuality {
    label: string; // 标签
    value: string; // 值
    src: string; // 视频源
  }
  
  export interface Subtitle {
    label: string; // 标签
    value: string; // 值
    src: string; // 视频源
  }