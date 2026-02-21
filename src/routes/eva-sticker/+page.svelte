<script>
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  // State
  let stickerText = '警告';
  let headerText = 'EMERGENCY';
  let dimension = 'square';
  let orientation = 'horizontal';
  let fontSize = 64;
  let headerFontSize = 32;
  let layoutMode = 'single';
  let multiLine = false;
  let traditionalChinese = false;
  let currentBg = '#FF6B35';
  let currentText = '#FFFFFF';
  let systemTime = '';
  let stickerPreview;

  // Color options
  const colors = [
    { name: 'NERV', bg: '#FF6B35', text: '#FFFFFF' },
    { name: 'MAGI', bg: '#00E676', text: '#000000' },
    { name: 'ALERT', bg: '#F44336', text: '#FFFFFF' },
    { name: 'CYAN', bg: '#00BCD4', text: '#000000' },
    { name: 'AT-FIELD', bg: '#FFC107', text: '#000000' },
    { name: 'PURPLE', bg: '#7B1FA2', text: '#FFFFFF' },
    { name: 'WHITE', bg: '#FFFFFF', text: '#000000' },
    { name: 'BLACK', bg: '#1A1A1A', text: '#FFFFFF' },
    { name: 'GRAY', bg: '#757575', text: '#FFFFFF' }
  ];

  // Simplified to Traditional Chinese conversion table
  const s2tMap = {
    '简': '簡', '体': '體', '转': '轉', '换': '換', '警': '警', '告': '告',
    '禁': '禁', '止': '止', '入': '入', '内': '內', '危': '危', '险': '險',
    '注': '注', '意': '意', '紧': '緊', '急': '急', '停': '停', '止': '止',
    '出': '出', '口': '口', '入': '入', '口': '口', '撤': '撤', '退': '退',
    '避': '避', '难': '難', '攻': '攻', '击': '擊', '防': '防', '御': '禦',
    '战': '戰', '斗': '鬥', '准': '準', '备': '備', '完': '完', '了': '了',
    '启': '啟', '动': '動', '终': '終', '了': '了', '士': '士', '兵': '兵',
    '队': '隊', '员': '員', '指': '指', '挥': '揮', '官': '官', '令': '令',
    '状': '狀', '态': '態', '初': '初', '号': '號', '机': '機', '器': '器',
    '人': '人', '使': '使', '徒': '徒', '袭': '襲', '来': '來', '作': '作',
    '战': '戰', '新': '新', '世': '世', '纪': '紀', '福': '福', '音': '音',
    '战': '戰', '士': '士', '绝': '絕', '对': '對', '领': '領', '域': '域',
    '同': '同', '步': '步', '率': '率', '超': '超', '过': '過', '百': '百',
    '分': '分', '之': '之', '四': '四', '百': '百', '泛': '泛', '滥': '濫',
    '崩': '崩', '坏': '壞', '侵': '侵', '蚀': '蝕', '拒': '拒', '绝': '絕',
    '接': '接', '触': '觸', '暴': '暴', '走': '走', '觉': '覺', '醒': '醒',
    '共': '共', '鸣': '鳴', '第': '第', '三': '三', '新': '新', '东': '東',
    '京': '京', '市': '市', '总': '總', '部': '部', '基': '基', '地': '地',
    '实': '實', '验': '驗', '验': '驗', '插': '插', '入': '入', '栓': '栓',
    '驾': '駕', '驶': '駛', '舱': '艙', '临': '臨', '界': '界', '深': '深',
    '度': '度', '下': '下', '降': '降', '电': '電', '源': '源', '断': '斷',
    '开': '開', '连': '連', '接': '接', '切': '切', '换': '換', '模': '模',
    '式': '式', '选': '選', '择': '擇', '确': '確', '认': '認', '开': '開',
    '始': '始', '结': '結', '束': '束', '复': '復', '位': '位', '再': '再',
    '启': '啟', '动': '動', '强': '強', '制': '制', '射': '射', '出': '出',
    '弹': '彈', '射': '射', '器': '器', '整': '整', '备': '備', '就': '就',
    '绪': '緒', '维': '維', '护': '護', '修': '修', '复': '復', '检': '檢',
    '查': '查', '完': '完', '成': '成', '警': '警', '戒': '戒', '等': '等',
    '级': '級', '特': '特', '殊': '殊', '一': '一', '般': '般', '通': '通',
    '常': '常', '红': '紅', '橙': '橙', '黄': '黃', '绿': '綠', '蓝': '藍',
    '紫': '紫', '白': '白', '黑': '黑', '灰': '灰', '金': '金', '银': '銀'
  };

  function toTraditional(text) {
    if (!traditionalChinese) return text;
    return text.split('').map(char => s2tMap[char] || char).join('');
  }

  $: displayText = toTraditional(stickerText);
  $: displayHeader = toTraditional(headerText);
  $: showHeader = layoutMode === 'header-main';

  function updateTime() {
    const now = new Date();
    systemTime = now.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    });
  }

  function selectColor(color) {
    currentBg = color.bg;
    currentText = color.text;
  }

  async function downloadSticker() {
    if (!browser) return;
    
    // Dynamically import html2canvas
    const html2canvas = (await import('html2canvas')).default;
    
    const canvas = await html2canvas(stickerPreview, {
      backgroundColor: null,
      scale: 2
    });
    
    const link = document.createElement('a');
    link.download = 'nerv-sticker-' + Date.now() + '.png';
    link.href = canvas.toDataURL();
    link.click();
  }

  onMount(() => {
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  });
</script>

