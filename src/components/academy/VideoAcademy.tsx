import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, Pause, Volume2, VolumeX, Tv, Film, Cross, Church, Info, Maximize } from 'lucide-react';

const channels = [
  {
    id: 'opentheo-live',
    title: 'OpenTheo Masterclass',
    icon: Tv,
    desc: 'Deep theological insights and historical analysis from the OpenTheo archives (Alastair Roberts).',
    url: 'https://www.youtube.com/embed/videoseries?list=PLpX7pS89pS6YJ7T-_88Xq9pA89_S_m9y', 
    type: 'scholar'
  },
  {
    id: 'mass',
    title: 'Vatican Live',
    icon: Cross,
    desc: 'Live broadcast and historical records from the Holy See.',
    url: 'https://www.youtube.com/embed/live_stream?channel=UC7E-LYc1wivk33iyt5bR5zQ',
    type: 'live'
  },
  {
    id: 'evangelical',
    title: 'Ecumenical Streams',
    icon: Church,
    desc: 'Diverse worship and word from the global faith ecosystem.',
    url: 'https://www.youtube.com/embed/videoseries?list=PL2fSj_l_f_s3Y_zQzS_m9yA1S6m_N7_S', 
    type: 'live'
  },
  {
    id: 'cinema',
    title: 'Sacred Cinema',
    icon: Film,
    desc: 'Curated collection of faith-based films and biblical epics.',
    url: 'https://www.youtube.com/embed/tM1XmN4L1lM', 
    type: 'movie'
  }
];

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

