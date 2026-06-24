import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Building2, MoreVertical } from 'lucide-react';
import { useState } from 'react';

export default function Brands() {
  const [brands, setBrands] = useState([
    { id: 1, name: 'Luxe Jewelers', industry: 'Retail', website: 'luxejewelers.com', tone: 'Elegant, modern, affluent' }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Brands</h2>
          <p className="text-gray-500">Manage your brand profiles for tailored AI generation</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-[#111827] text-white rounded-xl font-bold px-6 hover:bg-gray-800 transition-colors">
              <Plus className="mr-2 h-4 w-4" />
              Add Brand
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] rounded-2xl">
            <DialogHeader>
              <DialogTitle className="text-lg font-bold">Add New Brand</DialogTitle>
              <DialogDescription>
                Create a brand profile to guide the AI when generating content.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-xs font-bold uppercase text-gray-500">Brand Name</Label>
                <Input id="name" placeholder="e.g. Luxe Jewelers" className="rounded-xl border-gray-200 focus-visible:ring-[#FF6B00]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="industry" className="text-xs font-bold uppercase text-gray-500">Industry</Label>
                <Input id="industry" placeholder="e.g. Retail" className="rounded-xl border-gray-200 focus-visible:ring-[#FF6B00]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="text-xs font-bold uppercase text-gray-500">Website</Label>
                <Input id="website" placeholder="https://" className="rounded-xl border-gray-200 focus-visible:ring-[#FF6B00]" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="tone" className="text-xs font-bold uppercase text-gray-500">Brand Voice / Tone</Label>
                <Textarea id="tone" placeholder="Describe the brand's personality..." className="rounded-xl border-gray-200 focus-visible:ring-[#FF6B00] resize-none" />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" className="bg-[#FF6B00] hover:bg-[#e65a00] text-white rounded-xl font-bold">Save Brand</Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {brands.map((brand) => (
          <Card key={brand.id} className="bg-white border border-gray-200 rounded-2xl shadow-sm relative overflow-hidden group">
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </Button>
            </div>
            <CardHeader>
              <div className="w-12 h-12 rounded-xl bg-gray-100 border border-gray-200 flex items-center justify-center mb-4">
                <Building2 className="h-6 w-6 text-gray-500" />
              </div>
              <CardTitle className="text-lg font-bold">{brand.name}</CardTitle>
              <CardDescription>{brand.website}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 text-sm">
                <div className="flex justify-between items-center border-b border-gray-100 pb-2">
                  <span className="text-xs font-bold uppercase text-gray-500">Industry:</span>
                  <span className="font-semibold text-gray-900">{brand.industry}</span>
                </div>
                <div>
                  <span className="text-xs font-bold uppercase text-gray-500 block mb-2">Brand Voice:</span>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-xl border border-gray-100 leading-relaxed text-sm">{brand.tone}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