<svelte:head>
  <title>NERV STICKER GENERATOR // SYSTEM</title>
  <meta name="description" content="Generate Evangelion-style warning stickers">
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Noto+Sans+JP:wght@400;700;900&family=Noto+Serif+JP:wght@400;700;900&family=Noto+Serif+SC:wght@400;700;900&family=Zen+Old+Mincho:wght@400;700;900&family=Oswald:wght@400;500;700&family=Share+Tech+Mono&family=Shippori+Mincho:wght@400;500;700&display=swap" rel="stylesheet">
</svelte:head>

<div class="eva-page">
  <div class="bg-grid"></div>
  <div class="scanlines"></div>
  
  <div class="container">
    <!-- Header -->
    <header>
      <div class="header-content">
        <div class="logo-section">
          <h1>NERV STICKER GENERATOR</h1>
          <p class="subtitle">SYSTEM // MAGI // <span id="system-time">{systemTime}</span></p>
        </div>
        <div class="status-indicator">
          <span class="status-dot"></span>
          <span class="status-text">SYSTEM NORMAL</span>
        </div>
      </div>
    </header>

    <div class="main-content">
      <!-- Controls Panel -->
      <div class="panel controls-panel">
        <div class="panel-header">
          <span class="panel-icon">◈</span>
          <h2>PARAMETER CONFIGURATION</h2>
        </div>
        
        <div class="panel-body">
          <!-- Layout Mode -->
          <div class="control-group">
            <label>LAYOUT MODE</label>
            <select bind:value={layoutMode}>
              <option value="single">Single Text</option>
              <option value="header-main">Header + Main</option>
            </select>
          </div>

          <!-- Header Text (conditional) -->
          {#if showHeader}
            <div class="control-group">
              <label>HEADER TEXT</label>
              <input type="text" bind:value={headerText} placeholder="Enter header text...">
            </div>

            <div class="control-group">
              <label>HEADER SIZE</label>
              <div class="slider-container">
                <input type="range" min="16" max="72" bind:value={headerFontSize}>
                <span class="slider-value">{headerFontSize}px</span>
              </div>
            </div>
          {/if}

          <!-- Main Text -->
          <div class="control-group">
            <label>MAIN TEXT</label>
            <textarea bind:value={stickerText} rows="3" placeholder="Enter sticker text..."></textarea>
          </div>

          <!-- Dimension -->
          <div class="control-group">
            <label>DIMENSION</label>
            <select bind:value={dimension}>
              <option value="square">SQUARE (1:1)</option>
              <option value="rectangle">RECTANGLE (4:3)</option>
            </select>
          </div>

          <!-- Orientation -->
          <div class="control-group">
            <label>ORIENTATION</label>
            <select bind:value={orientation}>
              <option value="horizontal">Horizontal</option>
              <option value="vertical">Vertical</option>
            </select>
          </div>

          <!-- Font Size -->
          <div class="control-group">
            <label>FONT SIZE</label>
            <div class="slider-container">
              <input type="range" min="24" max="120" bind:value={fontSize}>
              <span class="slider-value">{fontSize}px</span>
            </div>
          </div>

          <!-- Color Selection -->
          <div class="control-group">
            <label>COLOR SCHEME</label>
            <div class="color-grid">
              {#each colors as color}
                <button 
                  class="color-option"
                  class:active={currentBg === color.bg}
                  style="background-color: {color.bg}; color: {color.text};"
                  on:click={() => selectColor(color)}
                >
                  {color.name}
                </button>
              {/each}
            </div>
          </div>

          <!-- Options -->
          <div class="control-group options-group">
            <label class="checkbox-label">
              <input type="checkbox" bind:checked={multiLine}>
              <span>Multi-line Support</span>
            </label>
            <label class="checkbox-label">
              <input type="checkbox" bind:checked={traditionalChinese}>
              <span>Traditional Chinese</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Preview Panel -->
      <div class="panel preview-panel">
        <div class="panel-header">
          <span class="panel-icon">◉</span>
          <h2>PREVIEW // OUTPUT</h2>
        </div>
        
        <div class="panel-body preview-area">
          <div 
            bind:this={stickerPreview}
            id="sticker-preview"
            class="{dimension}"
            class:vertical={orientation === 'vertical'}
            class:single={!showHeader}
            class:header-main={showHeader}
            style="background-color: {currentBg}; color: {currentText};"
          >
            {#if showHeader}
              <div class="sticker-header" style="font-size: {headerFontSize}px;">
                {displayHeader}
              </div>
            {/if}
            <div class="sticker-main" style="font-size: {fontSize}px; white-space: {multiLine ? 'pre-wrap' : 'nowrap'};">
              {displayText}
            </div>
          </div>
        </div>

        <div class="panel-footer">
          <button class="download-btn" on:click={downloadSticker}>
            <span class="btn-icon">▼</span>
            <span class="btn-text">DOWNLOAD PNG</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  :global(body) {
    margin: 0;
    padding: 0;
  }

  .eva-page {
    --nerv-orange: #FF6B35;
    --magi-green: #00C853;
    --terminal-cyan: #0097A7;
    --alert-red: #D32F2F;
    --at-field: #FFA000;
    --light-bg: #f5f5f5;
    --panel-bg: rgba(255, 255, 255, 0.95);
    --text-primary: #1a1a1a;
    --text-secondary: #444;
    --border-color: rgba(0, 151, 167, 0.3);
    
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans JP', sans-serif;
    background: var(--light-bg);
    min-height: 100vh;
    color: var(--text-primary);
    overflow-x: hidden;
    position: relative;
  }

  /* Background Grid */
  .bg-grid {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      linear-gradient(30deg, rgba(0, 151, 167, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 151, 167, 0.05) 87.5%, rgba(0, 151, 167, 0.05)),
      linear-gradient(150deg, rgba(0, 151, 167, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 151, 167, 0.05) 87.5%, rgba(0, 151, 167, 0.05)),
      linear-gradient(30deg, rgba(0, 151, 167, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 151, 167, 0.05) 87.5%, rgba(0, 151, 167, 0.05)),
      linear-gradient(150deg, rgba(0, 151, 167, 0.05) 12%, transparent 12.5%, transparent 87%, rgba(0, 151, 167, 0.05) 87.5%, rgba(0, 151, 167, 0.05)),
      linear-gradient(60deg, rgba(255, 107, 53, 0.03) 25%, transparent 25.5%, transparent 75%, rgba(255, 107, 53, 0.03) 75%, rgba(255, 107, 53, 0.03)),
      linear-gradient(60deg, rgba(255, 107, 53, 0.03) 25%, transparent 25.5%, transparent 75%, rgba(255, 107, 53, 0.03) 75%, rgba(255, 107, 53, 0.03));
    background-size: 80px 140px;
    background-position: 0 0, 0 0, 40px 70px, 40px 70px, 0 0, 40px 70px;
    pointer-events: none;
    z-index: 0;
  }

  /* Scanline Effect - subtle on light background */
  .scanlines {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      to bottom,
      rgba(0,0,0,0),
      rgba(0,0,0,0) 50%,
      rgba(0,0,0,0.02) 50%,
      rgba(0,0,0,0.02)
    );
    background-size: 100% 4px;
    pointer-events: none;
    z-index: 1;
    opacity: 0.5;
  }

  .container {
    position: relative;
    z-index: 2;
    max-width: 1600px;
    margin: 0 auto;
    padding: 20px;
  }

  /* Header */
  header {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 245, 245, 0.8) 100%);
    border-bottom: 2px solid var(--nerv-orange);
    padding: 30px 40px;
    margin-bottom: 40px;
    position: relative;
    box-shadow: 0 2px 20px rgba(0, 0, 0, 0.05);
  }

  header::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, var(--nerv-orange), var(--terminal-cyan), var(--nerv-orange));
    animation: headerGlow 3s ease-in-out infinite;
  }

  @keyframes headerGlow {
    0%, 100% { opacity: 0.5; }
    50% { opacity: 1; }
  }

  .header-content {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .logo-section h1 {
    font-family: 'Oswald', sans-serif;
    font-size: 2.8rem;
    font-weight: 400;
    letter-spacing: 0.2em;
    color: var(--nerv-orange);
    text-shadow: 
      0 0 10px rgba(255, 107, 53, 0.8),
      0 0 20px rgba(255, 107, 53, 0.4);
    margin: 0;
  }

  .subtitle {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    color: var(--terminal-cyan);
    margin-top: 10px;
    letter-spacing: 0.1em;
    opacity: 0.8;
  }

  .status-indicator {
    display: flex;
    align-items: center;
    gap: 10px;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.85rem;
  }

  .status-dot {
    width: 8px;
    height: 8px;
    background: var(--magi-green);
    border-radius: 50%;
    box-shadow: 0 0 10px var(--magi-green);
    animation: pulse 2s infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.5; }
  }

  .status-text {
    color: var(--magi-green);
    letter-spacing: 0.1em;
    font-weight: 600;
  }

  /* Main Content - Single column by default for homepage compatibility */
  .main-content {
    display: flex;
    flex-direction: column;
    gap: 30px;
    max-width: 800px;
    margin: 0 auto;
  }

  /* Only show side-by-side on very wide screens */
  @media (min-width: 1400px) {
    .main-content {
      display: grid;
      grid-template-columns: 380px 1fr;
      max-width: none;
    }
  }

  /* Panel */
  .panel {
    background: var(--panel-bg);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
    overflow: hidden;
  }

  .panel-header {
    background: rgba(0, 151, 167, 0.08);
    padding: 15px 20px;
    border-bottom: 1px solid var(--border-color);
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .panel-icon {
    color: var(--terminal-cyan);
    font-size: 1.2rem;
    opacity: 0.9;
  }

  .panel-header h2 {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.9rem;
    font-weight: 500;
    letter-spacing: 0.15em;
    color: var(--terminal-cyan);
    margin: 0;
  }

  .panel-body {
    padding: 25px;
  }

  .panel-footer {
    padding: 20px 25px;
    border-top: 1px solid var(--border-color);
  }

  /* Control Groups */
  .control-group {
    margin-bottom: 25px;
  }

  .control-group label {
    display: block;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.75rem;
    letter-spacing: 0.1em;
    color: var(--text-secondary);
    margin-bottom: 8px;
    font-weight: 500;
  }

  .control-group input[type="text"],
  .control-group textarea,
  .control-group select {
    width: 100%;
    max-width: 100%;
    box-sizing: border-box;
    padding: 12px 15px;
    background: rgba(255, 255, 255, 0.8);
    border: 1px solid var(--border-color);
    border-radius: 4px;
    color: var(--text-primary);
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Noto Sans JP', sans-serif;
    font-size: 0.95rem;
    transition: all 0.3s;
    box-shadow: inset 0 1px 3px rgba(0, 0, 0, 0.05);
  }

  .control-group input:focus,
  .control-group textarea:focus,
  .control-group select:focus {
    outline: none;
    border-color: var(--terminal-cyan);
    box-shadow: 0 0 0 3px rgba(0, 151, 167, 0.15);
    background: #fff;
  }

  .control-group textarea {
    min-height: 80px;
    resize: vertical;
  }

  /* Color Grid */
  .color-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 8px;
  }

  .color-option {
    aspect-ratio: 1;
    border: 2px solid transparent;
    border-radius: 2px;
    cursor: pointer;
    position: relative;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    font-family: 'Share Tech Mono', monospace;
    font-weight: 600;
    font-size: 0.7rem;
    background: transparent;
  }

  .color-option:hover {
    transform: scale(1.05);
    border-color: rgba(255, 255, 255, 0.5);
  }

  .color-option.active {
    border-color: #fff;
    box-shadow: 
      0 0 10px currentColor,
      inset 0 0 20px rgba(255, 255, 255, 0.2);
  }

  .color-option.active::after {
    content: '◆';
    position: absolute;
    bottom: 2px;
    right: 2px;
    font-size: 0.6rem;
    color: #fff;
  }

  /* Sliders */
  .slider-container {
    display: flex;
    align-items: center;
    gap: 15px;
    background: rgba(0, 0, 0, 0.04);
    padding: 10px;
    border-radius: 4px;
  }

  .slider-container input[type="range"] {
    flex: 1;
    -webkit-appearance: none;
    height: 4px;
    background: rgba(0, 151, 167, 0.2);
    border-radius: 2px;
    outline: none;
  }

  .slider-container input[type="range"]::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 16px;
    height: 16px;
    background: var(--terminal-cyan);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 0 10px rgba(0, 188, 212, 0.5);
  }

  .slider-value {
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: var(--text-secondary);
    min-width: 50px;
    text-align: right;
  }

  /* Checkboxes */
  .options-group {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }

  .checkbox-label {
    display: flex;
    align-items: center;
    gap: 10px;
    cursor: pointer;
    font-family: 'Share Tech Mono', monospace;
    font-size: 0.8rem;
    color: var(--text-secondary);
  }

  .checkbox-label input[type="checkbox"] {
    width: 18px;
    height: 18px;
    accent-color: var(--terminal-cyan);
  }

  /* Preview Area */
  .preview-area {
    min-height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background: 
      linear-gradient(45deg, rgba(0, 151, 167, 0.03) 25%, transparent 25%),
      linear-gradient(-45deg, rgba(0, 151, 167, 0.03) 25%, transparent 25%),
      linear-gradient(45deg, transparent 75%, rgba(0, 151, 167, 0.03) 75%),
      linear-gradient(-45deg, transparent 75%, rgba(0, 151, 167, 0.03) 75%);
    background-size: 20px 20px;
    background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
  }

  /* Sticker Preview */
  #sticker-preview {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-family: 'Noto Serif SC', 'Noto Serif JP', 'Zen Old Mincho', 'Shippori Mincho', 'Noto Sans JP', serif;
    font-weight: 900;
    text-align: center;
    line-height: 1.3;
    transition: all 0.3s;
    word-break: break-word;
    overflow: hidden;
    position: relative;
    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.5);
    letter-spacing: 0.05em;
    transform: scaleX(0.85);
  }

  .sticker-header {
    font-size: 0.4em;
    margin-bottom: 0.3em;
    opacity: 0.9;
  }

  .sticker-main {
    font-size: 1em;
  }

  #sticker-preview.single .sticker-main {
    font-size: 1em;
  }

  #sticker-preview.square {
    width: 400px;
    height: 400px;
    padding: 20px;
  }

  #sticker-preview.rectangle {
    width: 533px;
    height: 400px;
    padding: 20px 40px;
  }

  #sticker-preview.vertical {
    writing-mode: vertical-rl;
    text-orientation: upright;
  }

  #sticker-preview.vertical.square {
    width: 400px;
    height: 400px;
  }

  #sticker-preview.vertical.rectangle {
    width: 400px;
    height: 533px;
  }

  @media (max-width: 768px) {
    #sticker-preview.square {
      width: 280px;
      height: 280px;
      padding: 15px;
    }
    
    #sticker-preview.rectangle {
      width: 280px;
      height: 210px;
      padding: 15px 25px;
    }
    
    #sticker-preview.vertical.rectangle {
      width: 210px;
      height: 280px;
      padding: 25px 15px;
    }

    #sticker-preview.vertical.square {
      width: 280px;
      height: 280px;
      padding: 15px;
    }
  }

  @media (max-width: 480px) {
    #sticker-preview.square {
      width: 240px;
      height: 240px;
      padding: 12px;
    }
    
    #sticker-preview.rectangle {
      width: 240px;
      height: 180px;
      padding: 12px 20px;
    }
    
    #sticker-preview.vertical.rectangle {
      width: 180px;
      height: 240px;
      padding: 20px 12px;
    }

    #sticker-preview.vertical.square {
      width: 240px;
      height: 240px;
      padding: 12px;
    }
  }

  /* Download Button */
  .download-btn {
    width: 100%;
    padding: 18px 30px;
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.1) 0%, rgba(0, 151, 167, 0.1) 100%);
    border: 2px solid var(--nerv-orange);
    border-radius: 6px;
    color: #D84315;
    font-family: 'Oswald', sans-serif;
    font-size: 1.1rem;
    font-weight: 600;
    letter-spacing: 0.15em;
    cursor: pointer;
    transition: all 0.3s;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    position: relative;
    overflow: hidden;
  }

  .download-btn::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 107, 53, 0.15), transparent);
    transition: left 0.5s;
  }

  .download-btn:hover {
    background: linear-gradient(135deg, rgba(255, 107, 53, 0.15) 0%, rgba(0, 151, 167, 0.15) 100%);
    box-shadow: 0 4px 20px rgba(255, 107, 53, 0.2);
    transform: translateY(-2px);
  }

  .download-btn:hover::before {
    left: 100%;
  }

  .btn-icon {
    font-size: 1.2rem;
  }

  /* Responsive */
  @media (max-width: 768px) {
    .header-content {
      flex-direction: column;
      gap: 20px;
      text-align: center;
    }

    .logo-section h1 {
      font-size: 1.5rem;
    }

    header {
      padding: 15px;
    }

    .container {
      padding: 10px;
    }

    .panel-body {
      padding: 15px;
    }

    .color-grid {
      grid-template-columns: repeat(3, 1fr);
    }

    .control-group input[type="text"],
    .control-group textarea,
    .control-group select {
      font-size: 16px; /* Prevent zoom on iOS */
      padding: 10px 12px;
    }

    .preview-area {
      min-height: auto;
      padding: 20px 0;
    }

    .panel-footer {
      padding: 15px;
    }

    .download-btn {
      font-size: 1rem;
      padding: 15px 20px;
    }
  }

  @media (max-width: 480px) {
    .logo-section h1 {
      font-size: 1.2rem;
      letter-spacing: 0.1em;
    }

    .subtitle {
      font-size: 0.75rem;
    }

    .status-text {
      font-size: 0.7rem;
    }

    .color-grid {
      grid-template-columns: repeat(3, 1fr);
      gap: 6px;
    }

    .color-option {
      font-size: 0.6rem;
    }

    .panel-header h2 {
      font-size: 0.75rem;
    }

    .control-group label {
      font-size: 0.7rem;
    }
  }
</style>
