import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Image as ImageIcon, Download, RefreshCw, Send } from 'lucide-react';
import { toast } from 'sonner';

export default function CreativeStudio() {
  const [prompt, setPrompt] = useState('A cinematic product shot of a luxury diamond necklace on a velvet display, dramatic lighting, 8k, photorealistic');
  const [isGenerating, setIsGenerating] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const handleGenerateImage = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    
    const hfKey = localStorage.getItem('huggingface_api_key');
    
    if (!hfKey) {
      toast.error('Hugging Face API Key missing. Please set it in Developer Settings.');
      setIsGenerating(false);
      return;
    }

    try {
      const response = await fetch(
        "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
        {
          headers: { Authorization: `Bearer ${hfKey}`, "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({ inputs: prompt }),
        }
      );

      if (!response.ok) {
        throw new Error('Failed to generate image from Hugging Face API');
      }

      const blob = await response.blob();
      const objUrl = URL.createObjectURL(blob);
      setImageUrl(objUrl);
      toast.success('Image generated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">AI Image Generator</label>
              <span className="text-[10px] text-[#F59E0B] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#F59E0B] rounded-full animate-pulse"></span>
                Stable Diffusion Active
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col pt-0">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <Textarea 
                  id="image-prompt" 
                  className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#F59E0B] outline-none transition-all placeholder:text-gray-400" 
                  placeholder="Describe the image you want to generate in detail..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-[#111827] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800" 
                size="lg"
                onClick={handleGenerateImage}
                disabled={isGenerating}
              >
                <ImageIcon className="mr-2 h-5 w-5" />
                {isGenerating ? 'Generating...' : 'Generate Creative Asset'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Preview Workspace</label>
            {imageUrl && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="rounded-lg font-bold">
                  <Download className="mr-2 h-4 w-4" />
                  Download
                </Button>
                <Button className="bg-[#FF6B00] text-white rounded-lg font-bold shadow-sm hover:bg-[#e65a00] transition-colors" size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Publish
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {imageUrl ? (
              <div className="space-y-6 h-full flex flex-col items-center justify-center">
                <div className="relative rounded-xl overflow-hidden border border-gray-200 bg-gray-100 aspect-square md:aspect-video flex items-center justify-center w-full">
                  <img src={imageUrl} alt="Generated" className="max-w-full max-h-full object-contain" />
                </div>
                <div className="flex justify-center w-full">
                  <Button variant="secondary" className="rounded-xl font-bold" onClick={handleGenerateImage} disabled={isGenerating}>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    Generate Variant
                  </Button>
                </div>
              </div>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <ImageIcon className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-sm font-medium">Your generated creative will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
