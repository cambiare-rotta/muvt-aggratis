# Prepara i livelli del logo MUVT esportati da Canva (PNG su fondo bianco, stessa pagina 1080x1350).
# Toglie il bianco senza alterare i colori e ritaglia tutti i livelli con lo STESSO riquadro,
# così sovrapposti combaciano al pixel.
# Uso: .\livelli-logo.ps1 -In cunei.png,scritta.png -Out cunei-out.png,scritta-out.png [-Pad 8]
param([string[]]$In, [string[]]$Out, [int]$Pad = 8)
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System; using System.Drawing; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class Livelli {
  // "colore ad alfa" sul bianco, esatto: sopra il bianco ridà i pixel originali
  public static Bitmap WhiteToAlpha(Bitmap src, int[] box) {
    int w = src.Width, h = src.Height;
    var s = src.Clone(new Rectangle(0,0,w,h), PixelFormat.Format32bppArgb);
    var d = s.LockBits(new Rectangle(0,0,w,h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    byte[] px = new byte[d.Stride*h]; Marshal.Copy(d.Scan0, px, 0, px.Length);
    for (int y=0;y<h;y++) for (int x=0;x<w;x++) {
      int i=y*d.Stride+x*4; int b=px[i], g=px[i+1], r=px[i+2];
      int a = Math.Max(255-r, Math.Max(255-g, 255-b));
      if (a == 0) { px[i]=px[i+1]=px[i+2]=px[i+3]=0; continue; }
      double af = a/255.0;
      px[i]   = (byte)Math.Max(0, Math.Min(255, Math.Round((b-255*(1-af))/af)));
      px[i+1] = (byte)Math.Max(0, Math.Min(255, Math.Round((g-255*(1-af))/af)));
      px[i+2] = (byte)Math.Max(0, Math.Min(255, Math.Round((r-255*(1-af))/af)));
      px[i+3] = (byte)a;
      if (a > 8) { box[0]=Math.Min(box[0],x); box[1]=Math.Min(box[1],y); box[2]=Math.Max(box[2],x); box[3]=Math.Max(box[3],y); }
    }
    Marshal.Copy(px, 0, d.Scan0, px.Length); s.UnlockBits(d);
    return s;
  }
}
"@
$box = [int[]]@([int]::MaxValue, [int]::MaxValue, -1, -1)
$layers = @()
foreach ($f in $In) { $b = [System.Drawing.Bitmap]::FromFile((Resolve-Path $f)); $layers += [Livelli]::WhiteToAlpha($b, $box); $b.Dispose() }
$W = $layers[0].Width; $H = $layers[0].Height
$x0 = [Math]::Max(0, $box[0]-$Pad); $y0 = [Math]::Max(0, $box[1]-$Pad)
$x1 = [Math]::Min($W-1, $box[2]+$Pad); $y1 = [Math]::Min($H-1, $box[3]+$Pad)
$rect = New-Object System.Drawing.Rectangle($x0, $y0, ($x1-$x0+1), ($y1-$y0+1))
for ($k=0; $k -lt $layers.Count; $k++) {
  $c = $layers[$k].Clone($rect, [System.Drawing.Imaging.PixelFormat]::Format32bppArgb)
  $c.Save($Out[$k], [System.Drawing.Imaging.ImageFormat]::Png)
  "{0}: {1}x{2} ({3} bytes)" -f $Out[$k], $c.Width, $c.Height, (Get-Item $Out[$k]).Length
  $c.Dispose(); $layers[$k].Dispose()
}
"riquadro comune: x=$x0 y=$y0 w=$($rect.Width) h=$($rect.Height)"
