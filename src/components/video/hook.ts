// 视频播放器hook - 封装视频播放的所有逻辑
import { useState, useRef, useCallback, useEffect } from 'react';
import { type VideoPlayerState, type VideoPlayerProps } from './types';

// 接收props参数，返回视频播放器的所有状态和方法
export const useVideoPlayer = (props: VideoPlayerProps) => {
  // 创建视频元素的引用，用于直接操作DOM中的video标签
  const videoRef = useRef<HTMLVideoElement>(null);
  // 创建容器的引用，用于全屏等操作
  const containerRef = useRef<HTMLDivElement>(null);
  // 控制栏自动隐藏的定时器引用
  const controlsTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // 视频播放器的状态管理
  // useState返回一个数组：[状态值, 更新状态的函数]
  const [state, setState] = useState<VideoPlayerState>({
    isPlaying: false,        // 是否正在播放
    currentTime: 0,          // 当前播放时间（秒）
    duration: 0,             // 视频总时长（秒）
    volume: 1,               // 音量（0-1）
    isMuted: false,          // 是否静音
    isFullscreen: false,     // 是否全屏
    buffered: null,          // 已缓冲的时间范围
    error: null,             // 错误信息
    quality: 'auto',         // 视频质量
    playbackRate: 1,         // 播放速度
    showControls: true,      // 是否显示控制栏
    isLoading: true          // 是否正在加载
  });

  // 播放/暂停切换函数
  // useCallback用于缓存函数，避免每次渲染都创建新函数
  const togglePlay = useCallback(() => {
    if (videoRef.current) {  // 确保video元素存在
      if (state.isPlaying) {
        videoRef.current.pause();  // 如果正在播放，则暂停
      } else {
        videoRef.current.play();   // 如果已暂停，则播放
      }
    }
  }, [state.isPlaying]);  // 依赖项：当isPlaying变化时重新创建函数

  // 设置播放时间函数
  const setCurrentTime = useCallback((time: number) => {
    if (videoRef.current) {
      videoRef.current.currentTime = time;  // 直接设置video的当前时间
    }
  }, []);  // 空依赖数组，函数永远不会重新创建

  // 设置音量函数
  const setVolume = useCallback((volume: number) => {
    if (videoRef.current) {
      videoRef.current.volume = volume;  // 设置video的音量
      setState(prev => ({ ...prev, volume }));  // 更新状态中的音量
    }
  }, []);

  // 静音切换函数
  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !state.isMuted;  // 切换video的静音状态
      setState(prev => ({ ...prev, isMuted: !prev.isMuted }));  // 更新状态
    }
  }, [state.isMuted]);

  // 设置播放速度函数
  const setPlaybackRate = useCallback((rate: number) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;  // 设置播放速度
      setState(prev => ({ ...prev, playbackRate: rate }));  // 更新状态
    }
  }, []);

  // 全屏切换函数
  const toggleFullscreen = useCallback(async () => {
    if (!document.fullscreenElement) {  // 如果当前没有全屏元素
      if (containerRef.current) {
        await containerRef.current.requestFullscreen();  // 进入全屏
      }
    } else {
      await document.exitFullscreen();  // 退出全屏
    }
  }, []);

  // 显示/隐藏控制栏函数
  const showControls = useCallback(() => {
    setState(prev => ({ ...prev, showControls: true }));  // 显示控制栏
    
    // 清除之前的定时器
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    
    // 3秒后自动隐藏控制栏（仅在播放时）
    controlsTimeoutRef.current = setTimeout(() => {
      if (state.isPlaying) {
        setState(prev => ({ ...prev, showControls: false }));
      }
    }, 3000);
  }, [state.isPlaying]);

  // 格式化时间函数：将秒数转换为 "MM:SS" 格式
  const formatTime = useCallback((seconds: number): string => {
    const mins = Math.floor(seconds / 60);  // 计算分钟
    const secs = Math.floor(seconds % 60);  // 计算秒数
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  }, []);

  // useEffect：处理副作用（事件监听、DOM操作等）
  // 这个useEffect在组件挂载时执行，在组件卸载时清理
  useEffect(() => {
    const video = videoRef.current;  // 获取video元素
    if (!video) return;  // 如果video不存在，直接返回

    // 播放事件处理函数
    const handlePlay = () => {
      setState(prev => ({ ...prev, isPlaying: true, error: null }));  // 更新播放状态，清除错误
      props.onPlay?.();  // 调用父组件传入的onPlay回调（如果存在）
    };

    // 暂停事件处理函数
    const handlePause = () => {
      setState(prev => ({ ...prev, isPlaying: false }));  // 更新暂停状态
      props.onPause?.();  // 调用父组件的onPause回调
    };

    // 时间更新事件处理函数（播放过程中持续触发）
    const handleTimeUpdate = () => {
      setState(prev => ({ ...prev, currentTime: video.currentTime }));  // 更新当前时间
      props.onTimeUpdate?.(video.currentTime);  // 调用父组件的onTimeUpdate回调
    };

    // 元数据加载完成事件处理函数
    const handleLoadedMetadata = () => {
      setState(prev => ({ 
        ...prev, 
        duration: video.duration,  // 设置视频总时长
        isLoading: false           // 标记加载完成
      }));
    };

    // 缓冲进度更新事件处理函数
    const handleProgress = () => {
      setState(prev => ({ ...prev, buffered: video.buffered }));  // 更新缓冲信息
      // 计算已缓冲的时长和总时长，传给父组件
      props.onProgress?.(video.buffered.length > 0 ? video.buffered.end(0) : 0, video.duration);
    };

    // 音量变化事件处理函数
    const handleVolumeChange = () => {
      setState(prev => ({ 
        ...prev, 
        volume: video.volume,    // 更新音量
        isMuted: video.muted     // 更新静音状态
      }));
      props.onVolumeChange?.(video.volume);  // 调用父组件的onVolumeChange回调
    };

    // 播放结束事件处理函数
    const handleEnded = () => {
      setState(prev => ({ ...prev, isPlaying: false }));  // 更新播放状态
      props.onEnded?.();  // 调用父组件的onEnded回调
    };

    // 错误事件处理函数
    const handleError = () => {
      setState(prev => ({ 
        ...prev, 
        error: '视频加载失败',  // 设置错误信息
        isLoading: false        // 标记加载完成（失败也算完成）
      }));
      props.onError?.(video.error);  // 调用父组件的onError回调
    };

    // 全屏状态变化事件处理函数
    const handleFullscreenChange = () => {
      setState(prev => ({ 
        ...prev, 
        isFullscreen: !!document.fullscreenElement  // 检查是否有全屏元素
      }));
      props.onFullscreenChange?.(!!document.fullscreenElement);  // 调用父组件的回调
    };

    // 绑定视频事件监听器
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('timeupdate', handleTimeUpdate);
    video.addEventListener('loadedmetadata', handleLoadedMetadata);
    video.addEventListener('progress', handleProgress);
    video.addEventListener('volumechange', handleVolumeChange);
    video.addEventListener('ended', handleEnded);
    video.addEventListener('error', handleError);
    document.addEventListener('fullscreenchange', handleFullscreenChange);

    // 键盘事件处理函数
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.code) {
        case 'Space':  // 空格键：播放/暂停
          e.preventDefault();  // 阻止默认行为（页面滚动）
          togglePlay();
          break;
        case 'ArrowLeft':  // 左箭头：快退10秒
          e.preventDefault();
          setCurrentTime(Math.max(0, state.currentTime - 10));  // 确保不会小于0
          break;
        case 'ArrowRight':  // 右箭头：快进10秒
          e.preventDefault();
          setCurrentTime(Math.min(state.duration, state.currentTime + 10));  // 确保不会超过总时长
          break;
        case 'ArrowUp':  // 上箭头：音量增加
          e.preventDefault();
          setVolume(Math.min(1, state.volume + 0.1));  // 确保音量不超过1
          break;
        case 'ArrowDown':  // 下箭头：音量减少
          e.preventDefault();
          setVolume(Math.max(0, state.volume - 0.1));  // 确保音量不小于0
          break;
        case 'KeyF':  // F键：切换全屏
          e.preventDefault();
          toggleFullscreen();
          break;
      }
    };

    // 绑定键盘事件监听器
    document.addEventListener('keydown', handleKeyDown);

    // 清理函数：组件卸载时执行
    return () => {
      // 移除所有视频事件监听器
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('timeupdate', handleTimeUpdate);
      video.removeEventListener('loadedmetadata', handleLoadedMetadata);
      video.removeEventListener('progress', handleProgress);
      video.removeEventListener('volumechange', handleVolumeChange);
      video.removeEventListener('ended', handleEnded);
      video.removeEventListener('error', handleError);
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('keydown', handleKeyDown);
      
      // 清除控制栏隐藏定时器
      if (controlsTimeoutRef.current) {
        clearTimeout(controlsTimeoutRef.current);
      }
    };
  }, [props, state.currentTime, state.duration, state.volume, togglePlay, setCurrentTime, setVolume, toggleFullscreen]);

  // 返回给组件使用的所有状态和方法
  return {
    videoRef,           // 视频元素引用
    containerRef,       // 容器元素引用
    state,              // 所有状态
    togglePlay,         // 播放/暂停方法
    setCurrentTime,     // 设置播放时间方法
    setVolume,          // 设置音量方法
    toggleMute,         // 静音切换方法
    setPlaybackRate,    // 设置播放速度方法
    toggleFullscreen,   // 全屏切换方法
    showControls,       // 显示控制栏方法
    formatTime          // 格式化时间方法
  };
};