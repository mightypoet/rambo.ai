import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/AppCard';
import { Button } from '@/components/ui/button';
import { Rocket, FileText, Share2, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { name: 'Total Campaigns', value: '12', icon: FileText },
    { name: 'Posts Published', value: '48', icon: Share2 },
    { name: 'Connected Accounts', value: '3', icon: TrendingUp },
    { name: 'AI Generations Used', value: '156', icon: Rocket },
  ];

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.name} className="bg-white border border-gray-200 rounded-2xl shadow-sm">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-xs font-bold uppercase tracking-wider text-gray-500">
                {stat.name}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-[#FF6B00]" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button 
              className="w-full justify-start bg-[#FF6B00] text-white py-3 rounded-xl font-bold text-sm hover:bg-[#e65a00] transition-colors" 
              size="lg"
              onClick={() => navigate('/campaign-generator')}
            >
              <Rocket className="mr-2 h-5 w-5" />
              Generate New Campaign
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start py-3 rounded-xl font-bold text-sm" 
              size="lg"
              onClick={() => navigate('/creative-studio')}
            >
              <FileText className="mr-2 h-5 w-5" />
              Open Creative Studio
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-white border border-gray-200 rounded-2xl shadow-sm">
          <CardHeader>
            <CardTitle className="text-sm font-bold uppercase tracking-wider text-gray-500">Recent Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-gray-50 border border-gray-100 rounded-xl">
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm">Summer Sale {2024 - i}</h4>
                    <p className="text-xs text-gray-500 mt-1">Generated {i} days ago</p>
                  </div>
                  <Button variant="ghost" size="sm" className="rounded-lg font-bold">View</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
