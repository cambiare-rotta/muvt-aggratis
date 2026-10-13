param([string]$In, [string]$Out, [int]$Pad = 6)
Add-Type -AssemblyName System.Drawing
Add-Type -ReferencedAssemblies System.Drawing -TypeDefinition @"
using System; using System.Drawing; using System.Drawing.Imaging; using System.Runtime.InteropServices;
public static class Logo {
  // "colore ad alfa" sul bianco: toglie lo sfondo bianco tenendo i bordi sfumati
  public static Bitmap WhiteToAlpha(Bitmap src, int pad) {
    int w = src.Width, h = src.Height;
    var s = src.Clone(new Rectangle(0,0,w,h), PixelFormat.Format32bppArgb);
    var d = s.LockBits(new Rectangle(0,0,w,h), ImageLockMode.ReadWrite, PixelFormat.Format32bppArgb);
    byte[] px = new byte[d.Stride*h]; Marshal.Copy(d.Scan0, px, 0, px.Length);
    int minX=w, minY=h, maxX=-1, maxY=-1;
    for (int y=0;y<h;y++) for (int x=0;x<w;x++) {
      int i=y*d.Stride+x*4; int b=px[i], g=px[i+1], r=px[i+2];
      int a = Math.Max(255-r, Math.Max(255-g, 255-b));
      if (a < 45) { px[i]=px[i+1]=px[i+2]=px[i+3]=0; continue; } // rumore JPEG vicino al bianco
      double af = a/255.0;
      int a0 = a;
      a = Math.Min(255, (a0-45)*255/(190-45)); // bordi più netti, niente alone
      px[i]   = (byte)Math.Max(0, Math.Min(255, Math.Round((b-255*(1-af))/af)));
      px[i+1] = (byte)Math.Max(0, Math.Min(255, Math.Round((g-255*(1-af))/af)));
      px[i+2] = (byte)Math.Max(0, Math.Min(255, Math.Round((r-255*(1-af))/af)));
      px[i+3] = (byte)a;
      // posterizza: toglie il rumore JPEG e rende il PNG molto più leggero
      for (int k=0;k<3;k++) px[i+k] = (byte)Math.Min(255, ((px[i+k]+12)/24)*24);
      px[i+3] = (byte)(a > 235 ? 255 : Math.Min(255, ((a+8)/17)*17));
      if (a > 40) { if(x<minX)minX=x; if(x>maxX)maxX=x; if(y<minY)minY=y; if(y>maxY)maxY=y; }
    }
    Marshal.Copy(px, 0, d.Scan0, px.Length); s.UnlockBits(d);
    minX=Math.Max(0,minX-pad); minY=Math.Max(0,minY-pad); maxX=Math.Min(w-1,maxX+pad); maxY=Math.Min(h-1,maxY+pad);
    var crop = s.Clone(new Rectangle(minX,minY,maxX-minX+1,maxY-minY+1), PixelFormat.Format32bppArgb);
    s.Dispose(); return crop;
  }
}
"@
$src = [System.Drawing.Bitmap]::FromFile($In)
$res = [Logo]::WhiteToAlpha($src, $Pad)
$res.Save($Out, [System.Drawing.Imaging.ImageFormat]::Png)
"{0}x{1} -> {2} ({3} bytes)" -f $res.Width, $res.Height, $Out, (Get-Item $Out).Length
$res.Dispose(); $src.Dispose()
