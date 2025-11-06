
const languageColors = {
  python: '#0072ff',
  javascript: '#f7df1e',
  java: '#f89820',
  csharp: '#68217A',
  ruby: '#CC342D',
  default: '#5a5a6e',
};

// This function creates a data URL (a base64 image)
export function generateSnippetImage(title, language) {
  const canvas = document.createElement('canvas');
  const size = 512; // Texture size for the 3D model
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');

  // 1. Background
  const langColor = languageColors[language.toLowerCase()] || languageColors.default;
  ctx.fillStyle = '#1a1a2e'; // Our brand's dark background
  ctx.fillRect(0, 0, size, size);

  // 2. Futuristic "Glow"
  const gradient = ctx.createRadialGradient(size / 2, size / 2, 50, size / 2, size / 2, size / 2);
  gradient.addColorStop(0, langColor + '40'); // 25% opacity
  gradient.addColorStop(1, '#1a1a2e00'); // 0% opacity
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  // 3. Language Title
  ctx.fillStyle = langColor;
  ctx.font = 'bold 32px sans-serif';
  ctx.textAlign = 'center';
  ctx.fillText(language.toUpperCase(), size / 2, size / 2 - 40);

  // 4. Snippet Title
  ctx.fillStyle = '#FFFFFF';
  ctx.font = '48px sans-serif';
  ctx.textAlign = 'center';
  // Simple word wrap
  const words = title.split(' ');
  let line = '';
  let y = size / 2 + 30;

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + ' ';
    const metrics = ctx.measureText(testLine);
    if (metrics.width > size - 80 && n > 0) {
      ctx.fillText(line, size / 2, y);
      line = words[n] + ' ';
      y += 50;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, size / 2, y);
  
  // 5. Border
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
  ctx.lineWidth = 10;
  ctx.strokeRect(0, 0, size, size);

  return canvas.toDataURL('image/png');
}