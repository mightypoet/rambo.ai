import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { KeyRound, Save, ShieldCheck } from 'lucide-react';
import { toast } from 'sonner';

export default function Settings() {
  const [geminiKey, setGeminiKey] = useState('');
  const [hfKey, setHfKey] = useState('');

  useEffect(() => {
    const savedGemini = localStorage.getItem('gemini_api_key');
    const savedHf = localStorage.getItem('huggingface_api_key');
    if (savedGemini) setGeminiKey(savedGemini);
    if (savedHf) setHfKey(savedHf);
  }, []);

  const handleSave = () => {
    localStorage.setItem('gemini_api_key', geminiKey);
    localStorage.setItem('huggingface_api_key', hfKey);
    toast.success('API keys saved successfully. Your keys are stored locally on your device.');
  };

  return (
    <div className="space-y-6 max-w-3xl">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">Developer Settings</h2>
        <p className="text-gray-500">Configure your Bring Your Own Key (BYOK) settings</p>
      </div>

      <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
        <CardHeader>
          <div className="flex items-center space-x-2">
            <KeyRound className="h-5 w-5 text-[#FF6B00]" />
            <CardTitle className="text-lg font-bold">AI Providers Integration</CardTitle>
          </div>
          <CardDescription>
            Enter your API keys below to enable AI generation features. 
            Keys are stored locally in your browser.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="gemini-key" className="text-xs font-bold uppercase text-gray-500">Google Gemini API Key</Label>
            <Input 
              id="gemini-key" 
              type="password" 
              placeholder="AIzaSy..." 
              value={geminiKey}
              onChange={(e) => setGeminiKey(e.target.value)}
              className="rounded-xl border-gray-200 focus-visible:ring-[#FF6B00]"
            />
            <p className="text-xs text-gray-500 font-medium">Required for Campaign Generation (Gemini 1.5 Flash)</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="hf-key" className="text-xs font-bold uppercase text-gray-500">Hugging Face API Key</Label>
            <Input 
              id="hf-key" 
              type="password" 
              placeholder="hf_..." 
              value={hfKey}
              onChange={(e) => setHfKey(e.target.value)}
              className="rounded-xl border-gray-200 focus-visible:ring-[#FF6B00]"
            />
            <p className="text-xs text-gray-500 font-medium">Required for Creative Studio (Stable Diffusion XL)</p>
          </div>

          <div className="pt-4 flex items-center justify-between border-t border-gray-100">
            <div className="flex items-center text-sm font-bold text-emerald-600 bg-emerald-50 border border-emerald-100 px-3 py-1.5 rounded-lg">
              <ShieldCheck className="h-4 w-4 mr-2" />
              Locally Stored
            </div>
            <div className="space-x-2">
              <Button variant="outline" className="rounded-xl font-bold">Test Connection</Button>
              <Button className="bg-[#FF6B00] hover:bg-[#e65a00] text-white rounded-xl font-bold" onClick={handleSave}>
                <Save className="mr-2 h-4 w-4" />
                Save Keys
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