export default function VideoAcademy() {
  const [activeChannel, setActiveChannel] = useState(channels[0]);
  const [player, setPlayer] = useState<any>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(100);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<HTMLDivElement>(null);
  const iframeId = `yt-player-${activeChannel.id}`;

  // Load YouTube API
  useEffect(() => {
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      window.onYouTubeIframeAPIReady = () => {
        initPlayer();
      };
    } else {
      initPlayer();
    }

    return () => {
      if (player) player.destroy();
    };
  }, [activeChannel.id]);

  const initPlayer = () => {
    if (window.YT && window.YT.Player) {
      const newPlayer = new window.YT.Player(iframeId, {
        events: {
          onReady: (event: any) => {
            setPlayer(event.target);
            setDuration(event.target.getDuration());
            setVolume(event.target.getVolume());
            setIsMuted(event.target.isMuted());
          },
          onStateChange: (event: any) => {
            setIsPlaying(event.data === window.YT.PlayerState.PLAYING);
          },
        },
      });
    }
  };

  // Sync state with player
  useEffect(() => {
    const interval = setInterval(() => {
      if (player && isPlaying) {
        setCurrentTime(player.getCurrentTime());
        // Duration might change for playlists or live streams
        const d = player.getDuration();
        if (d !== duration) setDuration(d);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, [player, isPlaying, duration]);

  const togglePlay = () => {
    if (!player) return;
    if (isPlaying) {
      player.pauseVideo();
    } else {
      player.playVideo();
    }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player) return;
    const time = parseFloat(e.target.value);
    player.seekTo(time, true);
    setCurrentTime(time);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!player) return;
    const v = parseInt(e.target.value);
    player.setVolume(v);
    setVolume(v);
    if (v > 0) {
      player.unMute();
      setIsMuted(false);
    }
  };

  const toggleMute = () => {
    if (!player) return;
    if (isMuted) {
      player.unMute();
      setIsMuted(false);
    } else {
      player.mute();
      setIsMuted(true);
    }
  };

  const formatTime = (seconds: number) => {
    const h = Math.floor(seconds / 3600);
    const m = Math.floor((seconds % 3600) / 60);
    const s = Math.floor(seconds % 60);
    return [h > 0 ? h : null, m, s]
      .filter(x => x !== null)
      .map(x => x!.toString().padStart(2, '0'))
      .join(':');
  };

  const activeUrl = `${activeChannel.url}${activeChannel.url.includes('?') ? '&' : '?'}enablejsapi=1&origin=${window.location.origin}`;

  return (
    <section id="streams" className="bg-ink py-24 px-6 md:px-12 border-t border-gold/10">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="mb-4">
              <a target="_blank" href="https://faith.tools/app/525-opentheo?utm_source=badge&utm_medium=embed" className="inline-block transition-transform hover:scale-105" rel="noreferrer">
                <img style={{ maxHeight: '44px', maxWidth: '100%', aspectRatio: '1000/216', borderRadius: '4px', objectFit: 'cover' }} src="https://faith.tools/.netlify/images/?url=/embed-badge-featured-v2.png" alt="Featured on faith.tools" loading="lazy" />
              </a>
            </div>
            <span className="section-label">Broadcast Center</span>
            <h2 className="section-title">The Academy Live</h2>
          </div>
          <div className="flex items-center gap-4 text-gold/40 font-cinzel text-xs tracking-widest uppercase">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-crimson animate-pulse" />
              Live Now
            </span>
            <span>•</span>
            <span>4,281 Scholars Online</span>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Main Player */}
          <div className="lg:col-span-3">
            <div className="aspect-video w-full bg-black border border-gold/20 rounded-lg overflow-hidden shadow-2xl shadow-gold/5 relative group">
              <iframe
                id={iframeId}
                src={activeUrl}
                className="w-full h-full"
                title={activeChannel.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>

              {/* Custom Controls Overlay */}
              <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="space-y-4">
                  {/* Progress Bar */}
                  {duration > 0 && (
                    <div className="relative group/seek">
                      <input
                        type="range"
                        min="0"
                        max={duration}
                        value={currentTime}
                        onChange={handleSeek}
                        className="w-full h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold hover:h-2 transition-all"
                      />
                    </div>
                  )}

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                      <button 
                        onClick={togglePlay}
                        className="text-gold hover:text-gold-light transition-colors"
                      >
                        {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
                      </button>

                      <div className="flex items-center gap-3 group/volume">
                        <button onClick={toggleMute} className="text-gold/60 hover:text-gold transition-colors">
                          {isMuted || volume === 0 ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
                        </button>
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={isMuted ? 0 : volume}
                          onChange={handleVolumeChange}
                          className="w-20 h-1 bg-gold/20 rounded-lg appearance-none cursor-pointer accent-gold focus:outline-none"
                        />
                      </div>

                      <div className="text-[0.6rem] font-cinzel text-gold/60 tracking-widest uppercase">
                        {formatTime(currentTime)} / {formatTime(duration)}
                      </div>
                    </div>

                    <button className="text-gold/40 hover:text-gold transition-colors">
                      <Maximize className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-stone-light/30 border border-gold/10 rounded-lg backdrop-blur-sm">
              <div className="flex items-center gap-4 mb-4">
                <activeChannel.icon className="w-6 h-6 text-gold" />
                <h3 className="font-cinzel text-xl text-parchment tracking-widest uppercase">{activeChannel.title}</h3>
              </div>
              <p className="font-cormorant text-parchment/60 text-lg leading-relaxed">
                {activeChannel.desc}
              </p>
            </div>
          </div>

          {/* Sidebar Channels */}
          <div className="space-y-4">
            <h4 className="font-cinzel text-xs tracking-[0.2em] text-gold/40 uppercase mb-4 px-2">Select Channel</h4>
            {channels.map((channel) => (
              <button
                key={channel.id}
                onClick={() => setActiveChannel(channel)}
                className={`w-full text-left p-4 rounded-lg border transition-all duration-300 group ${
                  activeChannel.id === channel.id 
                    ? 'bg-gold/10 border-gold/40 shadow-lg' 
                    : 'bg-stone-light/20 border-gold/5 hover:border-gold/20 hover:bg-stone-light/40'
                }`}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded bg-ink border ${
                    activeChannel.id === channel.id ? 'border-gold/40' : 'border-gold/10'
                  }`}>
                    <channel.icon className={`w-5 h-5 ${
                      activeChannel.id === channel.id ? 'text-gold' : 'text-gold/40'
                    }`} />
                  </div>
                  <div>
                    <div className={`font-cinzel text-[0.7rem] tracking-widest uppercase mb-1 ${
                      activeChannel.id === channel.id ? 'text-gold' : 'text-parchment/60'
                    }`}>
                      {channel.title}
                    </div>
                    <div className="text-[0.6rem] font-sans text-parchment/40 uppercase tracking-tighter">
                      {channel.type === 'live' ? 'Live Stream' : channel.type === 'scholar' ? 'Masterclass' : 'Feature Film'}
                    </div>
                  </div>
                </div>
              </button>
            ))}

            <div className="mt-8 p-6 border border-gold/10 rounded-lg bg-gold/5 italic text-sm font-cormorant text-parchment/40">
              <Info className="w-4 h-4 mb-3 text-gold/60" />
              <p className="mb-4">Broadcasts are optimized for 4K viewing. Access the complete digital teaching archive at <a href="https://opentheo.org/?ref=faith.tools" target="_blank" rel="noreferrer" className="text-gold underline">OpenTheo</a>.</p>
              Academic transmission may vary by region.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
