import { useState } from 'react';
// Campaign Generator Page
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sparkles, Save, Image as ImageIcon, Send, Rocket } from 'lucide-react';
import { toast } from 'sonner';

export default function CampaignGenerator() {
  const [prompt, setPrompt] = useState('Generate a luxury jewelry campaign for wedding season.');
  const [isGenerating, setIsGenerating] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleGenerate = async () => {
    if (!prompt) return;
    
    setIsGenerating(true);
    
    const geminiKey = localStorage.getItem('gemini_api_key');
    
    if (!geminiKey) {
      toast.error('Gemini API Key missing. Please set it in Developer Settings.');
      setIsGenerating(false);
      return;
    }

    try {
      const response = await fetch('/api/generate-copy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, geminiKey, brandContext: 'Luxury modern jewelry brand targeting affluent millennials.' }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Failed to generate');
      }

      const data = await response.json();
      setResult(data);
      toast.success('Campaign generated successfully!');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row gap-6 h-full">
      {/* Left Panel: Prompt Input */}
      <div className="w-full lg:w-1/3 flex flex-col gap-6">
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-gray-500">AI Generator Prompt</label>
              <span className="text-[10px] text-[#FF6B00] font-semibold flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-[#FF6B00] rounded-full animate-pulse"></span>
                Gemini 3.5 Flash Active
              </span>
            </div>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col pt-0">
            <div className="space-y-4 flex-1 flex flex-col">
              <div className="space-y-2 flex-1 flex flex-col">
                <Textarea 
                  id="prompt" 
                  className="flex-1 resize-none bg-gray-50 border border-gray-200 rounded-xl p-4 text-sm focus:ring-2 focus:ring-[#FF6B00] outline-none transition-all placeholder:text-gray-400" 
                  placeholder="e.g., Generate a luxury jewelry campaign for wedding season."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                />
              </div>
              <Button 
                className="w-full bg-[#111827] text-white py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-gray-800" 
                size="lg"
                onClick={handleGenerate}
                disabled={isGenerating}
              >
                <Sparkles className="h-4 w-4" />
                {isGenerating ? 'Generating...' : 'Generate Marketing Copy'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Right Panel: Results */}
      <div className="w-full lg:w-2/3 flex flex-col gap-6">
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm h-full flex flex-col">
          <CardHeader className="flex flex-row items-center justify-between pb-4">
            <div>
              <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Generated Campaign</CardTitle>
            </div>
            {result && (
              <div className="flex space-x-2">
                <Button variant="outline" size="sm" className="rounded-lg font-bold">
                  <Save className="mr-2 h-4 w-4" />
                  Save Draft
                </Button>
                <Button className="bg-[#FF6B00] text-white rounded-lg font-bold shadow-sm hover:bg-[#e65a00] transition-colors" size="sm">
                  <Send className="mr-2 h-4 w-4" />
                  Publish Now
                </Button>
              </div>
            )}
          </CardHeader>
          <CardContent className="flex-1 overflow-y-auto">
            {result ? (
              <Tabs defaultValue="copy" className="w-full">
                <TabsList className="grid w-full grid-cols-2 mb-6">
                  <TabsTrigger value="copy" className="rounded-lg">Marketing Copy</TabsTrigger>
                  <TabsTrigger value="creative" className="rounded-lg">Creative Brief</TabsTrigger>
                </TabsList>
                
                <TabsContent value="copy" className="space-y-6">
                  <div>
                    <Label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Ad Headline</Label>
                    <input type="text" className="w-full text-lg font-bold border-b border-dashed border-gray-300 pb-1 focus:border-[#FF6B00] outline-none" defaultValue={result.headline} />
                  </div>
                  
                  <div>
                    <Label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Body Copy</Label>
                    <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                      {result.body_copy}
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Social Caption</Label>
                      <p className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                        {result.social_caption}
                      </p>
                    </div>
                    <div className="space-y-6">
                      <div>
                        <Label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Call to Action</Label>
                        <div className="bg-gray-50 px-4 py-2 rounded-lg text-sm font-medium border border-gray-100">
                          {result.cta}
                        </div>
                      </div>
                      <div>
                        <Label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Hashtags</Label>
                        <div className="text-[#FF6B00] text-sm">
                          {result.hashtags}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 bg-[#F59E0B]/5 border border-[#F59E0B]/20 rounded-xl">
                    <span className="text-[10px] font-bold text-[#F59E0B] uppercase block mb-1">Strategy Notes</span>
                    <p className="text-xs text-gray-600">{result.strategy_notes}</p>
                  </div>
                </TabsContent>
                
                <TabsContent value="creative" className="space-y-6">
                  <div>
                    <Label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Concept Strategy</Label>
                    <div className="p-4 bg-gray-50 rounded-lg text-sm border border-gray-200">
                      {result.creative_concept}
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Image Generation Prompt</Label>
                    <div className="p-4 bg-gray-50 rounded-lg font-mono text-sm text-gray-800 border border-gray-200">
                      {result.image_prompt}
                    </div>
                  </div>

                  <Button className="w-full mt-4 bg-[#FF6B00] hover:bg-[#e65a00] text-white rounded-xl font-bold">
                    <ImageIcon className="mr-2 h-4 w-4" />
                    Send to Creative Studio
                  </Button>
                </TabsContent>
              </Tabs>
            ) : (
              <div className="h-[400px] flex flex-col items-center justify-center text-gray-400 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Rocket className="h-16 w-16 text-gray-300 mb-4" />
                <p className="text-sm font-medium">Your generated campaign will appear here.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
